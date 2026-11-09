// Builds the system prompt for the site AI (/ai, served by /api/chat) from the
// same data the pages render, so new projects, articles, experience, and
// photos reach the chat without a separate edit here.

import { aboutBio, education, experience, moments } from '@/lib/about';
import { ABOUT_CLEO } from '@/lib/ai-about-cleo';
import { contactEmails, socialLinks } from '@/lib/contact';
import { heroBio, heroTagline, homeNumbers } from '@/lib/home';
import { articles } from '@/lib/medium';
import { earlierProjects, featuredProjects, projects, selectedProjects, type Project } from '@/lib/projects';
import { techStack } from '@/lib/tech-stack';

// Cleo's own summary for the AI. Parts of it (awards roundup, hobbies,
// availability) aren't on any page.
const QUICK_FACTS = `
- Cleo Balaranjith: high school senior and computer science student in Sammamish, WA (Pacific time).
- Running Start at Bellevue College while attending Eastlake High School.
- Selected for MIT Beaver Works Summer Institute (~6% acceptance), remote sensing for disaster response.
- Interned at Rove Miles (YC W24), building a Python autocomplete system for 9,000+ airports.
- Business strategy work for Seattle Sports & Regenerative Medicine.
- Studied computer vision in the University of Michigan's Joy of Coding program.
- Observed hospital operations at CMC Vellore, one of Asia's leading hospitals.
- Awards: 1st in Geospatial Technology at WTSA State, 4th in Engineering Design, 2x TSA nationals, 2nd nationally in Technology Problem Solving, 3rd in Audio Podcasting at WTSA State, 3rd at the Divergent Hackathon, 8th at WTSA 2026.
- Stack: React, Next.js, TypeScript, Python, Firebase, Supabase, Vercel, ArcGIS, Google Earth Engine. VS Code and GitHub daily.
- Available to hire and open to interesting opportunities.
- Hobbies and life outside of work:
  - Working out, lifting, and boxing.
  - Hiking, national parks, road trips, and getting outdoors (e.g. Redwood National Park, Mount Baker).
  - Rocketry: designing, building, and launching model rockets.
  - Photography: places he visits, landscapes, and random moments.
  - Geography and maps: into atlases, Google Earth, and exploring places since he was young.
  - Writing and storytelling: Medium articles, recounting experiences, and podcast storytelling.
  - Building random things, like a backyard chicken coop, home automation, and hardware projects.
  - Faith and church: Bible study, Awana, youth group, and volunteering are meaningful parts of his life.
  - Travel and exploring cultures, especially around India and the US, visiting historical places and learning about different communities.
  - Hanging out with friends, having conversations, and enjoying his senior year.
`.trim();

// Projects whose page body is hand-built in a component instead of coming from
// projects.ts. Their text is mirrored here; update it when the component changes.
const CUSTOM_PAGE_TEXT: Record<string, string> = {
  // src/components/projects/HurricaneClaude.tsx
  'hurricane-claude': `
At a glance:
- Role: Planning (flood mapping). Operations support: imagery analysis and SAR ship tracking.
- Team: MIT BWSI Remote Sensing for Disaster Response, a multi-team emergency-response simulation.
- Timeline: July–August 2026, four simulated forecast days.
- Tools: Python, GeoPandas, Shapely, Folium; 30 m DEM, UTM 19N, CDC SVI, SAR backscatter.
- Outcome: 4,390 km² exposed, 370 km² modeled flooding (Day 4, displayed study area).

Overview:
For BWSI's final project, our class ran Hurricane Claude, a fictional hurricane-response simulation across New England. Different teams handled planning, logistics, operations, and public information. I was on Planning, where my main responsibility was flood mapping. I also helped with imagery analysis on the Operations side, including deep-learning work and tracking a ship using synthetic aperture radar (SAR).
The question I kept coming back to was fairly simple: if we know where the storm might go, how do we figure out what actually needs attention on the ground?

Problem:
A forecast track can tell you where the center of a hurricane might travel. It does not tell you which streets flood, whether high ground stays dry, or which neighborhoods will have the hardest time recovering. Even a storm-surge boundary can be misleading if you treat every bit of land inside it as underwater.
Our simulation supplied changing forecasts over four days (by Day 4 the storm had moved largely offshore, and the planning maps had to move with it). My job was to make sense of that uncertainty and translate it into a geographic assessment that could inform the rest of the response.

Constraints:
- Each daily forecast contained 20 ensemble members, not one certain storm path.
- Surge was approximated with distance bands around the central forecast path: 6 m within 80 km, 4 m between 80–160 km, and 3 m between 160–300 km.
- The Massachusetts coast has harbors, islands, river inlets, and narrow peninsulas. A simple inland buffer can look much more expansive than you expect.
- The model needed to distinguish potential exposure from elevation-based flooding and then consider the communities living inside those areas.
- This was a time-limited simulation. The outputs were screening estimates, not a hydrodynamic forecast or a real evacuation order.

Key decisions:
- Start with the ensemble, then build the surge zones: I averaged the positions of 20 forecast members at each forecast hour and connected them into a central path. Using Shapely and GeoPandas, I built the three surge-distance bands with buffer and difference operations. This gave us a consistent way to compare the storm's changing reach from day to day, while keeping in mind that the average line was only a summary of many possible tracks.
- Debug the coastline before trusting the flood map: A five-kilometer buffer around the Massachusetts coastline looked wildly too large, especially near Boston Harbor. I checked my projection, reprojected the geometry into UTM Zone 19N so the distances were in meters, and verified the buffer independently. The math was right. The geography was what I had misunderstood: buffers from opposite sides of narrow inlets and coastlines were merging on the map. That issue made it pretty obvious why a surge zone could not be my final output. I brought in a 30 m digital elevation model and used a simple bathtub-style comparison between surge height and terrain elevation to estimate where flooding could occur. It was a rough model with clear limits, but substantially more useful than coloring every exposed coastal area blue.
- Put people on top of the hazard map: I overlaid the CDC Social Vulnerability Index (SVI) with the hazard and flood layers. Chelsea and East Boston repeatedly stood out: the maps indicated significant coastal exposure overlapping with communities that could face additional barriers during a disaster. The point was not to rank people by a single index; it was to make sure our physical hazard map wasn't the only thing guiding attention.

Results table (modeled values from the Planning Team's displayed map extent, not observed hurricane impacts):
- Day 3: 5,845 km² surge-exposed, 629 km² modeled flooding, 11% flooded share.
- Day 4: 4,390 km² surge-exposed, 370 km² modeled flooding, 8% flooded share.
In the resulting maps, flood risk concentrated in low-lying parts of the Boston Harbor area, including East Boston, Chelsea, Quincy, and the Charles and Mystic river basins. The team also used hazard, population, vulnerability, and shelter information in its broader evacuation-planning work. Student-team simulation outputs, not measurements from a real hurricane or instructions for a real evacuation.

Operations support:
Planning was my main contribution, but I also helped on Operations. That team worked on disaster imagery, including ResNet-50/ResNet-152 damage classification, U-Net segmentation, and Grad-CAM visual explanations with the RescueNet and xView2 datasets. I contributed to this side of the work, although the models and reported performance figures were team results, not models I am claiming to have built alone. (Grad-CAM heatmaps let the team check the model was looking at buildings and not the background.)
I also helped investigate a ship caught in Hurricane Claude using radar imagery. The team sorted 83 SAR scenes by timestamp and worked with VH/VV polarization data and land masking to reduce bright coastline false positives. Early detections made an implausible zigzagging track. After filtering and geolocating candidate detections, the eight mapped positions formed a more coherent offshore path. The resulting assessment supported leaving evacuation resources focused on higher-priority areas rather than treating every bright radar pixel as a ship.

Takeaways:
The coastline bug is the part I still remember best. I spent time questioning the code, only to find that the five-kilometer buffer was correct and my picture of the coastline was wrong. A map can be mathematically valid and still be interpreted badly.
The same problem showed up in the SAR work. A detection pipeline can produce clean-looking coordinates that are completely implausible once plotted. I came out of the project much more skeptical of outputs that look convincing without being checked against the geography and the actual problem.

The page also embeds the project slides: a shorter walkthrough of the flood-mapping sequence first, then the Operations work.
`.trim(),
};

// Drops the **bold** and [text](url) markup used in the site data.
function plain(text: string) {
  return text.replace(/\[(.+?)\]\((.+?)\)/g, '$1 ($2)').replace(/\*\*(.+?)\*\*/g, '$1');
}

function list(items: string[]) {
  return items.map((i) => `- ${plain(i)}`).join('\n');
}

const SECTION_NAMES: Record<Project['section'], string> = {
  featured: 'Featured Projects',
  selected: 'Selected Projects',
  earlier: 'Earlier Work',
};

function projectText(p: Project) {
  const links = [
    p.live && `Live: ${p.live}`,
    p.website && `${p.website.label}: ${p.website.url}`,
    p.github && `GitHub: ${p.github}`,
    p.githubSecondary && `${p.githubSecondary.label}: ${p.githubSecondary.url}`,
    p.figma && `Figma: ${p.figma}`,
    p.medium && `Medium write-up: ${p.medium}`,
    p.competition && `${p.competition.label}: ${p.competition.url}`,
    p.doc && `${p.doc.label}: ${p.doc.url}`,
    p.pdf && `Embedded PDF on the page: ${p.pdf.title}`,
    p.trifold && `Embedded on the page: ${p.trifold.title}`,
    p.videos?.length && `Videos on the page: ${p.videos.map((v) => v.title).join(', ')}`,
  ].filter(Boolean);

  return [
    `### ${p.title} (/projects/${p.slug})`,
    `Listed under: ${SECTION_NAMES[p.section]}`,
    p.label && `Award: ${p.label}`,
    `Summary: ${plain(p.description)}`,
    `Tags: ${p.tags.join(', ')}`,
    links.length && `Links:\n${list(links as string[])}`,
    p.note && `Note: ${plain(p.note)}`,
    `Overview:\n${plain(p.overview)}`,
    p.problem && `Problem:\n${plain(p.problem)}`,
    p.constraints?.length && `Constraints:\n${list(p.constraints)}`,
    p.decisions?.length &&
      `Key engineering decisions:\n${p.decisions
        .map((d) => `- ${d.title}: ${plain(d.body)} Reason: ${plain(d.reason)} Tradeoff: ${plain(d.tradeoff)}`)
        .join('\n')}`,
    p.results?.length && `Results:\n${list(p.results)}`,
    p.takeaways?.length && `Takeaways:\n${list(p.takeaways)}`,
    CUSTOM_PAGE_TEXT[p.slug],
  ]
    .filter(Boolean)
    .join('\n\n');
}

function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Medium article HTML to readable plain text.
function htmlToText(html: string) {
  const text = html
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<figcaption[^>]*>/gi, '\n(Caption) ')
    .replace(/<\/(p|h\d|blockquote|figure|figcaption|pre|ul|ol)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '');
  return decodeEntities(text)
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function articleText(a: (typeof articles)[number]) {
  return [
    `### ${a.title} (/blogs/${a.slug})`,
    `Published ${a.publishedAt.slice(0, 10)} on Medium${a.publication ? ` in ${a.publication.name}` : ''}, ${a.readingMinutes} min read. Original: ${a.url}`,
    a.tags.length && `Tags: ${a.tags.join(', ')}`,
    htmlToText(a.html),
  ]
    .filter(Boolean)
    .join('\n');
}

const HOME = `
Headline: Cleo Balaranjith, "${heroTagline}"
${heroBio.join('\n')}
Featured project cards: ${featuredProjects.map((p) => p.title).join(', ')}.
"Read This" shows the three newest articles. There's also a GitHub contribution graph for @CleeYOpro.
By the numbers:
${homeNumbers.map((n) => `- ${n.appName} (${n.time}): ${n.message}`).join('\n')}
`.trim();

const ABOUT = [
  aboutBio.join('\n\n'),
  `Tech stack (an interactive keyboard where each key is a tool he uses):\n${Object.values(techStack)
    .map((t) => `- ${t.name}: ${t.desc}`)
    .join('\n')}`,
  `Experience:\n${experience
    .map((e) => `- ${e.company}, ${e.role} (${e.period}, ${e.location}). ${e.bullets.map(plain).join(' ')} Tags: ${e.tags.join(', ')}.${e.website ? ` Website: ${e.website}` : ''}`)
    .join('\n')}`,
  `Education:\n${education
    .map((e) => `- ${e.institution}, ${e.degree} (${e.period}, ${e.location}). ${e.bullets.map(plain).join(' ')}`)
    .join('\n')}`,
  `Moments (a photo album captioned "these r just some random pics"; each photo has a title and caption):\n${moments
    .map((m) => `- ${m.title}: ${m.description}`)
    .join('\n')}`,
].join('\n\n');

const PROJECT_GROUPS = [
  `Projects page order. Featured: ${featuredProjects.map((p) => p.title).join(', ')}. Selected: ${selectedProjects
    .map((p) => p.title)
    .join(', ')}. Earlier work: ${earlierProjects.map((p) => p.title).join(', ')}.`,
  ...projects.map(projectText),
].join('\n\n');

const CONTACT = `
The /contact page has a message form (name, email, optional phone, message) and an embed of his latest LinkedIn post.
${[...contactEmails, ...socialLinks].map((c) => `- ${c.label}: ${c.href.replace(/^mailto:/, '')}`).join('\n')}
- Medium: @cleobala (https://medium.com/@cleobala)
The best general contact is cbalaranjith@gmail.com.
`.trim();

const THIS_SITE = `
Pages: home (/), about (/about), projects (/projects and /projects/<slug>), articles (/blogs and /blogs/<slug>), this chat (/ai), and contact (/contact).
The nav has a settings menu (gear icon) where visitors can change the site's accent color and the animated dot-grid background. The footer shows the current time in Seattle.
It's built with Next.js, React, and TypeScript, deployed on Cloudflare, with GSAP and WebGL animations and in-page PDF viewers. Articles are synced from his Medium. This chat runs on Google's Gemini API.
It replaced his older React portfolio (see the Personal Website (old) project).
`.trim();

export const SYSTEM_PROMPT = `You are cleo's AI, the assistant on Cleo Balaranjith's personal website. Visitors ask about Cleo: his work, projects, writing, interests, and how to reach him.

How to answer:
- Voice: casual, friendly, lowercase. Refer to Cleo in the third person (he/him).
- Format: plain text only. The chat shows raw text, so no markdown (no asterisks, headings, or bullet symbols).
- Length: usually 1-4 sentences. When a visitor asks for detail or technical depth, go longer, in short paragraphs separated by blank lines.
- Only use the information below: the full content of Cleo's website, followed by supplementary context Cleo wrote for you. If something isn't covered, say you don't know and suggest emailing cbalaranjith@gmail.com. Never make up details, numbers, quotes, or opinions.
- The website content is the source of truth for facts, numbers, dates, and outcomes. For a specific project, go by that project's own section. The supplementary context covers his interests, working style, and personality; it adds to the website and never overrides it.
- When it helps, point visitors to the page where they can read more (for example /projects/rolecaller or /blogs).
- Politely decline requests unrelated to Cleo.

# Quick facts (written by Cleo)
${QUICK_FACTS}

# Website content

## Home page (/)
${HOME}

## About page (/about)
${ABOUT}

## Projects (/projects)
${PROJECT_GROUPS}

## Articles (/blogs)
Full text of every article on the site, newest first.

${articles.map(articleText).join('\n\n')}

## Contact (/contact)
${CONTACT}

## This website
${THIS_SITE}

# Supplementary context (written by Cleo for this assistant)
${ABOUT_CLEO}`;
