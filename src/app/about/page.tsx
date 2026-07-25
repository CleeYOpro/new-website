import CircularGallery from '@/components/CircularGallery';

const techStack = [
  {
    category: 'Backend',
    items: [
      { name: 'TypeScript', icon: '🟦' },
      { name: 'Node.js', icon: '🟩' },
      { name: 'Express', icon: '⚡' },
      { name: 'Go', icon: '🐹' },
      { name: 'Socket.io', icon: '🔌' },
      { name: 'Redis', icon: '🔴' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Qdrant', icon: '🔍' },
      { name: 'Pinecone', icon: '🌲' },
    ],
  },
  {
    category: 'GenAI',
    items: [
      { name: 'LangChain', icon: '🔗' },
      { name: 'LangGraph', icon: '🕸️' },
      { name: 'Python', icon: '🐍' },
      { name: 'Agentic AI', icon: '🤖' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'WebRTC', icon: '📡' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '🌿' },
      { name: 'Linux', icon: '🐧' },
      { name: 'Postman', icon: '📮' },
    ],
  },
];

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
              I&apos;m Dhvanit — a backend engineer based in Ahmedabad, India. I spend most of my time
              thinking about how systems should be designed, and then building them. I care deeply about
              reliability, performance, and writing code that&apos;s easy to reason about six months later.
            </p>
            <p>
              My work spans event-driven architectures, real-time systems, GenAI pipelines, and CLI tooling.
              I&apos;ve shipped production backends with WebSockets and LiveKit for sub-200ms messaging,
              built multi-layer content moderation systems, and scaffolded HRMS platforms from scratch.
            </p>
            <p>
              Outside of work I read about distributed systems, tinker with side projects, and occasionally
              write about the hard lessons backends teach you — usually involving cache invalidation.
            </p>
            <p>
              Currently interning as a Software Engineer. Previously at TechySquad as a Full Stack Developer.
              Always building something.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="stack-grid">
            {techStack.map((group) => (
              <div key={group.category} className="stack-group">
                <p className="stack-category">{group.category}</p>
                <div className="stack-items">
                  {group.items.map((item) => (
                    <div key={item.name} className="stack-item">
                      <span className="stack-icon" aria-hidden="true">{item.icon}</span>
                      <span className="stack-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="section about-gallery-section">
          <h2 className="section-title">Photos</h2>
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
