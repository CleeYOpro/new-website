'use client';

import { useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';

export type FigureImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * An inline case-study figure: one image, or a row of images sharing a
 * caption. Clicking an image opens it full size, since maps with small
 * legends are hard to read at prose width.
 */
export default function ProjectFigure({
  images,
  caption,
  columns = 1,
  aspect,
  eager = false,
}: {
  images: FigureImage[];
  caption?: string;
  columns?: 1 | 2 | 4;
  /** crops every image in the row to the same shape, e.g. '4 / 5' */
  aspect?: string;
  eager?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // index of the enlarged image; null while the lightbox is closed so the
  // full-size copy isn't in the DOM competing with the inline one
  const [active, setActive] = useState<number | null>(null);
  const imgStyle: CSSProperties | undefined = aspect ? { aspectRatio: aspect, objectFit: 'cover' } : undefined;

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };

  const current = active === null ? null : images[active];

  return (
    <figure className="project-figure">
      <div className={`project-figure-grid project-figure-grid--cols-${columns}`}>
        {images.map((img, i) => (
          <button key={img.src} type="button" className="project-figure-zoom" onClick={() => open(i)} aria-label={`Enlarge: ${img.alt}`}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes={`(max-width: 640px) ${columns > 1 ? 50 : 100}vw, ${Math.round(600 / columns)}px`}
              className="project-figure-img"
              style={imgStyle}
              loading={eager ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}

      <dialog
        ref={dialogRef}
        className="project-lightbox"
        onClick={() => dialogRef.current?.close()}
        onClose={() => setActive(null)}
        aria-label={current?.alt}
      >
        {current && (
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="94vw"
            className="project-lightbox-img"
          />
        )}
        <button type="button" className="project-lightbox-close" onClick={() => dialogRef.current?.close()} aria-label="Close">
          <CloseIcon size={16} />
        </button>
      </dialog>
    </figure>
  );
}
