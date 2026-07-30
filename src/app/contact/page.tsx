'use client';

import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError('');
    setMessageError('');

    let valid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (!message.trim()) {
      setMessageError('Please enter a message.');
      valid = false;
    }
    if (!valid) return;

    setStatus('sending');
    try {
      await new Promise((r) => setTimeout(r, 1000)); // replace with real send
      setStatus('sent');
      setEmail('');
      setName('');
      setPhone('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <main className="main-content">
        <section className="about-hero" style={{ marginBottom: '40px' }}>
          <h1 className="hero-name" style={{ marginBottom: '16px' }}>Contact</h1>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '12px',
            color: 'var(--text-dim)',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
            }}></div>
            Available to hire
          </div>

          <p className="hero-bio" style={{ fontSize: '15px', color: 'var(--text-dim)', margin: 0 }}>
            Get in touch with me. I will get back to you as soon as possible.
          </p>
        </section>

        <section className="section">
          <form className="contact-form" onSubmit={handleSubmit} noValidate style={{ gap: '32px' }}>
            
            <div className="contact-field" style={{ gap: '12px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text)' }}>Name *</label>
              <input
                type="text"
                className="contact-input-new"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'sending' || status === 'sent'}
              />
            </div>

            <div className="contact-field" style={{ gap: '12px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text)' }}>Email *</label>
              <input
                type="email"
                className={`contact-input-new${emailError ? ' error' : ''}`}
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending' || status === 'sent'}
              />
              {emailError && <p className="contact-error" style={{ marginTop: '-4px' }}>{emailError}</p>}
            </div>

            <div className="contact-field" style={{ gap: '12px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text)' }}>Phone</label>
              <input
                type="tel"
                className="contact-input-new"
                placeholder="+1 (123) xxx-xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={status === 'sending' || status === 'sent'}
              />
            </div>

            <div className="contact-field" style={{ gap: '12px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text)' }}>Message *</label>
              <textarea
                className={`contact-input-new contact-textarea${messageError ? ' error' : ''}`}
                placeholder="Tell me about your project or just say hello..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={1}
                disabled={status === 'sending' || status === 'sent'}
                style={{ resize: 'none', overflow: 'hidden', minHeight: 'auto' }}
              />
              {messageError && <p className="contact-error" style={{ marginTop: '-4px' }}>{messageError}</p>}
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border)', width: '100%', margin: '16px 0 8px 0' }}></div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: '#9ca3af',
                color: '#111827',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
                opacity: status === 'sending' || status === 'sent' ? 0.7 : 1,
                transition: 'background-color 200ms',
              }}
              onMouseEnter={(e) => {
                if (status !== 'sending' && status !== 'sent') {
                  e.currentTarget.style.backgroundColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'sending' && status !== 'sent') {
                  e.currentTarget.style.backgroundColor = '#9ca3af';
                }
              }}
            >
              <FiSend size={16} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="contact-status contact-status--ok">Message sent!</p>}
            {status === 'error' && <p className="contact-status contact-status--err">Failed to send message.</p>}
          </form>
        </section>
      </main>
    </>
  );
}
