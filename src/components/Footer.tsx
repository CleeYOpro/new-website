'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

export default function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <Image src="/footer-doodle.png" alt="" width={1998} height={545} className="site-footer-image" />
      <a href="/contact" className="site-footer-cta">
        Let&apos;s talk
        <span className="btn-arrow"><FiArrowUpRight size={22} /></span>
      </a>
      <span className="site-footer-clock">Seattle, WA{time ? ` · ${time}` : ''}</span>
    </footer>
  );
}
