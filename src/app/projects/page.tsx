import { projects, majorProjects, otherProjects, pocProjects } from '@/lib/projects';
import ProjectRow from '@/components/ProjectRow';

function ProjectSection({ title, items }: { title: string; items: typeof projects }) {
  if (items.length === 0) return null;
  return (
    <section className="projects-section">
      <h2 className="projects-section-label">{title}</h2>
      <div className="projects-rows">
        {items.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main className="main-content projects-list-page">
      <section className="projects-hero">
        <h1 className="hero-name">Projects</h1>
      </section>

      <ProjectSection title="Major Projects" items={majorProjects} />
      <ProjectSection title="Other Projects" items={otherProjects} />
      <ProjectSection title="PoC" items={pocProjects} />

      <footer className="site-footer">
        <span>cleof.us · Cleo Balaranjith</span>
        <span>Sammamish, WA · GMT-7</span>
      </footer>
    </main>
  );
}
