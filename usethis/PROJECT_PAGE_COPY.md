# Hurricane Claude: Mapping Flood Risk for Disaster Response

**MIT Beaver Works Summer Institute · Remote Sensing for Disaster Response · Summer 2026**

**One-line summary:** I built flood-risk maps for a simulated New England hurricane, turning ensemble forecasts, storm-surge estimates, elevation data, and community vulnerability into something a response team could use.

**Links:** [Read the full story on Medium](https://medium.com/tierra-insights/zoom-out-from-google-maps-to-remote-sensing-at-mit-bwsi-8da153228e6e) · [View the project presentation](./Hurricane_Claude_BWSI_Case_Study.pptx)

> **At a glance**
> - **Role:** Planning Team, flood-mapping focus; additional support to Operations on imagery analysis and SAR ship tracking
> - **Team:** MIT BWSI Remote Sensing for Disaster Response cohort, working in a multi-team emergency-response simulation
> - **Timeline:** July–August 2026; four simulated forecast days
> - **Tools:** Python, Shapely, GeoPandas, raster/DEM analysis, Folium, UTM 19N, CDC Social Vulnerability Index, SAR backscatter analysis
> - **Output:** Day 4 analysis distinguished **4,390 km² of surge exposure** from **370 km² of modeled flooding** in the displayed study area

**Recommended hero image:** `public/projects/bwsi/flood-comparison.jpg` (original project maps, Days 3–4)

## Overview

For BWSI's final project, our class ran Hurricane Claude, a fictional hurricane-response simulation across New England. Different teams handled planning, logistics, operations, and public information. I was on Planning, where my main responsibility was flood mapping. I also helped with imagery analysis on the Operations side, including deep-learning work and tracking a ship using synthetic aperture radar (SAR).

The question I kept coming back to was fairly simple: if we know where the storm might go, how do we figure out what actually needs attention on the ground?

## Problem

A forecast track can tell you where the center of a hurricane might travel. It does not tell you which streets flood, whether high ground stays dry, or which neighborhoods will have the hardest time recovering. Even a storm-surge boundary can be misleading if you treat every bit of land inside it as underwater.

Our simulation supplied changing forecasts over four days. My job was to make sense of that uncertainty and translate it into a geographic assessment that could inform the rest of the response.

## Constraints

- Each daily forecast contained **20 ensemble members**, not one certain storm path.
- Surge was approximated with distance bands around the central forecast path: **6 m within 80 km**, **4 m between 80–160 km**, and **3 m between 160–300 km**.
- The Massachusetts coast has harbors, islands, river inlets, and narrow peninsulas. A simple inland buffer can look much more expansive than you expect.
- The model needed to distinguish **potential exposure** from **elevation-based flooding** and then consider the communities living inside those areas.
- This was a time-limited simulation. The outputs were screening estimates, **not a hydrodynamic forecast or a real evacuation order**.

## Key decisions

### 1. Start with the ensemble, then build the surge zones

I averaged the positions of 20 forecast members at each forecast hour and connected them into a central path. Using Shapely and GeoPandas, I built the three surge-distance bands with buffer and difference operations. This gave us a consistent way to compare the storm's changing reach from day to day, while keeping in mind that the average line was only a summary of many possible tracks.

### 2. Debug the coastline before trusting the flood map

A five-kilometer buffer around the Massachusetts coastline looked wildly too large, especially near Boston Harbor. I checked my projection, reprojected the geometry into **UTM Zone 19N** so the distances were in meters, and verified the buffer independently. The math was right. The geography was what I had misunderstood: buffers from opposite sides of narrow inlets and coastlines were merging on the map.

That issue made it pretty obvious why a surge zone could not be my final output. I brought in a **30 m digital elevation model** and used a simple bathtub-style comparison between surge height and terrain elevation to estimate where flooding could occur. It was a rough model with clear limits, but substantially more useful than coloring every exposed coastal area blue.

### 3. Put people on top of the hazard map

I overlaid the **CDC Social Vulnerability Index (SVI)** with the hazard and flood layers. **Chelsea and East Boston** repeatedly stood out: the maps indicated significant coastal exposure overlapping with communities that could face additional barriers during a disaster. The point was not to rank people by a single index; it was to make sure our physical hazard map wasn't the only thing guiding attention.

## Results

| Simulation day | Surge-exposed area shown | Modeled flooded area | Flooded share |
| --- | ---: | ---: | ---: |
| Day 3 | 5,845 km² | 629 km² | 11% |
| Day 4 | 4,390 km² | 370 km² | 8% |

These are **modeled values from the Planning Team's displayed map extent**, not observed hurricane impacts. In the resulting maps, flood risk concentrated in low-lying parts of the Boston Harbor area, including East Boston, Chelsea, Quincy, and the Charles and Mystic river basins. The team also used hazard, population, vulnerability, and shelter information in its broader evacuation-planning work.

## Operations support: imagery, deep learning, and SAR

Planning was my main contribution, but I also helped on Operations. That team worked on disaster imagery, including **ResNet-50/ResNet-152 damage classification**, **U-Net segmentation**, and **Grad-CAM** visual explanations with the RescueNet and xView2 datasets. I contributed to this side of the work, although the models and reported performance figures were **team results**, not models I am claiming to have built alone.

I also helped investigate a ship caught in Hurricane Claude using radar imagery. The team sorted **83 SAR scenes** by timestamp and worked with **VH/VV polarization data** and land masking to reduce bright coastline false positives. Early detections made an implausible zigzagging track. After filtering and geolocating candidate detections, the eight mapped positions formed a more coherent offshore path. The resulting assessment supported leaving evacuation resources focused on higher-priority areas rather than treating every bright radar pixel as a ship.

## Takeaways

The coastline bug is the part I still remember best. I spent time questioning the code, only to find that the five-kilometer buffer was correct and my picture of the coastline was wrong. A map can be mathematically valid and still be interpreted badly.

The same problem showed up in the SAR work. A detection pipeline can produce clean-looking coordinates that are completely implausible once plotted. I came out of the project much more skeptical of outputs that look convincing without being checked against the geography and the actual problem.

## Materials

Suggested gallery order for the page: **four-day track comparison**, **surge bands**, **Days 3–4 flood map**, **SVI overlap**, **Operations model examples**. Place the team presentation and the longer Medium article after the case study.

### Source / attribution notes

- This project took place during MIT Beaver Works Summer Institute's **Remote Sensing for Disaster Response** course in **2026**. Hurricane Claude was **fictional**.
- Visuals are from the uploaded **Planning Team** and **Operations Team** presentations. Figures and classifications shown in those decks are **team outputs**.
- The Medium article provides first-person process details, including the coastline debugging and SAR tracking narrative.
- Do **not** describe the BWSI simulation as deployed emergency-response software, a validated storm-surge model, or an MIT research publication.
