'use client';

import Image from 'next/image';
import { useState } from 'react';

const projects = [
  { title: 'Flick', description: 'Anonymous campus community platform for verified college students to post, discuss, and interact within their college network.', image: '/projects/flick.svg', href: '#' },
  { title: 'Initex', description: 'CLI for bootstrapping structured, production-ready backend services through opinionated architecture and preset-driven infrastructure configuration.', image: '/projects/initex.svg', href: '#' },
  { title: 'Nestly', description: 'A real-time chat application with features like DMs, Server/Channel-based messaging, voice and video chats, screen-sharing etc.', image: '/projects/nestly.svg', href: '#' },
  { title: 'OS-Themed Portfolio', description: 'My personal portfolio but Operating System themed.', image: '/projects/os.svg', href: '#' },
];

const topics = [
  { title: 'System Design', tag: 'Hub', description: 'architecture notes, tradeoffs, and backend decisions', href: '#' },
  { title: 'Distributed Systems', tag: 'Hub', description: 'streams, queues, event flow, and scaling patterns', href: '#' },
  { title: 'GenAI', tag: 'Hub', description: 'AI-assisted products, workflows, and experiments', href: '#' },
];

const blogs = [
  { title: "Caching Isn't Hard. Knowing When to Invalidate Is.", date: '2026-07-05', description: "Learned the hard way that Redis isn't the hard part—cache invalidation is. Lessons from building a real-world backend.", href: '#' },
  { title: 'Building a Multi-Layer Content Moderation Pipeline for an Anonymous Platform', date: '2026-06-15', description: 'Building a multi-layer moderation pipeline for an anonymous platform using rules, ML models, caching, and enforcement workflows.', href: '#' },
  { title: 'Designing Real-Time Text Moderation Without Freezing the Browser', date: '2026-05-20', description: 'How I built real-time text moderation for an anonymous platform without freezing the browser or trusting the client.', href: '#' },
];

const experience = [
  {
    company: "Won't tell you :)",
    location: 'Ahmedabad, India',
    role: 'Software Engineer Intern',
    period: 'Apr 2026 - Present',
    bullets: [],
    tags: [],
    website: null,
    linkedin: null,
  },
  {
    company: 'TechySquad',
    location: 'Ahmedabad, India',
    role: 'Full Stack Developer Intern',
    period: 'Aug 2025 - Jan 2026',
    bullets: [
      <>Built a real-time, event-driven communication platform supporting <strong>direct messaging, channels, presence, typing indicators, and voice/video calls with screen sharing</strong>.</>,
      <>Implemented <strong>WebSockets and integrated LiveKit</strong> to deliver <strong>sub-200ms latency</strong> for real-time messaging and media streaming.</>,
      <>Designed and enforced <strong>JWT-based authentication and role-based access control (RBAC)</strong> for a multi-server architecture.</>,
      <><strong>Dockerized a production application</strong> for a client, enabling reproducible builds and consistent deployment across environments.</>,
      <>Developed an <strong>internal HRMS</strong> including attendance tracking, shift scheduling, ticketing workflows, audit logs, and RBAC.</>,
    ],
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'WebSockets', 'LiveKit', 'Express.js', 'Docker'],
    website: '#',
    linkedin: '#',
  },
];

const WEEKS = 53;
const DAYS = 7;

function GithubGrid() {
  const cells: number[][] = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => {
      const val = ((w * 7 + d) * 13 + 7) % 5;
      return val === 0 ? 0 : val === 1 ? 0 : val === 2 ? 1 : val === 3 ? 2 : 3;
    })
  );
  const levels = ['var(--grid-0)', 'var(--grid-1)', 'var(--grid-2)', 'var(--grid-3)'];
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return (
    <div className="github-grid-wrap">
      <div className="github-months">{months.map((m) => <span key={m}>{m}</span>)}</div>
      <div className="github-grid">
        {cells.map((week, wi) => (
          <div key={wi} className="github-col">
            {week.map((level, di) => (
              <div key={di} className="github-cell" style={{ background: levels[level] }} />
            ))}
          </div>
        ))}
      </div>
      <p className="github-total">673 contributions in the last year</p>
    </div>
  );
}

function ArrowUpRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ChevronDown({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExperienceItem({ exp }: { exp: typeof experience[number] }) {
  const [open, setOpen] = useState(exp.company === 'TechySquad');
  const hasDetails = exp.bullets.length > 0;

  return (
    <div className="exp-item">
      <div className="exp-logo" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="rgba(255,255,255,0.06)" />
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fill="#888">{exp.company[0]}</text>
        </svg>
      </div>
      <div className="exp-info">
        <div className="exp-company-row">
          <span className={`exp-company${exp.company === 'TechySquad' ? ' exp-company--accent' : ''}`}>{exp.company}</span>
          {hasDetails && (
            <button className="exp-toggle" onClick={() => setOpen(!open)} aria-label="toggle details">
              <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                <ChevronDown size={12} />
              </span>
            </button>
          )}
        </div>
        <div className="exp-role">{exp.role}</div>
        {open && hasDetails && (
          <div className="exp-details">
            <ul className="exp-bullets">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            {exp.tags.length > 0 && (
              <div className="exp-tags">
                {exp.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            )}
            {(exp.website || exp.linkedin) && (
              <div className="exp-links">
                {exp.website && <a href={exp.website} className="exp-link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Website</a>}
                {exp.linkedin && <a href={exp.linkedin} className="exp-link"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn</a>}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="exp-meta">
        <div className="exp-location">{exp.location}</div>
        <div className="exp-period">{exp.period}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="site-wrap">
      <header className="site-nav">
        <nav aria-label="Primary navigation">
          <a href="/" className="nav-item">home</a>
          <a href="#" className="nav-item">imprint</a>
          <a href="#" className="nav-item">dhvanit://ai</a>
        </nav>
        <div className="nav-icons">
          <a href="#" target="_blank" rel="noreferrer" aria-label="Resume" className="nav-icon-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="17" x2="12" y2="17"/></svg>
          </a>
          <a href="https://github.com/dhvanitmonpara" target="_blank" rel="noreferrer" aria-label="GitHub" className="nav-icon-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
          </a>
          <a href="https://x.com/dhvanitdev" target="_blank" rel="noreferrer" aria-label="Twitter" className="nav-icon-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/dhvanitmonpara/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="nav-icon-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:hi@dhvanitmonpara.in" aria-label="Mail" className="nav-icon-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
          </a>
        </div>
      </header>

      <main className="main-content">
        {/* Hero */}
        <section className="hero">
          <h1 className="hero-name">Dhvanit Monpara</h1>
          <p className="hero-sub">engineer • developer • builder</p>
          <p className="hero-bio">
            Hey, I&apos;m Dhvanit — a backend engineer who loves building (and occasionally
            breaking) things. I work with PERN, Go, and GenAI to ship systems that are fast,
            reliable, and scalable.
          </p>
          <p className="hero-bio">
            From side projects to real-world backends, I enjoy solving messy problems and
            making products work.
          </p>
          <div className="hero-actions">
            <a href="#snippets" className="hero-btn hero-btn--snippets">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Resume
              <span className="btn-arrow"><ArrowUpRight size={11} /></span>
            </a>
            <a href="#snippets" className="hero-btn hero-btn--snippets">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Snippets
              <span className="btn-arrow"><ArrowUpRight size={11} /></span>
            </a>
            <a href="mailto:hi@dhvanitmonpara.in" className="hero-btn hero-btn--snippets">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Get in touch
              <span className="btn-arrow"><ArrowUpRight size={11} /></span>
            </a>
          </div>
        </section>

        {/* Experience */}
        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="exp-list">
            {experience.map((exp) => (
              <ExperienceItem key={exp.company} exp={exp} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="section">
          <h2 className="section-title">Projects</h2>
          <div className="project-grid">
            {projects.map((p) => (
              <a key={p.title} href={p.href} className="project-card">
                <div className="project-img">
                  <Image src={p.image} alt={p.title} width={300} height={180} className="proj-image" />
                </div>
                <div className="project-body">
                  <h3 className="project-title">
                    {p.title}
                    <span className="link-arrow"><ArrowUpRight size={12} /></span>
                  </h3>
                  <p className="project-desc">{p.description}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="section-more">
            Want to see more? <a href="#" className="accent-link">Check them out.</a>
          </p>
        </section>

        {/* Topics */}
        <section className="section">
          <h2 className="section-title">Topics</h2>
          <div className="topic-list">
            {topics.map((t) => (
              <div key={t.title} className="topic-item">
                <div className="topic-header">
                  <a href={t.href} className="topic-title">
                    {t.title}
                    <span className="link-arrow"><ArrowUpRight size={12} /></span>
                  </a>
                  <span className="topic-tag">({t.tag})</span>
                </div>
                <p className="topic-desc">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blogs */}
        <section className="section">
          <h2 className="section-title">Blogs</h2>
          <div className="blog-list">
            {blogs.map((b) => (
              <div key={b.title} className="blog-item">
                <div className="blog-main">
                  <a href={b.href} className="blog-title">
                    {b.title}
                    <span className="link-arrow"><ArrowUpRight size={12} /></span>
                  </a>
                  <p className="blog-desc">{b.description}</p>
                </div>
                <span className="blog-date">{b.date}</span>
              </div>
            ))}
          </div>
          <p className="section-more">
            You can read more articles <a href="#" className="accent-link">here</a>.
          </p>
        </section>

        {/* GitHub Activity */}
        <section className="section">
          <h2 className="section-title">Github Activity</h2>
          <GithubGrid />
        </section>

        {/* Skills */}
        <section className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            <p><span className="skill-cat">Backend</span> - TypeScript, Express, Socket.io, SSE, Redis, Event-driven Architecture</p>
            <p><span className="skill-cat">Database</span> - Postgresql, Mysql, MongoDB, Qdrant, Pinecone</p>
            <p><span className="skill-cat">GenAI</span> - LangChain, LangGraph, Agentic AI, Python</p>
            <p><span className="skill-cat">Frontend (Secondary)</span> - React, NextJS, WebRTC</p>
            <p><span className="skill-cat">Tools</span> - Git, Docker, Linux/Unix, Postman</p>
          </div>
        </section>

        {/* Resume CTA */}
        <section className="resume-cta">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Feel free to checkout my <a href="#" target="_blank" rel="noreferrer" className="resume-link">resume</a>.</span>
        </section>
      </main>

      <footer className="site-footer">
        <span>2026 - Nothin&apos; reserved</span>
        <span>Ahmedabad, 6:19 AM</span>
      </footer>
    </div>
  );
}
