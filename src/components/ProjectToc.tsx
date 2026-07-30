'use client';

import { useEffect, useState } from 'react';

export type TocHeading = {
  id: string;
  label: string;
  depth: number;
};

export default function ProjectToc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="project-toc" aria-label="Page section navigation">
      <div className="project-toc-inner">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              aria-current={isActive ? 'step' : undefined}
              className={`project-toc-item project-toc-item--depth-${h.depth}${isActive ? ' project-toc-item--active' : ''}`}
            >
              <span className="project-toc-bar" />
              <span className="project-toc-label">{h.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
