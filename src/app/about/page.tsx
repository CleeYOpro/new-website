'use client';

import { MouseEvent, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiExternalLink, FiGlobe, FiLinkedin } from 'react-icons/fi';
import MomentsAlbum from '@/components/MomentsAlbum';
import KeyboardDemo from '@/components/KeyboardDemo';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';
import { aboutBio, education, experience, moments, type ExpMedia } from '@/lib/about';

// `**text**` in the shared bullet strings renders bold.
function Rich({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}

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
            {exp.bullets.map((b, i) => <li key={i}><Rich text={b} /></li>)}
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
            {edu.bullets.map((b, i) => <li key={i}><Rich text={b} /></li>)}
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

export default function AboutPage() {
  return (
    <>
      <main className="main-content">
        {/* Bio */}
        <FloatReveal from="up">
          <section className="about-hero">
            <TypeText as="h1" className="hero-name" text="About me" />

            <div className="about-body">
              {aboutBio.map((text, i) => (
                <TypeText key={i} as="p" delay={300 + i * 400} text={text} />
              ))}
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
            <MomentsAlbum moments={moments} />
          </section>
        </FloatReveal>
      </main>
    </>
  );
}
