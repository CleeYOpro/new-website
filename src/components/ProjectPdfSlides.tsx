'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

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

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectPdfSlides({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setPage(1);

    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      try {
        const doc = await pdfjsLib.getDocument({ url: src }).promise;
        if (cancelled) {
          doc.destroy();
          return;
        }
        pdfRef.current = doc;
        setNumPages(doc.numPages);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      pdfRef.current?.destroy();
      pdfRef.current = null;
    };
  }, [src]);

  const renderPage = useCallback(async (pageNum: number) => {
    const doc = pdfRef.current;
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;

    renderTaskRef.current?.cancel();

    const pdfPage = await doc.getPage(pageNum);
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const containerWidth = canvas.parentElement?.clientWidth || baseViewport.width;
    const scale = (containerWidth / baseViewport.width) * (window.devicePixelRatio || 1);
    const viewport = pdfPage.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.aspectRatio = `${baseViewport.width} / ${baseViewport.height}`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const task = pdfPage.render({ canvasContext: ctx, viewport, canvas });
    renderTaskRef.current = task;
    try {
      await task.promise;
    } catch {
      // cancelled render, ignore
    }
  }, []);

  useEffect(() => {
    if (status === 'ready') renderPage(page);
  }, [status, page, renderPage]);

  useEffect(() => {
    if (status !== 'ready') return;
    const handleResize = () => renderPage(page);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status, page, renderPage]);

  const goTo = useCallback((next: number) => {
    setPage((p) => {
      const clamped = Math.min(Math.max(next, 1), Math.max(numPages, 1));
      return clamped === p ? p : clamped;
    });
  }, [numPages]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(page - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(page + 1);
      }
    };
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [page, goTo]);

  return (
    <div className="project-pdf-slides" ref={containerRef} tabIndex={0} aria-label={`${title} slide viewer`}>
      <div className="project-pdf-slides-stage">
        {status === 'loading' && <div className="project-pdf-slides-status">Loading slides…</div>}
        {status === 'error' && (
          <div className="project-pdf-slides-status">
            Couldn&apos;t load the preview.{' '}
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open {title} in a new tab
            </a>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="project-pdf-slides-canvas"
          style={{ display: status === 'ready' ? 'block' : 'none' }}
        />
        {status === 'ready' && numPages > 1 && (
          <>
            <button
              type="button"
              className="project-pdf-slides-btn project-pdf-slides-btn--left"
              onClick={() => goTo(page - 1)}
              disabled={page <= 1}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              className="project-pdf-slides-btn project-pdf-slides-btn--right"
              onClick={() => goTo(page + 1)}
              disabled={page >= numPages}
              aria-label="Next slide"
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>

      {status === 'ready' && (
        <div className="project-pdf-slides-footer">
          <span className="project-pdf-slides-count">
            Slide {page} / {numPages}
          </span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="project-pdf-slides-link">
            <ExternalLinkIcon size={12} />
            Open {title} in a new tab
          </a>
        </div>
      )}
    </div>
  );
}
