export type Project = {
  slug: string;
  title: string;
  description: string;
  section: 'featured' | 'selected' | 'earlier';
  tags: string[];
  github?: string;
  githubSecondary?: { label: string; url: string };
  live?: string;
  website?: { label: string; url: string };
  figma?: string;
  medium?: string;
  competition?: { label: string; url: string };
  doc?: { label: string; url: string };
  note?: string;
  label?: string;
  logo?: string;
  youtube?: string;
  videos?: { id: string; vertical?: boolean; title: string }[];
  pdf?: { src: string; title: string };
  book?: { src: string; title: string };
  trifold?: { left: string; middle: string; right: string; title: string };
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
    logo: '/r.rolecaller.png',
    section: 'featured',
    description:
      "An offline-first attendance app for teachers in Malto tribal community schools in Jharkhand, India, where attendance lives in paper registers and a teacher can go days without a signal.",
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
      "Rolecaller is an offline-first attendance and data platform for the Malto community's tribal schools in the hills of Jharkhand, India. Geography, language barriers, and thin infrastructure have cut these schools off from consistent educational support for a long time. Internet is a luxury and electricity comes and goes, so a tool built for a connected world just doesn't run there.\n\nThe project started with a visit. I spent time with the Malto community in 2023 and saw the gaps firsthand, and at some point I realized that just remembering what I'd seen was passive and didn't change anything by itself. A conversation with my father, where he gently pushed on what I actually planned to do about it, turned that into RoleCaller: an app that lets teachers record attendance on a device that assumes the network doesn't exist, and treats a connection as a bonus when one shows up.",
    problem:
      "Without a reliable attendance record, a student's absence is basically invisible. Kids in these communities often walk dangerous paths for hours to get to school, and miss days for family obligations, illness, or seasonal work, but when attendance is scattered across paper registers nobody sees the pattern until the kid has effectively dropped out. The cause is systemic instability, not a lack of motivation, and there was no data trail to prove that, step in early, or make the case for scholarships and keeping kids in school.\n\nCommunity leaders were also very clear about what the tool couldn't turn into: 'We do not want to become the police.' If attendance tracking started to feel like surveillance, or like outsiders imposing their own idea of productivity, it would wreck the trust the whole thing depends on.",
    constraints: [
      'Has to run fully offline. Teachers can go days without a signal, so no core workflow can depend on a live connection.',
      "Runs on low-end, sub-$100 Android phones in places where electricity is sporadic, so there's no room for a heavy runtime or background work.",
      "Teachers might get to sync once a day at best, so when a connection does show up, the sync has to be fast and can never lose a day's work.",
      'Has to support teacher judgment instead of enforcing compliance, which means giving teachers and coordinators visibility without turning into surveillance of students or staff.',
    ],
    decisions: [
      {
        title: 'Local-first SQLite with a custom "Pulse" sync engine',
        body: "Each teacher's device treats its local Expo SQLite database as the single source of truth. A custom sync engine waits for a stable network connection, pushes unsynced attendance records to a Node.js API backed by Postgres (Neon), and pulls fresh roster data back down. Pushed records aren't marked as synced locally until the server confirms a 200 OK, and the API upserts on conflict, so a crash mid-sync or a duplicated request can't corrupt or lose anything. Pulling roster updates does a 'smart wipe' that refreshes students and classes while strictly preserving any attendance a teacher hasn't synced yet.",
        reason: "Teachers can't be blocked by the network, and a rare, flaky connection window is the only chance to sync, so every push has to be atomic and every pull has to protect whatever work is already sitting on the device.",
        tradeoff: 'The push/pull protocol and smart-rehydration logic are a lot more code to maintain than "just sync everything," but just syncing everything can silently drop a day of attendance.',
      },
      {
        title: 'UUID v4 identifiers across every entity',
        body: 'Schools, classes, students, and attendance records all use UUID v4 primary keys, generated on the device when the record is created instead of assigned by a central server.',
        reason: 'A device with no connectivity still needs to create valid, permanent records for new students or classes. UUIDs let it do that without ever asking a server for the next ID, and they slot into Postgres later without collisions.',
        tradeoff: 'UUIDs are bigger and less readable than auto-incrementing integers, and the schema and API layer need some care to index and join on them efficiently.',
      },
      {
        title: 'Raw Node.js HTTP API with Drizzle ORM over Neon Postgres',
        body: 'The backend skips Express/NestJS for a raw Node.js HTTP server with a shared connection pool, and uses Drizzle ORM to generate type-safe SQL with effectively zero runtime overhead.',
        reason: 'When a bunch of devices reconnect at once, the sync burst has to be handled quickly on modest server hardware, and for that, cutting framework overhead and cold starts mattered more than developer convenience.',
        tradeoff: 'No framework means no routing, middleware, or validation for free, so all of that boilerplate gets written and maintained by hand.',
      },
      {
        title: 'Offline-capable authentication',
        body: 'Online logins authenticate against the API and cache a hashed "session snapshot" locally. If a teacher opens the app with no signal, RoleCaller verifies their credentials against that cached, hashed record instead of failing closed.',
        reason: 'A teacher who hikes to a remote school needs to log in and keep working for days without ever seeing a signal tower. An app that needs a live login check would be useless there.',
        tradeoff: 'Caching credentials on the device, even hashed, expands the local attack surface and needs more careful handling than a stateless, always-online auth flow.',
      },
    ],
    results: [
      'Got board approval from FMPB in January 2026 to start deploying across Malto community schools.',
      "The rollout is staged on purpose: RCPSC and the smaller schools first, then the larger centers once there's trust built up.",
      'Built a working local-first architecture (SQLite on the edge, Postgres at the core, a custom sync engine in between) that lets a teacher record attendance for days with zero connectivity and sync losslessly on reconnect.',
      "Designed it with community leaders, who were explicit that they didn't want a \"policing\" tool, so it stays supportive instead of coercive.",
    ],
    takeaways: [
      "Knowing about the problem in 2023 didn't help a single student. The useful (and much harder) part was turning it into something a teacher could actually open on a phone.",
      "'We do not want to become the police' ended up shaping the app as much as the missing network did.",
      'Offline-first has to be assumed in every layer from the start. IDs, auth, and sync all break if you bolt it on later, which is why even the primary keys get generated on the phone.',
      'Starting with RCPSC and the small schools is slower than scaling right away, and the temptation to scale right away is real, but this is a tool that affects actual kids and teachers, so slow is the right call.',
    ],
  },
  {
    slug: 'cmc-palliative',
    title: 'CMC Palliative Care',
    section: 'featured',
    description:
      "The official website for the Department of Palliative Medicine at CMC Vellore, one of Asia's leading hospitals. It's live at cmcpalliative.org and handles all of the department's web traffic.",
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility', 'Healthcare'],
    github: 'https://github.com/CleeYOpro/CMC-project',
    live: 'https://cmcpalliative.org/',
    website: { label: 'CMC Vellore', url: 'https://www.cmch-vellore.edu/departments/' },
    figma: 'https://www.figma.com/design/sEMG9yQQuUYJWT31b7lcaS/The-WEBSITE?t=7mCi8uphmP4S75vO-1',
    image: '/projects/images/cmc/mainpage.png',
    images: [
      '/projects/images/cmc/mainpage.png',
      '/projects/images/cmc/contact.png',
      '/projects/images/cmc/footer.png',
    ],
    overview:
      "I designed and built a full website for the Department of Palliative Medicine at Christian Medical College (CMC) Vellore, one of Asia's most respected hospitals, which sees over 3 million patients a year. The site explains what the department offers, who's on the team, and how they approach care, for patients, families, and other healthcare professionals.",
    problem:
      "CMC Vellore's palliative care department didn't have its own web presence. Families looking up palliative care are often doing it at a really stressful time, and there was no clear place for them to find out what services exist, how to reach the team, or where to get guidance.",
    constraints: [
      "Had to match the hospital's branding and tone guidelines (compassionate, clear, professional).",
      'Had to work for people at every level of digital literacy.',
      'Needed to be ready for translation into regional languages.',
      'Had to load fast on phones and on the low-bandwidth connections that are common in India.',
    ],
    decisions: [
      {
        title: 'Static HTML/CSS/JS stack',
        body: 'Plain HTML, CSS, and JavaScript with no frameworks, so it can be deployed anywhere with zero runtime dependencies.',
        reason: "Hospital IT environments often don't allow framework-heavy deployments, and static files can be hosted pretty much anywhere.",
        tradeoff: "Building without React or Next.js is less comfortable as a developer, but there are zero dependencies to break, update, or get rejected by IT.",
      },
    ],
    results: [
      'Built a fully responsive, accessible website for the department.',
      "The site is live at cmcpalliative.org as the department's own website, serving a hospital that sees 3M+ patients a year.",
    ],
    takeaways: [
      "Most people opening this site are dealing with someone they love being seriously ill, so finding out how to reach the team quickly matters way more than anything looking impressive.",
      "Plain HTML/CSS/JS isn't an exciting stack, but it was the one most likely to make it through a hospital IT department.",
    ],
  },
  {
    slug: 'seattle-earthquake-gis',
    title: 'Fault Lines & Front Lines',
    section: 'featured',
    description:
      "A TSA Geospatial Technology portfolio that maps King County's seismic risk (fault lines, liquefaction zones, unreinforced masonry buildings, emergency infrastructure) to estimate what a major earthquake would do to Seattle and where disaster planning should focus. 1st place at the WTSA State Conference, then competed at TSA Nationals in Nashville.",
    tags: ['Python', 'GIS', 'ArcGIS', 'Spatial Analysis', 'Disaster Response'],
    github: 'https://github.com/CleeYOpro/seattle_fault_project',
    label: '1st Place - WTSA State Conference · TSA Nationals',
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
      "Fault Lines & Front Lines is a geospatial analysis portfolio we built for TSA's (Technology Student Association) Geospatial Technology event, where the 2024–2025 theme asked teams to identify a disaster threat facing their own community. We're in King County, Washington, so picking earthquakes was not a hard decision: the county sits in the Pacific Ring of Fire, in the Puget Sound region, near or directly on top of the Seattle Fault, the Tacoma Fault, and the Cascadia Subduction Zone, with active volcanoes like Mount Rainier and Mount Baker on either side. The 2001 magnitude-6.8 Nisqually earthquake is the most recent reminder of all that.\n\nWe pulled fault line, liquefaction, floodplain, bridge-condition, unreinforced masonry building, and emergency-services data from sources like the USGS Earthquake Catalog, King County GIS Open Data, Seattle GeoData, and Esri's federal fault datasets, then overlaid it across eight analysis maps to find Seattle's highest-risk zones and inform evacuation and shelter-in-place guidance.",
    problem:
      "Seattle is the most populous city in Washington, and its residents face outsized risk in a major earthquake. Dense downtown neighborhoods sit close to the Seattle Fault, over a thousand unreinforced masonry (URM) buildings predate 1945 and were never secured to code, and roughly 2,000 miles of underground wastewater pipeline crisscross known fault zones. A map of where earthquakes have historically been recorded doesn't show any of that. Emergency planning needs to see where fault activity, unstable soil, vulnerable buildings, and critical infrastructure actually overlap.",
    constraints: [
      'Source data came from a bunch of different public portals (USGS, King County GIS, Seattle GeoData, FEMA, Esri) in inconsistent formats with no shared schema.',
      'The Seattle population density dataset alone had ~27,000 census-block records, which is way too many to render as one readable map.',
      'Judges and the public mostly aren\'t GIS people, so the findings had to work as a written analysis and an infographic on top of the raw maps.',
      'Nobody can predict the location, timing, or magnitude of an earthquake, so any "prediction" we made had to be framed as a probabilistic estimate and not a forecast.',
    ],
    decisions: [
      {
        title: 'Averaging historical epicenters to model a plausible future earthquake',
        body: 'Instead of guessing at a location, we used NumPy to average the epicenter coordinates of every magnitude 2.5+ earthquake recorded in the area from 1900 to 2025 (the data behind Figure 1) and treated that average as a probable future epicenter. Then we used the empirical relationship Area (km²) = 10^(0.5M − 1.8) to size the impact radius of a predicted M7.0 around it, and overlaid that on the URM building locations.',
        reason: 'Averaging real historical activity is a defensible, reproducible way to pick a hypothetical epicenter, which beats dropping a pin on downtown because it looks dramatic.',
        tradeoff: 'Averaging treats every historical earthquake as equally informative no matter its magnitude or how recent it was, so the point you get is the statistical center of past activity, not a real seismological forecast.',
      },
      {
        title: 'ETAS modeling for aftershock intensity, converted to Modified Mercalli Intensity',
        body: 'We implemented an Epidemic-Type Aftershock Sequence (ETAS) model in Python/NumPy to estimate where and when aftershocks would hit after a simulated M7.0, converted the resulting log-scale intensity into Peak Ground Acceleration, and then converted that into the Modified Mercalli Intensity (MMI) scale so non-scientists could read it.',
        reason: "Aftershock risk usually gets reported in scientific units (PGA, log-intensity) that don't mean much to city planners or the public. MMI is the scale Seattle's own hazard planning documents use, so converting to it made the output directly usable.",
        tradeoff: 'The conversion uses an approximate PGA-to-MMI regression instead of region-specific attenuation data, so the absolute MMI values are indicative, not precise.',
      },
      {
        title: 'Composite hazard-per-structure overlay instead of single-factor maps',
        body: 'Analysis Map #2 stacks liquefaction-prone areas, FEMA floodplain boundaries, and an average-hazards-per-structure grid on top of each other instead of giving each hazard its own map.',
        reason: 'Liquefaction, flooding, and structural risk compound each other in the same low-lying neighborhoods (South and West Seattle, for example). Showing them separately hides that overlap, and the overlap is exactly where mitigation resources should go first.',
        tradeoff: 'Stacking multiple choropleth layers makes the map denser and harder to read at a glance than a single-variable heatmap.',
      },
    ],
    results: [
      'Won 1st place in Geospatial Technology at the Washington TSA State Conference, which qualified us for TSA Nationals in Nashville, Tennessee.',
      'Made and cited 8 original analysis maps covering fault lines, bridge seismic risk, liquefaction/flood overlays, unreinforced masonry buildings, emergency services, wastewater infrastructure, and aftershock modeling.',
      'Built Python/NumPy models (mean-epicenter estimation, ETAS aftershock intensity, PGA→MMI conversion) to get from raw historical earthquake data to a predicted-impact map a normal person can read.',
      "Concluded that a magnitude 6+ earthquake on the Seattle Fault could cause at least $50 billion in damage. For comparison, the 2001 Nisqually earthquake did ~$4 billion near Olympia, which is much smaller than Seattle, with its ~755,000 people and heavy concentration of tech-sector jobs.",
    ],
    takeaways: [
      'South and West Seattle only really stand out once liquefaction, flooding, and structural risk are on the same map. Any one of those layers on its own undersells them.',
      'After all the ETAS modeling, our most actionable conclusion was basically "shelter in place, don\'t evacuate over an unstable bridge," which is a little funny, but it\'s also the one thing a resident can actually do something with.',
      'Public GIS data (USGS, county open-data portals, FEMA) is split across a lot of sources in different formats, and reconciling it was most of the real work.',
      "You can't predict an earthquake, but an averaged epicenter and an ETAS aftershock model are still worth building as long as you're honest that they're estimates.",
    ],
  },
  {
    // Page body is hand-built in src/components/projects/HurricaneClaude.tsx.
    slug: 'hurricane-claude',
    title: 'Hurricane Claude',
    logo: '/beaverworks.png',
    section: 'featured',
    description:
      'Flood-risk maps for Hurricane Claude, a simulated New England hurricane at MIT Beaver Works Summer Institute. I turned ensemble forecasts, storm-surge estimates, elevation data, and social vulnerability into maps a response team could act on.',
    tags: ['Python', 'GeoPandas', 'Shapely', 'DEM Analysis', 'Folium', 'CDC SVI', 'SAR', 'Remote Sensing'],
    medium: 'https://medium.com/tierra-insights/zoom-out-from-google-maps-to-remote-sensing-at-mit-bwsi-8da153228e6e',
    doc: { label: 'Slides', url: '/projects/images/hurricane-claude/hurricane-claude-slides.pdf' },
    label: 'MIT BWSI 2026',
    image: '/projects/images/hurricane-claude/flood-day-3.jpg',
    overview:
      "For the final project of MIT Beaver Works Summer Institute's Remote Sensing for Disaster Response course (July–August 2026), the class ran Hurricane Claude, a fictional hurricane-response simulation across New England, split into planning, logistics, operations, and public information teams. I was on Planning, responsible for flood mapping: averaging 20 ensemble forecast tracks into a central path, building 6 m / 4 m / 3 m storm-surge distance bands with Shapely and GeoPandas, applying a 30 m digital elevation model to separate surge exposure from actual flooding, and overlaying the CDC Social Vulnerability Index.\n\nI also supported the Operations team with imagery analysis (team work on ResNet damage classification, U-Net segmentation, and Grad-CAM on RescueNet and xView2) and with tracking a ship through 83 SAR radar scenes.",
    results: [
      'Day 4 analysis separated 4,390 km² of surge exposure from 370 km² of modeled flooding (8%) in the displayed study area; Day 3 was 5,845 km² exposed and 629 km² flooded (11%).',
      'Flood risk concentrated in low-lying parts of the Boston Harbor area: East Boston, Chelsea, Quincy, and the Charles and Mystic river basins.',
      'Chelsea and East Boston repeatedly stood out where coastal exposure overlapped high social vulnerability.',
      'These are student-team simulation estimates, not a real forecast or evacuation order.',
    ],
  },
  {
    slug: 'komekare',
    title: 'KomeKare',
    section: 'selected',
    description:
      'A caregiving coordination app that puts caregivers, family, and healthcare providers on one shared patient profile, with Gemini summarizing the care data for each of them. 3rd place at the Divergent Hackathon.',
    tags: ['Expo', 'React Native', 'Firebase', 'Zustand', 'Gemini 1.5 Flash', 'NativeWind'],
    github: 'https://github.com/CleeYOpro/viceversa',
    githubSecondary: {
      label: 'Provider Repo',
      url: 'https://github.com/nikhilvincentv/care-sync-provider-viceversa',
    },
    label: '3rd Place - Divergent Hackathon',
    pdf: {
      src: '/projects/komekare/hackathon-project.pdf',
      title: 'Hackathon Project',
    },
    image: '/projects/komekare.svg',
    overview:
      "KomeKare is a family caregiver coordination app we built natively with Expo and Firebase at the Divergent Hackathon, where it placed 3rd. Caregivers, family members, and healthcare providers all share one patient profile, and Google's Gemini 1.5 Flash summarizes the care data into something each of them can actually act on.",
    problem:
      "Caregiving is often split between family members, professional caregivers, and medical providers, and none of them see the same picture of the patient. Important information gets lost in text threads, paper notes, and verbal handoffs, and that's how you end up with missed medications and two people doing the same task.",
    decisions: [
      {
        title: 'Native Expo app with Firebase as the backend',
        body: 'A native React Native app built with Expo and backed entirely by Firebase: Auth for identity, Firestore and the Realtime Database for care data, and Storage for uploads.',
        reason: 'With 48 hours, we needed a backend with zero server setup, generous free-tier limits, and real-time sync between caregivers, family, and providers out of the box.',
        tradeoff: "We gave up long-term flexibility in the data model (and accepted Firebase's NoSQL model and vendor lock-in) to ship a working real-time app in a weekend.",
      },
      {
        title: 'Zustand with AsyncStorage-backed persistence',
        body: 'Client state (current patient profile, session, cached care data) lives in Zustand, with a persistence middleware bound to AsyncStorage so it survives app restarts.',
        reason: "Zustand has so little boilerplate that we could wire up shared state across screens fast without the ceremony of Redux, and still get durable local persistence for free.",
        tradeoff: 'It has less structure than a more opinionated state library, so as the app grows it takes discipline to keep the state from turning into a pile of ad-hoc shapes.',
      },
      {
        title: 'Gemini 1.5 Flash for AI care insights',
        body: 'Gemini 1.5 Flash summarizes health logs, medication schedules, and caregiver notes into plain-language updates for each person on the profile.',
        reason: 'Everyone needs a different view of the same data: a caregiver needs a quick task list, a family member needs a plain-language update, and a provider needs a clinical summary. Flash was fast enough at summarizing to work in a live demo.',
        tradeoff: "LLMs hallucinate, so care summaries need careful prompting and have to be presented as assistive rather than authoritative, and 48 hours wasn't enough time to harden that as much as it should be.",
      },
    ],
    results: [
      'Won 3rd place at the Divergent Hackathon.',
      'Built a working native Expo/Firebase prototype in under 48 hours.',
      'Demoed Gemini-generated care summaries tailored separately for caregivers, family, and providers.',
    ],
    takeaways: [
      '48 hours forces you to prioritize whatever can actually be demoed, which is a big part of why Firebase and Zustand won: both meant almost no setup.',
      "Hallucinations are a much bigger deal in a care app than in most places, because the summary is about someone's medication.",
      'A lot of what goes wrong in caregiving is information not making it from one person to the next, and fixing that flow mattered more than adding features.',
    ],
  },
  {
    slug: 'port-laken',
    title: 'Port Laken',
    section: 'selected',
    description:
      "An AI-powered civic portal for Port Laken, a fictional city inspired by Port Angeles, WA, built to show what a city website could actually look like. We open-sourced it and showed it to city governments around Washington, and they took the UI and overall design as inspiration for their own sites. Has a resource directory, alerts, maps, and a Gemini-powered civic assistant. Placed 8th at WTSA 2026.",
    tags: ['Next.js', 'React', 'Firebase', 'Gemini AI', 'Leaflet', 'Framer Motion', 'Civic Tech'],
    github: 'https://github.com/CleeYOpro/portLakenWeb',
    live: 'https://tsa-plkn123.vercel.app/',
    label: '8th Place - WTSA 2026',
    image: '/projects/images/portlaken/hero.png',
    images: [
      '/projects/images/portlaken/hero.png',
      '/projects/images/portlaken/about.png',
      '/projects/images/portlaken/resource-directory.png',
      '/projects/images/portlaken/resource-detail.png',
      '/projects/images/portlaken/footer-signin.png',
    ],
    overview:
      "Port Laken is an AI-powered civic portal for a fictional city inspired by Port Angeles, WA. I built it because I kept looking at city websites and thinking, bro, why does finding basic local information have to be this hard? So instead of making another basic school project, we built what we thought a city website should actually feel like: clean, fast, searchable, interactive, and designed around residents. It uses Next.js App Router, Firebase, Gemini, Leaflet, and a bunch of other modern web tooling.\n\nWe open-sourced the whole thing and showed it to city governments around Washington. The coolest part wasn't the TSA placement, it was seeing municipalities take UI and information-architecture ideas from the project and think about how they could modernize their own sites.",
    problem:
      "Most city websites are still built around departments, PDFs, giant navigation menus, and making residents figure out where information lives. That's backwards. If someone needs food assistance, healthcare, an emergency resource, or transportation info, they shouldn't need to understand the city's organizational structure first. Port Laken flips that around and is built around what residents are actually trying to do: the resource directory puts useful local services in one place, the AI assistant lets people ask questions normally, maps make transportation easier to understand, and alerts surface the things residents actually need to know. The goal was basically: here's what a city portal could look like if we stopped accepting 2012-era government UX as the default.",
    constraints: [
      'The AI assistant cannot hallucinate civic information. Being confidently wrong about an emergency resource is way worse than saying "I don\'t know."',
      'Community-submitted resources need moderation, otherwise the directory becomes a spam box immediately.',
      'Leaflet depends on `window`, so it cannot just be imported during Next.js server rendering.',
      'Protected actions need to send users back to exactly where they were instead of dumping them on some random dashboard after signing in.',
      'The site had to be more than a pretty mockup. It needed enough real functionality that an actual city could look at it and go, "wait, we could actually use some of this."',
    ],
    decisions: [
      {
        title: 'Built it as something cities could actually steal from',
        body: 'We open-sourced Port Laken on purpose and showed it to city governments around Washington instead of letting it die as a TSA submission. The point was to give cities a working example they could click through, inspect, and pull ideas from: the navigation, resource directory, page layouts, maps, alerts, and the general resident-first UI philosophy.',
        reason: 'If you want to convince a city that its website could be better, a Figma mockup or a PowerPoint deck only gets you so far. Give them a working website and suddenly the conversation is way more concrete.',
        tradeoff: "Port Laken obviously isn't production municipal infrastructure. It's a reference implementation, meant to show what's possible and give cities ideas they can actually adapt.",
      },
      {
        title: 'Designed around residents, not city departments',
        body: 'Instead of making residents navigate a giant list of departments, Port Laken organizes information around the actual problems people have: finding food, healthcare, emergency services, transportation, and other local resources.',
        reason: 'Nobody wakes up thinking "I need to access the Department of Human Services." They think "I need help finding food." The website should understand that difference.',
        tradeoff: 'This takes more work to organize and categorize than just copying a government org chart into a navbar.',
      },
      {
        title: 'RAG-style prompt grounding without a vector database',
        body: "A local buildAiContext function builds the AI context on every query from the user's question, a PAGE_CONTEXTS map covering the app, and the JSON for whichever civic resources are relevant. Gemini 2.5 Flash is told to only answer from that context, and it returns structured output instead of just dumping free-form text.",
        reason: "The dataset is small. Building a whole vector database and embedding pipeline would've been infrastructure for the sake of infrastructure. Just give the model the relevant data.",
        tradeoff: "This obviously doesn't scale to a massive resource database, and every query can still send a pretty chunky chunk of JSON.",
      },
      {
        title: 'Seed data + moderated community submissions',
        body: 'The directory starts with curated RESOURCES data but also takes community submissions through Firestore. Submissions start as pending and only show up after approval.',
        reason: 'A directory with zero resources is useless, but letting literally anyone publish directly is also a terrible idea. Seed it, then let the community expand it safely.',
        tradeoff: 'Now there are two sources of truth, so reads and AI context have to merge and dedupe them properly.',
      },
      {
        title: 'Dynamically imported Leaflet maps',
        body: 'Maps & Transport uses react-leaflet with SSR disabled so Leaflet only initializes in the browser.',
        reason: 'Leaflet wants `window`, Next.js server rendering does not have `window`. Pretty straightforward.',
        tradeoff: 'The map has a small client-side loading gap instead of being included in the initial server-rendered HTML.',
      },
      {
        title: 'callbackUrl auth redirects',
        body: 'When someone tries to submit a resource or manage alerts without being signed in, they get sent to /sign-in with a callbackUrl. After authenticating, they land right back where they started.',
        reason: 'If someone is trying to submit a food pantry listing, making them sign in and then hunt through the dashboard for the page again is just unnecessary friction.',
        tradeoff: 'Every new protected flow has to handle the callback correctly or the UX gets annoying fast.',
      },
    ],
    results: [
      'Placed 8th at the WTSA 2026 state conference.',
      'Open-sourced the code and showed the project to city governments around Washington, who took UI and information-architecture ideas from it while thinking through how to modernize their own websites, so it turned into an actual civic-tech reference instead of sitting in a GitHub repo forever.',
      'Built a working Gemini-powered civic assistant that answers from local page context and resource data instead of letting an LLM freestyle government information.',
      'Shipped a full civic portal: moderated resource directory, alerts with Resend email dispatch, interactive Leaflet maps, authentication, and resident-focused navigation.',
    ],
    takeaways: [
      'Open-source is way more useful when you build something people can actually take. A city can look at a working portal and say "we should do that" way easier than they can from a 30-slide presentation.',
      "For small datasets, you don't always need some insane RAG architecture. Sometimes just giving the model the right data and aggressively constraining what it can say is enough.",
      'Community submissions only work if there is a moderation layer. Pending → approved is boring, but without it the directory is a spam box.',
      'Making the city fictional gave us room to experiment without pretending we were shipping production government infrastructure. We could go crazy with the UX while still making something real cities could learn from.',
      'I ended up caring less about making a cool TSA website and more about whether anyone outside the competition would actually want to use the ideas.',
    ],
  },
  {
    slug: 'price-it-right',
    title: 'Price It Right',
    section: 'selected',
    description:
      "A pricing and demand simulator: drag the price and watch demand, revenue, and profit shift in real time, while random events like a market crash or a new competitor mess with the curve. Tesla STEM High School's Business & Econ class now uses it as official teaching material.",
    tags: ['React', 'TypeScript', 'Vite', 'Chart.js', 'Tailwind CSS', 'Economics'],
    github: 'https://github.com/CleeYOpro/demandprice_pro',
    live: 'https://priceprofit.cleof.us/',
    image: '/projects/images/priceitright.png',
    images: ['/projects/images/priceitright.png'],
    overview:
      "Price It Right is a pricing and demand simulator built with React, TypeScript, and Vite. You drag a price slider and Chart.js redraws demand, revenue, and profit live, and every so often a random market event (a crash, a new competitor, a viral trend) shows up and forces you to react instead of just watching the numbers. I built it as a final project meant to teach the pricing and supply & demand unit in Tesla STEM High School's Business & Econ class, and the course has since adopted it as official teaching material.",
    problem:
      "Pricing, elasticity, and profit optimization usually get taught with static graphs and formulas like Profit = (Price − Cost) × Demand, which describe how price and demand relate but never let a student watch it change. Students could recite that raising the price lowers demand, but had no hands-on way to explore the actual shape of that tradeoff, or to see how a shock like a competitor entering or a market crash moves the best price.",
    decisions: [
      {
        title: 'Live Chart.js demand curve driven by a single price slider',
        body: 'A single responsive slider controls price. Every change recalculates demand through an elasticity function and immediately redraws the Chart.js demand curve next to live revenue and profit numbers.',
        reason: 'Instant visual feedback turns an abstract formula into something students can figure out by trial and error. Moving the slider and watching profit climb, peak, and then fall explains elasticity a lot faster than a lecture does.',
        tradeoff: 'One simplified elasticity model is less rigorous than a full econometric demand model. It trades realism for something intuitive enough to teach with in one class period.',
      },
      {
        title: 'Randomized market events layered on top of the base simulation',
        body: 'A "Trigger Random Event" action can inject a market crash, a new competitor, or a viral trend, and each one temporarily reshapes the demand curve so the student has to find their optimal price again.',
        reason: "Static pricing exercises teach students to find one right answer, and real markets don't hold still. Random events make students practice adjusting their pricing instead of reading a curve once.",
        tradeoff: 'Random events make outcomes harder to compare directly between students in a classroom, which the "Reset Market" control helps with by letting a scenario be replayed from a clean state.',
      },
    ],
    results: [
      "Adopted as official teaching material in Tesla STEM High School's Business & Econ class for the Pricing, Supply & Demand, Game Theory, and Econ Strategy units.",
      'Fully responsive slider-driven UI that models Profit = (Price − Cost) × Demand and Revenue = Price × Demand in real time.',
    ],
    takeaways: [
      'Something built to understand a concept yourself can end up being useful to a whole classroom. This went from a personal final project to the course material.',
      "The random events are what make it a practice tool. Without them there's one right price, and once you find it you're done.",
    ],
  },
  {
    slug: 'azoto-column',
    title: 'Project AzotoColumn',
    section: 'selected',
    description:
      "A bioretention system that filters nitrogen-heavy farm runoff through layered soil, sand, and gravel, then pumps the cleaned water back for irrigation. Built for TSA's Engineering Design event on the theme \"Managing the Nitrogen Cycle.\" It placed 4th at the WTSA State Conference and we presented it at TSA Nationals.",
    tags: ['Engineering Design', 'Bioretention', 'Environmental Science', 'Prototyping', 'TSA'],
    label: '4th Place - WTSA State Conference · TSA Nationals',
    doc: {
      label: 'Documentation Portfolio',
      url: 'https://lwsd-my.sharepoint.com/:w:/g/personal/1056935_lwsd_org/IQDxKbCiiDtMRKVVkhE5yQH9ATbwCYlwHNrtvLunWkln9gk?e=gA9kw5',
    },
    trifold: {
      left: '/projects/azoto/left.png',
      middle: '/projects/azoto/middle.png',
      right: '/projects/azoto/right.png',
      title: 'Nationals Trifold',
    },
    image: '/projects/images/azoto-column/main.jpg',
    overview:
      'The AzotoColumn is a bioretention system we built for TSA\'s Engineering Design event, where the theme that year was "Managing the Nitrogen Cycle." Excess nitrogen from fertilizer runoff drives eutrophication and dead zones in nearby waterways, so our team designed a filtration column along the field border (soil, sand, and gravel layered around nitrogen-fixing plants like clover) that a farm\'s runoff flows into by gravity, before a pump sends the cleaned water back out for irrigation. We named it after "Azoto," Greek for nitrogen.\n\nWe picked the bioretention design after scoring it against two other concepts (an AI-driven soil-sensor network, and selective catalytic reduction for vehicle exhaust) on cost, effectiveness, and maintenance. Then we spent most of the season iterating on a physical prototype: testing water flow and nitrogen levels, chasing down leaks, and tuning the soil layering until the numbers held up.',
    problem:
      'Nitrogen-rich fertilizer runoff is a major cause of eutrophication. It feeds algal blooms in nearby lakes and rivers that die off, use up the dissolved oxygen, and leave "dead zones" where aquatic life can\'t survive. The same runoff can leach into groundwater and drinking supplies at levels linked to health risks like blue baby syndrome. Farms need a way to keep using nitrogen fertilizer without losing most of it to runoff.',
    constraints: [
      'Had to be buildable and testable as a physical scale prototype within a school year, not just a paper design.',
      'Had to hold water without leaking, or the flow-rate and nitrogen-level tests would be wrong.',
      'Had to stay affordable and installable on real farmland without disrupting how the farm already runs.',
      'Had to work across different soil types, rainfall levels, and farm layouts instead of one specific site.',
    ],
    decisions: [
      {
        title: 'Choosing bioretention over an AI sensor network or catalytic reduction',
        body: 'We scored our three candidate solutions (a bioretention filtration area, an AI-driven soil/moisture sensor network, and selective catalytic reduction for vehicle exhaust) in a Pugh chart on cost, effectiveness, accessibility, maintenance, and water resistance. Bioretention came out on top at +2, over the sensor network at 0 and catalytic reduction at -2.',
        reason: 'The sensor network and catalytic reduction both needed expensive, specialized hardware and ongoing maintenance. Bioretention uses passive, cheap materials (soil, sand, gravel, plants) that farmers can maintain themselves once it\'s installed.',
        tradeoff: 'Bioretention takes more physical space and more upfront digging and layering than a sensor-based system would, which makes it a harder fit for very small farms.',
      },
      {
        title: 'Switching to a pre-built container after chasing a 446 mL leak',
        body: "Our first water reservoir was hand-cut plastic sheets sealed with hot glue and duct tape. During testing it lost 446 mL of water we couldn't account for. We tested the mesh filter and the tubing separately in controlled side-tests, ruled both out, and confirmed the leak was coming from uneven, hand-cut seams in the container itself. Switching to a pre-built, slightly curved storage container cut the leak to 50 mL, and a custom 3D-printed seal around the pump intake got rid of it completely.",
        reason: "Every mL that leaked threw off our flow-rate and nitrogen-level data, so until the reservoir was watertight we couldn't trust any of our test results.",
        tradeoff: "A pre-built container can't be shaped to the prototype's exact interior the way a hand-built one can, and that caused its own fitting and stability problems we had to solve separately.",
      },
      {
        title: 'Concentrating perlite in the top third of the soil layer',
        body: "Nitrogen testing showed elevated nitrate in the filtered water, which meant the soil wasn't holding onto nitrogen well, so we tried adding perlite (a lightweight, porous volcanic glass) at different soil depths. Putting it only in the top third of the layer improved ammonium infiltration into the soil, while a perlite-free bottom layer kept porosity low down there and limited how much nitrogen could leach through into the collected water.",
        reason: 'We tested several placements instead of assuming more perlite is better, and the answer depended on depth: perlite near the top helped infiltration, and keeping it out of the bottom stopped it from opening up leaching paths lower down.',
        tradeoff: 'This layering is harder to build consistently than a uniform soil mix, and it only works if the soil composition is right in the first place.',
      },
    ],
    results: [
      'Filtration dropped nitrate from 25 ppm to 5 ppm and ammonium from 15 ppm to 3 ppm across our water samples, and pH stayed stable through the process.',
      'Cut prototype volume by 75% and reservoir leakage from 446 mL to effectively zero after redesigning the water container and pump seal.',
      'Estimated a full one-acre installation (excavation, lining, filtration media, pump, sensors, grading) at roughly $17,600. That\'s expensive upfront, but it gets offset over time by lower fertilizer and irrigation costs.',
      'Placed 4th at the WTSA State Conference and went on to present the project at TSA Nationals.',
    ],
    takeaways: [
      'The AI sensor network was the flashiest idea we had, and it scored a 0 on the Pugh chart. Soil, sand, gravel, and clover scored +2, mostly because farmers can maintain them themselves.',
      "Our worst problem was a 446 mL leak from hand-cut plastic seams, which we hadn't thought of as a risk at all until the data stopped adding up. No diagram would have shown us that.",
      'Where the perlite went (top third only, not mixed throughout) mattered about as much as using perlite at all.',
    ],
  },
  {
    slug: 'wordle-whiz',
    title: 'Wordle Whiz',
    section: 'earlier',
    description:
      'My first-ever coding project: a Wordle solver I built in Python freshman year (2023-2024). You enter the clues and it filters the word list down to what\'s still possible.',
    tags: ['Python', 'Game', 'Algorithms'],
    github: 'https://github.com/CleeYOpro/Freshman-yr-TSHS',
    live: '/wordle.html',
    image: '/projects/images/wordlewhiz/image.png',
    images: ['/projects/images/wordlewhiz/image.png'],
    overview:
      'A Wordle solver I built in CMU CS Academy Python during my freshman year of high school (2023-2024), which is when I started coding. It filters the word list based on green/yellow/grey clues, shows the remaining candidates, and picks guesses using entropy so it converges on the answer.',
    results: [
      'Solves Wordle in an average of 3.4 guesses.',
      'Built an interactive visual interface with color-coded feedback.',
    ],
    takeaways: [
      'Wordle is a constraint satisfaction problem, and iterative filtering handles it really cleanly: every clue just cuts the list down.',
      'Entropy gives you an actual reason to pick one guess over another, instead of guessing whatever word feels right.',
    ],
  },
  {
    slug: 'tarc-rocket',
    title: 'TARC Rocket',
    section: 'earlier',
    description:
      "Designed, simulated, and flew a model rocket carrying a raw egg for the American Rocketry Challenge (TARC), the world's largest student rocket contest. Our first test flight got us disqualified. The redesigned rocket flew all three qualifying launches with the egg intact, close to the altitude and time targets.",
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
      "My rocketry team and I headed out to 60 Acres Park in King County, Washington, for our final qualifying launch day for the American Rocketry Challenge (TARC), the world's largest student rocket contest, with nearly 5,000 students competing nationally each year. The typical Seattle clouds dotted the sky, with occasional glimpses of sun and almost no wind: ideal conditions for launching without any hitches. On each countdown - 5, 4, 3, 2, 1 - we watched our rockets leave the pad trailing smoke with a distinct whooshing sound, held our breath through apogee, and then opened the nose cone to check the onboard altimeter. The reading that stuck with me: 841 feet, in a 44.3-second flight.\n\nI joined the rocketry club at Tesla STEM High School almost by accident. A few middle school friends had signed up, and I wanted to try something new. I didn't expect launching model rockets to become such a complex, competitive hobby. Tesla STEM's club competes in TARC every year, where teams that qualify for the National Finals compete for cash prizes, and qualifying that season meant landing near 820 feet with an uncracked egg inside a roughly 45-second flight window. That combination of precision and payoff is what hooked me.",
    problem:
      "TARC doesn't reward the highest or fastest rocket. It rewards the one that comes closest to a narrow target altitude and duration, carrying a raw egg that survives the whole flight uncracked. Miss the altitude band, miss the timing window by even a couple of seconds, or crack the egg on landing, and the flight scores against you no matter how clean the launch looked. We were fairly new to model rockets, and our early motor and recovery choices badly misjudged that balance: we assumed more altitude margin meant a safer flight, which very nearly got us disqualified before we ever reached the qualifying launches.",
    constraints: [
      'Target altitude around 820 ft, and overshooting scores no better than undershooting.',
      'Total flight duration, from boost to landing, has to land inside a roughly 45-second window.',
      'The raw egg on board has to land completely uncracked, or the flight scores against the team regardless of altitude or timing.',
      'Only the best two of three qualifying launches count toward the final score, so consistency matters as much as any single flight.',
      'Motor impulse and parachute size trade directly against each other. Too much of either risks a structural failure, a drift you can\'t recover from, or blowing straight through the duration window.',
    ],
    decisions: [
      {
        title: 'Scaling down motor selection after an overpowered test flight',
        body: "For our first test launch we picked an Aerotech F50T-6 motor (79.6 N of max thrust) with an oversized 36 cm parachute, reasoning that more power and a bigger canopy meant a safer margin. The rocket shot to roughly 1,200 feet, well past the ~820 ft target, and the top body tube holding the egg tore free from the rest of the airframe when the oversized chute deployed. It drifted so far downwind we couldn't even retrieve it, which is an automatic disqualification.",
        reason: "TARC scores how close you get to a fixed altitude and duration, not maximum performance, so a motor sized for 'extra safety margin' is actually a liability. It also stresses the airframe joints way past what the recovery system was built to survive.",
        tradeoff: "Downsizing the motor meant re-simulating the whole rocket's stability and mass budget from scratch, which cost us a design iteration we hadn't planned for before the qualifying window opened.",
      },
      {
        title: 'Resizing the parachute for the scoring window, not just a soft landing',
        body: "The original 36 cm chute was sized to match the oversized motor, and its slow descent both caused the drift that lost us the rocket and pushed total flight time out of range. We resized the canopy specifically for the ~45-second duration target, giving up some descent softness for a flight profile that would actually land inside the scoring window.",
        reason: 'In TARC, parachute size sets descent time and drift distance, and the competition measures both, so it\'s as much a scoring decision as a safety one.',
        tradeoff: 'A smaller canopy comes down faster, which means more landing shock on the payload bay, so the egg protection had to be reinforced to make up for it.',
      },
      {
        title: 'CAD-modeled nose cone and OpenRocket stability simulation before any rebuild',
        body: "Instead of another trial-and-error test flight, we modeled the new nose cone in SolidWorks as a multi-profile loft, tuning the tangency weight between profile curves to get a clean ogive that met the body tube without a visible seam, and checked the full airframe's mass distribution and stability margin in OpenRocket before cutting or gluing anything.",
        reason: "After losing a rocket to a bad motor/recovery pairing, we couldn't afford to find a second design flaw by flying it. Simulating stability margin and drag is free, and another disqualified launch would have cost us the qualifying window entirely.",
        tradeoff: "Modeling everything up front added design time the team hadn't budgeted for, but it caught problems that a physical test flight would have caught far more expensively.",
      },
      {
        title: 'Adding a dedicated altimeter bay and reinforced egg protection',
        body: "Every qualifying flight needed a verifiable, logged altitude and duration reading, so we built a dedicated bay for an onboard altimeter, and reworked the payload compartment's padding and shock-cord routing so the egg could survive both the motor's initial thrust and the parachute's opening shock.",
        reason: "Judges score off the altimeter's logged data, and a single cracked egg voids an otherwise perfect flight, so payload protection had to be taken as seriously as propulsion or recovery.",
        tradeoff: "The extra bay added weight and volume that ate into our altitude margin, so it had to be balanced carefully against the motor we'd already locked in.",
      },
    ],
    results: [
      'First test flight overshot to roughly 1,200 ft, tore apart at the body tube joint under an oversized parachute, and drifted out of reach. That was an automatic disqualification and forced a full redesign.',
      'The redesigned rocket completed all three official qualifying launches at 60 Acres Park with the egg intact every time. Launch 1: 848 ft in 45 s. Launch 2: 841 ft in 44 s. Launch 3: 857 ft in 39 s.',
      'Our two best flights came in 21 and 28 ft over the ~820 ft target and within a second of the ~45-second window, which is the range where teams usually go on to qualify for nationals.',
      'Competed in a national field of nearly 5,000 students across the American Rocketry Challenge that season.',
    ],
    takeaways: [
      "We assumed more power meant more margin, and it cost us the whole rocket: ~1,200 ft, a torn-off body tube, and a drift we couldn't even retrieve. When the target is precision, the motor has to match the airframe's actual design margins.",
      'Running stability and drag in OpenRocket and CAD before a rebuild cost us design time. Finding the same flaw by flying it would have cost us a qualifying window.',
      'One oversized chute or one cracked egg can void an otherwise perfect flight, so the egg padding ended up getting as much engineering attention as the motor.',
    ],
  },
  {
    slug: 'personal-website-old',
    title: 'Personal Website (old)',
    section: 'earlier',
    description:
      "The previous version of cleof.us: a React portfolio built around an LED-grid background that visitors could recolor and animate themselves. Since replaced by the site you're on now.",
    tags: ['React', 'Create React App', 'styled-components', 'GSAP', 'Lenis', 'React Router'],
    github: 'https://github.com/CleeYOpro/potential-parakeet',
    live: 'https://old.cleof.us/',
    note:
      "This was my personal site at cleof.us before the 2026 overhaul. cleof.us now points to the site you're on, so the live link above reflects wherever the domain currently resolves, not necessarily this exact version.",
    image: '/projects/images/personal-website-old/hero.png',
    images: [
      '/projects/images/personal-website-old/hero.png',
      '/projects/images/personal-website-old/settings.png',
      '/projects/images/personal-website-old/contact.png',
    ],
    overview:
      "This was the previous version of cleof.us, a single-page React portfolio built with Create React App, styled-components, GSAP, and Lenis. The whole thing was built around a custom LED-matrix background (LedGrid) that lit up across the page behind the hero, project highlights, about section, tech stack, and contact form.",
    problem:
      "Before this, my projects and background were scattered across GitHub, resumes, and one-off links, and there was no single, memorable place that represented me. A generic portfolio template would have solved the 'have a link to share' problem but not the 'make it feel like mine' one.",
    decisions: [
      {
        title: 'A user-configurable LED grid instead of a static hero background',
        body: "LedGrid.js rendered a full-page grid of glowing dots, and a SettingsModal let visitors pick the LED color (purple or green) and the animation mode themselves: cursor-follow (desktop only), matrix rain, wave, or none.",
        reason: 'A static gradient or hero image is forgettable. Letting visitors tweak the background turned a decorative element into something people would actually notice and play with.',
        tradeoff: 'Hand-rolling multiple animation states and a settings UI took a lot longer than dropping in a pre-made background library, and cursor-follow only worked on desktop, so mobile visitors always got a fallback animation.',
      },
      {
        title: 'styled-components, GSAP, and Lenis on top of Create React App',
        body: "Theming ran through a ThemeContext and styled-components (AppContainer and friends), scroll and entry animations through GSAP, and smooth scrolling across Hero, AboutMe, ProjectGrid, TechStack, and Contact through Lenis.",
        reason: "CRA doesn't come with any styling or animation opinions, and this combination got me a really custom, animated feel without adopting a heavier design-system framework.",
        tradeoff: 'The CRA + styled-components + GSAP bundle is heavier and slower to iterate on than a Next.js/Tailwind stack, which was part of the reason for the 2026 rebuild.',
      },
      {
        title: 'Shipping a DeprecationModal ahead of the actual rebuild',
        body: 'The old site had its own DeprecationModal component that told visitors an overhaul was coming, instead of letting the site go stale without saying anything.',
        reason: "If a redesign is already planned, it's better to say so than to let visitors assume an old-looking site is just unmaintained.",
        tradeoff: 'A visible "this is getting replaced" notice can undercut confidence in the current version while people wait for the rebuild.',
      },
    ],
    results: [
      'Was the live personal portfolio at cleof.us until the current Next.js site replaced it.',
      'Shipped a fully custom, user-configurable LED-grid background (color + animation mode) instead of a static template hero.',
    ],
    takeaways: [
      'For a personal site, having a look people remember can matter more than how technically sophisticated it is.',
      'By the end, CRA + styled-components + GSAP was slow enough to iterate on that rebuilding made more sense than patching it, which is how this site happened.',
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAward(project: Project): { place: string; logo: string } | null {
  if (!project.label) return null;
  const match = project.label.match(/^([\dA-Za-z]+\s+Place)\s*-\s*(.+)$/i);
  let place = project.label;
  if (match) {
    const [, placeOnly, rest] = match;
    const lastSegment = rest.includes('·') ? rest.split('·').pop()!.trim() : rest.trim();
    place = `${placeOnly} · ${lastSegment}`;
  }
  if (project.label.includes('TSA')) return { place, logo: '/tsa.png' };
  if (project.label.includes('Divergent')) return { place, logo: '/divergent.png' };
  return null;
}

function orderBySlug(slugs: string[]): Project[] {
  return slugs.map((slug) => getProject(slug)!);
}

export const featuredProjects = orderBySlug(['rolecaller', 'seattle-earthquake-gis', 'cmc-palliative', 'hurricane-claude']);
export const selectedProjects = orderBySlug(['price-it-right', 'port-laken', 'komekare', 'azoto-column']);
export const earlierProjects = orderBySlug(['tarc-rocket', 'personal-website-old', 'wordle-whiz']);
