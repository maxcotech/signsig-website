# SignSig website

Marketing site for SignSig. Next.js 16 (App Router) · React 19 · TypeScript ·
Tailwind CSS v4 · shadcn/ui.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

## Commands

| Command                     | Does                                                       |
| --------------------------- | ---------------------------------------------------------- |
| `npm run dev`               | Dev server                                                 |
| `npm run check`             | **THE GATE** — typecheck → lint → colours → tokens → build |
| `npm run build` / `start`   | Production build / serve                                   |
| `npm run lint` / `lint:fix` | ESLint                                                     |
| `npm run format`            | Prettier, incl. deterministic Tailwind class ordering      |
| `npm run check:colors`      | Fail on hardcoded colour values                            |
| `npm run check:tokens`      | Verify light/dark token parity + Tailwind bridge           |

`npm run check` must pass clean before any change is considered done.

## If you are an AI agent

**Read [`AGENTS.md`](./AGENTS.md) first, before touching any code.** It is the
constitution: absolute rules, the pre-flight checklist, and the definition of
done. `CLAUDE.md` is a pointer to it.

Then read the document that matches your task — see [`docs/`](./docs/README.md).

## The three rules that matter most

1. **No colour literals, ever.** Colours come from semantic tokens
   (`bg-primary`, `text-muted-foreground`). The build fails otherwise.
2. **No file over 150 lines** under `src/app`, `src/components`, `src/features`.
3. **Designs are desktop-only (1440px).** Tablet and mobile are _derived_ using
   the doctrine table in [`docs/RESPONSIVE.md`](./docs/RESPONSIVE.md). A section
   that only works at 1440px is not finished.

## Documentation

| File                                                         | For                                                |
| ------------------------------------------------------------ | -------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md)                                   | **The constitution.** Read first.                  |
| [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md)           | Tokens, colour, type, spacing, motion              |
| [`docs/STRUCTURE.md`](./docs/STRUCTURE.md)                   | Where files go, naming, decomposition              |
| [`docs/COMPONENTS.md`](./docs/COMPONENTS.md)                 | What already exists — read before creating         |
| [`docs/RESPONSIVE.md`](./docs/RESPONSIVE.md)                 | The derivation doctrine                            |
| [`docs/SEO.md`](./docs/SEO.md)                               | Metadata, JSON-LD, per-page checklist              |
| [`docs/DESIGN-TRANSLATION.md`](./docs/DESIGN-TRANSLATION.md) | PNG → pixel-perfect workflow                       |
| [`docs/SESSION-TEMPLATE.md`](./docs/SESSION-TEMPLATE.md)     | Kickoff prompt for a new page session              |
| [`docs/DECISIONS.md`](./docs/DECISIONS.md)                   | Append-only log of why things are the way they are |

## Environment

| Variable               | Required   | Notes                                                                                                                                                               |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | Absolute origin, no trailing slash. Drives `metadataBase`, canonical URLs, OG image URLs and the sitemap. Falls back to `VERCEL_URL`, then `http://localhost:3000`. |

## Known placeholders

Scaffolding that a real design replaces. See the "Open questions" section of
[`docs/DECISIONS.md`](./docs/DECISIONS.md).

- `src/components/common/logo.tsx` — placeholder mark geometry
- `src/config/site.ts` — provisional `tagline` and `description`
- `src/config/navigation.ts` — provisional nav labels
- `src/features/scaffold-preview/` — **delete once real sections exist**
- `--radius: 0.75rem` — provisional, confirm against the first card design
- `public/icons/icon-{192,512}.png` — declared in `manifest.ts`, not yet created
