import { GoogleGenAI } from '@google/genai';
import { projects } from '@/lib/projects';

// Tried in order; falls through when a model is overloaded (503), rate limited (429), or times out.
const MODELS = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;

const BIO = `
- Cleo Balaranjith: high school senior and computer science student in Sammamish, WA (Pacific time).
- Running Start at Bellevue College while attending Eastlake High School.
- Selected for MIT Beaver Works Summer Institute (~6% acceptance), remote sensing for disaster response.
- Interned at Rove Miles (YC W24), building a Python autocomplete system for 9,000+ airports.
- Business strategy work for Seattle Sports & Regenerative Medicine.
- Studied computer vision in the University of Michigan's Joy of Coding program.
- Observed hospital operations at CMC Vellore, one of Asia's leading hospitals.
- Awards: 1st in Geospatial Technology at WTSA State, 4th in Engineering Design, 2x TSA nationals, 2nd nationally in Technology Problem Solving, 3rd at the Divergent Hackathon, 8th at WTSA 2026.
- Stack: React, Next.js, TypeScript, Python, Firebase, Supabase, Vercel, ArcGIS, Google Earth Engine. VS Code and GitHub daily.
- Available to hire and open to interesting opportunities.
- Contact: cbalaranjith@gmail.com, instagram @cle0b, github @CleeYOpro, linkedin @cleofus, medium @cleobala.
`.trim();

const PROJECTS = projects
  .map((p) =>
    [
      `## ${p.title} (/projects/${p.slug})`,
      p.description,
      `Tags: ${p.tags.join(', ')}`,
      p.github && `GitHub: ${p.github}`,
      p.live && `Live: ${p.live}`,
      p.competition && `Competition: ${p.competition.label}`,
      p.overview,
      p.results?.length && `Results:\n${p.results.map((r) => `- ${r}`).join('\n')}`,
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n\n');

const SYSTEM_PROMPT = `You are cleo's AI, the assistant on Cleo Balaranjith's personal website. Answer visitors' questions about Cleo's work, projects, skills, and how to reach him.

Style: casual, friendly, lowercase, concise (usually 1-4 sentences). Refer to Cleo in the third person (he/him). Plain text only, no markdown.

Only use the facts below. If something isn't covered, say you don't know and suggest emailing cbalaranjith@gmail.com. Never make up details. Politely decline requests unrelated to Cleo.

# About Cleo
${BIO}

# Projects
${PROJECTS}`;

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
