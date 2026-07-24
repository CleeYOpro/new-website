import type { Metadata } from 'next';
import './globals.css';
import ClickParticles from '@/components/ClickParticles';

export const metadata: Metadata = {
  title: 'Dhvanit Monpara | Backend Engineer',
  description: 'Portfolio of Dhvanit Monpara, a backend engineer building systems, projects, and technical write-ups.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClickParticles particleColors={["#D5674F", "#e8896e", "#c04535"]} particleCount={10} velocityMax={2} />
        {children}
      </body>
    </html>
  );
}
