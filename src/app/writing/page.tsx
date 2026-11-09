import type { Metadata } from 'next';
import Link from 'next/link';
import { PiHandsClapping } from 'react-icons/pi';
import { articles, formatClaps, formatDate } from '@/lib/medium';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

export const metadata: Metadata = {
  title: 'Writing | Cleo Balaranjith',
  description: 'Articles by Cleo Balaranjith, originally published on Medium.',
};

export default function WritingPage() {
  return (
    <main className="main-content writing-list-page">
      <FloatReveal from="up">
        <section className="projects-hero">
          <TypeText as="h1" className="hero-name" text="Writing" />
          <p className="writing-intro">
            Stories and write-ups, originally published on{' '}
            <a href="https://medium.com/@cleobala" target="_blank" rel="noopener noreferrer">Medium</a>.
          </p>
        </section>
      </FloatReveal>

      <div className="projects-rows">
        {articles.map((a, i) => (
          <FloatReveal key={a.slug} from="down" delay={i * 90}>
            <Link href={`/writing/${a.slug}`} className="writing-row">
              <div className="writing-row-main">
                <h2 className="project-list-title">{a.title}</h2>
                <p className="project-list-desc">{a.excerpt}</p>
                <p className="writing-meta">
                  <span>{formatDate(a.publishedAt)}</span>
                  <span>{a.readingMinutes} min read</span>
                  {a.claps !== undefined && (
                    <span className="writing-claps">
                      <PiHandsClapping size={13} aria-hidden="true" />
                      {formatClaps(a.claps)}
                    </span>
                  )}
                </p>
              </div>
              {a.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.cover} alt="" className="writing-row-cover" loading="lazy" />
              )}
            </Link>
          </FloatReveal>
        ))}
      </div>
    </main>
  );
}
