# Prove an Unproven Theorem

This monorepo tracks the assets for the "Prove an Unproven Theorem" initiative, which documents and promotes the project to tackle an open mathematics problem with AI-assisted tooling.

## Repository layout

- `landing/` – Next.js marketing and project-log site. See `landing/README.md` for detailed setup, structure, and contribution guidance.

## Getting started

The landing site is built with Node.js and Next.js. To work on it:

```bash
cd landing
npm install
npm run dev
```

The development server runs on <http://localhost:3000> with hot reloading enabled.

## Quality checks

Run the available quality gates from the `landing` workspace before opening a pull request:

```bash
npm run lint
npm run build
```

## Contributing

Issues and pull requests are welcome. Keep commit messages short, imperative, and under 72 characters. When modifying UI, attach before/after screenshots in pull requests for reviewers.
