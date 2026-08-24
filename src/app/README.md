# src/app — Routing only

Route files, layouts, and Next.js file conventions (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, `error.tsx`, `not-found.tsx`).

**Belongs here:** route segments, `page.tsx`, `layout.tsx`, metadata exports, Next.js special files.

**Does NOT belong here:** section implementations, UI markup of any substance, business logic, or static content arrays. A `page.tsx` **composes** feature sections and should read like a table of contents. If a page file is doing layout work, that work belongs in `src/features/<feature>/` — see docs/STRUCTURE.md.

`globals.css` lives here and is the single source of truth for every design token. See docs/DESIGN-SYSTEM.md before editing it.
