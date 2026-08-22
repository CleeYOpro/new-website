'use client';

import { useEffect, useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import DotGrid from '@/components/DotGrid';
import './SiteBackground.css';

const STORAGE_KEY = 'dot-grid-settings';

type Settings = { animated: boolean; visible: boolean };

const defaultSettings: Settings = { animated: true, visible: true };

export default function SiteBackground() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    } catch {
      // ignore corrupt/inaccessible storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <DotGrid
        dotSize={2}
        gap={19}
        baseColor="#ffffff"
        waveColor="#D5674F"
        waveAlpha={0.7}
        animated={settings.animated}
        visible={settings.visible}
      />

      <div className="grid-settings" ref={menuRef}>
        <button
          type="button"
          className="grid-settings__trigger"
          aria-label="Background settings"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <FiSettings size={15} />
        </button>

        {open && (
          <div className="grid-settings__panel" role="menu">
            <p className="grid-settings__title">Background</p>

            <label className="grid-settings__row">
              <span>Animate grid</span>
              <span
                className={`grid-settings__switch${settings.animated ? ' grid-settings__switch--on' : ''}`}
                role="switch"
                aria-checked={settings.animated}
              >
                <input
                  type="checkbox"
                  checked={settings.animated}
                  onChange={(e) => setSettings((s) => ({ ...s, animated: e.target.checked }))}
                />
                <span className="grid-settings__knob" />
              </span>
            </label>

            <label className="grid-settings__row">
              <span>Show grid</span>
              <span
                className={`grid-settings__switch${settings.visible ? ' grid-settings__switch--on' : ''}`}
                role="switch"
                aria-checked={settings.visible}
              >
                <input
                  type="checkbox"
                  checked={settings.visible}
                  onChange={(e) => setSettings((s) => ({ ...s, visible: e.target.checked }))}
                />
                <span className="grid-settings__knob" />
              </span>
            </label>
          </div>
        )}
      </div>
    </>
  );
}
