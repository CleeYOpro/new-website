'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
interface TechItem {
  name: string;
  desc: string;
  icon: IconType;
}

const techStack: Record<string, TechItem> = {
  a: { name: 'Arduino', desc: 'Open-source electronics platform for building embedded systems, sensors, and hardware prototypes', icon: SiArduino },
  b: { name: 'Bash', desc: 'Command-line shell used for automation, scripting, and managing development environments', icon: SiGnubash },
  c: { name: 'C', desc: 'Low-level programming language used for systems programming and embedded development', icon: SiC },
  d: { name: 'Drizzle', desc: 'Type-safe SQL ORM for building efficient and maintainable database applications', icon: SiDrizzle },
  e: { name: 'Eclipse', desc: 'Integrated development environment commonly used for Java application development', icon: SiEclipseide },
  f: { name: 'Figma', desc: 'Collaborative UI/UX design tool for creating interfaces, prototypes, and design systems', icon: SiFigma },
  g: { name: 'GitHub', desc: 'Web-based platform for version control and collaborative software development', icon: SiGithub },
  h: { name: 'HTML5', desc: 'Modern markup language for structuring websites and web applications', icon: SiHtml5 },
  i: { name: 'Adobe Illustrator', desc: 'Vector graphics design software for creating logos, illustrations, and visual assets', icon: TbBrandAdobeIllustrator },
  j: { name: 'Java', desc: 'Object-oriented programming language used for applications, backend systems, and coursework', icon: FaJava },
  k: { name: 'Kaggle', desc: 'Data science platform for machine learning competitions, datasets, and experimentation', icon: SiKaggle },
  l: { name: 'CSS3', desc: 'Styling language used to create responsive layouts, animations, and modern web designs', icon: SiCss },
  m: { name: 'MongoDB', desc: 'NoSQL database for storing flexible document-based application data', icon: SiMongodb },
  n: { name: 'Node.js', desc: 'JavaScript runtime for building scalable backend services, APIs, and server applications', icon: SiNodedotjs },
  o: { name: 'JavaScript', desc: 'Programming language powering interactive web applications and modern frontend development', icon: SiJavascript },
  p: { name: 'Python', desc: 'Versatile programming language used for automation, data science, AI, and backend development', icon: SiPython },
  q: { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapidly building responsive and customizable interfaces', icon: SiTailwindcss },
  r: { name: 'React', desc: 'Frontend library for building reusable components and interactive user interfaces', icon: FaReact },
  s: { name: 'Supabase', desc: 'Open-source backend platform providing databases, authentication, storage, and APIs', icon: SiSupabase },
  t: { name: 'TypeScript', desc: 'Strongly typed JavaScript language for building safer and more maintainable applications', icon: SiTypescript },
  u: { name: 'shadcn/ui', desc: 'Reusable React component library for creating accessible and customizable interfaces', icon: SiShadcnui },
  v: { name: 'Vercel', desc: 'Cloud platform for deploying, hosting, and scaling modern web applications', icon: SiVercel },
  w: { name: 'Prisma', desc: 'Type-safe ORM for interacting with databases and managing application data models', icon: SiPrisma },
  x: { name: 'Expo', desc: 'React Native development platform for building and deploying cross-platform mobile apps', icon: SiExpo },
  y: { name: 'Yarn', desc: 'Package manager for installing dependencies and managing JavaScript projects', icon: SiYarn },
  z: { name: 'Flask', desc: 'Lightweight Python web framework for building APIs and backend applications', icon: SiFlask },

  0: { name: 'SQLite', desc: 'Lightweight relational database used for local storage and embedded applications', icon: SiSqlite },
  1: { name: 'NPM', desc: 'JavaScript package manager for managing dependencies and project tooling', icon: SiNpm },
  2: { name: 'NumPy', desc: 'Python library for numerical computing, arrays, and scientific calculations', icon: SiNumpy },
  3: { name: 'Pandas', desc: 'Python library for data manipulation, analysis, and working with datasets', icon: SiPandas },
  4: { name: 'Jupyter', desc: 'Interactive notebook environment for data analysis, visualization, and experimentation', icon: SiJupyter },
  5: { name: 'Anaconda', desc: 'Python distribution platform for managing environments and data science packages', icon: SiAnaconda },
  7: { name: 'Visual Studio Code', desc: 'Extensible code editor used for software development, debugging, and project management', icon: VscVscode },
  8: { name: 'Netlify', desc: 'Cloud platform for deploying frontend websites and managing continuous deployments', icon: SiNetlify },
  9: { name: 'Cloudflare', desc: 'Web infrastructure platform providing DNS, security, caching, and edge services', icon: SiCloudflare },
  6: { name: 'Firebase', desc: 'Backend-as-a-Service platform for building mobile and web applications', icon: BiLogoFirebase },
  '=': { 
  name: 'Microsoft Azure', 
  desc: 'Cloud computing platform for deploying applications, managing infrastructure, and building scalable services', 
  icon: VscAzure 
},
'-': { 
  name: 'Google Earth Engine', 
  desc: 'Cloud-based geospatial platform for analyzing satellite imagery, remote sensing data, and large-scale environmental datasets',
  icon: SiGoogleearthengine
},

'`': { 
  name: 'ArcGIS', 
  desc: 'Geographic information system for spatial analysis, mapping, visualization, and managing geospatial data',
  icon: SiArcgis
},

',': { 
  name: 'GeoPandas', 
  desc: 'Python library for working with geospatial vector data using pandas-based data analysis workflows',
  icon: SiGeopandas
},

';': { 
  name: 'PyTorch', 
  desc: 'Deep learning framework used for building neural networks, machine learning models, and AI research',
  icon: SiPytorch
},

'[': { 
  name: 'REST APIs', 
  desc: 'Web architecture for building and connecting applications through HTTP-based data communication',
  icon: SiPostman
},

']': { 
  name: 'Google Gemini API', 
  desc: 'Generative AI platform for integrating multimodal AI capabilities and intelligent features into applications',
  icon: SiGooglegemini
},

'\\': { 
  name: 'Google Cloud', 
  desc: 'Cloud computing platform for deploying applications, processing data, and running scalable infrastructure',
  icon: SiGooglecloud
},

'\'': { 
  name: 'Claude Code', 
  desc: 'AI-powered coding assistant for software development, debugging, and improving developer workflows',
  icon: SiClaudecode
},

'.': { 
  name: 'Next.js', 
  desc: 'React framework for building full-stack web applications with server rendering and optimized performance',
  icon: SiNextdotjs
},

'/': { 
  name: 'MCP', 
  desc: 'Model Context Protocol for connecting AI models with external tools, data sources, and applications',
  icon: VscMcp
},

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
              const Icon = tech?.icon;

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
