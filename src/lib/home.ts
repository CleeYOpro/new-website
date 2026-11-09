// Home page copy. The site AI reads this too (src/lib/ai-context.ts).

export const heroTagline = 'student • builder • problem solver';

export const heroBio = [
  "Hi! I'm Cleo. I build software, maps, and tools for real problems, anywhere from offline attendance apps for schools in rural India to satellite imagery for disaster response.",
  'The part I like most is the messy stretch between having a problem and having something people can actually use, which is also where most of the work ends up being.',
];

// "By the numbers" cards.
export const homeNumbers: { appName: string; title: string; time: string; message: string; badge: string; icon?: string }[] = [
  {
    appName: 'rolecaller',
    title: 'The Malto People',
    time: '2025-2026',
    message: '2,500+ students supported through offline-first attendance software.',
    badge: '2500+',
  },
  {
    appName: 'MIT BWSI',
    title: 'Remote Sensing',
    time: '2026',
    message: 'Selected for MIT Beaver Works Summer Institute (~6% acceptance rate).',
    badge: '<6%',
    icon: '/beaverworks.png',
  },
  {
    appName: 'Technology Student Association',
    title: '🥈',
    time: '2025-2026',
    message: '2× TSA Nationals | 2nd place in Technology Problem Solving',
    badge: '2x',
    icon: '/tsa.png',
  },
  {
    appName: 'CMC Vellore',
    title: 'Healthcare Web',
    time: '2023-2024',
    message: 'Built a multilingual hospital website supporting 3M+ annual visitors.',
    badge: '3M+',
    icon: '/cmc.png',
  },
  {
    appName: 'The American Rocketry Challenge',
    title: '🚀',
    time: '2025',
    message: 'Designed rockets reaching 1,057 ft with successful egg payload recovery.',
    badge: '1057',
    icon: '/rocketry.png',
  },
];
