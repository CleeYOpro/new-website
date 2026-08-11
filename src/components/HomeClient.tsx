'use client';

import Image from 'next/image';
import { FiArrowUpRight, FiCode } from 'react-icons/fi';
import { FaMedium } from 'react-icons/fa6';
import CardSwap from '@/components/CardSwap';
import { NotificationCard } from '@/components/NotificationCard';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';
import { featuredProjects, getProject } from '@/lib/projects';
import type { GithubContributions } from '@/lib/github';

const blogs = [
  { title: "Caching Isn't Hard. Knowing When to Invalidate Is.", date: '2026-07-05', description: "Learned the hard way that Redis isn't the hard part—cache invalidation is. Lessons from building a real-world backend.", href: '#' },
  { title: 'Building a Multi-Layer Content Moderation Pipeline for an Anonymous Platform', date: '2026-06-15', description: 'Building a multi-layer moderation pipeline for an anonymous platform using rules, ML models, caching, and enforcement workflows.', href: '#' },
  { title: 'Designing Real-Time Text Moderation Without Freezing the Browser', date: '2026-05-20', description: 'How I built real-time text moderation for an anonymous platform without freezing the browser or trusting the client.', href: '#' },
];

const GRID_LEVELS = ['var(--grid-0)', 'var(--grid-1)', 'var(--grid-2)', 'var(--grid-3)', 'var(--grid-4)'];

const homeProjects = [...featuredProjects, getProject('port-laken')!];

function GithubGrid({ weeks, total, monthLabels }: GithubContributions) {
  if (weeks.length === 0) {
    return <p className="github-total">GitHub activity is unavailable right now.</p>;
  }

  const labelByWeek = new Map(monthLabels.map((m) => [m.index, m.label]));
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, 1fr)` };

  return (
    <div className="github-grid-wrap">
      <div className="github-months" style={columns}>
        {weeks.map((_, wi) => (
          <span key={wi}>{labelByWeek.get(wi) ?? ''}</span>
        ))}
      </div>
      <div className="github-grid" style={columns}>
        {weeks.map((week, wi) =>
          week.map((level, di) => (
            <div
              key={`${wi}-${di}`}
              className="github-cell"
              style={{ background: level === null ? 'transparent' : GRID_LEVELS[level] }}
            />
          ))
        )}
      </div>
      <p className="github-total">{total.toLocaleString()} contributions in the last year</p>
    </div>
  );
}

export default function HomeClient({ contributions }: { contributions: GithubContributions }) {
  return (
    <main className="main-content">
      {/* Hero */}
      <FloatReveal from="up">
        <section className="hero">
          <TypeText as="h1" className="hero-name" text="Cleo Balaranjith" />

          <TypeText as="p" className="hero-sub" text="student • builder • problem solver" delay={350} />

          <TypeText
            as="p"
            className="hero-bio"
            delay={750}
            text="Hey, I'm Cleo — a high school senior and computer science student building software that solves real-world problems across education, healthcare, and geospatial technology."
          />

          <TypeText
            as="p"
            className="hero-bio"
            delay={1250}
            text="From offline tools for schools in rural India to satellite imagery projects for disaster response, I like turning messy problems into things people can actually use."
          />

          <div className="hero-actions">
            <a href="https://www.linkedin.com/in/cleofus/" target="_blank" rel="noreferrer" className="hero-btn hero-btn--snippets">
              <FiCode size={13} />
              Resume
              <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
            </a>

            <a href="https://medium.com/@cleobala" target="_blank" rel="noreferrer" className="hero-btn hero-btn--snippets">
              <FaMedium size={13} />
              Medium
              <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
            </a>

            <a href="/contact" className="hero-btn hero-btn--snippets">
              <FiCode size={13} />
              Get in touch
              <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
            </a>
          </div>
        </section>
      </FloatReveal>

      {/* Projects */}
      <FloatReveal from="left">
        <section className="section">
          <TypeText as="h2" className="section-title" text="Projects" />
          <div className="project-grid">
            {homeProjects.map((p) => (
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
      </FloatReveal>

      {/* Blogs */}
      <FloatReveal from="right">
        <section className="section">
          <TypeText as="h2" className="section-title" text="Blogs" />
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
      </FloatReveal>

      {/* By The Numbers — notification carousel floats in, no typing */}
      <FloatReveal from="up">
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
                title="🥈"
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
                title="🚀"
                time="2025"
                message="Designed rockets reaching 1,057 ft with successful egg payload recovery."
                badge="1057"
              />

            </CardSwap>
          </div>
        </section>
      </FloatReveal>

      {/* GitHub Activity */}
      <FloatReveal from="down">
        <section className="section">
          <TypeText as="h2" className="section-title" text="Github Activity" />
          <GithubGrid {...contributions} />
        </section>
      </FloatReveal>
    </main>
  );
}
