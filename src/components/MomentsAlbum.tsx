'use client';

import { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import MorphSlider, { MorphSliderHandle } from '@/components/MorphSlider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export type Moment = { image: string; title: string; description: string };

type Props = {
  /** Must be a stable reference: MorphSlider rebuilds its WebGL scene when items change. */
  moments: Moment[];
  albumTitle?: string;
};

export default function MomentsAlbum({ moments, albumTitle = 'the archives, vol. 01' }: Props) {
  const sliderRef = useRef<MorphSliderHandle>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Keep the active track visible. Scrolls only the list; scrollIntoView would also move the page.
  useEffect(() => {
    const list = listRef.current;
    const row = list?.children[active] as HTMLElement | undefined;
    if (!list || !row) return;
    const pad = 8;
    let top: number | null = null;
    if (row.offsetTop - pad < list.scrollTop) top = row.offsetTop - pad;
    else if (row.offsetTop + row.offsetHeight + pad > list.scrollTop + list.clientHeight) {
      top = row.offsetTop + row.offsetHeight + pad - list.clientHeight;
    }
    if (top !== null) list.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [active, reducedMotion]);

  function select(i: number) {
    setActive(i);
    sliderRef.current?.goTo(i);
  }

  function focusTrack(i: number) {
    const button = listRef.current?.children[i]?.querySelector('button');
    button?.focus();
    select(i);
  }

  function onListKeyDown(e: KeyboardEvent<HTMLOListElement>) {
    const last = moments.length - 1;
    const keys: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    focusTrack(keys[e.key]);
  }

  function onListFocus(e: FocusEvent<HTMLOListElement>) {
    setKeyboardFocus(e.target.matches(':focus-visible'));
  }

  return (
    <div className="moments">
      <div
        className="moments-tracks"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="moments-head">
          <h3 className="moments-album">{albumTitle}</h3>
          <p className="moments-meta">{moments.length} tracks</p>
        </div>

        <div className="moments-cols" aria-hidden="true">
          <span>#</span>
          <span>title</span>
        </div>

        <div className="moments-scroll">
          <ol
            ref={listRef}
            className="moments-list"
            aria-label={albumTitle}
            onKeyDown={onListKeyDown}
            onFocus={onListFocus}
            onBlur={() => setKeyboardFocus(false)}
          >
            {moments.map((m, i) => (
              <li key={m.image}>
                <button
                  type="button"
                  className={`moments-track${i === active ? ' is-active' : ''}`}
                  aria-current={i === active ? 'true' : undefined}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => select(i)}
                >
                  <span className="moments-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="moments-text">
                    <span className="moments-title">{m.title}</span>
                    <span className="moments-desc">{m.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="moments-photo">
        <MorphSlider
          ref={sliderRef}
          items={moments}
          transition="melt"
          intensity={0.55}
          aberration={0.35}
          drift={0.4}
          autoplay
          radius={10}
          showCaptions={false}
          showIndicators={false}
          paused={hovering || keyboardFocus}
          onIndexChange={setActive}
        />
      </div>
    </div>
  );
}
