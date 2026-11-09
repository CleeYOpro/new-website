'use client';

import DotGrid from '@/components/DotGrid';
import { useDotGridSettings } from '@/lib/useDotGridSettings';
import { useAccent } from '@/lib/useAccent';
import { ACCENTS } from '@/lib/accents';

export default function SiteBackground() {
  const { settings } = useDotGridSettings();
  const { accent } = useAccent();
  const waveColor = ACCENTS.find((a) => a.id === accent)?.hex ?? ACCENTS[0].hex;

  return (
    <DotGrid
      dotSize={2}
      gap={19}
      baseColor="#ffffff"
      waveColor={waveColor}
      waveAlpha={0.7}
      animated={settings.animated}
      visible={settings.visible}
    />
  );
}
