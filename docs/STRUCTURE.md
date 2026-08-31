# Structure, naming and decomposition

Every directory also carries its own `README.md` stating what belongs there and
what does not. Those READMEs are load-bearing: they are what you see when you
list a directory.

---

## 1. The tree

```
src/
├── app/                          # Routing only. Thin. Composes features.
│   ├── (marketing)/              # Route group: public marketing pages
│   │   └── page.tsx              # Home page
│   ├── layout.tsx                # Root: fonts, providers, metadataBase, chrome
│   ├── globals.css               # Token layers 1 + 2. THE source of truth.
│   ├── sitemap.ts                # Generated from config/routes.ts
│   ├── robots.ts                 # Generated from config/routes.ts
│   ├── manifest.ts
│   ├── opengraph-image.tsx       # Default OG image (next/og)
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                       # shadcn primitives. CLI-OWNED. Never hand-edit.
│   ├── layout/                   # Header, Footer, Container, Section, MobileNav, SkipLink
│   ├── common/                   # Cross-feature reusables: Logo, ActionButton, ThemeToggle
│   └── seo/                      # JsonLd
├── features/                     # Feature-scoped, non-reusable UI
│   └── <feature-name>/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── types.ts
│       └── <thing>.data.ts       # Colocated static content
├── content/                      # Long-form transcribed prose. See §1.1.
│   ├── blocks.ts                 # The ContentBlock vocabulary + TrustPage
│   ├── legal/                    # Terms, Privacy, Cookie Policy bodies
│   ├── trust/                    # SOC 2, GDPR, HIPAA, ISO 27001, Sec & Comp
│   ├── integrations/             # Catalog, category copy, 5 setup guides
│   └── knowledge-base/           # 8 collections, 52 article titles
├── hooks/                        # Global hooks: use-media-query, use-scroll-lock
├── lib/
│   ├── utils.ts                  # cn()
│   ├── seo.ts                    # buildMetadata(), JSON-LD builders
│   ├── constants.ts              # Breakpoints, frame width, test widths
│   ├── raw-colors.ts             # ESCAPE HATCH. Allowlisted. Read before touching.
│   └── api/                      # API integration layer. See docs/API.md.
│       ├── client.ts             # The one axios instance
│       ├── methods.ts            # get/post/put/patch/deleteService
│       ├── query-client.ts       # createQueryClient()
│       └── types.ts              # ApiResponse, error + option types
├── config/
│   ├── site.ts                   # Name, URL, description, socials, OG
│   ├── navigation.ts             # Nav trees — single source of truth
│   └── routes.ts                 # Route registry -> sitemap + robots
├── types/                        # Shared global types only
└── styles/                       # Only if something cannot live in globals.css
public/{images,icons,fonts}/
scripts/                          # check-colors.mjs, check-tokens.mjs
docs/                             # Governing documents
```

### 1.1 `src/content/` — and why it is exempt from the 150-line ceiling

For **long-form prose transcribed from a source document**: legal policies,
compliance pages, anything where the length is set by the content and not by
the code. `*.data.ts` colocated in a feature is still correct for short static
content — nav items, feature lists, a handful of FAQ entries. Reach for
`src/content/` when the file is measured in thousands of words.

ESLint's `max-lines` covers `src/app`, `src/components` and `src/features`,
deliberately not this directory. The ceiling is a detector for a _component_
doing too much. A Privacy Policy is 15 sections because the law has 15 things
to say about it; splitting it into `privacy-part-2.ts` is §5's forbidden
remedy with extra steps. What the rule actually protects — the components that
render this copy — stays well inside the limit.

**Nothing in `src/content/` may import from `src/components` or
`src/features`.** Content is data; it does not know how it is displayed. When
a content file needs a shared type, the type is declared in `src/content/` and
re-exported by the feature — not the other way round, which would be a cycle.

### Why the home page is in `(marketing)/` and not `app/page.tsx`

Both resolve to `/`, so having both is a build error — one had to be chosen. The
route group won because it is where every subsequent marketing page belongs, and
it is the seam for a marketing-specific layout later.

The root `layout.tsx` currently owns the header/footer chrome rather than a
`(marketing)/layout.tsx`, so `not-found.tsx` and `error.tsx` get the chrome too
and a visitor is never stranded on a bare page. When marketing chrome needs to
diverge from error-page chrome, add `(marketing)/layout.tsx` then — and log it.

---

## 2. Placement decision tree

Answer in order. The first match wins.

```
Is it a shadcn primitive (button, dialog, input, sheet…)?
├─ YES → npx shadcn@latest add <name>  →  src/components/ui/
│         Needs project behaviour? WRAP it in common/. Never fork it.
└─ NO ↓

Is it page-structural chrome (header, footer, width wrapper, section shell)?
├─ YES → src/components/layout/
└─ NO ↓

Is it used by 2 or more features?
├─ YES → src/components/common/   (+ add it to docs/COMPONENTS.md)
└─ NO ↓

Is it used by exactly one feature?
├─ YES → src/features/<feature>/components/
└─ NO ↓

Is it a pure function, no JSX?
├─ YES → src/lib/  (or src/features/<feature>/lib/ if feature-specific)
└─ NO ↓

Is it static content — nav items, feature lists, FAQ copy?
├─ YES → colocated <thing>.data.ts next to the feature that renders it
│         (src/config/ is for cross-cutting FACTS, not page content)
└─ NO ↓

Is it stateful logic reused across components?
└─ YES → a hook. src/hooks/ if global, src/features/<f>/hooks/ if not.
```

**Files in `src/app/` compose; they do not implement.** A `page.tsx` should read
like a table of contents:

```tsx
export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingFaq />
    </>
  );
}
```

**A feature never imports from another feature.** If two features need the same
thing, it belongs in `common/`.

### Promotion

When a feature-local component gains a second caller: move it to
`src/components/common/`, update **all** imports, and update
`docs/COMPONENTS.md` — **in the same change**. A half-done promotion is how you
get two copies.

---

## 3. Naming — mandatory, mechanical, no judgement calls

| Thing              | Convention                       | Example                                |
| ------------------ | -------------------------------- | -------------------------------------- |
| Directories        | `kebab-case`                     | `pricing-table/`                       |
| Component files    | `kebab-case.tsx`                 | `feature-card.tsx`                     |
| Component export   | `PascalCase`, **named** export   | `export function FeatureCard()`        |
| Hooks              | `use-<thing>.ts` → `useThing`    | `use-media-query.ts` → `useMediaQuery` |
| Utilities          | `kebab-case.ts`, `camelCase` fns | `format-date.ts` → `formatDate`        |
| Types / interfaces | `PascalCase`, **no `I` prefix**  | `FeatureCardProps`                     |
| Constants          | `SCREAMING_SNAKE_CASE`           | `MAX_UPLOAD_SIZE`                      |
| Route segments     | `kebab-case`                     | `app/how-it-works/`                    |
| Booleans           | `is` / `has` / `should` prefix   | `isLoading`, `hasError`, `isMarkOnly`  |
| Event handlers     | `handle` internal / `on` prop    | `handleSubmit`, `onSelect`             |
| Data files         | `<thing>.data.ts`                | `pricing-tiers.data.ts`                |

### Named exports only

Enforced by `no-restricted-exports`. Exempt: the Next.js file conventions that
_require_ a default export (`page.tsx`, `layout.tsx`, `error.tsx`,
`not-found.tsx`, `route.ts`, `sitemap.ts`, `robots.ts`, `manifest.ts`,
`opengraph-image.tsx`, …) and config files.

Rationale: named exports are greppable and refactor-safe. Default exports let
two sessions import the same thing under two different names — and then neither
`rg` finds the duplication.

---

## 4. Import order

Enforced by `import/order`. `npm run lint:fix` will sort it for you.

**React → Next → external → `@/` internal → relative → styles**, with a blank
line between the groups:

```tsx
import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { cn } from "@/lib/utils";

import { PRICING_TIERS } from "../pricing.data";
```

React, Next and other externals share one visual block (ordered React → Next →
rest); `@/` internals and relatives each get their own.

---

## 5. The 150-line ceiling

```js
"max-lines": ["error", { max: 150, skipBlankLines: false, skipComments: false }]
```

Applies to `src/app/**`, `src/components/**`, `src/features/**`. **Exempt:**
`src/components/ui/**` (CLI-generated, not ours to slice) and config files. It is
an **error**, not a warning — `npm run lint` fails.

Comments and imports count. That is deliberate: it prices in the cost of a file
that needs a long preamble to explain itself.

### Approved decomposition patterns

A file crossing 150 lines is a **symptom**. Diagnose it:

| Symptom                                            | Remedy                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| The same markup block appears 3×                   | Extract a component, map over data                                                                         |
| A long `useState`/`useEffect` cluster              | Extract a custom hook                                                                                      |
| A 40-line array of nav items / features / FAQ copy | Extract a `*.data.ts`                                                                                      |
| A pure transform or formatter inline               | Move it to `lib/`                                                                                          |
| Two unrelated responsibilities in one file         | Split by **responsibility**                                                                                |
| One genuinely large section                        | Split into sub-components by semantic region (`<PricingHeader>`, `<PricingTierCard>`, `<PricingFootnote>`) |

### What is NOT an acceptable remedy

- `hero-section-part-2.tsx` — the rule violated with extra steps.
- Deleting comments to squeeze under the limit.
- Moving code into `ui/` to borrow its exemption.
- An `eslint-disable` for `max-lines`.

**Plan the decomposition before you write** (`docs/DESIGN-TRANSLATION.md` step
4). Restructuring after the fact is where the ceiling gets quietly abandoned.

---

## 6. Server vs Client Components

**Server Components by default.** `"use client"` only on the interactive leaf,
pushed as far down the tree as it goes.

`<Header>` is the worked example: a Server Component that renders two client
leaves (`<ThemeToggle>`, `<MobileNav>`). Adding `"use client"` to the header to
make one small interaction work would drag the whole nav into the client bundle.

Client components currently in the project — and nothing else needs to be one:

| File                        | Why                    |
| --------------------------- | ---------------------- |
| `common/theme-provider.tsx` | Wraps `next-themes`    |
| `common/theme-toggle.tsx`   | Writes the theme       |
| `layout/mobile-nav.tsx`     | Sheet open/close state |
| `hooks/use-media-query.ts`  | `window.matchMedia`    |
| `hooks/use-scroll-lock.ts`  | DOM mutation           |
| `app/error.tsx`             | Next.js requires it    |
