'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiArrowUpRight, FiChevronDown, FiGlobe, FiLinkedin, FiCode } from 'react-icons/fi';
import CardSwap from '@/components/CardSwap';
import { NotificationCard } from '@/components/NotificationCard';
import { majorProjects } from '@/lib/projects';

const blogs = [
  { title: "Caching Isn't Hard. Knowing When to Invalidate Is.", date: '2026-07-05', description: "Learned the hard way that Redis isn't the hard part—cache invalidation is. Lessons from building a real-world backend.", href: '#' },
  { title: 'Building a Multi-Layer Content Moderation Pipeline for an Anonymous Platform', date: '2026-06-15', description: 'Building a multi-layer moderation pipeline for an anonymous platform using rules, ML models, caching, and enforcement workflows.', href: '#' },
  { title: 'Designing Real-Time Text Moderation Without Freezing the Browser', date: '2026-05-20', description: 'How I built real-time text moderation for an anonymous platform without freezing the browser or trusting the client.', href: '#' },
];
const experience = [
  {
    company: 'MIT Beaver Works Summer Institute',
    location: 'Remote',
    role: 'Remote Sensing for Disaster Response',
    period: 'Jul 2026 - Present',
    bullets: [
      <>Selected for <strong>MIT BWSI Remote Sensing for Disaster Response</strong>, a selective program focused on satellite imagery, GIS, SAR analysis, and disaster response.</>,
      <>Built hands-on projects using <strong>Google Earth Engine, Sentinel-1 SAR data, and remote sensing workflows</strong> to analyze environmental disasters.</>,
      <>Learned from MIT instructors and geospatial researchers through technical lectures, projects, and presentations.</>,
    ],
    tags: ['Remote Sensing', 'GIS', 'Google Earth Engine', 'SAR', 'Satellite Imagery'],
    website: null,
    linkedin: null,
  },
  {
    company: 'Rove Miles (Y Combinator W24)',
    location: 'Remote',
    role: 'Back-End Development Intern',
    period: 'Oct 2024 - Dec 2024',
    bullets: [
      <>Built a <strong>Python autocomplete system</strong> for over <strong>9,000 airports and cities</strong> used in flight search workflows.</>,
      <>Optimized large CSV datasets and improved search speed and relevance through backend data processing.</>,
      <>Collaborated on testing and production deployment for a travel technology platform.</>,
    ],
    tags: ['Python', 'Backend', 'Data Processing', 'Search Systems'],
    website: null,
    linkedin: null,
  },
  {
    company: 'Christian Medical College Vellore',
    location: 'Vellore, Tamil Nadu, India',
    role: 'Operations Observer',
    period: 'Aug 2023',
    bullets: [
      <>Observed operations at <strong>CMC Vellore, one of Asia's leading hospitals</strong>, working alongside administrative teams.</>,
      <>Supported front desk operations while communicating across <strong>4+ languages</strong>.</>,
      <>Visited CHIPS, the hospital's software division responsible for developing and maintaining healthcare systems.</>,
    ],
    tags: ['Healthcare', 'Operations', 'Technology'],
    website: null,
    linkedin: null,
  },
  {
    company: 'American Rocketry Challenge',
    location: 'United States',
    role: 'Rocket Engineer',
    period: 'Sep 2023 - Mar 2025',
    bullets: [
      <>Designed, built, and tested model rockets carrying egg payloads for national competition.</>,
      <>Qualified for <strong>national finals</strong> with flights reaching 800+ ft while achieving safe payload recovery.</>,
      <>Used CAD, 3D printing, aerodynamic testing, and recovery system design to improve flight performance.</>,
    ],
    tags: ['CAD', '3D Printing', 'Engineering', 'Aerospace'],
    website: null,
    linkedin: null,
  },
  {
    company: 'Seattle Sports & Regenerative Medicine',
    location: 'Seattle, WA',
    role: 'Business Strategy Analyst',
    period: 'Oct 2024',
    bullets: [
      <>Conducted a <strong>SWOT analysis</strong> of clinic operations and identified growth opportunities.</>,
      <>Researched healthcare regulations, marketing strategy, SEO, and online presence improvements.</>,
      <>Presented recommendations directly to clinic leadership.</>,
    ],
    tags: ['Strategy', 'Healthcare', 'SEO', 'Business Analysis'],
    website: null,
    linkedin: null,
  },
];

const education = [
  {
    institution: 'Bellevue College',
    location: 'Bellevue, WA',
    degree: 'Running Start',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      <>Completing college-level coursework in <strong>computer science, mathematics, science, and humanities</strong> while earning an associate degree.</>,
      <>Relevant coursework: <strong>Data Structures, Statistics, Engineering Physics, Geography, and Political Science</strong>.</>,
    ],
    tags: ['Computer Science', 'Data Structures', 'Physics', 'GIS'],
    website: null,
    linkedin: null,
  },
  {
    institution: 'Eastlake High School',
    location: 'Sammamish, WA',
    degree: 'High School Diploma',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      <>Relevant coursework: <strong>AP Calculus BC, AP Computer Science A, AP Statistics, AP Human Geography, AP Macroeconomics</strong>.</>,
      <>Activities: <strong>Computer Science Honor Society, Technology Student Association</strong>.</>,
    ],
    tags: ['Computer Science', 'Mathematics', 'Engineering'],
    website: null,
    linkedin: null,
  },
  {
    institution: 'University of Michigan',
    location: 'Ann Arbor, MI',
    degree: 'Joy of Coding Summer Program',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      <>Developed AI-powered face filters using <strong>Python, OpenCV, and CNNs</strong> for real-time facial landmark detection.</>,
      <>Built neural networks for image classification and studied model architecture under <strong>Prof. Raj Rao Nadakuditi</strong>.</>,
    ],
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    website: null,
    linkedin: null,
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
                <FiChevronDown size={12} />
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
              {exp.website && <a href={exp.website} className="exp-link"><FiGlobe size={13} /> Website</a>}
              {exp.linkedin && <a href={exp.linkedin} className="exp-link"><FiLinkedin size={13} /> LinkedIn</a>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EducationItem({ edu }: { edu: typeof education[number] }) {
  const [open, setOpen] = useState(false);
  const hasDetails = edu.bullets.length > 0;

  return (
    <div className={`exp-item${open ? ' exp-item--open' : ''}`}>
      <div className="exp-header" onClick={() => hasDetails && setOpen(!open)} style={{ cursor: hasDetails ? 'pointer' : 'default' }}>
        <div className="exp-header-main">
          <span className="exp-company">{edu.institution}</span>
          <span className="exp-role-inline">{edu.degree}</span>
        </div>
        <div className="exp-header-right">
          <span className="exp-period">{edu.period}</span>
          {hasDetails && (
            <span className="exp-toggle" aria-label="toggle details">
              <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                <FiChevronDown size={12} />
              </span>
            </span>
          )}
        </div>
      </div>
      {open && hasDetails && (
        <div className="exp-details">
          <ul className="exp-bullets">
            {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {edu.tags.length > 0 && (
            <div className="exp-tags">
              {edu.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
            </div>
          )}
          {(edu.website || edu.linkedin) && (
            <div className="exp-links">
              {edu.website && <a href={edu.website} className="exp-link"><FiGlobe size={13} /> Website</a>}
              {edu.linkedin && <a href={edu.linkedin} className="exp-link"><FiLinkedin size={13} /> LinkedIn</a>}
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
  <h1 className="hero-name">Cleo Balaranjith</h1>

  <p className="hero-sub">
    student • builder • problem solver
  </p>

  <p className="hero-bio">
    Hey, I&apos;m Cleo — a high school senior and computer science student
    building software that solves real-world problems across education,
    healthcare, and geospatial technology.
  </p>

  <p className="hero-bio">
    From offline tools for schools in rural India to satellite imagery projects
    for disaster response, I like turning messy problems into things people can
    actually use.
  </p>

  <div className="hero-actions">
    <a href="/resume.pdf" className="hero-btn hero-btn--snippets">
      <FiCode size={13} />
      Resume
      <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
    </a>

    <a href="#projects" className="hero-btn hero-btn--snippets">
      <FiCode size={13} />
      Projects
      <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
    </a>

    <a href="/contact" className="hero-btn hero-btn--snippets">
      <FiCode size={13} />
      Get in touch
      <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
    </a>
  </div>
</section>

        {/* By The Numbers */}
        <section className="section">
  <h2 className="section-title">By the numbers</h2>

  <div style={{ height: '200px', position: 'relative', width: '100%', maxWidth: '550px', margin: '0 auto', marginTop: '2rem', marginBottom: '2rem' }}>
    <CardSwap
      cardDistance={0}
      verticalDistance={15}
      delay={4000}
      pauseOnHover={false}
      width="100%"
      height="auto"
      skewAmount={0}
    >
      <NotificationCard 
        appName="rolecaller"
        title="The Malto People"
        time="2025-2026"
        message="2,500+ students supported through offline-first attendance software."
        badge="2500+"
      />

      <NotificationCard 
        appName="MIT BWSI"
        title="Remote Sensing"
        time="2026"
        message="Selected for MIT Beaver Works Summer Institute (~6% acceptance rate)."
        badge="<6%"
      />

      <NotificationCard 
        appName="Technology Student Association"
        title="Achievements"
        time="2025-2026"
        message="2× TSA Nationals | 2nd place in Technology Problem Solving"
        badge="2x"
      />
      <NotificationCard
  appName="CMC Vellore"
  title="Healthcare Web"
  time="2023-2024"
  message="Built a multilingual hospital website supporting 3M+ annual visitors."
  badge="3M+"
/>

<NotificationCard
  appName="The American Rocketry Challenge"   
  title=""
  time="2025"
  message="Designed rockets reaching 1,057 ft with successful egg payload recovery."  
  badge="1057"
/>

    </CardSwap>
  </div>
</section>

        {/* Projects */}
        <section className="section">
          <h2 className="section-title">Projects</h2>
          <div className="project-grid">
            {majorProjects.map((p) => (
              <a key={p.slug} href={`/projects/${p.slug}`} className="project-card">
                <div className="project-img">
                  <Image src={p.image} alt={p.title} width={300} height={180} className="proj-image" />
                </div>
                <div className="project-body">
                  <h3 className="project-title">
                    {p.title}
                    <span className="link-arrow"><FiArrowUpRight size={12} /></span>
                  </h3>
                  <p className="project-desc">{p.description}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="section-more">
            Want to see more? <a href="/projects" className="accent-link">Check them out.</a>
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

        {/* Education */}
        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="exp-list">
            {education.map((edu) => (
              <EducationItem key={edu.institution} edu={edu} />
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
                    <span className="link-arrow"><FiArrowUpRight size={12} /></span>
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
