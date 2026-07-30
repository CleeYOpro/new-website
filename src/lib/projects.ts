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
  pdf?: { src: string; title: string };
  image: string;
  images?: string[];
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
    title: 'rolecaller',
    section: 'major',
    description:
      'An offline-first attendance and data platform built for teachers in Malto tribal community schools in Jharkhand, India — making student attendance visible where paper records and unreliable connectivity fail.',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'PostgreSQL', 'Drizzle ORM', 'Offline-First'],
    github: 'https://github.com/CleeYOpro/rolecaller-app',
    live: 'https://rolecaller.vercel.app/',
    image: '/projects/images/rolecaller/rolecallermain.png',
    images: [
      '/projects/images/rolecaller/rolecallermain.png',
      '/projects/images/rolecaller/phone.png',
      '/projects/images/rolecaller/rolecaller.png',
    ],
    overview:
      "RoleCaller is a resilient, offline-first attendance and data platform built for the Malto community's tribal schools in the remote hills of Jharkhand, India. Geography, language barriers, and thin infrastructure have historically cut these schools off from consistent educational support — internet connectivity is a luxury and electricity is sporadic, so tools built for a connected world simply don't run there.\n\nThe project started from a personal visit, not a spec sheet. After spending time with the Malto community in 2023 and seeing the gaps firsthand, I realized that remembering what I'd seen was passive — it changed nothing on its own. A conversation with my father, gently pushing on what I actually planned to do about it, turned that awareness into RoleCaller: a tool that lets teachers capture attendance data on a device that already assumes the network doesn't exist, and treats connectivity as a bonus rather than a requirement.",
    problem:
      "Without a reliable way to record attendance, a student's absence becomes invisible. Kids in these communities often walk dangerous paths for hours to reach school, and miss days for family obligations, illness, or seasonal work — but with attendance scattered across paper registers, no one can see the pattern until a child has effectively dropped out. The instability is systemic, not a motivation problem, but there was no data trail to prove it, intervene early, or make the case for scholarships and continued schooling.\n\nCommunity leaders were also explicit about what the tool could not become: 'We do not want to become the police.' Any system that turned attendance tracking into surveillance or an imposition of outside productivity norms would undermine the trust it depended on.",
    constraints: [
      'Must run fully offline — teachers may go days without a signal, and the app cannot depend on a live connection for any core workflow.',
      'Targets low-end, sub-$100 Android devices with sporadic electricity — no heavy runtime or background overhead.',
      'Teachers may sync at most once a day — when a connection does appear, sync must be fast, safe, and never lose a day\'s work.',
      'Must support educator judgment, not enforce compliance — visibility for teachers and coordinators, not surveillance of students or staff.',
    ],
    decisions: [
      {
        title: 'Local-first SQLite with a custom "Pulse" sync engine',
        body: "Each teacher's device treats its local Expo SQLite database as the single source of truth. A custom sync engine watches for a stable network connection, then pushes unsynced attendance records to a Node.js API backed by Postgres (Neon), and pulls fresh roster data back down. Pushed records aren't marked as synced locally until the server confirms a 200 OK, and the API upserts on conflict — so a crash mid-sync or a duplicated request never corrupts or loses data. Pulling roster updates does a 'smart wipe' that refreshes students and classes while strictly preserving any attendance a teacher hasn't synced yet.",
        reason: 'Teachers can\'t be blocked by the network, and a rare, unreliable connection window is the only chance to sync — so every push has to be atomic and every pull has to protect work already sitting on the device.',
        tradeoff: 'The push/pull protocol and smart-rehydration logic are more code to maintain than a naive "just sync everything" approach, but a naive approach risks silently dropping a day of attendance.',
      },
      {
        title: 'UUID v4 identifiers across every entity',
        body: 'Schools, classes, students, and attendance records all use UUID v4 primary keys, generated on-device at creation time rather than assigned by a central server.',
        reason: 'A device with no connectivity still needs to create valid, permanent records for new students or classes. UUIDs let it do that without ever asking a server for the next ID, and they slot into Postgres later without collisions.',
        tradeoff: 'UUIDs are larger and less human-readable than auto-incrementing integers, and require care in the schema and API layer to index and join efficiently.',
      },
      {
        title: 'Raw Node.js HTTP API with Drizzle ORM over Neon Postgres',
        body: 'The backend skips Express/NestJS in favor of a raw Node.js HTTP server with a shared connection pool, and uses Drizzle ORM to generate type-safe SQL with effectively zero runtime overhead.',
        reason: 'Sync bursts from many devices reconnecting at once need to be handled quickly on modest server hardware — minimizing framework overhead and cold starts matters more here than developer convenience.',
        tradeoff: 'Losing framework conveniences (routing, middleware, validation) means more boilerplate has to be written and maintained by hand.',
      },
      {
        title: 'Offline-capable authentication',
        body: 'Online logins authenticate against the API and cache a hashed "session snapshot" locally. If a teacher opens the app with no signal, RoleCaller falls back to verifying credentials against that cached, hashed record instead of failing closed.',
        reason: 'A teacher who hikes to a remote school needs to log in and keep working for days without ever seeing a signal tower — an app that requires a live login check would be unusable there.',
        tradeoff: 'Caching credentials on-device, even hashed, expands the local attack surface and requires careful handling compared to a stateless, always-online auth flow.',
      },
    ],
    results: [
      'Received board approval from FMPB in January 2026 to begin deployment across Malto community schools.',
      'Rollout is deliberately staged — starting with RCPSC and smaller schools before scaling to larger centers, to build trust before expanding.',
      'Built a working local-first architecture (SQLite edge, Postgres core, custom sync engine) that lets a teacher record attendance for days with zero connectivity and sync losslessly on reconnect.',
      'Designed alongside community leaders to keep the tool supportive rather than coercive, in line with explicit feedback against a "policing" framing.',
    ],
    takeaways: [
      'Awareness by itself changes nothing — the harder, more useful step is turning what you\'ve seen into something concrete and usable.',
      'Respecting a community\'s values (no surveillance, no imposed productivity norms) is as much a design constraint as any technical one.',
      'Offline-first has to be a first-class assumption in every layer — IDs, auth, and sync all break if you bolt it on after the fact instead of designing for a missing network from the start.',
      'A cautious, staged rollout (small schools first) is often the right call for tools that affect real communities, even when the temptation is to scale immediately.',
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
      "A TSA Geospatial Technology portfolio mapping King County's seismic risk — fault lines, liquefaction zones, unreinforced masonry buildings, and emergency infrastructure — to predict earthquake impact and guide disaster planning for Seattle. 1st Place at the WTSA State Conference; competed at TSA Nationals in Nashville.",
    tags: ['Python', 'GIS', 'ArcGIS', 'Spatial Analysis', 'Disaster Response'],
    github: 'https://github.com/CleeYOpro/seattle_fault_project',
    label: '1st Place — WTSA State Conference · TSA Nationals',
    pdf: {
      src: '/projects/images/seattle-earthquake-gis/geospatial-technology-2025-portfolio.pdf',
      title: 'Geospatial Technology 2025 Portfolio',
    },
    image: '/projects/images/seattle-earthquake-gis/cover.png',
    images: [
      '/projects/images/seattle-earthquake-gis/wtsa-state-1st-place.png',
      '/projects/images/seattle-earthquake-gis/analysis-mmi-aftershocks.png',
      '/projects/images/seattle-earthquake-gis/analysis-aftershock-intensity.png',
    ],
    overview:
      "Fault Lines & Front Lines is a geospatial analysis portfolio built for TSA's (Technology Student Association) Geospatial Technology event, whose 2024–2025 theme asked teams to identify a disaster threat facing their community. Our team (King County, Washington) focused on seismic risk: King County sits in the Pacific Ring of Fire, within the Puget Sound region, either near or on top of several faults — the Seattle Fault, the Tacoma Fault, and the Cascadia Subduction Zone — and is flanked by active volcanoes like Mount Rainier and Mount Baker. The 2001 magnitude-6.8 Nisqually earthquake is the most recent reminder of that exposure.\n\nWe pulled fault line, liquefaction, floodplain, bridge-condition, unreinforced masonry building, and emergency-services data from sources like the USGS Earthquake Catalog, King County GIS Open Data, Seattle GeoData, and Esri's federal fault datasets, then combined and overlaid it in eight analysis maps to identify Seattle's highest-risk zones and inform evacuation and shelter-in-place guidance.",
    problem:
      "Seattle is the most populous city in Washington, and its residents face outsized risk in a major earthquake: dense downtown neighborhoods sit close to the Seattle Fault, over a thousand unreinforced masonry (URM) buildings predate 1945 and were never secured to code, and roughly 2,000 miles of underground wastewater pipeline crisscross known fault zones. Emergency planning needed a way to see where fault activity, unstable soil, vulnerable buildings, and critical infrastructure actually overlap — not just where earthquakes have historically been recorded.",
    constraints: [
      'Source data came from many different public portals (USGS, King County GIS, Seattle GeoData, FEMA, Esri) with inconsistent formats and no single unified schema.',
      "The Seattle population density dataset alone held ~27,000 census-block records — too dense to render as a single readable map.",
      'Findings had to be communicated to non-technical judges and the public through a written analysis and infographic, not just raw maps.',
      'Earthquake location, timing, and magnitude are fundamentally unpredictable — any "prediction" had to be framed as a probabilistic estimate, not a forecast.',
    ],
    decisions: [
      {
        title: 'Averaging historical epicenters to model a plausible future earthquake',
        body: "Rather than guessing at a location, we averaged the epicenter coordinates of all 2.5M+ earthquakes recorded in the area from 1900–2025 (Figure 1's data) using NumPy to produce a probable future epicenter, then used the empirical relationship Area (km²) = 10^(0.5M − 1.8) to size a predicted M7.0 impact radius around it, and overlaid that against URM building locations.",
        reason: 'A geographic average of real historical activity is a defensible, reproducible way to pick a hypothetical epicenter for impact modeling, instead of arbitrarily placing it downtown for dramatic effect.',
        tradeoff: 'Averaging treats all historical earthquakes as equally informative regardless of magnitude or recency, so the resulting point is a statistical center of past activity rather than a true seismological forecast.',
      },
      {
        title: 'ETAS modeling for aftershock intensity, converted to Modified Mercalli Intensity',
        body: 'We implemented an Epidemic-Type Aftershock Sequence (ETAS) model in Python/NumPy to estimate the spatial and temporal intensity of aftershocks following a simulated M7.0 event, then converted the resulting log-scale intensity into Peak Ground Acceleration and finally into the Modified Mercalli Intensity (MMI) scale so the result would be interpretable by non-scientists.',
        reason: "Aftershock risk is usually reported in scientific units (PGA, log-intensity) that mean little to city planners or the public; MMI is the scale used in Seattle's own hazard planning documents, so converting to it made the output directly usable.",
        tradeoff: 'The conversion relies on an approximate PGA-to-MMI regression rather than region-specific attenuation data, so absolute MMI values are indicative rather than precise.',
      },
      {
        title: 'Composite hazard-per-structure overlay instead of single-factor maps',
        body: 'Analysis Map #2 layers liquefaction-prone areas, FEMA floodplain boundaries, and an average-hazards-per-structure grid on top of each other, rather than presenting each hazard as its own separate map.',
        reason: 'Liquefaction, flooding, and structural risk compound each other in the same low-lying neighborhoods (e.g. South and West Seattle) — showing them separately hides that overlap, which is exactly where mitigation resources should be prioritized.',
        tradeoff: 'Overlaying multiple choropleth layers makes the map denser and harder to read at a glance than a single-variable heatmap.',
      },
    ],
    results: [
      'Won 1st Place in Geospatial Technology at the Washington TSA State Conference, qualifying for TSA Nationals in Nashville, Tennessee.',
      'Compiled and cited 8 original analysis maps spanning fault lines, bridge seismic risk, liquefaction/flood overlays, unreinforced masonry buildings, emergency services, wastewater infrastructure, and aftershock modeling.',
      'Built Python/NumPy models (mean-epicenter estimation, ETAS aftershock intensity, PGA→MMI conversion) to move from raw historical earthquake data to an interpretable predicted-impact map.',
      "Concluded that a magnitude 6M+ earthquake on the Seattle Fault could cause at least $50 billion in damage, given Seattle's population (~755,000) and concentration of tech-sector employment relative to the 2001 Nisqually earthquake's ~$4 billion in damage near much-smaller Olympia.",
    ],
    takeaways: [
      "Overlaying independent hazard layers (faults, soil, buildings, infrastructure) surfaces compounding risk that no single-variable map reveals on its own — the danger is in the overlap, not any one layer.",
      'A geospatial finding is only as useful as its translation into plain guidance — our biggest actionable conclusion was as simple as "shelter in place, don\'t evacuate over an unstable bridge."',
      'Public GIS data (USGS, county open-data portals, FEMA) is fragmented across many sources with different formats, and reconciling it is most of the real work in a project like this.',
      "Modeling something as unpredictable as an earthquake still has value when framed honestly as a probabilistic estimate (e.g. an averaged epicenter, an ETAS aftershock model) rather than a false forecast.",
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
