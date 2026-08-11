'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useInViewOnce } from '@/lib/useInViewOnce';
import './FloatReveal.css';

export type FloatDirection = 'up' | 'down' | 'left' | 'right';

interface FloatRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** which direction the component floats in from */
  from?: FloatDirection;
}

const FROM_OFFSET: Record<FloatDirection, string> = {
  up: 'translateY(30px)',
  down: 'translateY(-30px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
};

/**
 * Simple fade + float reveal (no pixelation, no typing) that drops a
 * component into place from a given direction the first time it enters
 * the viewport.
 */
export function FloatReveal({ children, className = '', delay = 0, from = 'up' }: FloatRevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`float-reveal ${inView ? 'is-in-view' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, '--float-from': FROM_OFFSET[from] } as CSSProperties}
    >
      {children}
    </div>
  );
}
