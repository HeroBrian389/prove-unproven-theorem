# Prove an Unproven Theorem — Landing Site

This repository contains the marketing and project-log landing site for Brian Kelleher's
Edge City Patagonia fellowship project: an AI-assisted push to solve an open mathematics
problem. The site is built with the Next.js App Router and showcases the project vision,
reading list, running updates, and collaboration requests in a responsive, long-form
layout.

## Features

- **Narrative-first layout** – A PageScaffold component provides navigation, a sticky
  project snapshot column, and mobile sheet navigation for all top-level sections.
- **Update pipeline** – Project milestones are sourced from `src/data/updates.json` and
  rendered across the homepage card and the Latest Updates timeline via typed helpers in
  `src/lib/updates.ts`.
- **Rich typography & motion** – Tailwind CSS v4, custom serif/sans pairings, and
  Framer Motion-powered graph animations create a polished reading experience.
- **Content-focused routes** – Dedicated pages for overview, latest updates, reading
  materials, about, and collaboration requests live under `src/app` for fast iteration.

## Project structure

```
src/
├─ app/                     # App Router routes for each public section
│  ├─ layout.tsx            # Shared metadata, fonts, and layout shell
│  ├─ page.tsx              # Overview landing copy
│  ├─ latest-updates/       # Milestone timeline page
│  ├─ reading-materials/    # Bibliography highlights
│  ├─ about-me/             # Profile, collaborators, and tooling
│  └─ how-you-can-help/     # Calls for support and collaboration
├─ components/
│  ├─ page-scaffold.tsx     # Responsive layout + navigation chrome
│  ├─ project-snapshot-card.tsx
│  ├─ graph-animation.tsx   # Hero animation rendered in nav rail
│  ├─ sidebar-navigation.tsx
│  └─ ui/                   # Reusable shadcn-inspired primitives
├─ data/
│  └─ updates.json          # Structured log of project updates
├─ hooks/
│  └─ use-active-section.ts # Scroll spying for navigation highlighting
├─ lib/
│  └─ updates.ts            # Data helpers for consuming JSON updates
└─ types/
   └─ update.ts             # Shared TypeScript types for project updates
```

Static assets (favicons, imagery) live in `public/`, while global styles and Tailwind
layer definitions are defined in `src/app/globals.css`.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000> with Turbopack hot reloading. Update copy
by editing the relevant route in `src/app/**/page.tsx`. Structured update summaries are
managed in `src/data/updates.json`; each entry accepts `id`, `date`, `displayDate`,
`title`, and a `summary` array of text/link segments displayed through the
`UpdateSummary` component.

### Quality checks

```bash
npm run lint   # ESLint (flat config, Next.js core web vitals rules)
npm run check  # TypeScript project references, no emit
npm run build  # Production build with Turbopack
```

Run linting before committing changes to maintain consistency with the shared ESLint
ruleset.

## Deployment

1. Build the production bundle: `npm run build`
2. Start the optimized server locally: `npm run start`

The output is suitable for deployment on Vercel or any environment that supports the
Next.js Node runtime.

## Contributing

Issues and pull requests are welcome. Please include context for visual changes and keep
commit messages short, imperative, and under 72 characters.
