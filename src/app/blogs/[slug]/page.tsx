import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaMedium } from 'react-icons/fa6';
import { PiHandsClapping } from 'react-icons/pi';
import { articles, getArticle, formatClaps, formatDate } from '@/lib/medium';
import ProjectToc, { TocHeading } from '@/components/ProjectToc';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Cleo Balaranjith`,
    description: article.excerpt,
    // Medium is the original, so point search engines there.
    alternates: { canonical: article.url },
    openGraph: article.cover ? { images: article.cover } : undefined,
  };
}

function MoveLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
}

function MoveRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </svg>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const newer = articles[currentIndex - 1];
  const older = articles[currentIndex + 1];

  // Long reports have a lot of subheadings; keep the side nav to top-level ones there.
  const headings: TocHeading[] =
    article.headings.length > 12 ? article.headings.filter((h) => h.depth === 1) : article.headings;

  return (
    <div className="project-detail-wrap">
      {headings.length > 1 && <ProjectToc headings={headings} />}

      <main className="main-content project-detail-page">
        <FloatReveal from="up">
          <header className="project-detail-header">
            <TypeText as="h1" className="project-detail-title" text={article.title} />
            <p className="writing-meta">
              <span>{formatDate(article.publishedAt)}</span>
              <span>{article.readingMinutes} min read</span>
              {article.claps !== undefined && (
                <span className="writing-claps">
                  <PiHandsClapping size={14} aria-hidden="true" />
                  {formatClaps(article.claps)}
                </span>
              )}
              {article.publication && (
                <span>
                  in{' '}
                  <a href={article.publication.url} target="_blank" rel="noopener noreferrer" className="writing-meta-link">
                    {article.publication.name}
                  </a>
                </span>
              )}
            </p>
          </header>
        </FloatReveal>

        <FloatReveal from="right">
          <div className="project-detail-meta">
            {article.tags.length > 0 && (
              <div className="project-detail-badges">
                {article.tags.map((tag) => (
                  <span key={tag} className="project-detail-badge">{tag.replace(/-/g, ' ')}</span>
                ))}
              </div>
            )}
            <div className="project-detail-actions">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="project-detail-btn">
                <FaMedium size={14} />
                Read on Medium
              </a>
            </div>
          </div>
        </FloatReveal>

        {/* Not wrapped in FloatReveal: its 15% visibility threshold never trips on a long article. */}
        <article className="medium-prose" dangerouslySetInnerHTML={{ __html: article.html }} />

        <footer className="project-detail-footer">
          <div className="project-detail-nav">
            {newer ? (
              <Link href={`/blogs/${newer.slug}`} className="project-detail-nav-card project-detail-nav-card--prev">
                <span className="project-detail-nav-label">
                  <MoveLeftIcon size={16} /> Newer
                </span>
                <span className="project-detail-nav-name">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link href={`/blogs/${older.slug}`} className="project-detail-nav-card project-detail-nav-card--next">
                <span className="project-detail-nav-label">
                  Older <MoveRightIcon size={16} />
                </span>
                <span className="project-detail-nav-name">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="project-detail-all">
            <Link href="/blogs">See all Blogs</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
