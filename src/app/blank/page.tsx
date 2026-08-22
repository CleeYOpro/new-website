'use client';

import DotGrid from '@/components/DotGrid';

export default function BlankPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: 'transparent' }}>
      <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: -2 }} />
      <DotGrid dotSize={2} gap={19} baseColor="#ffffff" waveColor="#D5674F" waveAlpha={0.7} />
    </main>
  );
}
