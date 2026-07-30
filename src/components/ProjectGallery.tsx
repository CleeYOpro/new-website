'use client';

import { useRef } from 'react';
import Image from 'next/image';

function ChevronLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (images.length === 0) return null;

  return (
    <div className="project-gallery">
      <div className="project-gallery-track" ref={trackRef}>
        {images.map((src, i) => (
          <div className="project-gallery-item" key={src}>
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              width={1200}
              height={800}
              className="project-gallery-img"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button type="button" className="project-gallery-btn project-gallery-btn--left" onClick={() => scrollByAmount(-1)} aria-label={`Previous ${title} screenshot`}>
            <ChevronLeftIcon size={18} />
          </button>
          <button type="button" className="project-gallery-btn project-gallery-btn--right" onClick={() => scrollByAmount(1)} aria-label={`Next ${title} screenshot`}>
            <ChevronRightIcon size={18} />
          </button>
        </>
      )}
    </div>
  );
}
