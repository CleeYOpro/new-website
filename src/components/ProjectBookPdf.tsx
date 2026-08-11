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

type Phase = 'idle' | 'leaving' | 'entering';

function spreadForIndex(index: number, numPages: number): [number, number | null] {
  if (index <= 0) return [1, null];
  const left = 2 * index;
  const right = left + 1;
  return [left, right <= numPages ? right : null];
}

export default function ProjectBookPdf({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTasksRef = useRef<RenderTask[]>([]);

  const [numPages, setNumPages] = useState(0);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const maxSpreadIndex = numPages > 1 ? Math.ceil((numPages - 1) / 2) : 0;

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setSpreadIndex(0);

    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      try {
        const doc = await pdfjsLib.getDocument({ url: src }).promise;
        if (cancelled) {
          doc.loadingTask.destroy();
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
      renderTasksRef.current.forEach((t) => t.cancel());
      pdfRef.current?.loadingTask.destroy();
      pdfRef.current = null;
    };
  }, [src]);

  const renderPage = useCallback(async (pageNum: number | null, canvas: HTMLCanvasElement | null, widthBudget: number) => {
    const doc = pdfRef.current;
    if (!doc || !canvas) return;
    if (pageNum === null) {
      canvas.width = 0;
      canvas.height = 0;
      return;
    }

    const pdfPage = await doc.getPage(pageNum);
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const scale = (widthBudget / baseViewport.width) * (window.devicePixelRatio || 1);
    const viewport = pdfPage.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.aspectRatio = `${baseViewport.width} / ${baseViewport.height}`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const task = pdfPage.render({ canvasContext: ctx, viewport, canvas });
    renderTasksRef.current.push(task);
    try {
      await task.promise;
    } catch {
      // cancelled render, ignore
    }
  }, []);

  const renderSpread = useCallback(async () => {
    const stage = containerRef.current;
    if (!stage) return;
    renderTasksRef.current.forEach((t) => t.cancel());
    renderTasksRef.current = [];

    const [left, right] = spreadForIndex(spreadIndex, numPages);
    const stageWidth = stage.clientWidth || 900;
    const isCover = left === 1 && right === null;
    const pageBudget = isCover ? Math.min(stageWidth * 0.56, 480) : Math.min(stageWidth / 2 - 10, 480);

    await Promise.all([
      renderPage(left, leftCanvasRef.current, pageBudget),
      renderPage(right, rightCanvasRef.current, pageBudget),
    ]);
  }, [spreadIndex, numPages, renderPage]);

  useEffect(() => {
    if (status === 'ready') renderSpread();
  }, [status, renderSpread]);

  useEffect(() => {
    if (status !== 'ready') return;
    const handleResize = () => renderSpread();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status, renderSpread]);

  const goTo = useCallback((next: number, dir: 'next' | 'prev') => {
    setSpreadIndex((current) => {
      const clamped = Math.min(Math.max(next, 0), Math.max(maxSpreadIndex, 0));
      if (clamped === current) return current;
      setDirection(dir);
      setPhase('leaving');
      window.setTimeout(() => {
        setSpreadIndex(clamped);
        setPhase('entering');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setPhase('idle'));
        });
      }, 190);
      return current;
    });
  }, [maxSpreadIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(spreadIndex - 1, 'prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(spreadIndex + 1, 'next');
      }
    };
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [spreadIndex, goTo]);

  const [leftPage, rightPage] = spreadForIndex(spreadIndex, numPages);
  const isCover = leftPage === 1 && rightPage === null;

  const pagesClassName = [
    'project-book-pages',
    isCover ? 'project-book-pages--cover' : '',
    phase !== 'idle' ? `project-book-pages--${phase}` : '',
    phase !== 'idle' ? `project-book-pages--${direction}` : '',
  ].filter(Boolean).join(' ');

  let label = '';
  if (status === 'ready') {
    label = isCover ? 'Cover' : rightPage ? `Pages ${leftPage}–${rightPage}` : `Page ${leftPage}`;
  }

  return (
    <div className="project-book" ref={containerRef} tabIndex={0} aria-label={`${title} book viewer`}>
      <div className="project-book-stage">
        {status === 'loading' && <div className="project-book-status">Loading book…</div>}
        {status === 'error' && (
          <div className="project-book-status">
            Couldn&apos;t load the preview.{' '}
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open {title} in a new tab
            </a>
          </div>
        )}

        {status === 'ready' && (
          <div className={pagesClassName}>
            <canvas ref={leftCanvasRef} className="project-book-canvas project-book-canvas--left" />
            {!isCover && <canvas ref={rightCanvasRef} className="project-book-canvas project-book-canvas--right" />}
          </div>
        )}

        {status === 'ready' && (
          <>
            <button
              type="button"
              className="project-book-btn project-book-btn--left"
              onClick={() => goTo(spreadIndex - 1, 'prev')}
              disabled={spreadIndex <= 0}
              aria-label="Previous page"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              className="project-book-btn project-book-btn--right"
              onClick={() => goTo(spreadIndex + 1, 'next')}
              disabled={spreadIndex >= maxSpreadIndex}
              aria-label="Next page"
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>

      {status === 'ready' && (
        <div className="project-book-footer">
          <span className="project-book-count">{label}</span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="project-book-link">
            <ExternalLinkIcon size={12} />
            Open {title} in a new tab
          </a>
        </div>
      )}
    </div>
  );
}
