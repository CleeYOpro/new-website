'use client';

import { useRef } from 'react';

type VideoItem = { id: string; vertical?: boolean; title: string };

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

export default function ProjectVideoGallery({ videos }: { videos: VideoItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (videos.length === 0) return null;

  return (
    <div className="project-video-gallery">
      <div className="project-video-gallery-track" ref={trackRef}>
        {videos.map((v) => (
          <div
            className={`project-video-gallery-item${v.vertical ? ' project-video-gallery-item--vertical' : ''}`}
            key={v.id}
          >
            <iframe
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
      {videos.length > 1 && (
        <>
          <button type="button" className="project-video-gallery-btn project-video-gallery-btn--left" onClick={() => scrollByAmount(-1)} aria-label="Previous video">
            <ChevronLeftIcon size={18} />
          </button>
          <button type="button" className="project-video-gallery-btn project-video-gallery-btn--right" onClick={() => scrollByAmount(1)} aria-label="Next video">
            <ChevronRightIcon size={18} />
          </button>
        </>
      )}
    </div>
  );
}
