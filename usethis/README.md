# Hurricane Claude / MIT BWSI portfolio-page package

Contains:

- `PROJECT_PAGE_COPY.md`: full case-study copy for adapting to your existing project data model.
- `src/components/projects/BWSIProjectPage.tsx`: standalone Tailwind + Next.js case-study page component with links, hero image, at-a-glance strip, narrative, figures, and materials.
- `public/projects/bwsi/`: actual visuals cropped from your uploaded Planning Team and Operations Team decks, plus the new downloadable presentation.
- `Hurricane_Claude_BWSI_Case_Study.pptx`: shorter editable 10-slide case-study presentation.

## Using the component

1. Copy `src/components/projects/BWSIProjectPage.tsx` into your Next.js codebase and copy `public/projects/bwsi` into its `public` folder.
2. In your existing dynamic `src/app/projects/[slug]/page.tsx`, render `<BWSIProjectPage />` for your chosen project slug (for example `mit-bwsi-remote-sensing`). **Do not overwrite your shared route file**. Update its project metadata/list entry separately.
3. If the route already supplies a shared page header and navigation, remove the corresponding sections from the component to avoid duplicates.
4. There is no GitHub/code link because none was provided for the BWSI final simulation. The page links to your actual Medium article and the generated PPTX.

Example insertion (adapt to your route's existing slug handling):

```tsx
import BWSIProjectPage from '@/components/projects/BWSIProjectPage';

// Inside your route's render logic, after resolving the slug:
if (slug === 'mit-bwsi-remote-sensing') return <BWSIProjectPage />;
```

No changes were pushed to GitHub. The component uses `next/image`, `next/link`, and Tailwind CSS; no additional third-party libraries.

## Accuracy / attribution

- BWSI Hurricane Claude is a **fictional** disaster-response simulation, not a real hurricane or live operational model.
- Flood-area figures are read from the **Planning Team** source deck (Day 3: 5,845/629 km²; Day 4: 4,390/370 km² for exposed/model-flooded area). The deck labels the first of these as **Day 3**.
- Deep-learning classification/segmentation materials come from the **Operations Team** source deck. The original team scores are not attributed personally to Cleo.
- More first-person methodological detail comes from the user's [August 2026 Medium article](https://medium.com/tierra-insights/zoom-out-from-google-maps-to-remote-sensing-at-mit-bwsi-8da153228e6e).
- Source images remain attributed to the team decks and any map tile/data providers shown on the source figures. Verify permission before redistributing team materials publicly.
