'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';

import './DotGrid.css';

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Dot = { cx: number; cy: number; seed: number };

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  waveColor?: string;
  baseAlpha?: number;
  waveAlpha?: number;
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
  visible?: boolean;
}

const DotGrid = ({
  dotSize = 3,
  gap = 8,
  baseColor = '#ffffff',
  waveColor = '#D5674F',
  baseAlpha = 0.12,
  waveAlpha = 0.55,
  className = '',
  style,
  animated = true,
  visible = true,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const phaseRef = useRef(0);
  const intensityRef = useRef(1);
  const targetIntensityRef = useRef(1);

  useEffect(() => {
    targetIntensityRef.current = animated ? 1 : 0;
  }, [animated]);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const waveRgb = useMemo(() => hexToRgb(waveColor), [waveColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    sizeRef.current = { width, height };

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, seed: Math.random() });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let lastTime = performance.now();
    const waveSpeed = 0.22;

    const tick = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      intensityRef.current += (targetIntensityRef.current - intensityRef.current) * Math.min(1, dt * 2.2);
      const intensity = intensityRef.current;
      phaseRef.current += waveSpeed * dt * (0.15 + 0.85 * intensity);
      const phase = phaseRef.current;

      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      // the blob's own center slowly drifts and slants around the middle
      // of the screen instead of sitting still, so the wave never traces
      // the same shape twice
      const driftX = width / 2 + Math.sin(phase * 0.31) * width * 0.16 + Math.sin(phase * 0.13) * width * 0.08;
      const driftY = height / 2 + Math.sin(phase * 0.23 + 1.3) * height * 0.14 + Math.cos(phase * 0.17) * height * 0.06;

      const amplitude = height * 0.1;
      const sigmaX = Math.max(width * 0.5, 140);
      const sigmaY = Math.max(height * 0.3, 80);

      // one coherent traveling wavefront (like the logo's flowing ridge
      // lines) rather than several independent frequencies fighting each
      // other — its direction slants slowly so it never feels static
      const dirAngle = (Math.PI / 10) * Math.sin(phase * 0.12);
      const dirX = Math.cos(dirAngle);
      const dirY = Math.sin(dirAngle);
      const perpX = -dirY;
      const perpY = dirX;
      const freq = (Math.PI * 2 * 1.4) / (width || 1);

      for (const dot of dotsRef.current) {
        const seedAngle = dot.seed * Math.PI * 2;

        const proj = dot.cx * dirX + dot.cy * dirY;
        const wave = Math.sin(proj * freq - phase * 1.6 + seedAngle * 0.15);

        const dx = dot.cx - driftX;
        const dy = dot.cy - driftY;
        const blob = Math.exp(-((dx * dx) / (2 * sigmaX * sigmaX) + (dy * dy) / (2 * sigmaY * sigmaY)));
        const envelope = Math.min(1, blob) * intensity;

        const transverse = amplitude * envelope * wave;
        const yOffset = transverse * perpY;
        const xOffset = transverse * perpX + amplitude * 0.35 * envelope * wave * dirX;
        const alpha = baseAlpha + envelope * (waveAlpha - baseAlpha);
        const r = lerp(baseRgb.r, waveRgb.r, envelope);
        const g = lerp(baseRgb.g, waveRgb.g, envelope);
        const b = lerp(baseRgb.b, waveRgb.b, envelope);

        ctx.save();
        ctx.translate(dot.cx + xOffset, dot.cy + yOffset);
        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha})`;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [baseRgb, waveRgb, baseAlpha, waveAlpha, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  return (
    <section className={`dot-grid ${className}`} style={{ ...style, opacity: visible ? (style?.opacity ?? 1) : 0 }}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
