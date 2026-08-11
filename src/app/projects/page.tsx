import { projects, featuredProjects, selectedProjects, earlierProjects } from '@/lib/projects';
import ProjectRow from '@/components/ProjectRow';
import { FloatReveal, type FloatDirection } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

function ProjectSection({ title, items, from }: { title: string; items: typeof projects; from: FloatDirection }) {
  if (items.length === 0) return null;
  return (
    <FloatReveal from={from}>
      <section className="projects-section">
        <TypeText as="h2" className="projects-section-label" text={title} />
        <div className="projects-rows">
          {items.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </FloatReveal>
  );
}

export default function ProjectsPage() {
  return (
    <main className="main-content projects-list-page">
      <FloatReveal from="up">
        <section className="projects-hero">
          <TypeText as="h1" className="hero-name" text="Projects" />
        </section>
      </FloatReveal>

      <ProjectSection title="Featured Projects" items={featuredProjects} from="left" />
      <ProjectSection title="Selected Projects" items={selectedProjects} from="right" />
      <ProjectSection title="Earlier Work" items={earlierProjects} from="left" />
    </main>
  );
}
