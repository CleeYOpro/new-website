'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

type PanelId = 'left' | 'mid' | 'right';

const FOLD_DEG = 30;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.25;
const FOCUS_ZOOM = 2.05;
const DEFAULT_ROT_X = 9;
const DEFAULT_ROT_Y = -22;
const ROT_Y_LIMIT = 55;
const ROT_X_LIMIT = 28;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MinusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 4 3 9 8 9" />
    </svg>
  );
}

function FoldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4v16l6-4V8Z" />
      <path d="M20 4v16l-6-4V8Z" />
    </svg>
  );
}

export default function ProjectTrifold({
  left,
  middle,
  right,
  title,
}: {
  left: string;
  middle: string;
  right: string;
  title: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLButtonElement>(null);
  const rightPanelRef = useRef<HTMLButtonElement>(null);

  const [rotX, setRotX] = useState(DEFAULT_ROT_X);
  const [rotY, setRotY] = useState(DEFAULT_ROT_Y);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [folded, setFolded] = useState(true);
  const [focused, setFocused] = useState<PanelId | null>(null);
  const [animated, setAnimated] = useState(true);

  const dragState = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchState = useRef<{ dist: number; zoom: number } | null>(null);
  const movedRef = useRef(false);

  const reset = useCallback(() => {
    setAnimated(true);
    setRotX(DEFAULT_ROT_X);
    setRotY(DEFAULT_ROT_Y);
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    setFocused(null);
  }, []);

  const focusOn = useCallback((panel: PanelId) => {
    // offsetWidth reflects the sheet's current on-screen size (which already
    // bakes in the current `zoom` via the --tf-zoom layout size, not a CSS
    // transform scale), so rescale the measured delta to the size the sheet
    // will have once it's laid out at the target focus zoom.
    const midW = sheetRef.current?.offsetWidth ?? 0;
    const angle = folded ? FOLD_DEG : 0;
    let delta = 0;
    let rotYTarget = 0;

    if (panel === 'left') {
      const flapW = leftPanelRef.current?.offsetWidth ?? midW * 0.5;
      delta = -flapW / 2 - midW / 2;
      rotYTarget = -angle;
    } else if (panel === 'right') {
      const flapW = rightPanelRef.current?.offsetWidth ?? midW * 0.5;
      delta = midW / 2 + flapW / 2;
      rotYTarget = angle;
    }

    const deltaAtFocusZoom = (delta / zoom) * FOCUS_ZOOM;

    setAnimated(true);
    setRotX(0);
    setRotY(rotYTarget);
    setZoom(FOCUS_ZOOM);
    setPan({ x: -deltaAtFocusZoom, y: 0 });
    setFocused(panel);
  }, [folded, zoom]);

  const onPanelClick = useCallback((panel: PanelId) => {
    if (movedRef.current) return;
    if (focused === panel) {
      reset();
    } else {
      focusOn(panel);
    }
  }, [focused, reset, focusOn]);

  const zoomBy = useCallback((factor: number) => {
    setAnimated(true);
    setFocused(null);
    setZoom((z) => clamp(z * factor, MIN_ZOOM, MAX_ZOOM));
  }, []);

  const toggleFold = useCallback(() => {
    setAnimated(true);
    setFolded((f) => !f);
    setFocused(null);
  }, []);

  // Deliberately not using setPointerCapture here: capturing the pointer on
  // the stage retargets the resulting click event away from whatever button
  // the pointerdown started on, which silently breaks every control/panel
  // button. Tracking the drag through window listeners avoids that.
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setAnimated(false);

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      pinchState.current = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        zoom,
      };
      dragState.current = null;
    } else {
      movedRef.current = false;
      dragState.current = { x: e.clientX, y: e.clientY, rotX, rotY };
    }
  }, [zoom, rotX, rotY]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2 && pinchState.current) {
        const pts = Array.from(pointers.current.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const nextZoom = clamp(pinchState.current.zoom * (dist / pinchState.current.dist), MIN_ZOOM, MAX_ZOOM);
        setZoom(nextZoom);
        setFocused(null);
        return;
      }

      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.x;
      const dy = e.clientY - dragState.current.y;
      if (!movedRef.current && Math.abs(dx) + Math.abs(dy) > 4) {
        movedRef.current = true;
        setFocused(null);
      }
      setRotY(clamp(dragState.current.rotY + dx * 0.35, -ROT_Y_LIMIT, ROT_Y_LIMIT));
      setRotX(clamp(dragState.current.rotX - dy * 0.25, -20, ROT_X_LIMIT));
    };

    const handleUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinchState.current = null;
      if (pointers.current.size === 0) {
        dragState.current = null;
        setAnimated(true);
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0016);
      setAnimated(false);
      setFocused(null);
      setZoom((z) => clamp(z * factor, MIN_ZOOM, MAX_ZOOM));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setAnimated(true);
        setFocused(null);
        setRotY((r) => clamp(r - 8, -ROT_Y_LIMIT, ROT_Y_LIMIT));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setAnimated(true);
        setFocused(null);
        setRotY((r) => clamp(r + 8, -ROT_Y_LIMIT, ROT_Y_LIMIT));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setAnimated(true);
        setFocused(null);
        setRotX((r) => clamp(r + 6, -20, ROT_X_LIMIT));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setAnimated(true);
        setFocused(null);
        setRotX((r) => clamp(r - 6, -20, ROT_X_LIMIT));
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomBy(1.25);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomBy(0.8);
      } else if (e.key === 'Escape' || e.key === '0') {
        e.preventDefault();
        reset();
      }
    };
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [zoomBy, reset]);

  const angle = folded ? FOLD_DEG : 0;

  return (
    <div className="project-trifold" ref={rootRef} tabIndex={0} aria-label={`${title} trifold viewer`}>
      <div
        className="trifold-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
      >
        <div
          className={`trifold-scene${animated ? ' trifold-scene--animated' : ''}`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            ['--tf-zoom' as string]: zoom,
          }}
        >
          <div className="trifold-sheet" ref={sheetRef}>
            <button
              type="button"
              className={`trifold-panel trifold-panel--mid${focused === 'mid' ? ' trifold-panel--focused' : ''}`}
              onClick={() => onPanelClick('mid')}
              aria-label="Focus on center panel"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={middle} alt="" className="trifold-img" draggable={false} />
            </button>

            <div className="trifold-hinge trifold-hinge--left" style={{ transform: `rotateY(${angle}deg)` }}>
              <button
                type="button"
                ref={leftPanelRef}
                className={`trifold-panel trifold-panel--left${focused === 'left' ? ' trifold-panel--focused' : ''}`}
                onClick={() => onPanelClick('left')}
                aria-label="Focus on left flap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={left} alt="" className="trifold-img" draggable={false} />
              </button>
            </div>

            <div className="trifold-hinge trifold-hinge--right" style={{ transform: `rotateY(${-angle}deg)` }}>
              <button
                type="button"
                ref={rightPanelRef}
                className={`trifold-panel trifold-panel--right${focused === 'right' ? ' trifold-panel--focused' : ''}`}
                onClick={() => onPanelClick('right')}
                aria-label="Focus on right flap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={right} alt="" className="trifold-img" draggable={false} />
              </button>
            </div>
          </div>
        </div>

        <div className="trifold-controls">
          <button type="button" className="trifold-btn" onClick={() => zoomBy(0.8)} aria-label="Zoom out">
            <MinusIcon />
          </button>
          <button type="button" className="trifold-btn" onClick={() => zoomBy(1.25)} aria-label="Zoom in">
            <PlusIcon />
          </button>
          <button
            type="button"
            className={`trifold-btn${folded ? '' : ' trifold-btn--active'}`}
            onClick={toggleFold}
            aria-label={folded ? 'Unfold flat' : 'Fold panels'}
          >
            <FoldIcon />
          </button>
          <button type="button" className="trifold-btn" onClick={reset} aria-label="Reset view">
            <ResetIcon />
          </button>
        </div>

        <div className="trifold-hint">Drag to rotate · scroll or pinch to zoom · click a panel to inspect</div>
      </div>

      <div className="project-trifold-footer">
        <span>{title}</span>
        <span>{folded ? 'Folded view' : 'Flat view'}</span>
      </div>
    </div>
  );
}
