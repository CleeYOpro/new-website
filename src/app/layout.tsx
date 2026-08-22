import type { Metadata } from 'next';
import './globals.css';
import ClickParticles from '@/components/ClickParticles';
import SiteBackground from '@/components/SiteBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Cleo Balaranjith's Website",
  description: 'Portfolio of Cleo Balaranjith, a high school senior building practical projects and messing around with tech.',
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
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <SiteBackground />
        <ClickParticles particleColors={["#D5674F", "#e8896e", "#c04535"]} particleCount={10} velocityMax={2} />
        <div className="site-wrap">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
