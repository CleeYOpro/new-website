'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

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
    { role: 'assistant', content: "hi! i'm cleo's AI. ask me anything about his work, projects, or how to reach him." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const history = [...messages, { role: 'user', content: text.trim() } as Message];
    setMessages(history);
    setInput('');
    setLoading(true);
    let reply = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages([...history, { role: 'assistant', content: '' }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: reply }]);
      }
      if (!reply) throw new Error('empty');
    } catch (err) {
      const content = (err as Error).message === '429'
        ? "i'm getting a lot of questions right now. try again in a minute."
        : "sorry, couldn't process that. try again in a sec.";
      setMessages([...history, { role: 'assistant', content }]);
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
      <FloatReveal from="up">
        <section className="ai-hero">
          <TypeText as="h1" className="hero-name" text="cleo://ai" />
          <TypeText as="p" className="hero-sub" delay={300} text="chat with cleo's AI to learn more about him." />
        </section>
      </FloatReveal>

      <FloatReveal from="down" delay={100}>
        <div className="ai-chat-window" ref={chatRef}>
          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg--${m.role}`}>
                <p>{m.content}</p>
              </div>
            ))}
            {loading && messages[messages.length - 1].role === 'user' && (
              <div className="ai-msg ai-msg--assistant ai-msg--loading">
                <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
              </div>
            )}
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
      </FloatReveal>
    </main>
  );
}
