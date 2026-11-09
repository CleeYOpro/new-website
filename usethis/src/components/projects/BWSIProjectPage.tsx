import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const root = "/projects/bwsi";
const articleUrl =
  "https://medium.com/tierra-insights/zoom-out-from-google-maps-to-remote-sensing-at-mit-bwsi-8da153228e6e";

const details = [
  { label: "Role", value: "Planning: flood mapping", secondary: "Operations: imagery + SAR support" },
  { label: "Team", value: "MIT BWSI", secondary: "Remote Sensing for Disaster Response" },
  { label: "Timeline", value: "July–August 2026", secondary: "Four simulated forecast days" },
  { label: "Tools", value: "Python · GeoPandas · Shapely", secondary: "DEM · Folium · SVI · SAR" },
  { label: "Outcome", value: "370 km² modeled flood", secondary: "Day 4 / displayed study area" },
];

function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 900,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
      <Image
        src={`${root}/${src}`}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain"
      />
      <figcaption className="px-4 py-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {caption}
      </figcaption>
    </figure>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-slate-200 pt-10 dark:border-white/10">
      <h2 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

export default function BWSIProjectPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#091521] dark:text-white">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <Link href="/projects" className="text-sm text-slate-500 underline-offset-4 hover:underline dark:text-slate-400">
          ← All projects
        </Link>

        <header className="mt-9 max-w-4xl">
          <p className="text-sm font-medium tracking-widest text-teal-700 uppercase dark:text-teal-300">
            MIT Beaver Works Summer Institute · 2026
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Hurricane Claude: Mapping Flood Risk for Disaster Response
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
            I turned hurricane ensemble forecasts, surge estimates, elevation data, and community vulnerability into flood-risk maps for a simulated New England disaster response.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
            <a href={articleUrl} target="_blank" rel="noreferrer" className="rounded-full bg-teal-700 px-5 py-3 text-white transition hover:bg-teal-600 dark:bg-teal-400 dark:text-slate-950">
              Read the full story ↗
            </a>
            <a href={`${root}/Hurricane_Claude_BWSI_Case_Study.pptx`} download className="rounded-full border border-slate-300 px-5 py-3 transition hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10">
              Project slides ↓
            </a>
          </div>
        </header>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
          <Image
            src={`${root}/flood-comparison.jpg`}
            alt="Day 3 and Day 4 Hurricane Claude flood-map comparison, showing storm-surge exposure and modeled flood depths"
            width={2218}
            height={1050}
            priority
            className="h-auto w-full"
          />
          <p className="px-4 py-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Planning Team flood mapping, Days 3 and 4. Hurricane Claude was a fictional simulation.
          </p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {details.map((item) => (
            <div key={item.label} className="bg-slate-50 p-4 dark:bg-[#132434]">
              <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400">{item.label}</div>
              <div className="mt-2 text-sm font-semibold leading-6">{item.value}</div>
              <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.secondary}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-12">
          <Section id="overview" title="Overview">
            <p>
              For MIT BWSI&apos;s final project, our class ran Hurricane Claude, a fictional hurricane-response simulation across New England. The class split into planning, logistics, operations, and public information teams. I was on Planning, where I took responsibility for flood mapping. I also helped Operations with disaster-imagery analysis, deep-learning work, and SAR ship tracking.
            </p>
          </Section>

          <Section id="problem" title="Problem">
            <p>
              Knowing where a hurricane might travel does not tell you which places will flood. A surge zone describes potential exposure; it does not account for every hill, inlet, neighborhood, or barrier to getting help. We needed to turn four days of changing forecasts into something more useful than a storm track.
            </p>
          </Section>

          <Section id="constraints" title="Constraints">
            <ul className="list-disc space-y-2 pl-6">
              <li>Each daily forecast came with <strong>20 ensemble members</strong>, not a single guaranteed path.</li>
              <li>Surge heights were approximated in three distance bands: <strong>6 m / 4 m / 3 m</strong> across 0–80 / 80–160 / 160–300 km from the central path.</li>
              <li>Massachusetts has a complicated coastline, especially around Boston Harbor, inlets, and islands.</li>
              <li>Our time-limited elevation model was a screening estimate, not a validated live hydrodynamic forecast.</li>
            </ul>
          </Section>

          <Section id="decisions" title="Key decisions">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Build the surge zones from the ensemble</h3>
            <p>
              I averaged the 20 forecast positions at each forecast hour and connected those points into a central track. With Shapely and GeoPandas, I buffered that line and took geometric differences to create the three surge bands. The process let us compare how our area of concern changed each day without pretending the average path was certain.
            </p>
            <div className="grid gap-3 sm:grid-cols-4">
              {[1, 2, 3, 4].map((day) => (
                <Figure
                  key={day}
                  src={`forecast-day-${day}.jpg`}
                  alt={`Hurricane Claude ensemble forecast on simulation day ${day}`}
                  caption={`Day ${day}`}
                  width={600}
                  height={740}
                />
              ))}
            </div>
            <h3 className="pt-3 text-lg font-semibold text-slate-900 dark:text-white">Fix the geography before trusting the result</h3>
            <p>
              When I buffered the Massachusetts coast by five kilometers, the map looked wrong. I checked the projection, reprojected to <strong>UTM Zone 19N</strong> so my distances were in meters, and verified the buffer independently. The code was fine. Buffers from nearby pieces of coastline were merging around harbors and narrow inlets.
            </p>
            <p>
              That was also why a surge zone could not be the finished flood map. I used a <strong>30 m digital elevation model</strong> and compared elevation with the modeled surge heights to distinguish areas low enough to flood from areas merely inside the surge bands.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Figure src="flood-day-3.jpg" alt="Day 3 flood and surge-exposure map" caption="Day 3: 5,845 km² surge-exposed; 629 km² modeled flooding (11%)." width={974} height={977}/>
              <Figure src="flood-day-4.jpg" alt="Day 4 flood and surge-exposure map" caption="Day 4: 4,390 km² surge-exposed; 370 km² modeled flooding (8%)." width={993} height={977}/>
            </div>
            <h3 className="pt-3 text-lg font-semibold text-slate-900 dark:text-white">Add community vulnerability</h3>
            <p>
              I overlaid the CDC&apos;s <strong>Social Vulnerability Index</strong> on the hazard layers. Chelsea and East Boston repeatedly appeared where substantial coastal exposure overlapped higher social vulnerability. A map of water by itself would have missed that context.
            </p>
            <Figure src="social-vulnerability.jpg" alt="Social vulnerability index and simulated flood zones near Boston" caption="Planning Team overlay of flood exposure and social vulnerability near Boston." width={1225} height={960}/>
          </Section>

          <Section id="results" title="Results">
            <p>
              In the displayed study area, our Day 4 analysis showed <strong>4,390 km² of potential surge exposure</strong> but <strong>370 km² of modeled flooding</strong>. The higher-resolution maps focused attention on low-lying areas around Boston Harbor, Chelsea, East Boston, Quincy, and the Charles and Mystic river basins. Other Planning Team members used the combined risk layers, population, and shelter information in their evacuation-planning work.
            </p>
            <p className="text-sm italic text-slate-500 dark:text-slate-400">
              These are student-team simulation outputs, not measurements from a real hurricane or instructions for a real evacuation.
            </p>
          </Section>

          <Section id="operations" title="Operations: deep learning and SAR">
            <p>
              My main contribution was flood mapping, but I also helped Operations with imagery analysis. The team investigated <strong>ResNet-50/ResNet-152</strong> for damage classification, <strong>U-Net</strong> for segmentation, and <strong>Grad-CAM</strong> to inspect model attention. We worked with RescueNet and xView2 examples. The model scores in the original Operations slides are team results, not models I claim to have trained single-handedly.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Figure src="rescuenet-classification.jpg" alt="Disaster image classification examples from the Operations Team RescueNet slide" caption="Damage-classification examples from the Operations Team presentation." width={1280} height={710}/>
              <Figure src="grad-cam.jpg" alt="Grad-CAM interpretations of damage-classification images" caption="Grad-CAM heatmaps used to inspect what influenced image predictions." width={2215} height={805}/>
            </div>
            <p>
              I also helped track a simulated tanker in Hurricane Claude using synthetic aperture radar. We indexed <strong>83 scenes</strong> chronologically, combined <strong>VH and VV</strong> polarization measurements, reduced land-related false positives, and plotted <strong>eight timestamped positions</strong>. Early outputs zigzagged in a way a ship could not reasonably travel. A cleaner detection was only useful once the resulting route made geographic sense.
            </p>
          </Section>

          <Section id="takeaways" title="Takeaways">
            <p>
              The buffer mistake is still the part I remember. I kept expecting the code to be wrong, when it was the geometry of Massachusetts that I had misunderstood. The ship analysis had a similar problem: the detector could return coordinates without having found the right object. This project got me into the habit of questioning maps and model outputs against the physical place they claim to describe.
            </p>
          </Section>

          <Section id="materials" title="Materials">
            <p>
              The short presentation walks through the flood-mapping sequence first, then the Operations work. The Medium article covers the longer story, including the coastline debugging and SAR false positives.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <a href={`${root}/Hurricane_Claude_BWSI_Case_Study.pptx`} download className="rounded-full border border-slate-300 px-5 py-3 dark:border-white/20">Download the case-study slides ↓</a>
              <a href={articleUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-5 py-3 dark:border-white/20">Read the full Medium article ↗</a>
            </div>
          </Section>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-8 dark:border-white/10">
          <Link href="/projects" className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-300">← See all projects</Link>
        </div>
      </div>
    </main>
  );
}
