import type { TocHeading } from '@/components/ProjectToc';
import ProjectFigure from '@/components/ProjectFigure';
import ProjectPdfSlides from '@/components/ProjectPdfSlides';
import { FloatReveal } from '@/components/FloatReveal';
import { TypeText } from '@/components/TypeText';

// This page's text is mirrored in src/lib/ai-context.ts for the site AI; update both.
const root = '/projects/images/hurricane-claude';

export const hurricaneClaudeHeadings: TocHeading[] = [
  { id: 'overview', label: 'Overview', depth: 1 },
  { id: 'problem', label: 'Problem', depth: 1 },
  { id: 'constraints', label: 'Constraints', depth: 1 },
  { id: 'key-decisions', label: 'Key Decisions', depth: 1 },
  { id: 'ensemble', label: 'Ensemble to surge zones', depth: 2 },
  { id: 'coastline', label: 'Debugging the coastline', depth: 2 },
  { id: 'vulnerability', label: 'Adding vulnerability', depth: 2 },
  { id: 'results', label: 'Results', depth: 1 },
  { id: 'operations', label: 'Operations Support', depth: 1 },
  { id: 'takeaways', label: 'Takeaways', depth: 1 },
  { id: 'slides', label: 'Slides', depth: 1 },
];

const glance = [
  { label: 'Role', value: 'Planning: flood mapping', detail: 'Operations support: imagery analysis and SAR ship tracking' },
  { label: 'Team', value: 'MIT BWSI Remote Sensing for Disaster Response', detail: 'Multi-team emergency-response simulation' },
  { label: 'Timeline', value: 'July–August 2026', detail: 'Four simulated forecast days' },
  { label: 'Tools', value: 'Python, GeoPandas, Shapely, Folium', detail: '30 m DEM, UTM 19N, CDC SVI, SAR backscatter' },
  { label: 'Outcome', value: '4,390 km² exposed, 370 km² modeled flooding', detail: 'Day 4, displayed study area' },
];

const floodTable = [
  { day: 'Day 3', exposed: '5,845 km²', flooded: '629 km²', share: '11%' },
  { day: 'Day 4', exposed: '4,390 km²', flooded: '370 km²', share: '8%' },
];

export default function HurricaneClaude() {
  return (
    <>
      <FloatReveal from="left">
        <ProjectFigure
          eager
          images={[{
            src: `${root}/flood-comparison.jpg`,
            alt: 'Side-by-side Day 3 and Day 4 maps of the New England coast comparing storm-surge exposure bands with modeled flood depths',
            width: 2218,
            height: 1004,
          }]}
          caption="Days 3 and 4: the shaded bands are where surge could reach, the blue is where the land is actually low enough to flood. Hurricane Claude was a fictional simulation."
        />
      </FloatReveal>

      <FloatReveal from="right">
        <dl className="project-glance">
          {glance.map((g) => (
            <div key={g.label} className="project-glance-row">
              <dt>{g.label}</dt>
              <dd>
                {g.value}
                <span className="project-glance-detail">{g.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </FloatReveal>

      <article className="project-prose">
        <FloatReveal from="left">
          <section id="overview" className="project-section">
            <TypeText as="h2" text="Overview" />
            <p>
              For BWSI&apos;s final project, our class ran Hurricane Claude, a fictional hurricane-response simulation across New England. Different teams handled planning, logistics, operations, and public information. I was on Planning, where my main responsibility was flood mapping. I also helped with imagery analysis on the Operations side, including deep-learning work and tracking a ship using synthetic aperture radar (SAR).
            </p>
            <p>
              The question I kept coming back to was fairly simple: if we know where the storm might go, how do we figure out what actually needs attention on the ground?
            </p>
          </section>
        </FloatReveal>

        <FloatReveal from="right">
          <section id="problem" className="project-section">
            <TypeText as="h2" text="Problem" />
            <p>
              A forecast track can tell you where the center of a hurricane might travel. It does not tell you which streets flood, whether high ground stays dry, or which neighborhoods will have the hardest time recovering. Even a storm-surge boundary can be misleading if you treat every bit of land inside it as underwater.
            </p>
            <ProjectFigure
              columns={4}
              aspect="4 / 5"
              images={[1, 2, 3, 4].map((day) => ({
                src: `${root}/forecast-day-${day}.jpg`,
                alt: `Hurricane Claude ensemble forecast cone on simulation day ${day}`,
                width: [570, 568, 576, 660][day - 1],
                height: 703,
              }))}
              caption="The ensemble forecast on each of the four simulation days. By Day 4 the storm had moved largely offshore, and the planning maps had to move with it."
            />
            <p>
              Our simulation supplied changing forecasts over four days. My job was to make sense of that uncertainty and translate it into a geographic assessment that could inform the rest of the response.
            </p>
          </section>
        </FloatReveal>

        <FloatReveal from="left">
          <section id="constraints" className="project-section">
            <TypeText as="h2" text="Constraints" />
            <ul>
              <li>Each daily forecast contained <strong>20 ensemble members</strong>, not one certain storm path.</li>
              <li>Surge was approximated with distance bands around the central forecast path: <strong>6 m within 80 km</strong>, <strong>4 m between 80–160 km</strong>, and <strong>3 m between 160–300 km</strong>.</li>
              <li>The Massachusetts coast has harbors, islands, river inlets, and narrow peninsulas. A simple inland buffer can look much more expansive than you expect.</li>
              <li>The model needed to distinguish <strong>potential exposure</strong> from <strong>elevation-based flooding</strong> and then consider the communities living inside those areas.</li>
              <li>This was a time-limited simulation. The outputs were screening estimates, <strong>not a hydrodynamic forecast or a real evacuation order</strong>.</li>
            </ul>
          </section>
        </FloatReveal>

        <FloatReveal from="right">
          <section id="key-decisions" className="project-section">
            <TypeText as="h2" text="Key Decisions" />

            <div className="project-decision">
              <h3 id="ensemble">Start with the ensemble, then build the surge zones</h3>
              <p>
                I averaged the positions of 20 forecast members at each forecast hour and connected them into a central path. Using Shapely and GeoPandas, I built the three surge-distance bands with buffer and difference operations. This gave us a consistent way to compare the storm&apos;s changing reach from day to day, while keeping in mind that the average line was only a summary of many possible tracks.
              </p>
              <ProjectFigure
                images={[{
                  src: `${root}/surge-day-2.jpg`,
                  alt: 'Day 2 map of the three storm-surge distance bands around the central forecast path, from New York to Nova Scotia',
                  width: 1120,
                  height: 850,
                }]}
                caption="Day 2 surge bands around the central forecast path: 6 m within 80 km, 4 m out to 160 km, 3 m out to 300 km."
              />
            </div>

            <div className="project-decision">
              <h3 id="coastline">Debug the coastline before trusting the flood map</h3>
              <p>
                A five-kilometer buffer around the Massachusetts coastline looked wildly too large, especially near Boston Harbor. I checked my projection, reprojected the geometry into <strong>UTM Zone 19N</strong> so the distances were in meters, and verified the buffer independently. The math was right. The geography was what I had misunderstood: buffers from opposite sides of narrow inlets and coastlines were merging on the map.
              </p>
              <ProjectFigure
                images={[{
                  src: `${root}/surge-day-1.jpg`,
                  alt: 'Day 1 map of five-kilometer coastal surge zones shaded along the New England coast before elevation was applied',
                  width: 1013,
                  height: 984,
                }]}
                caption="Day 1: the 5 km coastal zones where surge could reach land, before elevation was applied. Everything shaded here is exposed, not necessarily flooded."
              />
              <p>
                That issue made it pretty obvious why a surge zone could not be my final output. I brought in a <strong>30 m digital elevation model</strong> and used a simple bathtub-style comparison between surge height and terrain elevation to estimate where flooding could occur. It was a rough model with clear limits, but substantially more useful than coloring every exposed coastal area blue.
              </p>
            </div>

            <div className="project-decision">
              <h3 id="vulnerability">Put people on top of the hazard map</h3>
              <p>
                I overlaid the <strong>CDC Social Vulnerability Index (SVI)</strong> with the hazard and flood layers. <strong>Chelsea and East Boston</strong> repeatedly stood out: the maps indicated significant coastal exposure overlapping with communities that could face additional barriers during a disaster. The point was not to rank people by a single index; it was to make sure our physical hazard map wasn&apos;t the only thing guiding attention.
              </p>
              <ProjectFigure
                images={[{
                  src: `${root}/social-vulnerability.jpg`,
                  alt: 'Day 2 map of Social Vulnerability Index scores inside the 6 m and 4 m surge zones around Boston, with MIT campus marked',
                  width: 1225,
                  height: 960,
                }]}
                caption="Social vulnerability inside the 6 m and 4 m surge zones around Boston on Day 2. Darker red means higher vulnerability."
              />
            </div>
          </section>
        </FloatReveal>

        <FloatReveal from="left">
          <section id="results" className="project-section">
            <TypeText as="h2" text="Results" />
            <div className="project-table-wrap">
              <table className="project-table">
                <thead>
                  <tr>
                    <th scope="col">Simulation day</th>
                    <th scope="col">Surge-exposed area</th>
                    <th scope="col">Modeled flooding</th>
                    <th scope="col">Flooded share</th>
                  </tr>
                </thead>
                <tbody>
                  {floodTable.map((row) => (
                    <tr key={row.day}>
                      <td>{row.day}</td>
                      <td>{row.exposed}</td>
                      <td>{row.flooded}</td>
                      <td>{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              These are modeled values from the Planning Team&apos;s displayed map extent, not observed hurricane impacts. In the resulting maps, flood risk concentrated in low-lying parts of the Boston Harbor area, including East Boston, Chelsea, Quincy, and the Charles and Mystic river basins. The team also used hazard, population, vulnerability, and shelter information in its broader evacuation-planning work.
            </p>
            <p className="project-section-aside">
              Student-team simulation outputs, not measurements from a real hurricane or instructions for a real evacuation.
            </p>
          </section>
        </FloatReveal>

        <FloatReveal from="right">
          <section id="operations" className="project-section">
            <TypeText as="h2" text="Operations Support" />
            <p>
              Planning was my main contribution, but I also helped on Operations. That team worked on disaster imagery, including <strong>ResNet-50/ResNet-152 damage classification</strong>, <strong>U-Net segmentation</strong>, and <strong>Grad-CAM</strong> visual explanations with the RescueNet and xView2 datasets. I contributed to this side of the work, although the models and reported performance figures were team results, not models I am claiming to have built alone.
            </p>
            <ProjectFigure
              images={[{
                src: `${root}/rescuenet-classification.jpg`,
                alt: 'Six aerial hurricane-damage photos labeled with true and predicted damage classes and model confidence',
                width: 1254,
                height: 694,
              }]}
              caption="Damage classification on RescueNet aerial imagery. The top row is correct; the bottom row mistakes medium damage for superficial. Operations Team results."
            />
            <ProjectFigure
              images={[{
                src: `${root}/grad-cam.jpg`,
                alt: 'Four satellite image tiles with Grad-CAM heatmaps over buildings, labeled no damage, minor damage, moderate damage, and destroyed',
                width: 1175,
                height: 805,
              }]}
              caption="Grad-CAM heatmaps: red marks the part of each image that most influenced the damage label, which let the team check the model was looking at buildings and not the background."
            />
            <p>
              I also helped investigate a ship caught in Hurricane Claude using radar imagery. The team sorted <strong>83 SAR scenes</strong> by timestamp and worked with <strong>VH/VV polarization data</strong> and land masking to reduce bright coastline false positives. Early detections made an implausible zigzagging track. After filtering and geolocating candidate detections, the eight mapped positions formed a more coherent offshore path. The resulting assessment supported leaving evacuation resources focused on higher-priority areas rather than treating every bright radar pixel as a ship.
            </p>
          </section>
        </FloatReveal>

        <FloatReveal from="left">
          <section id="takeaways" className="project-section">
            <TypeText as="h2" text="Takeaways" />
            <p>
              The coastline bug is the part I still remember best. I spent time questioning the code, only to find that the five-kilometer buffer was correct and my picture of the coastline was wrong. A map can be mathematically valid and still be interpreted badly.
            </p>
            <p>
              The same problem showed up in the SAR work. A detection pipeline can produce clean-looking coordinates that are completely implausible once plotted. I came out of the project much more skeptical of outputs that look convincing without being checked against the geography and the actual problem.
            </p>
          </section>
        </FloatReveal>

        <FloatReveal from="right">
          <section id="slides" className="project-section">
            <TypeText as="h2" text="Slides" />
            <p>
              A shorter walkthrough of the same project: the flood-mapping sequence first, then the Operations work.
            </p>
            <ProjectPdfSlides src={`${root}/hurricane-claude-slides.pdf`} title="Hurricane Claude slides" />
          </section>
        </FloatReveal>
      </article>
    </>
  );
}
