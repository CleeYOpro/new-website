import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { projects, getProject } from '@/lib/projects';
import ProjectToc, { TocHeading } from '@/components/ProjectToc';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Cleo Balaranjith`,
    description: project.description,
  };
}

function toParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
    </svg>
  );
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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  const headings: TocHeading[] = [{ id: 'overview', label: 'Overview', depth: 1 }];
  if (project.problem) headings.push({ id: 'problem', label: 'Problem', depth: 1 });
  if (project.constraints?.length) headings.push({ id: 'constraints', label: 'Constraints', depth: 1 });
  if (project.decisions?.length) {
    headings.push({ id: 'key-engineering-decisions', label: 'Key Engineering Decisions', depth: 1 });
    project.decisions.forEach((d) => {
      headings.push({ id: slugify(d.title), label: d.title, depth: 2 });
    });
  }
  if (project.results?.length) headings.push({ id: 'results', label: 'Results', depth: 1 });
  if (project.takeaways?.length) headings.push({ id: 'takeaways', label: 'Takeaways', depth: 1 });

  return (
    <div className="project-detail-wrap">
      <ProjectToc headings={headings} />

      <main className="main-content project-detail-page">
        <header className="project-detail-header">
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-desc">{project.description}</p>
        </header>

        <div className="project-detail-meta">
          <div className="project-detail-badges">
            {project.tags.map((tag) => (
              <span key={tag} className="project-detail-badge">{tag}</span>
            ))}
          </div>

          {project.youtube && (
            <div className="project-detail-video">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtube}`}
                title={`${project.title} demo video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="project-detail-actions">
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-detail-btn project-detail-btn--primary">
                <ExternalLinkIcon size={14} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail-btn">
                <GithubIcon size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>

        <article className="project-prose">
          <section id="overview" className="project-section">
            <h2>Overview</h2>
            {toParagraphs(project.overview).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {project.problem && (
            <section id="problem" className="project-section">
              <h2>Problem</h2>
              {toParagraphs(project.problem).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}

          {project.constraints && project.constraints.length > 0 && (
            <section id="constraints" className="project-section">
              <h2>Constraints</h2>
              <ul>
                {project.constraints.map((c, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: renderInlineMarkup(c) }} />
                ))}
              </ul>
            </section>
          )}

          {project.decisions && project.decisions.length > 0 && (
            <section id="key-engineering-decisions" className="project-section">
              <h2>Key Engineering Decisions</h2>
              {project.decisions.map((d) => (
                <div key={d.title} className="project-decision">
                  <h3 id={slugify(d.title)}>{d.title}</h3>
                  {toParagraphs(d.body).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p><strong>Reason:</strong><br />{d.reason}</p>
                  <p><strong>Tradeoff:</strong><br />{d.tradeoff}</p>
                </div>
              ))}
            </section>
          )}

          {project.results && project.results.length > 0 && (
            <section id="results" className="project-section">
              <h2>Results</h2>
              <ul>
                {project.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {project.takeaways && project.takeaways.length > 0 && (
            <section id="takeaways" className="project-section">
              <h2>Takeaways</h2>
              <ul>
                {project.takeaways.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <footer className="project-detail-footer">
          <div className="project-detail-nav">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="project-detail-nav-card project-detail-nav-card--prev">
                <span className="project-detail-nav-label">
                  <MoveLeftIcon size={16} /> Previous
                </span>
                <span className="project-detail-nav-name">{prevProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="project-detail-nav-card project-detail-nav-card--next">
                <span className="project-detail-nav-label">
                  Next <MoveRightIcon size={16} />
                </span>
                <span className="project-detail-nav-name">{nextProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="project-detail-all">
            <Link href="/projects">See all Projects</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function renderInlineMarkup(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
