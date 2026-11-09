import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '@/lib/ai-context';

// Tried in order; falls through when a model is overloaded (503), rate limited (429), or times out.
const MODELS = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;

type Message = { role: 'user' | 'assistant'; content: string };

function isValid(messages: unknown): messages is Message[] {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (m) =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length <= MAX_CHARS,
    )
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.APIKEY;
  if (!apiKey) return new Response('AI is not configured.', { status: 500 });

  const { messages } = await request.json().catch(() => ({}));
  if (!isValid(messages)) return new Response('Invalid request.', { status: 400 });

  const contents = messages
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  // Gemini requires the conversation to start with a user turn (drops the greeting).
  while (contents.length && contents[0].role !== 'user') contents.shift();
  if (!contents.length) return new Response('Invalid request.', { status: 400 });

  // SDK defaults to 5 retries with up to 60s backoff, which hangs the chat; fail fast and fall back instead.
  const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 15_000, retryOptions: { attempts: 1 } } });

  let stream: AsyncGenerator<{ text?: string }> | undefined;
  let lastStatus = 502;
  for (const model of MODELS) {
    try {
      stream = await ai.models.generateContentStream({
        model,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT },
      });
      break;
    } catch (err) {
      console.error(`Gemini error (${model})`, err);
      const status = (err as { status?: number })?.status;
      if (status === 429) lastStatus = 429;
      // No status means a timeout or network error, also worth trying the next model.
      if (status !== undefined && status !== 429 && status !== 503) break;
    }
  }
  if (!stream) {
    return new Response('AI request failed.', { status: lastStatus === 429 ? 429 : 502 });
  }

  const encoder = new TextEncoder();
  const source = stream;
  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of source) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch (err) {
          console.error('Gemini stream error', err);
        } finally {
          controller.close();
        }
      },
    }),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } },
  );
}
