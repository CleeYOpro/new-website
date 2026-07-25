import CircularGallery from '@/components/CircularGallery';
import KeyboardDemo from '@/components/KeyboardDemo';

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

        {/* Photo Gallery */}
        <section className="section about-gallery-section">
          <h2 className="section-title">Moments</h2>
          <p className="section-more" style={{ marginTop: 0, marginBottom: 16 }}>
            Scroll or drag to explore.
          </p>
          <div className="about-gallery-wrap">
            <CircularGallery
              items={photos}
              bend={3}
              textColor="#d4d4d4"
              borderRadius={0.05}
              scrollEase={0.02}
              scrollSpeed={2}
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>2026 - Nothin&apos; reserved</span>
        <span>Ahmedabad, 6:19 AM</span>
      </footer>
    </>
  );
}