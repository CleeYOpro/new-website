'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { TbBrandAdobeIllustrator } from 'react-icons/tb';
import { FaJava } from "react-icons/fa";

import {
  SiArduino,
  SiGnubash,
  SiC,
  SiDrizzle,
  SiEclipseide,
  SiFigma,
  SiGit,
  SiHtml5,
  SiKaggle,
  SiCss,
  SiMongodb,
  SiNodedotjs,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiShadcnui,
  SiVercel,
  SiExpo,
  SiYarn,
  SiFlask,
  SiPrisma,
  SiNumpy,
  SiPandas,
SiJupyter,
  SiAnaconda,
 SiNetlify,
  SiCloudflare,
  SiGithub,
  SiGoogleearthengine,
  SiArcgis,
  SiGeopandas,
  SiPytorch,
  SiPostman,
  SiGooglegemini,
  SiGooglecloud,
  SiClaudecode,
  SiNextdotjs,
} from 'react-icons/si';
import { FaReact } from "react-icons/fa";
import { SiSqlite } from "react-icons/si";
import { SiNpm } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { BiLogoFirebase } from "react-icons/bi";
import { VscMcp } from "react-icons/vsc";

import { VscAzure } from "react-icons/vsc";
import { techStack } from '@/lib/tech-stack';

// Name and description for each key live in src/lib/tech-stack.ts.
const techIcons: Record<string, IconType> = {
  a: SiArduino,
  b: SiGnubash,
  c: SiC,
  d: SiDrizzle,
  e: SiEclipseide,
  f: SiFigma,
  g: SiGithub,
  h: SiHtml5,
  i: TbBrandAdobeIllustrator,
  j: FaJava,
  k: SiKaggle,
  l: SiCss,
  m: SiMongodb,
  n: SiNodedotjs,
  o: SiJavascript,
  p: SiPython,
  q: SiTailwindcss,
  r: FaReact,
  s: SiSupabase,
  t: SiTypescript,
  u: SiShadcnui,
  v: SiVercel,
  w: SiPrisma,
  x: SiExpo,
  y: SiYarn,
  z: SiFlask,
  0: SiSqlite,
  1: SiNpm,
  2: SiNumpy,
  3: SiPandas,
  4: SiJupyter,
  5: SiAnaconda,
  6: BiLogoFirebase,
  7: VscVscode,
  8: SiNetlify,
  9: SiCloudflare,
  '=': VscAzure,
  '-': SiGoogleearthengine,
  '`': SiArcgis,
  ',': SiGeopandas,
  ';': SiPytorch,
  '[': SiPostman,
  ']': SiGooglegemini,
  '\\': SiGooglecloud,
  "'": SiClaudecode,
  '.': SiNextdotjs,
  '/': VscMcp,
};

const keyRows = [
  [
    { key: '`', alt: '~', id: '' },
    { key: '1', alt: '!' },
    { key: '2', alt: '@' },
    { key: '3', alt: '#' },
    { key: '4', alt: '$' },
    { key: '5', alt: '%' },
    { key: '6', alt: '^' },
    { key: '7', alt: '&' },
    { key: '8', alt: '*' },
    { key: '9', alt: '(' },
    { key: '0', alt: ')' },
    { key: '-', alt: '_' },
    { key: '=', alt: '+' },
    { key: 'backspace', alt: '', special: true },
  ],
  [
    { key: 'tab', alt: '', special: true },
    { key: 'q' },
    { key: 'w' },
    { key: 'e' },
    { key: 'r' },
    { key: 't' },
    { key: 'y' },
    { key: 'u' },
    { key: 'i' },
    { key: 'o' },
    { key: 'p' },
    { key: '[', alt: '{' },
    { key: ']', alt: '}' },
    { key: '\\', alt: '|', id: 'backslash' },
  ],
  [
    { key: 'caps', alt: '', special: true },
    { key: 'a' },
    { key: 's' },
    { key: 'd' },
    { key: 'f' },
    { key: 'g' },
    { key: 'h' },
    { key: 'j' },
    { key: 'k' },
    { key: 'l' },
    { key: ';', alt: ':' },
    { key: "'", alt: '"', id: 'quote' },
    { key: 'enter', alt: '', special: true },
  ],
  [
    { key: 'lshift', alt: '', special: true },
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
    { key: ',', alt: '<' },
    { key: '.', alt: '>' },
    { key: '/', alt: '?' },
    { key: 'rshift', alt: '', special: true },
  ],
  [
    { key: 'lctrl', alt: '', special: true },
    { key: 'lwin', alt: '', special: true },
    { key: 'lalt', alt: '', special: true },
    { key: 'space', alt: '', special: true },
    { key: 'ralt', alt: '', special: true },
    { key: 'rwin', alt: '', special: true },
    { key: 'rctx', alt: '', special: true },
    { key: 'rctrl', alt: '', special: true },
  ],
];

function getKeyIdentifier(event: KeyboardEvent) {
  switch (event.code) {
    case 'CapsLock':
      return 'caps';
    case 'Space':
      return 'space';
    case 'Backslash':
      return 'backslash';
    case 'Quote':
      return 'quote';
    case 'ShiftLeft':
      return 'lshift';
    case 'ShiftRight':
      return 'rshift';
    case 'ControlLeft':
      return 'lctrl';
    case 'ControlRight':
      return 'rctrl';
    case 'AltLeft':
      return 'lalt';
    case 'AltRight':
      return 'ralt';
    case 'MetaLeft':
      return 'lwin';
    case 'MetaRight':
      return 'rwin';
    case 'ContextMenu':
      return 'rctx';
    case 'Enter':
      return 'enter';
    case 'Tab':
      return 'tab';
    case 'Backspace':
      return 'backspace';
    default:
      return event.key.toLowerCase();
  }
}

export default function KeyboardDemo() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [displayKey, setDisplayKey] = useState<string | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scaleWrapRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [wrapHeight, setWrapHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    function update() {
      const wrap = scaleWrapRef.current;
      const kb = keyboardRef.current;
      if (!wrap || !kb) return;
      const naturalWidth = kb.offsetWidth;
      const naturalHeight = kb.offsetHeight;
      if (!naturalWidth || !naturalHeight) return;
      const available = wrap.clientWidth;
      const next = Math.min(1, available / naturalWidth);
      setScale(next);
      setWrapHeight(naturalHeight * next);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const key = getKeyIdentifier(event);
      if (key) {
        setActiveKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
        setDisplayKey(key);
        event.preventDefault();
      }
    };

    const up = (event: KeyboardEvent) => {
      const key = getKeyIdentifier(event);
      if (key) {
        setActiveKeys((prev) => prev.filter((item) => item !== key));
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const activeTech = useMemo(() => {
    const key = displayKey ?? activeKeys[0];
    if (!key) return null;
    return techStack[key] ?? null;
  }, [displayKey, activeKeys]);

  const handleKeyActivate = (keyName: string) => {
    setDisplayKey(keyName);
    setActiveKeys((prev) => (prev.includes(keyName) ? prev : [...prev, keyName]));
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setActiveKeys((prev) => prev.filter((k) => k !== keyName));
    }, 220);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>, keyName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleKeyActivate(keyName);
    }
  };

  return (
    <div className="keyboard-demo">
      <div
        className="keyboard-scale-wrap"
        ref={scaleWrapRef}
        style={wrapHeight != null ? { height: wrapHeight } : undefined}
      >
      <div
        className="keyboard"
        ref={keyboardRef}
        style={{ transform: `scale(${scale})` }}
        aria-label="Interactive keyboard demo"
      >
        {keyRows.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((item) => {
              const keyId = item.id || '';
              const keyName = item.key;
              const isPressed = activeKeys.includes(keyName) || (keyId && activeKeys.includes(keyId));
              const tech = techStack[keyName];
              const hasIcon = !!tech;
              const Icon = techIcons[keyName];

              return (
                <kbd
                  key={`${rowIndex}-${keyName}`}
                  id={keyId || undefined}
                  data-key={item.key}
                  data-alt={item.alt || undefined}
                  className={`${isPressed ? 'pressed' : ''}${hasIcon ? ' has-icon' : ''}`}
                  tabIndex={0}
                  role="button"
                  aria-label={tech ? tech.name : keyName}
                  onClick={() => handleKeyActivate(keyName)}
                  onKeyDown={(e) => handleKeyDown(e, keyName)}
                >
                  {Icon && <Icon className="key-icon" aria-hidden="true" />}
                </kbd>
              );
            })}
          </div>
        ))}
      </div>
      </div>
      <div className="keyboard-info" aria-live="polite">
        {activeTech ? (
          <>
            <strong>{activeTech.name}</strong>
            <span>{activeTech.desc}</span>
          </>
        ) : (
          <span className="keyboard-info-hint">type away!</span>
        )}
      </div>
    </div>
  );
}
