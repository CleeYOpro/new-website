'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiAlertCircle } from 'react-icons/fi';
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
      <div className="ai-building-overlay">
        <FloatReveal from="up">
          <FiAlertCircle size={28} />
          <h2>cleo://ai is being built</h2>
          <p>check back soon - this page is under construction.</p>
        </FloatReveal>
      </div>

      <div className="ai-blurred" aria-hidden="true" inert>
        <FloatReveal from="up">
          <section className="ai-hero">
            <TypeText as="h1" className="hero-name" text="cleo://ai" />
            <TypeText as="p" className="hero-sub" delay={300} text="chat with cleo's AI to learn more about him." />
          </section>
        </FloatReveal>

        <FloatReveal from="up" delay={100}>
          <div className="ai-dev-notice">
            <FiAlertCircle size={14} />
            <span>This AI isn&apos;t fully functional yet - it&apos;s under development, so responses are limited for now.</span>
          </div>
        </FloatReveal>

        <FloatReveal from="down" delay={200}>
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
        </FloatReveal>
      </div>
    </main>
  );
}

async function simulateReply(text: string): Promise<string> {
  const q = text.toLowerCase();
  await new Promise(r => setTimeout(r, 600));

  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('work'))
    return "cleo is a high school senior and computer science student, available to hire and open to interesting opportunities. best way to reach him is cbalaranjith@gmail.com.";
  if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('tool'))
    return "he works across React, Next.js, TypeScript, Python, Firebase, Supabase, and Vercel, plus GIS tooling like ArcGIS and Google Earth Engine for remote sensing work. VS Code and GitHub are his daily drivers.";
  if (q.includes('project'))
    return "some highlights: RoleCaller (offline-first attendance app for tribal schools in Jharkhand, India), Fault Lines & Front Lines (GIS earthquake risk mapping, 1st in state), Port Laken (AI-powered civic portal shown to city governments around WA), Price It Right (an econ simulator now used as real classroom material), and AzotoColumn (a bioretention system for farm runoff).";
  if (q.includes('contact') || q.includes('reach') || q.includes('email'))
    return "reach cleo at cbalaranjith@gmail.com - or on instagram @cle0b, github @CleeYOpro, linkedin @cleofus, or medium @cleobala.";
  if (q.includes('experience') || q.includes('work history') || q.includes('internship'))
    return "he's interned at Rove Miles (YC W24) building a Python autocomplete system for 9,000+ airports, did business strategy work for Seattle Sports & Regenerative Medicine, studied computer vision at the University of Michigan's Joy of Coding program, and observed hospital operations at CMC Vellore - one of Asia's leading hospitals.";
  if (q.includes('school') || q.includes('education') || q.includes('college'))
    return "he's doing Running Start at Bellevue College while attending Eastlake High School in Sammamish, WA, and was selected for MIT's Beaver Works Summer Institute (~6% acceptance) for remote sensing for disaster response.";
  if (q.includes('tsa') || q.includes('competition') || q.includes('award') || q.includes('hackathon'))
    return "1st place in Geospatial Technology at WTSA State (Fault Lines & Front Lines), 4th in Engineering Design (AzotoColumn), 2× TSA nationals, 2nd place nationally in Technology Problem Solving, 3rd place at the Divergent Hackathon, and 8th at WTSA 2026 with Port Laken.";
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "hey! ask me about cleo's work, projects, tech stack, or how to get in touch.";
  if (q.includes('location') || q.includes('where'))
    return "sammamish, wa - pacific time.";

  return "great question. cleo is a high school senior building practical software across education, healthcare, and geospatial technology. for specifics, reach him directly at cbalaranjith@gmail.com.";
}
