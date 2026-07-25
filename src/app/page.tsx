'use client';

import Image from 'next/image';
import { useState } from 'react';

const projects = [
  { title: 'Flick', description: 'Anonymous campus community for verified college students.', image: '/projects/flick.svg', href: '#' },
  { title: 'Initex', description: 'CLI for bootstrapping production-ready backend services.', image: '/projects/initex.svg', href: '#' },
  { title: 'Nestly', description: 'Real-time chat with DMs, channels, and voice/video calls.', image: '/projects/nestly.svg', href: '#' },
  { title: 'OS-Themed Portfolio', description: 'My personal portfolio, Operating System themed.', image: '/projects/os.svg', href: '#' },
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
  const [open, setOpen] = useState(false);
  const hasDetails = exp.bullets.length > 0;

  return (
    <div className={`exp-item${open ? ' exp-item--open' : ''}`}>
      <div className="exp-header" onClick={() => hasDetails && setOpen(!open)} style={{ cursor: hasDetails ? 'pointer' : 'default' }}>
        <div className="exp-header-main">
          <span className="exp-company">{exp.company}</span>
          <span className="exp-role-inline">{exp.role}</span>
        </div>
        <div className="exp-header-right">
          <span className="exp-period">{exp.period}</span>
          {hasDetails && (
            <span className="exp-toggle" aria-label="toggle details">
              <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                <ChevronDown size={12} />
              </span>
            </span>
          )}
        </div>
      </div>
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
  );
}

export default function HomePage() {
  return (
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

        {/* Experience */}
        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="exp-list">
            {experience.map((exp) => (
              <ExperienceItem key={exp.company} exp={exp} />
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


        <footer className="site-footer">
          <span>2026 - Nothin&apos; reserved</span>
          <span>Ahmedabad, 6:19 AM</span>
        </footer>
      </main>
  );
}
