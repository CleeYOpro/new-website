'use client';

import { useEffect, useRef, useState } from 'react';
import './CardSwap.css';

export interface NotifItem {
  sender: string;
  title: string;
  time?: string;
}

interface Props {
  items: NotifItem[];
  delay?: number;
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

export default function NotifCardSwap({ items, delay = 2400 }: Props) {
  // order[0] is the top card
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  // 'idle' | 'exit' | 'enter-from' | 'enter'
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter-from' | 'enter'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function run() {
      timer.current = setTimeout(() => {
        // 1. exit — top card flies up
        setPhase('exit');

        setTimeout(() => {
          // 2. rotate the order (old top goes to back)
          setOrder(prev => {
            const next = [...prev];
            next.push(next.shift()!);
            return next;
          });
          // 3. snap new top to bottom (no transition)
          setPhase('enter-from');

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // 4. animate new top up into position
              setPhase('enter');

              setTimeout(() => {
                setPhase('idle');
              }, 500);
            });
          });

          run();
        }, 440);
      }, delay);
    }

    run();
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const visible = order.slice(0, 3);

  return (
    <div className="notif-swap-wrap" aria-label="Stats">
      {/* render back-to-front so top card paints on top */}
      {[...visible].reverse().map((itemIdx, revIdx) => {
        const depth = visible.length - 1 - revIdx; // 0 = top
        const isTop = depth === 0;
        const item = items[itemIdx];

        let cls = 'notif-swap-card';
        if (isTop) {
          cls += ' notif-swap-card--top';
          if (phase === 'exit')       cls += ' notif-swap-card--exit';
          if (phase === 'enter-from') cls += ' notif-swap-card--enter-from';
          // 'enter' and 'idle' → no extra class, default position (y:0 scale:1)
        } else if (depth === 1) {
          cls += ' notif-swap-card--d1';
        } else {
          cls += ' notif-swap-card--d2';
        }

        return (
          <div key={itemIdx} className={cls}>
            <div className="notif-swap-icon" aria-hidden="true">
              <MailIcon />
            </div>
            <div className="notif-swap-body">
              <div className="notif-swap-row">
                <span className="notif-swap-sender">{item.sender}</span>
                <span className="notif-swap-time">{item.time ?? 'now'}</span>
              </div>
              <div className="notif-swap-title">{item.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
