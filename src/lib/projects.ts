export type Project = {
  slug: string;
  title: string;
  description: string;
  section: 'major' | 'other' | 'poc';
  tags: string[];
  github?: string;
  githubSecondary?: { label: string; url: string };
  live?: string;
  figma?: string;
  medium?: string;
  competition?: { label: string; url: string };
  note?: string;
  label?: string;
  logo?: string;
  youtube?: string;
  videos?: { id: string; vertical?: boolean; title: string }[];
  pdf?: { src: string; title: string };
  book?: { src: string; title: string };
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
    medium: 'https://medium.com/@cleobala/part-ii-when-awareness-isnt-enough-334041dedbc7',
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
      "Designed and developed a new website for the Department of Palliative Medicine at one of Asia's leading hospitals. This development build is 100% my own work — the finalized version is now live on CMC Vellore's official website.",
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility', 'Healthcare'],
    github: 'https://github.com/CleeYOpro/CMC-project',
    live: 'https://palliativecmc.vercel.app/',
    figma: 'https://www.figma.com/design/sEMG9yQQuUYJWT31b7lcaS/The-WEBSITE?t=7mCi8uphmP4S75vO-1',
    note:
      "The live demo above is my development build — every page, section, and line of code in it is 100% my own work. The finalized version of this project has since been integrated into CMC Vellore's official hospital website, live at [cmch-vellore.edu/departments](https://www.cmch-vellore.edu/departments/).",
    image: '/projects/images/cmc/mainpage.png',
    images: [
      '/projects/images/cmc/mainpage.png',
      '/projects/images/cmc/contact.png',
      '/projects/images/cmc/footer.png',
    ],
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
    image: '/projects/images/seattle-earthquake-gis/analysis-mmi-aftershocks.png',
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
    tags: ['Expo', 'React Native', 'Firebase', 'Zustand', 'Gemini 1.5 Flash', 'NativeWind'],
    github: 'https://github.com/CleeYOpro/viceversa',
    githubSecondary: {
      label: 'Provider Repo',
      url: 'https://github.com/nikhilvincentv/care-sync-provider-viceversa',
    },
    label: '3rd Place — Divergent Hackathon',
    pdf: {
      src: '/projects/komekare/hackathon-project.pdf',
      title: 'Hackathon Project',
    },
    image: '/projects/komekare.svg',
    overview:
      "KomeKare is an AI-powered family caregiver coordination app built natively with Expo and Firebase at the Divergent Hackathon, where it placed 3rd. It links caregivers, family members, and healthcare providers around a shared patient profile, using Google's Gemini 1.5 Flash model to summarize care data into insights each stakeholder can actually act on.",
    problem:
      'Caregiving is often fragmented across family members, professional caregivers, and medical providers who lack a shared view of the patient. Critical information gets lost in text threads, paper notes, and verbal handoffs — leading to missed medications, duplicated tasks, and poor outcomes.',
    decisions: [
      {
        title: 'Native Expo app with Firebase as the backend',
        body: 'Built as a native React Native app with Expo, backed entirely by Firebase — Auth for identity, Firestore and the Realtime Database for care data, and Storage for uploads.',
        reason: 'A 48-hour hackathon timeline meant we needed a backend that required zero server setup, had generous free-tier limits, and gave us real-time data sync between caregivers, family, and providers out of the box.',
        tradeoff: 'Firebase\'s NoSQL model and vendor lock-in trade off long-term data-modeling flexibility for the speed of shipping a working real-time app in a weekend.',
      },
      {
        title: 'Zustand with AsyncStorage-backed persistence',
        body: 'Client state (current patient profile, session, cached care data) is managed with Zustand, using a persistence middleware bound to AsyncStorage so state survives app restarts.',
        reason: 'Zustand\'s minimal boilerplate let us wire up shared state across screens quickly without the ceremony of Redux, while still getting durable local persistence for free.',
        tradeoff: 'Less structure than a more opinionated state library, which requires more discipline as the app grows to avoid ad-hoc state shapes.',
      },
      {
        title: 'Gemini 1.5 Flash for AI care insights',
        body: 'Health logs, medication schedules, and caregiver notes are summarized by Google Gemini 1.5 Flash into natural-language insights surfaced to each stakeholder.',
        reason: 'Different stakeholders need different views of the same data — a caregiver needs a quick task list, a family member needs a plain-language update, a provider needs a clinical summary. Flash gave us low-latency summarization that fit a live demo.',
        tradeoff: 'LLM responses can hallucinate, so care-related summaries need careful prompting and framing as assistive, not authoritative, especially under hackathon time pressure to harden that further.',
      },
    ],
    results: [
      'Won 3rd place at the Divergent Hackathon.',
      'Built a working native Expo/Firebase prototype in under 48 hours.',
      'Demonstrated Gemini-generated care summaries tailored to caregiver, family, and provider stakeholder views.',
    ],
    takeaways: [
      'Hackathon speed requires ruthless prioritization of the demo-able core.',
      'Healthcare AI requires extra attention to accuracy — hallucinations are unacceptable in care contexts.',
      'Coordination problems are often better solved by better information flow than new features.',
    ],
  },
  {
    slug: 'port-laken',
    title: 'Port Laken',
    section: 'major',
    description:
      "An AI-powered civic portal for Port Laken, a fictional city (inspired by Port Angeles, WA) built to demonstrate what a modern local-government website could look like — resource directory, alerts, maps, and a Gemini-powered assistant on top of Next.js and Firebase. Placed 8th at WTSA 2026.",
    tags: ['Next.js', 'React', 'Firebase', 'Gemini AI', 'Leaflet', 'Framer Motion', 'Civic Tech'],
    github: 'https://github.com/CleeYOpro/portLakenWeb',
    live: 'https://tsa-plkn123.vercel.app/',
    label: '8th Place — WTSA 2026',
    image: '/projects/images/portlaken/hero.png',
    images: [
      '/projects/images/portlaken/hero.png',
      '/projects/images/portlaken/about.png',
      '/projects/images/portlaken/resource-directory.png',
      '/projects/images/portlaken/resource-detail.png',
      '/projects/images/portlaken/footer-signin.png',
    ],
    overview:
      "Port Laken is an AI-powered civic portal for a fictional city inspired by Port Angeles, WA, built strictly for educational and demonstration purposes. It's a deep dive into what a modern municipal website could be if it borrowed high-end web development practices — App Router SSR, real-time backends, and LLM-assisted search — instead of the static, form-heavy templates most city sites still ship. The app is highly modular: Next.js App Router handles rendering and navigation, Firebase covers auth and data, and Google's Gemini API powers a context-bound assistant that helps residents find civic resources without hallucinating answers.",
    problem:
      "Most city government websites bury the information residents actually need — where to find food assistance, healthcare, emergency services — behind dense PDFs and disconnected department pages, with no way to just ask a question and get a grounded answer. Port Laken was built to show that a civic portal can be both visually excellent and genuinely useful: a resource directory that aggregates and lets the community contribute to, an AI assistant that answers only from real local data, and alert/transit tooling residents would actually use.",
    constraints: [
      'The AI assistant must never hallucinate civic information — a wrong answer about emergency resources is worse than no answer.',
      'Community-submitted resources need a moderation gate so the directory can\'t be spammed or polluted with unapproved listings.',
      'Maps rely on Leaflet, which depends on `window` and cannot run during Next.js server rendering.',
      'Protected flows (submitting a resource, managing alerts) must return users to where they left off after sign-in, not just dump them on a generic dashboard.',
    ],
    decisions: [
      {
        title: 'RAG-style prompt grounding without a vector database',
        body: 'A local buildAiContext function assembles the AI\'s entire knowledge on the fly: the user\'s query, a hand-written PAGE_CONTEXTS map summarizing every page in the app, and the JSON of whatever civic resources are currently filtered. The Gemini 2.5 Flash prompt is instructed to answer using only that bundled JSON, and to return a structured object (text, pageContextKey, address) instead of free-form prose.',
        reason: 'The resource dataset is small enough that a full vector database and embedding pipeline would be overkill — dumping the relevant JSON directly into the prompt gets the same grounding guarantee with far less infrastructure.',
        tradeoff: 'This approach doesn\'t scale to a large resource catalog the way real retrieval would, and every query re-sends the full filtered dataset rather than just the top-k relevant matches.',
      },
      {
        title: 'Dual-source resource directory: hardcoded seed data plus Firestore submissions',
        body: 'The Resource Directory merges a hardcoded RESOURCES array with live community submissions pulled from Firestore, filtered to approvalStatus == "approved". New submissions default to "pending" and stay invisible until an administrator flips that flag.',
        reason: 'Launching with zero listings would make the directory useless on day one, but letting the community contribute is the actual long-term value — seeding it while gating public submissions behind moderation gets both.',
        tradeoff: 'Two data sources means every read path (and the AI context builder) has to merge and dedupe them consistently instead of querying one collection.',
      },
      {
        title: 'Dynamically imported, SSR-disabled Leaflet maps',
        body: 'Maps & Transport uses react-leaflet with ssr: false in its dynamic import, so Leaflet only ever initializes client-side.',
        reason: 'Leaflet reads `window` at import time, which crashes during Next.js server rendering — disabling SSR for just that component keeps the rest of the app server-rendered.',
        tradeoff: 'The map component pays a client-side loading gap since it can no longer be part of the server-rendered HTML.',
      },
      {
        title: 'callbackUrl-based auth redirects',
        body: 'Protected actions (submitting a resource, managing alerts) redirect to /sign-in with a callbackUrl query param, so Firebase Auth sends the user back to the exact page they were trying to reach.',
        reason: 'Forcing a resident who just wanted to submit a food pantry listing through a generic post-login landing page adds friction that a government site can\'t afford if it wants real community participation.',
        tradeoff: 'Every protected route needs to consistently construct and read that redirect param, which is easy to miss when adding new protected flows.',
      },
    ],
    results: [
      'Placed 8th at the WTSA 2026 state conference.',
      'Built a working Gemini-grounded AI assistant that answers only from local page context and live resource data, with structured (not free-form) output.',
      'Shipped a full civic-portal feature set — resource directory with moderation, alerts with Resend email dispatch, Leaflet transit maps, and callback-aware authentication.',
      'Designed as an open-source design-philosophy reference, with the goal of showing it to nearby city governments (Snoqualmie, Carnation, Sammamish, Kirkland) as a model for modernizing their own municipal sites.',
    ],
    takeaways: [
      'Grounding an LLM against a small, well-organized local dataset can beat a full RAG pipeline — the constraint is prompt discipline, not infrastructure.',
      'A moderation gate (pending vs. approved) is what makes community-submitted content safe to combine with curated seed data.',
      'Framing a project as fictional/educational (Port Laken vs. a real city) freed up ambitious design and feature choices that would be harder to greenlight on a real municipal contract.',
      'A polished demo is a means, not the end goal — the real test is whether an actual city government would want to adopt the approach.',
    ],
  },
  {
    slug: 'price-it-right',
    title: 'Price It Right',
    section: 'other',
    description:
      'Interactive pricing + demand business simulator — adjust price to see demand, revenue, and profit shift in real time, with market twist events like crashes and new competitors. Now used as official teaching material in Tesla STEM High School\'s Business & Econ class.',
    tags: ['React', 'TypeScript', 'Vite', 'Chart.js', 'Tailwind CSS', 'Economics'],
    github: 'https://github.com/CleeYOpro/demandprice_pro',
    live: 'https://priceprofit.cleof.us/',
    image: '/projects/images/priceitright.png',
    images: ['/projects/images/priceitright.png'],
    overview:
      "Price It Right is an interactive pricing and demand simulator built with React, TypeScript, and Vite. Users drag a price slider and watch demand, revenue, and profit update live via Chart.js — with random market twist events (a crash, a new competitor, a viral trend) that force them to react rather than just observe. It was built as a final project to teach the pricing and supply & demand unit in Tesla STEM High School's Business & Econ class, and has since been adopted as official teaching material for that course.",
    problem:
      "Pricing, elasticity, and profit optimization are usually taught through static graphs and formulas — Profit = (Price − Cost) × Demand — that describe the relationship between price and demand without letting a student feel it change. Students could recite that raising price lowers demand, but had no hands-on way to explore the shape of that tradeoff or see how external shocks (a competitor entering, a market crash) shift the optimal price.",
    decisions: [
      {
        title: 'Live Chart.js demand curve driven by a single price slider',
        body: 'A single responsive slider controls price; every change recalculates demand via an elasticity function and immediately redraws the Chart.js demand curve alongside live revenue and profit figures.',
        reason: 'Immediate visual feedback turns an abstract formula into something students can explore by trial and error — moving the slider and watching profit peak then fall communicates elasticity far faster than a lecture.',
        tradeoff: 'A single simplified elasticity model is less rigorous than a full econometric demand model, trading realism for something intuitive enough to teach with in one class period.',
      },
      {
        title: 'Randomized market events layered on top of the base simulation',
        body: 'A "Trigger Random Event" action can inject a market crash, a new competitor, or a viral trend, each temporarily reshaping the demand curve and forcing the student to re-find their optimal price.',
        reason: "Static pricing exercises teach students to find one right answer; real markets don't hold still. Random events push students to practice adaptive pricing strategy, not just curve-reading.",
        tradeoff: 'Randomized events make outcomes less repeatable for direct classroom comparison between students, which the "Reset Market" control offsets by letting a scenario be replayed from a clean state.',
      },
    ],
    results: [
      'Adopted as official teaching material in Tesla STEM High School\'s Business & Econ class for the Pricing, Supply & Demand, Game Theory, and Econ Strategy units.',
      'Visualizes pricing strategy, elasticity, and profit optimization through a live, interactive demand curve rather than static graphs.',
      'Fully responsive slider-driven UI that models Profit = (Price − Cost) × Demand and Revenue = Price × Demand in real time.',
    ],
    takeaways: [
      'A tool built to teach yourself a concept can end up teaching a whole classroom — this started as a personal final project and became course material.',
      'Interactive visualization makes abstract economic concepts immediately intuitive in a way static graphs and formulas can\'t.',
      'Introducing randomness (market events) on top of a clean simulation is what turns a demo into a genuine practice tool for strategic thinking.',
    ],
  },
  {
    slug: 'azoto-column',
    title: 'Project AzotoColumn',
    section: 'other',
    description:
      "A bioretention system that filters nitrogen-heavy farm runoff through layered soil, sand, and gravel, then pumps the cleaned water back for irrigation. Built for TSA's Engineering Design event on the theme \"Managing the Nitrogen Cycle\" — placed 4th at the WTSA State Conference and was presented at TSA Nationals.",
    tags: ['Engineering Design', 'Bioretention', 'Environmental Science', 'Prototyping', 'TSA'],
    label: '4th Place — WTSA State Conference · TSA Nationals',
    book: {
      src: '/projects/azoto-column-portfolio.pdf',
      title: 'Engineering Design Portfolio',
    },
    image: '/projects/images/azoto-column/main.jpg',
    overview:
      'The AzotoColumn is a bioretention system built for TSA\'s Engineering Design event, whose theme that year was "Managing the Nitrogen Cycle." Excess nitrogen from fertilizer runoff drives eutrophication and dead zones in nearby waterways, so our team designed a border-line filtration column — soil, sand, and gravel layered around nitrogen-fixing plants like clover — that a farm\'s runoff naturally flows into by gravity before a pump returns the cleaned water for irrigation. We named it the AzotoColumn after "Azoto," Greek for nitrogen.\n\nWe landed on the bioretention design after scoring it against two other concepts — an AI-driven soil-sensor network and selective catalytic reduction for vehicle exhaust — on cost, effectiveness, and maintenance, then spent most of the season iterating on a physical prototype: testing water flow and nitrogen levels, chasing down leaks, and tuning the soil layering until the numbers held up.',
    problem:
      'Nitrogen-rich fertilizer runoff is a major driver of eutrophication: it feeds algal blooms in nearby lakes and rivers that die off, consume dissolved oxygen, and leave "dead zones" where aquatic life can\'t survive. The same runoff can leach into groundwater and drinking supplies at levels linked to health risks like blue baby syndrome. Farms need a way to keep using nitrogen fertilizer without losing most of it to runoff.',
    constraints: [
      'Had to be buildable and testable as a physical scale prototype within a school year, not just a paper design.',
      'Needed to hold water without leaking for accurate flow-rate and nitrogen-level testing.',
      'Had to stay affordable and installable on real farmland without disrupting existing operations.',
      'Needed to work across different soil types, rainfall levels, and farm layouts rather than one specific site.',
    ],
    decisions: [
      {
        title: 'Choosing bioretention over an AI sensor network or catalytic reduction',
        body: 'We scored our three candidate solutions — a bioretention filtration area, an AI-driven soil/moisture sensor network, and selective catalytic reduction for vehicle exhaust — in a Pugh chart against cost, effectiveness, accessibility, maintenance, and water resistance. Bioretention came out on top (+2) over the sensor network (0) and catalytic reduction (-2).',
        reason: 'The sensor network and catalytic reduction both required expensive, specialized hardware and ongoing maintenance, while bioretention reuses passive, low-cost materials (soil, sand, gravel, plants) that farmers can maintain themselves once installed.',
        tradeoff: 'Bioretention needs more physical space and upfront digging/layering work than a sensor-based system would, making it a harder fit for very small farms.',
      },
      {
        title: 'Switching to a pre-built container after chasing a 446 mL leak',
        body: 'Our first water reservoir was hand-cut plastic sheets sealed with hot glue and duct tape. During testing it lost 446 mL of water we couldn\'t account for. We isolated the cause by testing the mesh filter and tubing in controlled side-tests, ruling both out, before confirming the leak was coming from uneven, hand-cut seams in the container itself. Switching to a pre-built, slightly curved storage container cut the leak down to 50 mL, and a custom 3D-printed seal around the pump intake eliminated it entirely.',
        reason: 'Any leaked water directly corrupted our flow-rate and nitrogen-level test data, so a watertight reservoir wasn\'t a nice-to-have — it was a prerequisite for trusting any of our test results.',
        tradeoff: 'A pre-built container is less customizable to the prototype\'s exact internal shape than a hand-built one, which introduced its own fitting and stability issues we had to solve separately.',
      },
      {
        title: 'Concentrating perlite in the top third of the soil layer',
        body: 'After nitrogen testing showed elevated nitrate levels in the filtered water — a sign the soil wasn\'t retaining nitrogen well — we tested adding perlite (a lightweight, porous volcanic glass) at different soil depths. Placing it only in the top third of the layer improved ammonium infiltration into the soil while a perlite-free bottom layer kept porosity low there, limiting how much nitrogen could leach through into the collected water.',
        reason: 'Testing multiple placements directly, rather than assuming "more perlite is better," revealed a real depth-dependent tradeoff — top-heavy placement helped infiltration without also opening up leaching paths lower down.',
        tradeoff: 'This layering is more finicky to construct consistently than a uniform soil mix, and depends on getting the soil composition right in the first place.',
      },
    ],
    results: [
      'Filtration dropped nitrate from 25 ppm to 5 ppm and ammonium from 15 ppm to 3 ppm across our water samples, with pH staying stable through the process.',
      'Reduced prototype volume by 75% and cut reservoir leakage from 446 mL to effectively zero after redesigning the water container and pump seal.',
      'Estimated a full one-acre installation (excavation, lining, filtration media, pump, sensors, grading) at roughly $17,600 — expensive upfront, but offset over time by reduced fertilizer and irrigation costs.',
      'Placed 4th at the WTSA State Conference and went on to present the project at TSA Nationals.',
    ],
    takeaways: [
      'A structured comparison (Pugh chart) across cost, effectiveness, and maintenance made the case for a "low-tech" bioretention design over flashier AI-sensor or catalytic-reduction ideas.',
      'Physical prototypes surface failure modes a diagram never will — our worst leak came from hand-cut plastic seams we hadn\'t considered a risk until the data didn\'t add up.',
      'Iterating on where a material goes (perlite in the top third, not mixed throughout) can matter as much as which material is chosen at all.',
    ],
  },
  {
    slug: 'wordle-whiz',
    title: 'Wordle Whiz',
    section: 'poc',
    description:
      'My first-ever coding project — an interactive Wordle-solving tool built in Python during freshman year (2023-2024) that filters words based on clues using input logic and a clean UI.',
    tags: ['Python', 'Game', 'Algorithms'],
    github: 'https://github.com/CleeYOpro/Freshman-yr-TSHS',
    live: 'https://cleof.us/wordle',
    image: '/projects/images/wordlewhiz/image.png',
    images: ['/projects/images/wordlewhiz/image.png'],
    overview:
      'A Wordle solver built using CMU CS Academy Python during my freshman year of high school (2023-2024) — the very start of my coding journey. The tool interactively filters the word list based on green/yellow/grey clues, visually displaying remaining candidates and automatically converging on the solution with entropy-based guess selection.',
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
      "Designed, simulated, and flew a model rocket carrying a raw-egg payload for the American Rocketry Challenge (TARC) — the world's largest student rocket contest. After a disqualifying first test flight, our redesigned rocket completed all three qualifying launches with an intact egg, landing within feet and seconds of the target window.",
    tags: ['Model Rocketry', 'OpenRocket', 'SolidWorks CAD', 'Recovery Systems', 'Team Engineering', 'TARC'],
    logo: '/projects/images/experience/rocketlogo.png',
    competition: { label: 'Competition Site', url: 'https://www.rocketrychallenge.org/' },
    image: '/projects/images/experience/rocket2.png',
    images: [
      '/projects/images/experience/rocket2.png',
      '/projects/images/experience/rocket1.jpeg',
      '/projects/images/experience/rocket3.png',
      '/projects/images/experience/rocket4.png',
    ],
    videos: [
      { id: 'oEmnERZD1Lw', title: 'TARC test flight' },
      { id: 'ijfCUH0ua78', vertical: true, title: 'TARC launch short' },
    ],
    overview:
      "A few days ago, my rocketry team and I headed out to 60 Acres Park in King County, Washington, for our final qualifying launch day for the American Rocketry Challenge (TARC) — the world's largest student rocket contest, with nearly 5,000 students competing nationally each year. The typical Seattle clouds dotted the sky, with occasional glimpses of sun and almost no wind: ideal conditions for launching without any hitches. On each countdown — 5, 4, 3, 2, 1 — we watched our rockets leave the pad trailing smoke with a distinct whooshing sound, held our breath through apogee, and then opened the nose cone to check the onboard altimeter. The reading that stuck with me: 841 feet, in a 44.3-second flight.\n\nI joined my high school's rocketry club at Tesla STEM High School almost by accident — a few middle school friends had signed up, and I wanted to try something new. I didn't expect launching model rockets to become such a complex, competitive hobby. Tesla STEM's club competes every year in TARC, where teams that qualify for the National Finals compete for cash prizes — a bar that, that season, meant landing near 820 feet in altitude with an uncracked egg payload inside a roughly 45-second flight window. That combination of precision and payoff is what hooked me.",
    problem:
      "TARC doesn't reward the highest or fastest rocket — it rewards the one that lands closest to a narrow target altitude and duration band, carrying a raw egg that survives the entire flight uncracked. Miss the altitude band, miss the timing window by even a couple of seconds, or crack the egg on landing, and the flight scores against you no matter how clean the launch looked. Being fairly new to model rockets, our team's early choices in motors and recovery hardware badly misjudged that balance — we assumed more altitude margin meant a safer flight, which very nearly got us disqualified before we ever reached the qualifying launches.",
    constraints: [
      'Target altitude band close to 820 ft — overshooting scores no better than undershooting.',
      'Total flight duration, boost to landing, has to fall inside a roughly 45-second window.',
      'The onboard raw-egg payload must land completely uncracked, or the flight scores against the team regardless of altitude or timing.',
      'Only the best two of three qualifying launches count toward the final score, so consistency across attempts matters as much as any single flight.',
      'Motor impulse and parachute size trade directly against each other — too much of either risks a structural failure, an unrecoverable drift, or blowing straight through the duration window.',
    ],
    decisions: [
      {
        title: 'Scaling down motor selection after an overpowered test flight',
        body: "For our first test launch we picked an Aerotech F50T-6 motor — 79.6 N of max thrust — paired with an oversized 36 cm parachute, reasoning that more power and a bigger canopy meant a safer margin. The rocket shot to roughly 1,200 feet, well past the ~820 ft target, and the top body tube holding the egg tore free from the rest of the airframe as the oversized chute deployed. It drifted so far downwind we couldn't even retrieve it — an automatic disqualification.",
        reason: "TARC scores proximity to a fixed altitude and duration target, not maximum performance, so a motor sized for 'extra safety margin' is actually a liability — it also stresses the airframe joints far beyond what the recovery system was built to survive.",
        tradeoff: 'Downsizing the motor meant re-simulating the whole rocket\'s stability and mass budget from scratch, costing us a design iteration we hadn\'t planned for before the qualifying window opened.',
      },
      {
        title: 'Resizing the parachute for the scoring window, not just a soft landing',
        body: "The original 36 cm chute was sized to match the oversized motor, and its slow descent both fed the drift that lost us the rocket and pushed total flight time out of range. We resized the canopy specifically against the ~45-second duration target, trading some descent softness for a flight profile that would actually land inside the scoring window.",
        reason: "Parachute size in TARC is a scoring parameter, not just a safety feature — it directly sets descent time and drift distance, both of which the competition measures.",
        tradeoff: 'A smaller canopy comes down faster, which raises landing shock on the payload bay — so the egg protection inside had to be reinforced to compensate.',
      },
      {
        title: 'CAD-modeled nose cone and OpenRocket stability simulation before any rebuild',
        body: "Instead of another trial-and-error test flight, we modeled the new nose cone in SolidWorks as a multi-profile loft — tuning the tangency weight between profile curves to shape a clean ogive that met the body tube without a visible seam — and validated the full airframe's mass distribution and stability margin in OpenRocket before cutting or gluing anything.",
        reason: "After losing a rocket to a bad motor/recovery pairing, we couldn't afford to find a second design flaw by flying it — simulating stability margin and drag digitally is free, while another disqualified launch would have cost us the qualifying window entirely.",
        tradeoff: "Modeling everything up front added real design time the team hadn't budgeted for initially, but it caught issues a physical test flight would have caught far more expensively.",
      },
      {
        title: 'Adding a dedicated altimeter bay and reinforced egg protection',
        body: "Every qualifying flight needed a verifiable, logged altitude and duration reading, so we built a dedicated bay for an onboard altimeter, and reworked the payload compartment's padding and shock-cord routing so the egg could survive both the motor's initial thrust and the parachute's opening shock.",
        reason: "Judges score off the altimeter's logged data, not an estimate — and a single cracked egg voids an otherwise perfect flight, so payload protection had to be treated as seriously as propulsion or recovery.",
        tradeoff: 'The extra bay added weight and volume that ate into our altitude margin, so it had to be balanced carefully against the motor choice we\'d already locked in.',
      },
    ],
    results: [
      "First test flight overshot to roughly 1,200 ft, tore apart at the body tube joint under an oversized parachute, and drifted out of reach — an automatic disqualification that forced a full redesign.",
      'Redesigned rocket completed all three official qualifying launches at 60 Acres Park with the egg intact every time: Launch 1 — 848 ft in 45 s; Launch 2 — 841 ft in 44 s; Launch 3 — 857 ft in 39 s.',
      "Landed within about 20 ft of the ~820 ft altitude target on our best flights, and dead-on the ~45-second duration window — a scoring band that most teams hitting those marks go on to qualify for nationals.",
      'Competed within a national field of nearly 5,000 students across the American Rocketry Challenge that season.',
    ],
    takeaways: [
      "Matching motor impulse to the airframe's actual design margins matters more than maximizing altitude — 'more power' is a liability in a competition scored on precision, not performance.",
      'Recovery system sizing (parachute diameter) is a scoring parameter in its own right — it sets descent time and drift distance, not just landing softness.',
      'Simulating stability and drag in OpenRocket and CAD before a rebuild is far cheaper than finding the same flaw by flying it again.',
      'A single failure point — one oversized chute, one cracked egg — can void an otherwise perfect flight, so payload protection deserves the same rigor as propulsion.',
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const majorProjects = projects.filter((p) => p.section === 'major');
export const otherProjects = projects.filter((p) => p.section === 'other');
export const pocProjects = projects.filter((p) => p.section === 'poc');
