'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FiArrowUpRight, FiCode } from 'react-icons/fi';
import { FaMedium } from 'react-icons/fa6';
import CardSwap from '@/components/CardSwap';
import { NotificationCard } from '@/components/NotificationCard';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';
import { featuredProjects } from '@/lib/projects';
import type { GithubContributions } from '@/lib/github';

export type HomeBlog = { slug: string; title: string; excerpt: string; date: string };

const GRID_LEVELS = ['var(--grid-0)', 'var(--grid-1)', 'var(--grid-2)', 'var(--grid-3)', 'var(--grid-4)'];

const homeProjects = featuredProjects;

function GithubGrid({ weeks, total, monthLabels }: GithubContributions) {
  if (weeks.length === 0) {
    return <p className="github-total">GitHub activity is unavailable right now.</p>;
  }

  const labelByWeek = new Map(monthLabels.map((m) => [m.index, m.label]));
  const weeksVar = { ['--weeks' as string]: weeks.length } as CSSProperties;

  return (
    <div className="github-grid-wrap">
      <div className="github-scroll" style={weeksVar}>
        <div className="github-months">
          {weeks.map((_, wi) => (
            <span key={wi}>{labelByWeek.get(wi) ?? ''}</span>
          ))}
        </div>
        <div className="github-grid">
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
      </div>
      <p className="github-total">{total.toLocaleString()} contributions in the last year</p>
    </div>
  );
}

export default function HomeClient({ contributions, blogs }: { contributions: GithubContributions; blogs: HomeBlog[] }) {
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
            text="Hi! I'm Cleo. I build software, maps, and tools for real problems, anywhere from offline attendance apps for schools in rural India to satellite imagery for disaster response."
          />

          <TypeText
            as="p"
            className="hero-bio"
            delay={1250}
            text="The part I like most is the messy stretch between having a problem and having something people can actually use, which is also where most of the work ends up being."
          />

          <div className="hero-actions">
            <a href="/about#experience" className="hero-btn hero-btn--snippets">
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
            {homeProjects.map((p, i) => (
              <FloatReveal key={p.slug} from="down" delay={i * 90}>
                <a href={`/projects/${p.slug}`} className="project-card">
                  <div className="project-img">
                    <Image src={p.image} alt={p.title} width={300} height={180} className="proj-image" loading={i < 3 ? 'eager' : 'lazy'} />
                  </div>
                  <div className="project-body">
                    <h3 className="project-title">
                      {p.title}
                      <span className="link-arrow"><FiArrowUpRight size={12} /></span>
                    </h3>
                    <p className="project-desc">{p.description}</p>
                  </div>
                </a>
              </FloatReveal>
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
          <TypeText as="h2" className="section-title" text="🫵 Read This" />
          <div className="blog-list">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blogs/${b.slug}`} className="blog-item">
                <div className="blog-main">
                  <span className="blog-title">
                    {b.title}
                    <span className="link-arrow"><FiArrowUpRight size={12} /></span>
                  </span>
                  <p className="blog-desc">{b.excerpt}</p>
                </div>
                <span className="blog-date">{b.date}</span>
              </Link>
            ))}
          </div>
          <p className="section-more">
            Want to read more? <Link href="/blogs" className="accent-link">See all blogs.</Link>
          </p>
        </section>
      </FloatReveal>

      {/* By The Numbers - notification carousel floats in, no typing */}
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
                icon="/beaverworks.png"
              />

              <NotificationCard
                appName="Technology Student Association"
                title="🥈"
                time="2025-2026"
                message="2× TSA Nationals | 2nd place in Technology Problem Solving"
                badge="2x"
                icon="/tsa.png"
              />
              <NotificationCard
                appName="CMC Vellore"
                title="Healthcare Web"
                time="2023-2024"
                message="Built a multilingual hospital website supporting 3M+ annual visitors."
                badge="3M+"
                icon="/cmc.png"
              />

              <NotificationCard
                appName="The American Rocketry Challenge"
                title="🚀"
                time="2025"
                message="Designed rockets reaching 1,057 ft with successful egg payload recovery."
                badge="1057"
                icon="/rocketry.png"
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
