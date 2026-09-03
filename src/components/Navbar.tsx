'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import { useDotGridSettings } from '@/lib/useDotGridSettings';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/ai', label: 'ai' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { settings, update } = useDotGridSettings();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="site-nav" aria-label="Home">
      <nav aria-label="Primary navigation">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-item${pathname === l.href ? ' nav-item--active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="nav-icons" aria-label="Settings">
        <a href="https://www.instagram.com/cleobalaranjith/" target="_blank" rel="noreferrer" aria-label="Instagram" className="nav-icon-link">
          <FaInstagram size={16} />
        </a>
        <a href="https://github.com/CleeYOpro" target="_blank" rel="noreferrer" aria-label="GitHub" className="nav-icon-link">
          <FaGithub size={16} />
        </a>
        <a href="https://www.linkedin.com/in/cleofus/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="nav-icon-link">
          <FaLinkedin size={16} />
        </a>
        <a href="mailto:cbalaranjith@gmail.com" aria-label="Mail" className="nav-icon-link">
          <FaEnvelope size={16} />
        </a>

        <div className="nav-settings" ref={menuRef}>
          <button
            type="button"
            className="nav-icon-link nav-settings__trigger"
            aria-label="Background settings"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <FiSettings size={15} />
          </button>

          {open && (
            <div className="nav-settings__panel" role="menu">
              <p className="nav-settings__title">Background</p>

              <label className="nav-settings__row">
                <span>Animate grid</span>
                <span
                  className={`nav-settings__switch${settings.animated ? ' nav-settings__switch--on' : ''}`}
                  role="switch"
                  aria-checked={settings.animated}
                >
                  <input
                    type="checkbox"
                    checked={settings.animated}
                    onChange={(e) => update({ animated: e.target.checked })}
                  />
                  <span className="nav-settings__knob" />
                </span>
              </label>

              <label className="nav-settings__row">
                <span>Show grid</span>
                <span
                  className={`nav-settings__switch${settings.visible ? ' nav-settings__switch--on' : ''}`}
                  role="switch"
                  aria-checked={settings.visible}
                >
                  <input
                    type="checkbox"
                    checked={settings.visible}
                    onChange={(e) => update({ visible: e.target.checked })}
                  />
                  <span className="nav-settings__knob" />
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
