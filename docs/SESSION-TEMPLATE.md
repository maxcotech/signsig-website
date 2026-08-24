# Session kickoff template

Copy the block below into a new session, fill in the four fields, and attach the
PNG.

---

```
You are implementing one page/section of the SignSig website.

MANDATORY FIRST STEP — read these before touching any code:
  1. AGENTS.md
  2. docs/DESIGN-SYSTEM.md
  3. docs/STRUCTURE.md
  4. docs/COMPONENTS.md
  5. docs/DESIGN-TRANSLATION.md
  6. docs/SEO.md
  7. docs/RESPONSIVE.md
  8. docs/DECISIONS.md   (skim — precedents you must not contradict)

TARGET: <page or section name>
ROUTE:  <route path, e.g. /pricing>
DESIGN: attached PNG — desktop only, canonical frame width 1440px
NOTES:  <anything the PNG does not convey>

There is no tablet or mobile comp and there will not be one. Derive both using
the derivation doctrine table in docs/RESPONSIVE.md, and report every derivation
you make.

Hard constraints (all enforced by `npm run check`):
  - No colour literals anywhere. Semantic tokens only.
  - No file over 150 lines under src/app, src/components or src/features.
  - Every semantic token must exist in :root, .dark, AND the @theme inline bridge.
  - Register the route in src/config/routes.ts or it never reaches the sitemap.
  - Transcribe copy from the PNG verbatim. If text is illegible, ask — do not invent.

Follow docs/DESIGN-TRANSLATION.md step by step. Before writing code, confirm you
have read the docs and state:
  (a) your component plan — what you will reuse vs. create, and where each file
      goes; and
  (b) your responsive derivation plan — the tablet and mobile treatment of each
      layout block, plus the reading order after collapse.

When finished: run `npm run check`, update docs/COMPONENTS.md, append to
docs/DECISIONS.md if you deviated from any doctrine, then report what you built
(including every derivation and every assumption) and ASK before running any
visual test or starting a dev server.
```

---

## Filling in the fields

**TARGET** — Be specific about scope. "The pricing page" and "the pricing
comparison table only" produce very different sessions.

**ROUTE** — The `kebab-case` path. If the section belongs to an existing page,
say so: `"section within /pricing, below the hero"`.

**DESIGN** — Attach the PNG. State the export scale if you know it; otherwise
the session computes it from the 1440px frame and will ask if the width is not a
clean multiple.

**NOTES** — The highest-value field. Things a static desktop PNG cannot convey:

- Interaction: "the tier toggle switches monthly/annual pricing"
- Motion: "cards lift on hover"
- Content volume: "there will eventually be 9 of these, not 3"
- Links: "the CTA goes to /signup"
- Priority: "this is the LCP image"
- Known gaps: "the empty state is not designed yet — use your judgement"
- Copy corrections: "the headline in the PNG is outdated, use: …"

---

## First-session extras

The scaffold ships placeholders that a real design will replace. Mention them
when relevant:

- `src/components/common/logo.tsx` — the logo mark is **placeholder geometry**.
  Replace the SVG paths inside `<LogoMark>` only.
- `src/config/site.ts` — `tagline` and `description` are **provisional copy**.
- `src/config/navigation.ts` — nav labels are **provisional scaffolding**.
- `src/features/scaffold-preview/` — **delete this feature** once real sections
  exist.
- `--radius: 0.75rem` in `globals.css` is **provisional** — confirm against the
  first design that shows a card.
- `public/icons/icon-192.png` and `icon-512.png` are declared in
  `src/app/manifest.ts` but **do not exist yet**.
