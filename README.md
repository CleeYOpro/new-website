# Cleo's Portfolio Website

A modern, animated personal portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS**. Features interactive GitHub contribution tracking, project showcases, and smooth animations powered by GSAP and Lenis.

**Live at:** https://www.cleof.us/

---

## 🎯 What's Here

This is a full-stack portfolio site showcasing:

- **Interactive Projects** – Detailed case studies of work ranging from offline-first education tools to satellite imagery for disaster response
- **Real-time GitHub Stats** – Live contribution graph pulling from GitHub's API
- **Smooth Animations** – GSAP-powered entry animations and WebGL effects with OGL
- **Responsive Design** – Mobile-first, works on any device
- **Cloudflare Deployment** – Optimized for edge runtime via `@opennextjs/cloudflare`

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS 4 + PostCSS
- **Animations:** GSAP 3.15 + Lenis (smooth scroll) + OGL (WebGL)
- **Icons:** React Icons (Feather + FontAwesome)
- **Deployment:** Cloudflare Workers via OpenNext
- **Language:** TypeScript + ESLint

---

## 📁 Structure

```
.
├── src/
│   ├── app/                 # Next.js app routes
│   │   └── page.tsx         # Home page (Server Component)
│   ├── components/          # React components
│   │   ├── HomeClient.tsx   # Hero, projects, GitHub grid, etc.
│   │   ├── CardSwap.tsx     # Animated card carousel
│   │   ├── TypeText.tsx     # Typewriter effect
│   │   ├── FloatReveal.tsx  # Scroll-triggered animations
│   │   └── NotificationCard.tsx
│   └── lib/
│       ├── projects.ts      # Project definitions & metadata
│       ├── github.ts        # GitHub contributions API
│       └── useDotGridSettings.ts
├── public/                  # Static assets (images, logos)
├── next.config.ts           # Next.js config + Cloudflare init
├── tailwind.config.ts       # Tailwind customization
└── wrangler.jsonc           # Cloudflare Workers config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev
```

### Build & Deploy

```bash
# Build for production
npm run build

# Test locally
npm run start

# Deploy to Cloudflare
npm run deploy
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run cf-typegen` | Generate Cloudflare env types |

---

## 🎨 Key Features

### **Hero Section with Typewriter Effect**
Animated intro text using a custom `TypeText` component that types out content character-by-character.

### **Project Showcase**
Gallery of featured and selected projects with links to detailed case studies. Data-driven from `src/lib/projects.ts` – includes project descriptions, tech stack, results, and awards.

### **GitHub Contribution Graph**
Live GitHub activity heatmap using the GitHub Contributions API. Renders weeks as columns with color-coded contribution levels.

### **"By the Numbers" Carousel**
Rotates through achievements (students supported, award placements, partnerships) using a custom `CardSwap` component.

### **Scroll Animations**
Entry animations powered by GSAP with Lenis smooth scrolling. Each section fades and slides in as you scroll.

---

## 🔧 Notable Dependencies

| Package | Purpose |
|---------|---------|
| `gsap` | Timeline-based animations |
| `ogl` | Lightweight WebGL library |
| `pdfjs-dist` | PDF rendering (if used in projects) |
| `@opennextjs/cloudflare` | Edge runtime adapter |
| `tailwindcss` | Utility-first CSS |

---

## 📱 Responsive & Accessible

- Mobile-first Tailwind design
- Semantic HTML with ARIA labels
- Keyboard navigation support
- GitHub graph accessible via data attributes

---

## 🌍 Deployment

This site is optimized for **Cloudflare Workers** and Edge Runtimes:
- Configured via `@opennextjs/cloudflare` in `next.config.ts`
- Pre-renders static pages at build time
- Streams dynamic content (GitHub API calls) to the edge

To deploy your own fork:

```bash
npm run deploy
# Prompts for Cloudflare credentials (wrangler login first)
```

---

## 📝 Environment Variables

If you add Cloudflare KV storage or R2 buckets:
```bash
npm run cf-typegen
```

This generates types for `cloudflare-env.d.ts`.

---

## 🎯 Next Steps / Contributing

- **Add more projects?** Edit `src/lib/projects.ts`
- **Customize colors?** Modify `tailwind.config.ts`
- **Change animations?** Tune GSAP timings in `HomeClient.tsx` and component files
- **Add a blog?** Swap the placeholder in `HomeClient.tsx` with real Markdown or CMS data

---

## 📄 License

No license specified. Check with [@CleeYOpro](https://github.com/CleeYOpro) before forking.

---

**Made with ❤️ by Cleo · 2026**
