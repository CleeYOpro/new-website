'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dot-grid-settings';
const EVENT_KEY = 'dot-grid-settings-change';

export type DotGridSettings = { animated: boolean; visible: boolean };

const defaultSettings: DotGridSettings = { animated: true, visible: true };

function readSettings(): DotGridSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    // ignore corrupt/inaccessible storage
  }
  return defaultSettings;
}

export function useDotGridSettings() {
  const [settings, setSettings] = useState<DotGridSettings>(defaultSettings);

  useEffect(() => {
    setSettings(readSettings());
    const onChange = () => setSettings(readSettings());
    window.addEventListener(EVENT_KEY, onChange);
    return () => window.removeEventListener(EVENT_KEY, onChange);
  }, []);

  const update = (next: Partial<DotGridSettings>) => {
    // Side effects stay out of the setState updater: React may run updaters
    // during render, and the event would set state in other components then.
    const merged = { ...readSettings(), ...next };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // ignore write failures (e.g. private browsing)
    }
    setSettings(merged);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  return { settings, update };
}
