'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What are you working on?',
  'What tech do you use?',
  'Tell me about your projects.',
  'How do I get in touch?',
];

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "hi! i'm cleo's AI. ask me anything about her work, projects, or how to reach her." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      const reply = await simulateReply(text.trim());
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "sorry, couldn't process that. try again in a sec." }]);
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
        <h1 className="hero-name">cleo://ai</h1>
        <p className="hero-sub">chat with cleo&apos;s AI to learn more about her.</p>
      </section>

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

      <div className="ai-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="ai-chip" onClick={() => send(s)} disabled={loading}>
            {s}
          </button>
        ))}
      </div>

      <div className="ai-input-row">
        <textarea
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
          <FiSend size={15} />
        </button>
      </div>

      <p className="ai-disclaimer">
        AI can make mistakes. Double-check anything important.
      </p>

      <footer className="site-footer" style={{ marginTop: 32 }}>
        <span>cleof.us · Cleo Balaranjith</span>
        <span>Sammamish, WA · GMT-7</span>
      </footer>
    </main>
  );
}

async function simulateReply(text: string): Promise<string> {
  const q = text.toLowerCase();
  await new Promise(r => setTimeout(r, 600));

  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('work'))
    return "cleo is a high school junior actively building and open to interesting opportunities. best way to reach her is cbalaranjith@gmail.com.";
  if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('tool'))
    return "she works with VS Code, GitHub, Supabase, React, TypeScript, Python, and Vercel. her fav stack rn.";
  if (q.includes('project'))
    return "some highlights: Price it Right (market sim), Fault Lines & Front Lines (GIS + seismic mapping), AzotoColumn (bioretention eco-engineering), and this portfolio.";
  if (q.includes('contact') || q.includes('reach') || q.includes('email'))
    return "reach cleo at cbalaranjith@gmail.com — or on instagram @cle0b, github @CleeYOpro, or linkedin @cleofus.";
  if (q.includes('experience') || q.includes('work history') || q.includes('internship'))
    return "she's interned at Rove (YC W24) on airport search autocomplete, did business strategy at Seattle Sports & Regenerative Medicine, and observed ops at CMC Vellore — top 5 hospital in asia.";
  if (q.includes('school') || q.includes('education') || q.includes('college'))
    return "she's doing Running Start at Bellevue College while attending Eastlake High School. also got into MIT Beaver Works Summer Institute (~6% acceptance) for remote sensing.";
  if (q.includes('tsa') || q.includes('competition') || q.includes('award'))
    return "2× TSA nationals, 2nd place at nationals in technology problem solving, 1st in state for geospatial technology, ACSL International Silver, and a bunch more.";
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "hey! ask me about cleo's work, projects, tech stack, or how to get in touch.";
  if (q.includes('location') || q.includes('where'))
    return "sammamish, wa — pacific time (gmt-7).";

  return "great question. cleo is a high school junior building practical stuff across software, GIS, and engineering. for specifics, reach her directly at cbalaranjith@gmail.com.";
}
