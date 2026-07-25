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
              className={`project-toc-item${isActive ? ' project-toc-item--active' : ''}`}
              style={{ paddingRight: `${(2 - h.depth) * 8}px` }}
            >
              <span
                className="project-toc-bar"
                style={{
                  width: isActive ? '20px' : h.depth === 1 ? '12px' : '8px',
                  opacity: isActive ? 1 : h.depth === 1 ? 0.4 : 0.25,
                }}
              />
              <span className="sr-only">{h.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
