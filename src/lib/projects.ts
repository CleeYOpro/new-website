export type Project = {
  slug: string;
  title: string;
  description: string;
  section: 'major' | 'other' | 'poc';
  tags: string[];
  github?: string;
  live?: string;
  label?: string;
  youtube?: string;
  image: string;
  overview: string;
  problem?: string;
  constraints?: string[];
  decisions?: { title: string; body: string; reason: string; tradeoff: string }[];
  results?: string[];
  takeaways?: string[];
};

export const projects: Project[] = [
  {
    slug: 'rolecaller',
    title: 'RoleCaller',
    section: 'major',
    description:
      'Offline-first attendance platform built for tribal schools in rural India, helping over 2,500 students stay connected to their education.',
    tags: ['Python', 'SQLite', 'Offline-First', 'Education', 'React'],
    github: 'https://github.com/CleeYOpro/rolecaller',
    image: '/projects/rolecaller.svg',
    overview:
      'RoleCaller is an offline-first attendance management system designed specifically for tribal schools in rural India where internet connectivity is unreliable or completely absent. The platform enables teachers to record attendance, generate reports, and sync data whenever connectivity is available — ensuring 2,500+ students stay connected to their educational records without interruptions.',
    problem:
      'Tribal schools in rural India frequently lack reliable internet connectivity. Traditional attendance systems that depend on cloud connectivity fail entirely in these environments, leaving teachers with paper-based processes that are error-prone, time-consuming, and difficult to aggregate for reporting.',
    constraints: [
      'Must work completely offline — no network dependency for core workflows.',
      'Low-spec hardware in schools — must be lightweight and fast.',
      'Minimal training time for teachers — simple, intuitive UI.',
      'Data integrity during sync — no duplicates or lost records when connectivity resumes.',
    ],
    decisions: [
      {
        title: 'SQLite as local storage',
        body: 'All attendance data is stored locally in SQLite, providing a full relational database with zero external dependencies.',
        reason: 'SQLite is zero-config, runs entirely in-process, and handles concurrent reads well on low-spec hardware.',
        tradeoff: 'Syncing SQLite across multiple devices requires careful conflict resolution logic.',
      },
      {
        title: 'Sync-on-connect architecture',
        body: 'The app detects network availability and queues sync jobs that push local changes and pull remote updates when online.',
        reason: 'Users should never be blocked by the network. All actions queue locally and sync opportunistically.',
        tradeoff: 'Conflict resolution is complex when multiple teachers edit the same student record offline.',
      },
    ],
    results: [
      'Deployed across tribal schools supporting 2,500+ students.',
      'Reduced average attendance recording time by ~70% vs. paper-based methods.',
      'Zero data loss incidents during offline-to-online sync transitions.',
      'Adopted by school coordinators with minimal training required.',
    ],
    takeaways: [
      'Offline-first design is not just a feature — it is the foundation when connectivity cannot be assumed.',
      'Simple UX is critical when users have limited tech familiarity.',
      'SQLite is underrated for local-first apps — it is powerful and reliable.',
    ],
  },
  {
    slug: 'cmc-palliative',
    title: 'CMC Palliative Care',
    section: 'major',
    description:
      'Designed and developed a new website for the Department of Palliative Medicine at one of Asia\'s leading hospitals.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility', 'Healthcare'],
    live: 'https://cmcpalliative.in',
    image: '/projects/cmc.svg',
    overview:
      'Designed and developed a full website for the Department of Palliative Medicine at Christian Medical College (CMC) Vellore — one of Asia\'s most respected hospitals serving over 3 million patients annually. The site communicates the department\'s services, team, and philosophy clearly to patients, families, and healthcare professionals.',
    problem:
      'CMC Vellore\'s Palliative Care department had no dedicated online presence. Patients and families searching for palliative care information — often in stressful circumstances — had no accessible, clear resource to understand available services, contact the team, or find guidance.',
    constraints: [
      'Must meet hospital branding and tone guidelines — compassionate, clear, professional.',
      'Accessible to users with varying digital literacy levels.',
      'Multilingual-ready design for regional language support.',
      'Fast loading on mobile and low-bandwidth connections common in India.',
    ],
    decisions: [
      {
        title: 'Static HTML/CSS/JS stack',
        body: 'Built with plain HTML, CSS, and JavaScript without frameworks — deployable anywhere with zero runtime dependencies.',
        reason: 'Hospital IT environments often restrict framework-heavy deployments. Static files are universally hostable.',
        tradeoff: 'Less developer ergonomics vs. React/Next.js, but maximum compatibility and zero dependency risk.',
      },
    ],
    results: [
      'Delivered a fully responsive, accessible hospital department website.',
      'Live at CMC Vellore supporting 3M+ annual patient touchpoints.',
      'Designed with compassionate UX for patients and families in difficult circumstances.',
    ],
    takeaways: [
      'Good design is especially important when users are in emotionally vulnerable situations.',
      'Simplicity and clarity outperform visual complexity in healthcare contexts.',
      'Static sites remain an excellent choice for reliability and compatibility.',
    ],
  },
  {
    slug: 'seattle-earthquake-gis',
    title: 'Fault Lines & Front Lines',
    section: 'major',
    description:
      'Used GIS, Python, and spatial analysis to map earthquake risk and support emergency planning across Seattle.',
    tags: ['Python', 'GIS', 'ArcGIS', 'Spatial Analysis', 'Disaster Response'],
    image: '/projects/gis.svg',
    overview:
      "A geospatial analysis project mapping Seattle's seismic risk using GIS and Python. The project combines fault line data, soil liquefaction risk zones, infrastructure vulnerability maps, and population density to identify the highest-risk areas for earthquake impact and optimize evacuation and emergency response planning.",
    problem:
      "Seattle sits on multiple active fault systems, yet much of the city's emergency planning uses coarse-grained risk assessments. This project aimed to build a granular, data-driven seismic risk model that could directly inform emergency planning decisions.",
    constraints: [
      'Data from multiple public sources with inconsistent coordinate reference systems.',
      'Must produce actionable outputs — not just visualizations, but prioritized risk rankings.',
      'Reproducible workflow for future updates as new seismic data becomes available.',
    ],
    decisions: [
      {
        title: 'Multi-factor risk composite score',
        body: 'Combined fault proximity, soil type (liquefaction risk), building age, and population density into a single composite risk index.',
        reason: 'Single-factor analysis (just fault distance) misses major risk amplifiers like soft soil and old building stock.',
        tradeoff: 'Weighting the factors requires assumptions that can be debated by domain experts.',
      },
    ],
    results: [
      'Produced neighborhood-level seismic risk maps across all of Seattle.',
      'Identified 12 high-risk corridors overlooked by standard FEMA zone mapping.',
      'Optimized evacuation routing using network analysis on road infrastructure.',
      'Presented findings to GIS instructors and earned recognition for methodology.',
    ],
    takeaways: [
      'Spatial analysis can surface insights invisible to tabular data analysis.',
      'Multi-factor risk models are more actionable than single-variable heatmaps.',
      'Open geospatial data (USGS, census) is a powerful resource for public-good projects.',
    ],
  },
  {
    slug: 'komekare',
    title: 'KomeKare',
    section: 'major',
    description:
      'AI-powered platform that helps caregivers, families, and healthcare providers stay connected. 3rd place at the Divergent Hackathon.',
    tags: ['React', 'Python', 'AI', 'Healthcare', 'Hackathon'],
    github: 'https://github.com/CleeYOpro/komekare',
    label: '3rd Place — Divergent Hackathon',
    image: '/projects/komekare.svg',
    overview:
      'KomeKare is an AI-powered caregiving coordination platform built at the Divergent Hackathon. It connects caregivers, family members, and healthcare providers around a shared patient profile — surfacing relevant health updates, medication reminders, and care tasks through an AI assistant that synthesizes information across the care network.',
    problem:
      'Caregiving is often fragmented across family members, professional caregivers, and medical providers who lack a shared view of the patient. Critical information gets lost in text threads, paper notes, and verbal handoffs — leading to missed medications, duplicated tasks, and poor outcomes.',
    decisions: [
      {
        title: 'AI summary layer over structured data',
        body: 'An LLM synthesizes health logs, medication schedules, and notes into natural-language summaries for each stakeholder.',
        reason: 'Different stakeholders need different views. A caregiver needs a quick task list; a doctor needs a clinical summary.',
        tradeoff: 'LLM responses can hallucinate — care data requires careful prompt engineering and validation.',
      },
    ],
    results: [
      'Won 3rd place at the Divergent Hackathon.',
      'Built a working prototype in under 48 hours.',
      'Demonstrated AI-synthesized care summaries for multiple stakeholder types.',
    ],
    takeaways: [
      'Hackathon speed requires ruthless prioritization of the demo-able core.',
      'Healthcare AI requires extra attention to accuracy — hallucinations are unacceptable in care contexts.',
      'Coordination problems are often better solved by better information flow than new features.',
    ],
  },
  {
    slug: 'price-it-right',
    title: 'Price It Right',
    section: 'other',
    description:
      'Interactive market simulator showing how price affects demand, profit, and revenue with dynamic charts and market events.',
    tags: ['TypeScript', 'React', 'Economics', 'Data Viz', 'Education'],
    live: '#',
    image: '/projects/price-it-right.svg',
    overview:
      'An interactive economics simulator that teaches pricing strategy, supply & demand, and profit optimization through real-time visual feedback. Users adjust prices using sliders and see instant updates to demand curves, revenue, and profit — with random market events that force adaptive decision-making.',
    results: [
      'Visualizes economic concepts through interactive, real-time charts.',
      'Covers pricing strategy, elasticity, supply & demand, and profit optimization.',
      'Used as a learning tool in economics coursework.',
    ],
    takeaways: [
      'Interactive visualization makes abstract economic concepts immediately intuitive.',
      'Good educational tools reduce the gap between theory and understanding.',
    ],
  },
  {
    slug: 'azoto-column',
    title: 'Project AzotoColumn',
    section: 'other',
    description:
      'Filters runoff through layered bioretention media, reducing harmful chemicals while supporting diverse farm conditions.',
    tags: ['Eco Engineering', 'Data Analysis', 'Research', 'Environmental Science'],
    image: '/projects/azoto-column.svg',
    overview:
      'A bioretention research project designing a layered filtration column that removes harmful nitrogen and phosphorus compounds from agricultural runoff. The project tested multiple media compositions and flow rates, analyzing filtration efficiency across different soil and crop conditions.',
    results: [
      'Demonstrated effective nitrate removal across multiple media configurations.',
      'Produced a research poster and technical report.',
      'Designed a scalable system adaptable to different farm conditions.',
    ],
    takeaways: [
      'Engineering solutions to environmental problems require iterative physical experimentation.',
      'Data analysis skills transfer directly to research contexts.',
    ],
  },
  {
    slug: 'wordle-whiz',
    title: 'Wordle Whiz',
    section: 'poc',
    description:
      'An interactive Wordle-solving tool built in Python that filters words based on clues using input logic and clean UI.',
    tags: ['Python', 'Game', 'Algorithms'],
    github: 'https://github.com/CleeYOpro/wordle-whiz',
    image: '/projects/wordle-whiz.svg',
    overview:
      'A Wordle solver built using CMU CS Academy Python. The tool interactively filters the word list based on green/yellow/grey clues, visually displaying remaining candidates and automatically converging on the solution with entropy-based guess selection.',
    results: [
      'Solves Wordle in an average of 3.4 guesses.',
      'Built an interactive visual interface with color-coded feedback.',
    ],
    takeaways: [
      'Constraint satisfaction problems are elegant to solve with iterative filtering.',
      'Information theory (entropy) provides a principled approach to optimal guessing.',
    ],
  },
  {
    slug: 'tarc-rocket',
    title: 'TARC Rocket',
    section: 'poc',
    description:
      'Model rocket built for TARC nationals — reached 1,057 ft with successful egg payload recovery after qualifying nationally.',
    tags: ['Rocketry', 'CAD', '3D Printing', 'Aerospace Engineering'],
    image: '/projects/tarc-rocket.svg',
    overview:
      "Our rocketry team designed, built, and flew a model rocket carrying an egg payload for the Team America Rocketry Challenge (TARC). After multiple iterative launches, design revisions, and recovery system improvements, we qualified for nationals — achieving near-perfect altitude scores and successful egg recovery.",
    results: [
      'Qualified for TARC nationals.',
      'Achieved 1,057 ft apogee — within 3% of target.',
      'Successful egg payload recovery with zero breakage.',
    ],
    takeaways: [
      'Physical engineering requires rapid iteration — failures are data, not setbacks.',
      'Recovery system design is as critical as propulsion in model rocketry.',
      'Team coordination under competition pressure is a skill in itself.',
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const majorProjects = projects.filter((p) => p.section === 'major');
export const otherProjects = projects.filter((p) => p.section === 'other');
export const pocProjects = projects.filter((p) => p.section === 'poc');
