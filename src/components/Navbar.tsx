'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/ai', label: 'ai' },
];

export default function Navbar() {
  const pathname = usePathname();

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
      </div>
    </header>
  );
}
