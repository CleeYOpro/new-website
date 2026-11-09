'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';
import { ACCENT_STORAGE_KEY, DEFAULT_ACCENT, isAccentId, type AccentId } from '@/lib/accents';

const EVENT_KEY = 'accent-change';

// Holds the choice for this page view when localStorage is unavailable.
let sessionAccent: AccentId | null = null;

function readAccent(): AccentId {
  try {
    const stored = window.localStorage.getItem(ACCENT_STORAGE_KEY);
    if (isAccentId(stored)) return stored;
  } catch {
    // storage blocked (private mode etc.)
  }
  return sessionAccent ?? DEFAULT_ACCENT;
}

function subscribe(onChange: () => void) {
  // `storage` keeps other open tabs in sync too
  window.addEventListener(EVENT_KEY, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT_KEY, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function useAccent() {
  const accent = useSyncExternalStore(subscribe, readAccent, () => DEFAULT_ACCENT);

  // The inline <head> script sets data-accent before paint. Re-apply from
  // storage (not from `accent`, which is the server default during hydration)
  // to cover React's dev remount clearing <html> attributes and other tabs.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-accent', readAccent());
  }, [accent]);

  const setAccent = (next: AccentId) => {
    sessionAccent = next;
    try {
      window.localStorage.setItem(ACCENT_STORAGE_KEY, next);
    } catch {
      // ignore write failures; sessionAccent still applies for this page view
    }
    document.documentElement.setAttribute('data-accent', next);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  return { accent, setAccent };
}
