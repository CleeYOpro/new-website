'use client';

import { useEffect, useMemo, useState, type CSSProperties, type ElementType, type Ref } from 'react';
import { useInViewOnce } from '@/lib/useInViewOnce';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import './TypeText.css';

interface TypeTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** extra delay in ms before typing starts, for cascading multiple lines */
  delay?: number;
}

/**
 * Types its text out word by word as it enters the viewport. A hidden
 * "ghost" copy of the full text reserves the final layout box up front so
 * typing never shifts surrounding content.
 */
export function TypeText({ text, as: Tag = 'span', className = '', style, delay = 0 }: TypeTextProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const [count, setCount] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const duration = Math.min(1800, Math.max(500, words.length * 110));
    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      setCount(Math.round(progress * words.length));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduceMotion, words, delay]);

  const shown = reduceMotion ? text : words.slice(0, count).join(' ');
  const typing = inView && !reduceMotion && count < words.length;

  return (
    <Tag ref={ref as Ref<never>} className={`type-text ${className}`.trim()} style={style}>
      <span className="type-text-ghost" aria-hidden="true">{text}</span>
      <span className="type-text-visible">
        {shown}
        {typing && <span className="type-cursor" aria-hidden="true" />}
      </span>
    </Tag>
  );
}
