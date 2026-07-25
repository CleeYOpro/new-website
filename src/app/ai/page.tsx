'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Are you available to hire?',
  'What technologies do you work with?',
  'Tell me about your projects.',
  'How do I get in touch?',
];

const SYSTEM_CONTEXT = `You are Dhvanit's AI persona. Answer questions about Dhvanit Monpara as if you are representing him. Here are the facts:
- Backend engineer based in Ahmedabad, India
- Works with PERN stack, Go, and GenAI
- Currently a Software Engineer Intern (Apr 2026 - Present, company undisclosed)
- Previously Full Stack Developer Intern at TechySquad (Aug 2025 - Jan 2026)
- Built real-time chat apps with WebSockets and LiveKit (sub-200ms latency)
- Built multi-layer content moderation pipelines
- Skilled in TypeScript, Node.js, Express, PostgreSQL, Redis, Docker, LangChain, LangGraph
- Writes technical blogs about backend engineering
- Open to interesting backend/GenAI opportunities
- Contact: hi@dhvanitmonpara.in
Keep answers concise and friendly. If asked something you don't know, say so honestly.`;

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Dhvanit's AI persona. Ask me anything about him or his work. I'll be happy to assist you." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build a simple prompt for a free API — using Gemini via fetch
      // Since no API key is wired up yet, we simulate a smart response
      const reply = await simulateReply(text.trim(), messages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that right now. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <main className="ai-page">
      <section className="ai-hero">
        <h1 className="hero-name">dhvanit://ai</h1>
        <p className="hero-sub">Have a chat with my AI to know more about me.</p>
      </section>

      {/* Chat window */}
      <div className="ai-chat-window">
        <div className="ai-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ai-msg--${m.role}`}>
              <p>{m.content}</p>
            </div>
          ))}
          {loading && (
            <div className="ai-msg ai-msg--assistant ai-msg--loading">
              <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="ai-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="ai-chip" onClick={() => send(s)} disabled={loading}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="ai-input-row">
        <textarea
          ref={inputRef}
          className="ai-input"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
        />
        <button
          className="ai-send"
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          aria-label="Send"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      <p className="ai-disclaimer">
        Everyone makes mistakes, including this AI. Make sure to double-check important information.
      </p>

      <footer className="site-footer" style={{ marginTop: 32 }}>
        <span>2026 - Nothin&apos; reserved</span>
        <span>Ahmedabad, 6:19 AM</span>
      </footer>
    </main>
  );
}

// Lightweight rule-based fallback (replace with real Gemini call once API key is added)
async function simulateReply(text: string, _history: Message[]): Promise<string> {
  const q = text.toLowerCase();
  await new Promise(r => setTimeout(r, 600)); // simulate latency

  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('work'))
    return "Dhvanit is currently interning but is open to hearing about interesting backend or GenAI opportunities. Best way to reach him is hi@dhvanitmonpara.in.";
  if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('tool'))
    return "He primarily works with TypeScript, Node.js, Express, PostgreSQL, Redis, and Docker on the backend. For AI he uses LangChain, LangGraph, and Python. Go is his go-to when performance really matters.";
  if (q.includes('project'))
    return "Some of his notable projects: Flick (anonymous campus community), Initex (CLI for production-ready backend scaffolding), Nestly (real-time chat with WebRTC/LiveKit), and an OS-themed portfolio.";
  if (q.includes('blog') || q.includes('write') || q.includes('article'))
    return "He writes about backend engineering — topics like cache invalidation, content moderation pipelines, and real-time systems. You can find his articles on his site.";
  if (q.includes('contact') || q.includes('reach') || q.includes('email'))
    return "You can reach Dhvanit at hi@dhvanitmonpara.in. He's also on GitHub (dhvanitmonpara) and LinkedIn.";
  if (q.includes('experience') || q.includes('work history') || q.includes('internship'))
    return "Currently interning as a Software Engineer (Apr 2026 - Present). Previously at TechySquad as a Full Stack Developer Intern (Aug 2025 - Jan 2026), where he built real-time communication platforms and production backends.";
  if (q.includes('location') || q.includes('where') || q.includes('india'))
    return "Dhvanit is based in Ahmedabad, India.";
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "Hey! Ask me anything about Dhvanit — his work, projects, tech stack, or how to get in touch.";

  return `That's a great question. Dhvanit is a backend engineer focused on building reliable, scalable systems. For specifics, the best source is always him directly — hi@dhvanitmonpara.in.`;

  void SYSTEM_CONTEXT; // referenced for future real API integration
}
