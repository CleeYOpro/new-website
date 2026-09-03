'use client';

import { MouseEvent, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiExternalLink, FiGlobe, FiLinkedin } from 'react-icons/fi';
import MorphSlider from '@/components/MorphSlider';
import KeyboardDemo from '@/components/KeyboardDemo';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

type ExpMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'youtube'; id: string; title: string };

const EXP_IMG = '/projects/images/experience';

const experience = [
  {
    company: 'MIT Beaver Works Summer Institute',
    logo: '/beaverworks.png',
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
    company: 'TRAE',
    logo: '/trae.png',
    location: 'Remote',
    role: 'AI Beta Testing Intern',
    period: 'Mar 2025 - Jun 2025',
    bullets: [
      <>Selected as a <strong>paid beta tester for TRAE's AI coding agent</strong>, working directly with unreleased models and features before public rollout.</>,
      <>Stress-tested agent behavior, prompts, and tool-use workflows across edge cases to surface failures before release.</>,
      <>Delivered structured bug reports and UX feedback that shaped prompt design and agent reliability improvements, contributing to <strong>feedback loops between testers and the model team</strong>.</>,
    ],
    tags: ['AI Testing', 'Prompt Engineering', 'Agent Evaluation', 'QA'],
    website: 'https://www.trae.ai/',
    linkedin: null,
    media: [] as ExpMedia[],
  },
  {
    company: 'Rove Miles (Y Combinator W24)',
    logo: '/rove.png',
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
    logo: '/seattleregen.png',
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
    logo: '/umich.png',
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
    logo: '/rocketry.png',
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
    logo: '/cmc.png',
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
    logo: '/bc.png',
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
    logo: '/ehs.png',
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
        {exp.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={exp.logo} alt="" className="exp-logo" />
        )}
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
        {edu.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={edu.logo} alt="" className="exp-logo" />
        )}
        <div className="exp-header-main">
          <span className="exp-company-row">
            <span className="exp-company">{edu.institution}</span>
          </span>
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

const MOMENTS_IMG = '/projects/images/moments';

const photos = [
  { image: `${MOMENTS_IMG}/onstage.png`, caption: 'stage fright' },
  { image: `${MOMENTS_IMG}/tsanats.png`, caption: 'how we won nationals?' },
  { image: `${MOMENTS_IMG}/rolecaller_on_theground.png`, caption: 'finally seeing rolecaller out in the real world' },
  { image: `${MOMENTS_IMG}/harvard.png`, caption: 'Harvard library' },
  { image: `${MOMENTS_IMG}/indiatlas.png`, caption: 'atlases' },
  { image: `${MOMENTS_IMG}/taj.png`, caption: 'Taj Mahal' },
  { image: `${MOMENTS_IMG}/divergent.png`, caption: 'another hackathon' },
  { image: `${MOMENTS_IMG}/docusigntower.png`, caption: 'downtown Seattle' },
  { image: `${MOMENTS_IMG}/siberia.png`, caption: 'iceman' },
  { image: `${MOMENTS_IMG}/techboothchurch.png`, caption: 'running tech at church' },
  { image: `${MOMENTS_IMG}/sequence.png`, caption: 'lets gamble on this game instead' },
];

export default function AboutPage() {
  return (
    <>
      <main className="main-content">
        {/* Bio */}
        <FloatReveal from="up">
          <section className="about-hero">
            <TypeText as="h1" className="hero-name" text="About me" />

            <div className="about-body">
              <TypeText
                as="p"
                delay={300}
                text="Hey, I'm Cleo. I'm a high school student, full-stack developer, and builder interested in turning ambitious ideas into things people can actually use."
              />

              <TypeText
                as="p"
                delay={700}
                text="I spend most of my time working across software, GIS, healthcare, and education. I like building practical systems, working with teams, and taking ideas from an early concept to something real."
              />

              <TypeText
                as="p"
                delay={1100}
                text="Right now, I'm exploring full-stack development, remote sensing, computer vision, and AI while balancing Running Start at Bellevue College, leadership, and a growing list of side projects."
              />

              <TypeText
                as="p"
                delay={1500}
                text="I'm curious by default, care a lot about execution, and like building things that have a purpose beyond just being another project."
              />
            </div>
          </section>
        </FloatReveal>

        {/* Tech Stack */}
        <FloatReveal from="left">
          <section className="section">
            <TypeText as="h2" className="section-title" text="Tech Stack" />
            <KeyboardDemo />
          </section>
        </FloatReveal>

        {/* Experience */}
        <FloatReveal from="right">
          <section className="section" id="experience">
            <TypeText as="h2" className="section-title" text="Experience" />
            <div className="exp-list">
              {experience.map((exp, i) => (
                <FloatReveal key={exp.company} from="down" delay={i * 90}>
                  <ExperienceItem exp={exp} />
                </FloatReveal>
              ))}
            </div>
          </section>
        </FloatReveal>

        {/* Education */}
        <FloatReveal from="left">
          <section className="section">
            <TypeText as="h2" className="section-title" text="Education" />
            <div className="exp-list">
              {education.map((edu, i) => (
                <FloatReveal key={edu.institution} from="down" delay={i * 90}>
                  <EducationItem edu={edu} />
                </FloatReveal>
              ))}
            </div>
          </section>
        </FloatReveal>

        {/* Photo Gallery */}
        <FloatReveal from="down">
          <section className="section about-gallery-section">
            <TypeText as="h2" className="section-title" text="Moments" />
            <p className="section-more" style={{ marginTop: 0, marginBottom: 16 }}>
              these r just some random pics
            </p>
            <div className="about-gallery-wrap">
              <MorphSlider
                items={photos}
                transition="melt"
                intensity={0.55}
                aberration={0.35}
                drift={0.4}
                autoplay
                radius={16}
              />
            </div>
          </section>
        </FloatReveal>
      </main>
    </>
  );
}