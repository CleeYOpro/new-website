'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSend } from 'react-icons/fi';
import { FaEnvelope, FaGraduationCap, FaInstagram, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa6';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

const infoRows = [
  { label: 'E-mail', value: 'cbalaranjith@gmail.com', href: 'mailto:cbalaranjith@gmail.com', icon: FaEnvelope },
  { label: 'School E-mail', value: '1056935@lwsd.org', href: 'mailto:1056935@lwsd.org', icon: FaGraduationCap },
  { label: 'Collegiate E-mail', value: 'cleofus.balaranjith@bellevuecollege.edu', href: 'mailto:cleofus.balaranjith@bellevuecollege.edu', icon: FaGraduationCap },
];

const socialRows = [
  { label: 'Instagram', value: 'cleobalaranjith', href: 'https://www.instagram.com/cleobalaranjith/', icon: FaInstagram },
  { label: 'GitHub', value: 'CleeYOpro', href: 'https://github.com/CleeYOpro', icon: FaGithub },
  { label: 'LinkedIn', value: 'cleofus', href: 'https://www.linkedin.com/in/cleofus/', icon: FaLinkedin },
  { label: 'Discord', value: 'View my Discord profile', href: 'https://discord.com/users/1287117811482628286', icon: FaDiscord },
];

const WEB3FORMS_ACCESS_KEY = '5d9a3aae-90d1-4673-a651-4d22ad577977';

export default function ContactPage() {
  const router = useRouter();
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
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${name || email}`,
          from_name: name || 'Website contact form',
          name,
          email,
          phone,
          message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');

      setStatus('sent');
      setEmail('');
      setName('');
      setPhone('');
      setMessage('');
      router.push('/contact/thank-you');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <main className="main-content">
        <FloatReveal from="up">
          <section className="about-hero" style={{ marginBottom: '64px', position: 'relative' }}>
            <TypeText as="h1" className="hero-name" style={{ marginBottom: '20px' }} text="Get in touch." />

            <TypeText
              as="p"
              className="hero-bio"
              style={{ fontSize: '15px', color: 'var(--text-dim)', margin: 0 }}
              delay={300}
              text="Get in touch with me. I will get back to you as soon as possible."
            />
          </section>
        </FloatReveal>

        <FloatReveal from="right" delay={100}>
          <section className="section">
            <h2 className="section-title">Start a conversation</h2>
            <form className="contact-form" onSubmit={handleSubmit} noValidate style={{ gap: '16px' }}>

              <div className="contact-field" style={{ gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text)' }}>Name *</label>
                <input
                  type="text"
                  className="contact-input-new"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === 'sending' || status === 'sent'}
                />
              </div>

              <div className="contact-field" style={{ gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text)' }}>Email *</label>
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

              <div className="contact-field" style={{ gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text)' }}>Phone</label>
                <input
                  type="tel"
                  className="contact-input-new"
                  placeholder="+1 (123) xxx-xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === 'sending' || status === 'sent'}
                />
              </div>

              <div className="contact-field" style={{ gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text)' }}>Message *</label>
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

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                style={{
                  alignSelf: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
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
        </FloatReveal>

        

        <FloatReveal from="up" delay={200}>
          <section className="section">
            <h2 className="section-title">Latest on LinkedIn</h2>
            <div className="contact-linkedin-embed">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7491514727534129152?collapsed=1"
                height="627"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="Embedded LinkedIn post"
              />
            </div>
          </section>
        </FloatReveal>
        <FloatReveal from="left" delay={150}>
          <section className="section">
            <h2 className="section-title">Contact Info</h2>
            <div className="contact-info-grid">
              <div className="contact-info-card">
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div className="contact-info-row" key={row.label}>
                      <span className="contact-info-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Icon size={11} />
                        {row.label}
                      </span>
                      {row.href ? (
                        <a href={row.href} className="contact-info-value contact-info-value--link">{row.value}</a>
                      ) : (
                        <span className="contact-info-value">{row.value}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="contact-info-card">
                {socialRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-row"
                    >
                      <span className="contact-social-icon"><Icon size={14} /></span>
                      <span className="contact-social-main">
                        <span className="contact-social-label">{row.label}</span>
                        <span className="contact-social-value">{row.value}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </FloatReveal>
      </main>
    </>
  );
}
