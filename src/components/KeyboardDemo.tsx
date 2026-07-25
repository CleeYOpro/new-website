'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface TechItem {
  name: string;
  desc: string;
  slug: string;
}

const techStack: Record<string, TechItem> = {
  a: { name: 'Arduino', desc: 'Electronics platform', slug: 'arduino' },
  b: { name: 'Bash', desc: 'Shell scripting', slug: 'gnubash' },
  c: { name: 'C', desc: 'Systems language', slug: 'c' },
  d: { name: 'Drizzle', desc: 'Type-safe ORM', slug: 'drizzle' },
  e: { name: 'Eclipse', desc: 'Java IDE', slug: 'eclipseide' },
  f: { name: 'Figma', desc: 'Design tool', slug: 'figma' },
  g: { name: 'Git', desc: 'Version control', slug: 'git' },
  h: { name: 'HTML5', desc: 'Web markup', slug: 'html5' },
  i: { name: 'Illustrator', desc: 'Vector design', slug: 'adobeillustrator' },
  j: { name: 'Java', desc: 'Programming language', slug: 'java' },
  k: { name: 'Kaggle', desc: 'Data science platform', slug: 'kaggle' },
  l: { name: 'Linux', desc: 'Operating system', slug: 'linux' },
  m: { name: 'MongoDB', desc: 'NoSQL database', slug: 'mongodb' },
  n: { name: 'Node.js', desc: 'JS runtime', slug: 'nodedotjs' },
  o: { name: 'OpenAI', desc: 'AI models', slug: 'openai' },
  p: { name: 'Python', desc: 'Programming language', slug: 'python' },
  q: { name: 'Qdrant', desc: 'Vector database', slug: 'qdrant' },
  r: { name: 'React', desc: 'UI library', slug: 'react' },
  s: { name: 'Supabase', desc: 'Backend platform', slug: 'supabase' },
  t: { name: 'TypeScript', desc: 'Typed JavaScript', slug: 'typescript' },
  u: { name: 'Ubuntu', desc: 'Linux distro', slug: 'ubuntu' },
  v: { name: 'Vercel', desc: 'Deployment platform', slug: 'vercel' },
  w: { name: 'Webpack', desc: 'Module bundler', slug: 'webpack' },
  x: { name: 'Xcode', desc: 'Apple IDE', slug: 'xcode' },
  y: { name: 'Yarn', desc: 'Package manager', slug: 'yarn' },
  z: { name: 'Zod', desc: 'Schema validation', slug: 'zod' },
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

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

export default function KeyboardDemo() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [displayKey, setDisplayKey] = useState<string | null>(null);
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});
  const [erroredIcons, setErroredIcons] = useState<Record<string, boolean>>({});
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      <div className="keyboard" aria-label="Interactive keyboard demo">
        {keyRows.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((item) => {
              const keyId = item.id || '';
              const keyName = item.key;
              const isPressed = activeKeys.includes(keyName) || (keyId && activeKeys.includes(keyId));
              const tech = techStack[keyName];
              const hasIcon = !!tech;
              const iconLoaded = loadedIcons[keyName];
              const iconErrored = erroredIcons[keyName];

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
                  {hasIcon && (
                    <>
                      <img
                        src={iconUrl(tech.slug)}
                        alt={tech.name}
                        className="key-icon"
                        loading="lazy"
                        onLoad={() => setLoadedIcons((prev) => ({ ...prev, [keyName]: true }))}
                        onError={() => setErroredIcons((prev) => ({ ...prev, [keyName]: true }))}
                      />
                      {(!iconLoaded || iconErrored) && (
                        <span className="key-fallback">{keyName}</span>
                      )}
                    </>
                  )}
                </kbd>
              );
            })}
          </div>
        ))}
      </div>
      <div className="keyboard-info" aria-live="polite">
        {activeTech ? (
          <>
            <strong>{activeTech.name}</strong>
            <span>{activeTech.desc}</span>
          </>
        ) : (
          <span className="keyboard-info-hint">Press or click a key</span>
        )}
      </div>
    </div>
  );
}
