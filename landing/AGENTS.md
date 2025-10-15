# Repository Guidelines

## Project Structure & Module Organization
- `src/app` hosts the Next.js App Router entry points; update `page.tsx` for landing copy and `layout.tsx` for shared wrappers and metadata.
- Reusable visuals live in `src/components`, with UI primitives in `src/components/ui` (scaffolded via `components.json` shadcn config) and animations such as `graph-animation.tsx`.
- Shared helpers belong in `src/lib` (e.g., `utils.ts` exports the `cn` Tailwind merger). Static assets ship from `public`, and global styling is centralized in `src/app/globals.css`.

## Build, Test, and Development Commands
- `npm run dev` launches the Turbopack-powered dev server on `http://localhost:3000` with hot reload.
- `npm run build` performs a production compile; pair this with `npm run start` to verify the optimized bundle.
- `npm run lint` runs ESLint using the flat config in `eslint.config.mjs` (Next.js core-web-vitals rules + TypeScript checks).

## Coding Style & Naming Conventions
- Write TypeScript-first React components, keeping client components annotated with `"use client"` when they rely on browser APIs or animations.
- Favor PascalCase files for exported components (`GraphAnimation.tsx`), kebab-case for folders, and descriptive prop names.
- Compose styles with Tailwind utility classes and the `cn` helper for conditional merges; avoid inlined hex colors when Tailwind tokens exist.
- Run `npm run lint` before committing to ensure consistency with the shared ESLint rules.

## Testing Guidelines
- Automated tests are not yet scaffolded; when adding coverage, prefer React Testing Library with Vitest for components and Playwright for end-to-end flows.
- Co-locate test files alongside the subject module using the `.test.tsx` suffix (e.g., `graph-animation.test.tsx`), and target the key user journeys rendered in `page.tsx`.
- Treat linting as the minimum quality gate until a full test suite lands.

## Commit & Pull Request Guidelines
- The current history (`Initial commit`) uses short imperative summaries—continue that convention (e.g., `Add graph animation motion variants`), keeping the first line under 72 characters.
- Reference related issues in the body, and document visual changes with before/after screenshots when touching landing page layouts.
- Pull requests should outline intent, note any config or dependency changes, and list follow-up tasks so downstream agents can triage quickly.

## UI & Styling Notes
- Tailwind CSS v4 and shadcn tokens drive theming; adjust design tokens through `globals.css` and `components.json` rather than ad-hoc overrides.
- When introducing new interactive elements, prefer existing shadcn primitives in `src/components/ui` to keep motion, accessibility, and spacing consistent.
