import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

export default function ThankYouPage() {
  return (
    <main className="main-content">
      <FloatReveal from="up">
        <section className="about-hero" style={{ marginBottom: '32px', position: 'relative' }}>
          <TypeText as="h1" className="hero-name" style={{ marginBottom: '20px' }} text="Message sent." />

          <TypeText
            as="p"
            className="hero-bio"
            style={{ fontSize: '15px', color: 'var(--text-dim)', margin: 0 }}
            delay={300}
            text="Thanks for reaching out - I'll get back to you as soon as possible."
          />

          <div className="hero-actions" style={{ marginTop: '28px' }}>
            <Link href="/" className="hero-btn hero-btn--snippets">
              Back to home
              <span className="btn-arrow"><FiArrowUpRight size={11} /></span>
            </Link>
          </div>
        </section>
      </FloatReveal>
    </main>
  );
}
