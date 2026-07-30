'use client';

import { useEffect, useState } from 'react';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export default function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <span>Cleo Balaranjith &middot; Nothin&apos; reserved 2026</span>
      <span>Seattle, WA{time ? ` · ${time}` : ''}</span>
    </footer>
  );
}
