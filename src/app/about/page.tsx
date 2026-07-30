'use client';

import { MouseEvent, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiExternalLink, FiGlobe, FiLinkedin } from 'react-icons/fi';
import CircularGallery from '@/components/CircularGallery';
import KeyboardDemo from '@/components/KeyboardDemo';

type ExpMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'youtube'; id: string; title: string };

const EXP_IMG = '/projects/images/experience';

const experience = [
  {
    company: 'MIT Beaver Works Summer Institute',
    location: 'Remote',
    role: 'Remote Sensing for Disaster Response',
    period: 'Jul 2026 - Present',
    bullets: [
      <>Selected for <strong>MIT BWSI Remote Sensing for Disaster Response</strong>, a selective program focused on satellite imagery, GIS, SAR analysis, and disaster response.</>,
      <>Built hands-on projects using <strong>Google Earth Engine, Sentinel-1 SAR data, and remote sensing workflows</strong> to analyze environmental disasters.</>,
      <>Learned from MIT instructors and geospatial researchers through technical lectures, projects, and presentations.</>,
    ],
    tags: ['Remote Sensing', 'GIS', 'Google Earth Engine', 'SAR', 'Satellite Imagery'],
    website: 'https://bwsi.mit.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/bwsi1.png`, alt: 'MIT Beaver Works Summer Institute' },
      { type: 'image', src: `${EXP_IMG}/bwsi2.png`, alt: 'MIT BWSI project work' },
      { type: 'image', src: `${EXP_IMG}/bwsi3.png`, alt: 'MIT BWSI remote sensing analysis' },
      { type: 'image', src: `${EXP_IMG}/bwsi4.png`, alt: 'MIT BWSI presentation' },
    ] as ExpMedia[],
  },
  {
    company: 'Rove Miles (Y Combinator W24)',
    location: 'Remote',
    role: 'Back-End Development Intern',
    period: 'Oct 2024 - Dec 2024',
    bullets: [
      <>Built a <strong>Python autocomplete system</strong> for over <strong>9,000 airports and cities</strong> used in flight search workflows.</>,
      <>Optimized large CSV datasets and improved search speed and relevance through backend data processing.</>,
      <>Collaborated on testing and production deployment for a travel technology platform.</>,
    ],
    tags: ['Python', 'Backend', 'Data Processing', 'Search Systems'],
    website: 'https://www.rove.com/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/rove1.png`, alt: 'Rove Miles internship work' },
      { type: 'image', src: `${EXP_IMG}/rove2.jpg`, alt: 'Rove Miles backend development' },
    ] as ExpMedia[],
  },
  {
    company: 'Seattle Sports & Regenerative Medicine',
    location: 'Seattle, WA',
    role: 'Business Strategy Analyst',
    period: 'Oct 2024',
    bullets: [
      <>Conducted a <strong>SWOT analysis</strong> of clinic operations and identified growth opportunities.</>,
      <>Researched healthcare regulations, marketing strategy, SEO, and online presence improvements.</>,
      <>Presented recommendations directly to clinic leadership.</>,
    ],
    tags: ['Strategy', 'Healthcare', 'SEO', 'Business Analysis'],
    website: 'https://seattlesportsclinic.com/',
    linkedin: null,
    media: [] as ExpMedia[],
  },
  {
    company: 'University of Michigan',
    location: 'Ann Arbor, MI',
    role: 'Joy of Coding Summer Program',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      <>Developed AI-powered face filters using <strong>Python, OpenCV, and CNNs</strong> for real-time facial landmark detection.</>,
      <>Built neural networks for image classification and studied model architecture under <strong>Prof. Raj Rao Nadakuditi</strong>.</>,
    ],
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    website: 'https://ece.engin.umich.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/umich1.png`, alt: 'University of Michigan Joy of Coding' },
      { type: 'image', src: `${EXP_IMG}/umich2.png`, alt: 'Face filter and CNN project work' },
      { type: 'image', src: `${EXP_IMG}/umich3.png`, alt: 'University of Michigan program work' },
    ] as ExpMedia[],
  },
  {
    company: 'American Rocketry Challenge',
    location: 'United States',
    role: 'Rocket Engineer',
    period: 'Sep 2023 - Mar 2025',
    bullets: [
      <>Designed, built, and tested model rockets carrying egg payloads for national competition.</>,
      <>Qualified for <strong>national finals</strong> with flights reaching 800+ ft while achieving safe payload recovery.</>,
      <>Used CAD, 3D printing, aerodynamic testing, and recovery system design to improve flight performance.</>,
    ],
    tags: ['CAD', '3D Printing', 'Engineering', 'Aerospace'],
    website: 'https://www.rocketrychallenge.org/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/rocket1.jpeg`, alt: 'American Rocketry Challenge rocket build' },
      { type: 'image', src: `${EXP_IMG}/rocket2.png`, alt: 'American Rocketry Challenge team' },
      { type: 'youtube', id: 'uU_0b750Agk', title: 'Rocket launch' },
    ] as ExpMedia[],
  },
  {
    company: 'Christian Medical College Vellore',
    location: 'Vellore, Tamil Nadu, India',
    role: 'Operations Observer',
    period: 'Aug 2023',
    bullets: [
      <>Observed operations at <strong>CMC Vellore, one of Asia's leading hospitals</strong>, working alongside administrative teams.</>,
      <>Supported front desk operations while communicating across <strong>4+ languages</strong>.</>,
      <>Visited CHIPS, the hospital's software division responsible for developing and maintaining healthcare systems.</>,
    ],
    tags: ['Healthcare', 'Operations', 'Technology'],
    website: 'https://www.cmch-vellore.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/cmc1.png`, alt: 'Christian Medical College Vellore' },
      { type: 'image', src: `${EXP_IMG}/cmc2.png`, alt: 'CMC Vellore hospital operations' },
      { type: 'image', src: `${EXP_IMG}/cmc3.png`, alt: 'CMC Vellore visit' },
    ] as ExpMedia[],
  },
];

const education = [
  {
    institution: 'Bellevue College',
    location: 'Bellevue, WA',
    degree: 'Running Start',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      <>Completing college-level coursework in <strong>computer science, mathematics, science, and humanities</strong> while earning an associate degree.</>,
      <>Relevant coursework: <strong>Data Structures, Statistics, Engineering Physics, Geography, and Political Science</strong>.</>,
    ],
    tags: ['Computer Science', 'Data Structures', 'Physics', 'GIS'],
    website: null,
    linkedin: null,
  },
  {
    institution: 'Eastlake High School',
    location: 'Sammamish, WA',
    degree: 'High School Diploma',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      <>Relevant coursework: <strong>AP Calculus BC, AP Computer Science A, AP Statistics, AP Human Geography, AP Macroeconomics</strong>.</>,
      <>Activities: <strong>Computer Science Honor Society, Technology Student Association</strong>.</>,
    ],
    tags: ['Computer Science', 'Mathematics', 'Engineering'],
    website: null,
    linkedin: null,
  },
];

function ExpCarousel({ media, company }: { media: ExpMedia[]; company: string }) {
  const [index, setIndex] = useState(0);

  if (media.length === 0) return null;

  const current = media[index];

  const prev = (e: MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + media.length) % media.length);
  };
  const next = (e: MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % media.length);
  };

  return (
    <div className="exp-carousel" onClick={(e) => e.stopPropagation()}>
      <div className="exp-carousel-frame">
        {current.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.src} alt={current.alt} className="exp-carousel-img" />
        ) : (
          <iframe
            className="exp-carousel-video"
            src={`https://www.youtube.com/embed/${current.id}`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {media.length > 1 && (
          <>
            <button type="button" className="exp-carousel-btn exp-carousel-btn--left" onClick={prev} aria-label={`Previous media from ${company}`}>
              <FiChevronLeft size={16} />
            </button>
            <button type="button" className="exp-carousel-btn exp-carousel-btn--right" onClick={next} aria-label={`Next media from ${company}`}>
              <FiChevronRight size={16} />
            </button>
          </>
        )}
      </div>
      {media.length > 1 && (
        <div className="exp-carousel-dots">
          {media.map((_, i) => (
            <span key={i} className={`exp-carousel-dot${i === index ? ' exp-carousel-dot--active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function ExperienceItem({ exp }: { exp: typeof experience[number] }) {
  const [open, setOpen] = useState(false);
  const hasDetails = exp.bullets.length > 0;

  return (
    <div className={`exp-item${open ? ' exp-item--open' : ''}`}>
      <div className="exp-header" onClick={() => hasDetails && setOpen(!open)} style={{ cursor: hasDetails ? 'pointer' : 'default' }}>
        <div className="exp-header-main">
          <span className="exp-company-row">
            <span className="exp-company">{exp.company}</span>
            {exp.website && (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-company-bubble"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${exp.company} website`}
              >
                <FiExternalLink size={11} />
              </a>
            )}
          </span>
          <span className="exp-role-inline">{exp.role}</span>
        </div>
        <div className="exp-header-right">
          <span className="exp-period">{exp.period}</span>
          {hasDetails && (
            <span className="exp-toggle" aria-label="toggle details">
              <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                <FiChevronDown size={12} />
              </span>
            </span>
          )}
        </div>
      </div>
      {open && hasDetails && (
        <div className="exp-details">
          {exp.media.length > 0 && <ExpCarousel media={exp.media} company={exp.company} />}
          <ul className="exp-bullets">
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {exp.tags.length > 0 && (
            <div className="exp-tags">
              {exp.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
            </div>
          )}
          {(exp.website || exp.linkedin) && (
            <div className="exp-links">
              {exp.website && <a href={exp.website} target="_blank" rel="noopener noreferrer" className="exp-link"><FiGlobe size={13} /> Website</a>}
              {exp.linkedin && <a href={exp.linkedin} target="_blank" rel="noopener noreferrer" className="exp-link"><FiLinkedin size={13} /> LinkedIn</a>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EducationItem({ edu }: { edu: typeof education[number] }) {
  const [open, setOpen] = useState(false);
  const hasDetails = edu.bullets.length > 0;

  return (
    <div className={`exp-item${open ? ' exp-item--open' : ''}`}>
      <div className="exp-header" onClick={() => hasDetails && setOpen(!open)} style={{ cursor: hasDetails ? 'pointer' : 'default' }}>
        <div className="exp-header-main">
          <span className="exp-company">{edu.institution}</span>
          <span className="exp-role-inline">{edu.degree}</span>
        </div>
        <div className="exp-header-right">
          <span className="exp-period">{edu.period}</span>
          {hasDetails && (
            <span className="exp-toggle" aria-label="toggle details">
              <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}>
                <FiChevronDown size={12} />
              </span>
            </span>
          )}
        </div>
      </div>
      {open && hasDetails && (
        <div className="exp-details">
          <ul className="exp-bullets">
            {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {edu.tags.length > 0 && (
            <div className="exp-tags">
              {edu.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
            </div>
          )}
          {(edu.website || edu.linkedin) && (
            <div className="exp-links">
              {edu.website && <a href={edu.website} className="exp-link"><FiGlobe size={13} /> Website</a>}
              {edu.linkedin && <a href={edu.linkedin} className="exp-link"><FiLinkedin size={13} /> LinkedIn</a>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const photos = [
  { image: 'https://picsum.photos/seed/dhv1/800/600', text: 'At the office' },
  { image: 'https://picsum.photos/seed/dhv2/800/600', text: 'Side project mode' },
  { image: 'https://picsum.photos/seed/dhv3/800/600', text: 'Ahmedabad' },
  { image: 'https://picsum.photos/seed/dhv4/800/600', text: 'Late nights' },
  { image: 'https://picsum.photos/seed/dhv5/800/600', text: 'Conference' },
  { image: 'https://picsum.photos/seed/dhv6/800/600', text: 'Debugging' },
  { image: 'https://picsum.photos/seed/dhv7/800/600', text: 'Deploy day' },
  { image: 'https://picsum.photos/seed/dhv8/800/600', text: 'Weekend build' },
];

export default function AboutPage() {
  return (
    <>
      <main className="main-content">
        {/* Bio */}
       <section className="about-hero">
  <h1 className="hero-name">About me</h1>

  <div className="about-body">
    <p>
      I&apos;m Cleo — a high school senior from Seattle building software,
      exploring maps, and trying to solve problems that actually matter.
    </p>

    <p>
      Growing up between India and the United States shaped how I think about
      technology. I&apos;ve seen how simple tools can make a difference in places
      where resources, connectivity, and access are limited.
    </p>

    <p>
      Most of my work sits somewhere between software engineering, healthcare,
      education, and geospatial technology. I&apos;ve built offline tools for
      schools, websites for healthcare organizations, and used satellite data
      to study disasters.
    </p>

    <p>
      Currently exploring computer vision, remote sensing, AI, and full-stack
      development while balancing Running Start at Bellevue College,
      leadership, and way too many side projects.
    </p>
  </div>
</section>
        {/* Tech Stack */}
        <section className="section">
          <h2 className="section-title">Tech Stack</h2>
          <KeyboardDemo />
        </section>

        {/* Experience */}
        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="exp-list">
            {experience.map((exp) => (
              <ExperienceItem key={exp.company} exp={exp} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="exp-list">
            {education.map((edu) => (
              <EducationItem key={edu.institution} edu={edu} />
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="section about-gallery-section">
          <h2 className="section-title">Moments</h2>
          <p className="section-more" style={{ marginTop: 0, marginBottom: 16 }}>
            Drag to explore.
          </p>
          <div className="about-gallery-wrap">
            <CircularGallery
              items={photos}
              bend={1}
              textColor="#d4d4d4"
              borderRadius={0.05}
              scrollEase={0.02}
              scrollSpeed={3}
            />
          </div>
        </section>
      </main>
    </>
  );
}