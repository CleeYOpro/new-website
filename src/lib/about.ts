import type { Moment } from '@/components/MomentsAlbum';

// About page content. The site AI reads this too (src/lib/ai-context.ts), so
// anything added here is something the chat can answer about.
// `**text**` in bullets renders bold.

export type ExpMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'youtube'; id: string; title: string };

const EXP_IMG = '/projects/images/experience';

export const aboutBio = [
  "Hey, I'm Cleo. I'm a high school student and a full-stack developer, and the thing I care about most with anything I build is whether people can actually use it.",
  'Most of what I\'ve worked on sits somewhere between software, GIS, healthcare, and education: an offline attendance app for tribal schools in Jharkhand, earthquake risk maps for Seattle, a website for a palliative care department in Vellore. I like taking an idea from a rough concept all the way to something real, usually with a team.',
  "Right now, I'm spending most of my time on full-stack development, remote sensing, computer vision, and AI. Outside of that, I'm taking college classes at Bellevue College, working on Rolecaller, and getting more involved in the geospatial community.",
];

export const experience = [
  {
    company: 'MIT Beaver Works Summer Institute',
    logo: '/beaverworks.png',
    location: 'Remote',
    role: 'Remote Sensing for Disaster Response',
    period: 'Mar 2026 - Aug 2026',
    bullets: [
      'Selected for **MIT BWSI Remote Sensing for Disaster Response** (~6% acceptance), a program on satellite imagery, GIS, SAR analysis, and disaster response.',
      'Built projects with **Google Earth Engine, Sentinel-1 SAR data, and remote sensing workflows** to analyze environmental disasters.',
      'Lectures, projects, and presentations with MIT instructors and geospatial researchers.',
    ],
    tags: ['Remote Sensing', 'GIS', 'Google Earth Engine', 'SAR', 'Satellite Imagery'],
    website: 'https://bwsi.mit.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/bwsi1.png`, alt: 'MIT Beaver Works Summer Institute' },
      { type: 'image', src: `${EXP_IMG}/bwsi2.png`, alt: 'MIT BWSI project work' },
      { type: 'image', src: `${EXP_IMG}/bwsi3.png`, alt: 'MIT BWSI remote sensing analysis' },
      { type: 'image', src: `${EXP_IMG}/bwsi4.png`, alt: 'MIT BWSI presentation' },
    ] as ExpMedia[],
  },
  {
    company: 'Rove Miles (Y Combinator W24)',
    logo: '/rove.png',
    location: 'Remote',
    role: 'Back-End Development Intern',
    period: 'Oct 2024 - Dec 2024',
    bullets: [
      'Built a **Python autocomplete system** for over **9,000 airports and cities** used in flight search workflows.',
      'Optimized large CSV datasets and improved search speed and relevance through backend data processing.',
      'Collaborated on testing and production deployment for a travel technology platform.',
    ],
    tags: ['Python', 'Backend', 'Data Processing', 'Search Systems'],
    website: 'https://www.rove.com/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/rove1.png`, alt: 'Rove Miles internship work' },
      { type: 'image', src: `${EXP_IMG}/rove2.jpg`, alt: 'Rove Miles backend development' },
    ] as ExpMedia[],
  },
  {
    company: 'Seattle Sports & Regenerative Medicine',
    logo: '/seattleregen.png',
    location: 'Seattle, WA',
    role: 'Business Strategy Analyst',
    period: 'Oct 2024',
    bullets: [
      'Conducted a **SWOT analysis** of clinic operations and identified growth opportunities.',
      'Researched healthcare regulations, marketing strategy, SEO, and online presence improvements.',
      'Presented recommendations directly to clinic leadership.',
    ],
    tags: ['Strategy', 'Healthcare', 'SEO', 'Business Analysis'],
    website: 'https://seattlesportsclinic.com/',
    linkedin: null,
    media: [] as ExpMedia[],
  },
  {
    company: 'University of Michigan',
    logo: '/umich.png',
    location: 'Ann Arbor, MI',
    role: 'Joy of Coding Summer Program',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      'Developed AI-powered face filters using **Python, OpenCV, and CNNs** for real-time facial landmark detection.',
      'Built neural networks for image classification and studied model architecture under **Prof. Raj Rao Nadakuditi**.',
    ],
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    website: 'https://ece.engin.umich.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/umich1.png`, alt: 'University of Michigan Joy of Coding' },
      { type: 'image', src: `${EXP_IMG}/umich2.png`, alt: 'Face filter and CNN project work' },
      { type: 'image', src: `${EXP_IMG}/umich3.png`, alt: 'University of Michigan program work' },
    ] as ExpMedia[],
  },
  {
    company: 'American Rocketry Challenge',
    logo: '/rocketry.png',
    location: 'United States',
    role: 'Rocket Engineer',
    period: 'Sep 2023 - Mar 2025',
    bullets: [
      'Designed, built, and tested model rockets carrying egg payloads for national competition.',
      'Qualified for **national finals** with flights reaching 800+ ft while achieving safe payload recovery.',
      'Used CAD, 3D printing, aerodynamic testing, and recovery system design to improve flight performance.',
    ],
    tags: ['CAD', '3D Printing', 'Engineering', 'Aerospace'],
    website: 'https://www.rocketrychallenge.org/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/rocket1.jpeg`, alt: 'American Rocketry Challenge rocket build' },
      { type: 'image', src: `${EXP_IMG}/rocket2.png`, alt: 'American Rocketry Challenge team' },
      { type: 'youtube', id: 'uU_0b750Agk', title: 'Rocket launch' },
    ] as ExpMedia[],
  },
  {
    company: 'Christian Medical College Vellore',
    logo: '/cmc.png',
    location: 'Vellore, Tamil Nadu, India',
    role: 'Operations Observer',
    period: 'Aug 2023',
    bullets: [
      "Observed operations at **CMC Vellore, one of Asia's leading hospitals**, working alongside administrative teams.",
      'Supported front desk operations while communicating across **4+ languages**.',
      "Visited CHIPS, the hospital's software division responsible for developing and maintaining healthcare systems.",
    ],
    tags: ['Healthcare', 'Operations', 'Technology'],
    website: 'https://www.cmch-vellore.edu/',
    linkedin: null,
    media: [
      { type: 'image', src: `${EXP_IMG}/cmc1.png`, alt: 'Christian Medical College Vellore' },
      { type: 'image', src: `${EXP_IMG}/cmc2.png`, alt: 'CMC Vellore hospital operations' },
      { type: 'image', src: `${EXP_IMG}/cmc3.png`, alt: 'CMC Vellore visit' },
    ] as ExpMedia[],
  },
];

export const education = [
  {
    institution: 'Bellevue College',
    logo: '/bc.png',
    location: 'Bellevue, WA',
    degree: 'Running Start',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      'Completing college-level coursework in **computer science, mathematics, science, and humanities** while earning an associate degree.',
      'Relevant coursework: **Data Structures, Statistics, Engineering Physics, Geography, and Political Science**.',
    ],
    tags: ['Computer Science', 'Data Structures', 'Physics', 'GIS'],
    website: null as string | null,
    linkedin: null as string | null,
  },
  {
    institution: 'Eastlake High School',
    logo: '/ehs.png',
    location: 'Sammamish, WA',
    degree: 'High School Diploma',
    period: 'Sep 2025 - Jun 2027',
    bullets: [
      'Relevant coursework: **AP Calculus BC, AP Computer Science A, AP Statistics, AP Human Geography, AP Macroeconomics**.',
      'Activities: **Computer Science Honor Society, Technology Student Association**.',
    ],
    tags: ['Computer Science', 'Mathematics', 'Engineering'],
    website: null as string | null,
    linkedin: null as string | null,
  },
];

const MOMENTS_IMG = '/projects/images/moments';

// Module-level so MomentsAlbum gets a stable reference.
export const moments: Moment[] = [
  { image: `${MOMENTS_IMG}/geoengineering.png`, title: 'Out in the Field', description: 'GeoEngineers Inc. · Snoqualamie restoration final project' },
  { image: `${MOMENTS_IMG}/10 pm in NY.jpeg`, title: '10 PM in New York', description: 'New York City, NY' },
  { image: `${MOMENTS_IMG}/indiatlas.png`, title: 'Before Google Earth', description: 'Where the obsession with maps started' },
  { image: `${MOMENTS_IMG}/rolecaller_on_theground.png`, title: 'RoleCaller: On the Ground', description: 'Field deployment · Jharkhand, India' },
  { image: `${MOMENTS_IMG}/geoguessr.png`, title: "1.3K ELO in '23", description: 'GeoGuessr · allegedly my prime' },
  { image: `${MOMENTS_IMG}/Kali Linux.jpeg`, title: 'Kali After Hours', description: 'Messing around with Kali Linux' },
  { image: `${MOMENTS_IMG}/taj.png`, title: 'Postcards from Agra', description: 'Taj Mahal · Agra, India' },
  { image: `${MOMENTS_IMG}/onstage.png`, title: 'Stage Fright', description: 'Washington TSA · somewhere on stage' },
  { image: `${MOMENTS_IMG}/docusigntower.png`, title: 'Third Avenue Interlude', description: 'Downtown Seattle, WA' },
  { image: `${MOMENTS_IMG}/kingcountygis.png`, title: 'The GIS People', description: 'King County GIS · Esri Summit 2025' },
  { image: `${MOMENTS_IMG}/tsanats.png`, title: 'Wax Paper at Nationals', description: 'TSA Nationals · Technology Problem Solving' },
  { image: `${MOMENTS_IMG}/divergent.png`, title: 'One More Commit', description: 'Divergent Hackathon · KomeKare' },
  { image: `${MOMENTS_IMG}/download.jpeg`, title: 'Heartbeat on a Breadboard', description: 'Running an ECG model on an ESP32' },
  { image: `${MOMENTS_IMG}/harvard.png`, title: 'Cambridge Interlude', description: 'Harvard University · Cambridge, MA' },
  { image: `${MOMENTS_IMG}/techboothchurch.png`, title: 'Sunday Soundcheck', description: 'Running tech at church' },
  { image: `${MOMENTS_IMG}/PXL_20260619_010845610.MP.jpg`, title: 'The Backyard Residents', description: 'One of my backyard chickens' },
  { image: `${MOMENTS_IMG}/sequence.png`, title: 'No Friendly Games', description: 'Sequence · game night' },
  { image: `${MOMENTS_IMG}/siberia.png`, title: 'Powder Day', description: 'Skiing at Mt. Baker, Washington' },
];
