'use client';

import DotGrid from '@/components/DotGrid';
import { useDotGridSettings } from '@/lib/useDotGridSettings';

export default function SiteBackground() {
  const { settings } = useDotGridSettings();

  return (
    <DotGrid
      dotSize={2}
      gap={19}
      baseColor="#ffffff"
      waveColor="#D5674F"
      waveAlpha={0.7}
      animated={settings.animated}
      visible={settings.visible}
    />
  );
}
