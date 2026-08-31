# Component inventory

**Living document. Updating it is mandatory, not optional.**

Read this **before creating any component** — it is step 1 of the
anti-duplication protocol in `AGENTS.md` §4. Then `rg` for synonyms (`card`,
`tile`, `panel`, `box`) before concluding something does not exist.

When you add, promote or materially change a reusable component, update this
file **in the same change**.

---

## Layout — `src/components/layout/`

Page-structural chrome. Used on every page.

### `<Container>` — `layout/container.tsx`

The horizontal frame for all page content. **Never write `max-w-[1200px]` or
`px-[120px]`; use this.**

| Prop        | Type                                        | Default     | Notes                                                                                                               |
| ----------- | ------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `size`      | `"content" \| "narrow" \| "wide" \| "full"` | `"content"` | `content` = 1200px (the design frame's content column), `narrow` = 720px prose, `wide` = 1440px, `full` = unclamped |
| `className` | `string`                                    | —           | Merged via `cn()`                                                                                                   |
| …rest       | `ComponentProps<"div">`                     | —           |                                                                                                                     |

Gutters are built in and responsive: 16px base → 32px `md` → 48px `lg`.

```tsx
<Container>{children}</Container>
<Container size="narrow">{longFormProse}</Container>
```

### `<Section>` — `layout/section.tsx`

Fluid vertical rhythm plus the inner `<Container>`, in one wrapper. Renders a
`<section>`.

| Prop                 | Type                               | Default     | Notes                                                        |
| -------------------- | ---------------------------------- | ----------- | ------------------------------------------------------------ |
| `spacing`            | `"base" \| "sm" \| "lg" \| "none"` | `"base"`    | 64→120px / 40→80px / 88→160px / none                         |
| `container`          | `ContainerSize \| false`           | `"content"` | `false` for full-bleed; supply your own `<Container>` inside |
| `containerClassName` | `string`                           | —           | Classes for the inner container                              |
| …rest                | `ComponentProps<"section">`        | —           |                                                              |

Give it an accessible name — a bare `<section>` is not a landmark:

```tsx
<Section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing</h2>
</Section>
```

> Passing `py-*` via `className` while `spacing` is also set produces two
> competing padding rules. Use `spacing="none"` when you mean to replace it.

### `<Header>` — `layout/header.tsx`

Sticky site header. **Server Component.** Horizontal nav at `md`+, hamburger
below. Reads `MAIN_NAV`, `SIGN_IN_NAV` and `SIGN_UP_NAV` from
`src/config/navigation.ts`. No props. "Solutions", "Developers" and "Download"
are `NavMenuItem`s (`{ label, columns }`) and open a real shadcn
`NavigationMenu` mega-menu via `<NavMenuPanel>` (`layout/nav-menu-panel.tsx`);
"Pricing" is a plain `NavItem` link. Use `isNavMenuItem()` to tell them apart
when iterating `MAIN_NAV`. See docs/DECISIONS.md.

`<ThemeToggle>` sits beside the auth actions and is visible at **every** width
— the auth buttons collapse into the mobile Sheet at `md`, the toggle does
not. It is not in the source design PNG; it was added at the user's request.
See docs/DECISIONS.md.

### `<MobileNav>` — `layout/mobile-nav.tsx`

**THE** mobile navigation. Client component. shadcn `<Sheet>` from the right,
44px targets, both auth actions pinned to the bottom within thumb reach
(`SIGN_IN_NAV` outline, `SIGN_UP_NAV` primary), closes on navigation. Hidden
at `md`+. No props. The nav list itself is `<MobileNavList>`
(`layout/mobile-nav-list.tsx`): `NavMenuItem`s become an `<Accordion>` group
(columns flattened, column titles as subheadings) since a mega-menu has no
mobile equivalent; plain `NavItem`s stay plain links.

> **No page session builds its own mobile navigation.** This one is wired to
> `config/navigation.ts`, so it cannot drift from the desktop nav. Radix already
> handles focus trap, Escape and scroll lock — do not add `useScrollLock` on top.

### `<Footer>` — `layout/footer.tsx`

Site footer. Server Component. Reads `FOOTER_NAV`, `FOOTER_ACTIONS`, `SITE`.
No props. Stacked at base; brand block beside the action-link row and a
5-column nav grid (2/3-up below `lg`) at `md`+.

The design's footer is dark regardless of the page theme — a deliberate
contrast band, not a dark-mode state. The root element carries a literal
`dark` class to force the dark semantic tokens for this subtree (via the
`@custom-variant dark (&:is(.dark *))` rule in globals.css), so it reuses
ordinary `bg-background`/`text-foreground`/`text-muted-foreground` rather than
new "always dark" tokens. A large, near-invisible "SIGNSIG" wordmark sits
absolutely behind the content (`text-watermark`, a new decorative-only type
token — see docs/DESIGN-SYSTEM.md).

### `<NavMenuPanel>` — `layout/nav-menu-panel.tsx`

The column grid rendered inside a `<Header>` mega-menu. Takes `columns:
readonly NavColumn[]` from `config/navigation.ts`. Not exported for reuse
outside `<Header>` — it is the desktop half of the nav-menu pair alongside
`<MobileNavList>`.

### `<SkipLink>` — `layout/skip-link.tsx`

"Skip to content" — the first focusable element, visible on focus. Targets
`id="main-content"` on the `<main>` in the root layout. **Do not rename that
id.** No props.

---

## Common — `src/components/common/`

Cross-feature reusables.

### `<ActionButton>` — `common/action-button.tsx`

Marketing-scale button, and **the worked example of wrap-don't-fork**.

shadcn's `<Button>` is tuned for dense app UI: its default is 32px tall and its
`lg` is 36px, both under the 44px WCAG minimum and both undersized next to a
hero. This wraps it rather than editing `ui/button.tsx` (which `shadcn add`
would overwrite).

| Prop      | Type                                                   | Default     | Notes                                                                                                                                                                                           |
| --------- | ------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`    | `"md" \| "lg" \| "icon"`                               | `"md"`      | 44px / 52px / 44px square                                                                                                                                                                       |
| `variant` | shadcn Button variants \| `"inverse"`                  | `"default"` | `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, or `"inverse"` — a home-page near-black pill (`bg-foreground text-background`), not a shadcn variant. See docs/DECISIONS.md. |
| `asChild` | `boolean`                                              | `false`     | Render a `next/link` instead of a `<button>`                                                                                                                                                    |
| …rest     | `ComponentProps<typeof Button>` minus `size`/`variant` | —           |                                                                                                                                                                                                 |

```tsx
<ActionButton asChild size="lg">
  <Link href="/pricing">See pricing</Link>
</ActionButton>
```

**Use `<ActionButton>` for page CTAs. Use the raw `<Button>` for dense UI**
inside a component — a filter chip, an icon button in a table row.

### `<EyebrowBadge>` — `common/eyebrow-badge.tsx`

The icon + label pill above a section heading (home page: "Sign Documents,
Automate Workflows", "Trusted, Without Limitations By", "SignSig Workflow",
"Automate Everything"). Not built on shadcn's `<Badge>` — that primitive is
sized for dense status tags (20px tall), a different responsibility. See
docs/DECISIONS.md.

| Prop       | Type                                | Default     | Notes                                                                                            |
| ---------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `icon`     | `ReactNode`                         | —           | Rendered at `size-4`, brand-coloured unless `on-dark`                                            |
| `children` | `ReactNode`                         | —           | The label                                                                                        |
| `variant`  | `"neutral" \| "brand" \| "on-dark"` | `"neutral"` | `brand` = fully brand-coloured text; `on-dark` = translucent white, for a brand-green background |

### `<Logo>` — `common/logo.tsx`

| Prop        | Type      | Default | Notes                 |
| ----------- | --------- | ------- | --------------------- |
| `isLink`    | `boolean` | `true`  | Wrap in a link to `/` |
| `className` | `string`  | —       |                       |

The real mark plus wordmark, extracted from the design PNG and un-composited
to a transparent alpha channel so it sits correctly on any surface (verified
against white, tinted and near-black backgrounds).

**It always renders in the default brand green** — including on the dark
footer band and in dark mode. A brand mark should not change colour with the
theme; do not reintroduce a light/dark variant swap.

⚠ **Raster asset lifted from a screenshot.** Accurate, but it will not stay
crisp at very large sizes and cannot be recoloured. Replace
`public/images/signsig-logo.png` with a real SVG when brand assets arrive —
every consumer of `<Logo>` keeps working. `<LogoMark>` and `isMarkOnly` no
longer exist (the placeholder SVG they belonged to is gone).

### `<ThemeToggle>` — `common/theme-toggle.tsx`

Light/dark toggle. Client leaf, 44px target.

Renders **both** icons and lets CSS pick one via the `dark:` variant, rather
than gating on a mount flag. That avoids the extra render, the flash, the
hydration mismatch, and React 19's `react-hooks/set-state-in-effect` error. Do
not "fix" it back to a `useEffect` mount gate.

| Prop        | Type     | Notes |
| ----------- | -------- | ----- |
| `className` | `string` |       |

### `<ThemeProvider>` — `common/theme-provider.tsx`

Wraps `next-themes` with `attribute="class"`, `defaultTheme="system"`. Mounted
once in the root layout. **Do not change `attribute`** — `globals.css` declares
`@custom-variant dark (&:is(.dark *))`, so every `dark:` utility depends on the
`.dark` class.

Props: those of `next-themes`' provider.

### `<QueryProvider>` — `common/query-provider.tsx`

TanStack Query provider for `src/lib/api/` — see `docs/API.md`. Mounted once
in the root layout, wrapping `<ThemeProvider>`. Creates its `QueryClient` with
`useState`, not at module scope, so a server-rendered request cannot leak one
visitor's query cache into another's — read the file's own doc comment before
"simplifying" this to a module-level singleton.

Props: `{ children: React.ReactNode }`.

---

## Shared page sections — `src/components/common/sections/`

Whole marketing-page sections used by **more than one page**. They were born
in `features/home/` and promoted here the moment the Contract Management page
reused them, per the anti-duplication protocol in `AGENTS.md` §4 — a feature
may never import from another feature, so the shared parts have to move out.

Verified pixel-identical between the two design exports before promoting (mean
absolute difference 0.00 across high-variance rows), so none of them needs
props to vary per page. **Do not add a `variant` prop to make one of these
"slightly different" on a new page** — if a page genuinely needs a different
section, that is a different section.

| Component             | File                              | Data                     |
| --------------------- | --------------------------------- | ------------------------ |
| `<WorkflowSection>`   | `sections/workflow-section.tsx`   | `workflow-steps.data.ts` |
| `<DevelopersSection>` | `sections/developers-section.tsx` | — (one panel image)      |
| `<FaqSection>`        | `sections/faq-section.tsx`        | `faq-entries.data.ts`    |
| `<CtaSection>`        | `sections/cta-section.tsx`        | — (copy inline)          |
| `<PricingSection>`    | `sections/pricing-section.tsx`    | `pricing-tiers.data.ts`  |

All take **no props except `<PricingSection>`**, which takes
`variant?: "summary" | "page"` (default `"summary"`) — see the file's own
doc comment for what each variant changes. `<WorkflowStepCard>`,
`<PricingCard>` and `<PricingPeriodToggle>` are private children; the data
files are colocated here because the components that render them live here.

> `headingLevel` is not a loophole in the no-props rule. On `/pricing` that
> section is the page's subject and its heading must be the single `<h1>`; on
> the home page it is one section of many and must be an `<h2>`. That is
> **document structure** (docs/SEO.md), not styling — and the design confirms
> it, at ~49.5px on /pricing against ~35.6px on home. A _cosmetic_ difference
> still does not earn a prop.

`<CtaSection>` also paints the footer's dark band behind its own lower third —
see its file comment and docs/DECISIONS.md before changing its spacing.

`<FaqSection>` emits the FAQPage JSON-LD for whatever page includes it. It is
currently on two pages; if a third page needs the FAQ **without** duplicate
structured data, that is the point to make the JSON-LD opt-in.

---

## SEO — `src/components/seo/`

### `<JsonLd>` — `seo/json-ld.tsx`

Renders one JSON-LD structured-data block. Build the object with a helper from
`src/lib/seo.ts`; never hand-write a `<script type="application/ld+json">`.

| Prop     | Type           | Notes                                                   |
| -------- | -------------- | ------------------------------------------------------- |
| `schema` | `JsonLdSchema` | From `buildOrganizationSchema()`, `buildFaqSchema()`, … |

```tsx
<JsonLd schema={buildFaqSchema(FAQ_ENTRIES)} />
```

`Organization` and `WebSite` are already emitted site-wide from the root layout —
do not duplicate them per page.

---

## Hooks — `src/hooks/`

| Hook                      | Signature                           | Notes                                                                    |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `useMediaQuery`           | `(query: string) => boolean`        | `useSyncExternalStore`-based; returns `false` on the server              |
| `useBreakpoint`           | `(name: BreakpointName) => boolean` | True at/above a Tailwind breakpoint, so JS and CSS agree on the boundary |
| `usePrefersReducedMotion` | `() => boolean`                     | For JS/canvas motion; CSS is handled globally                            |
| `useScrollLock`           | `(isLocked: boolean) => void`       | Bespoke overlays only — Radix components already lock                    |

> **`useMediaQuery` is a behavioural escape hatch, not a layout tool.** Layout
> belongs in Tailwind breakpoint classes, which work without JS and never flash
> the wrong state on first paint.

---

## shadcn primitives — `src/components/ui/`

**CLI-owned. Never hand-write or hand-edit.** Add with
`npx shadcn@latest add <name>`.

| Component             | Installed | Notes                                                                                                                                                                            |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button.tsx`          | ✅        | Dense app sizes. For page CTAs use `<ActionButton>`.                                                                                                                             |
| `sheet.tsx`           | ✅        | Backs `<MobileNav>`. Handles focus trap, Escape, scroll lock.                                                                                                                    |
| `separator.tsx`       | ✅        |                                                                                                                                                                                  |
| `accordion.tsx`       | ✅        | Backs `<HomeFaq>`'s answered FAQ item and `<MobileNavList>`'s menu groups.                                                                                                       |
| `navigation-menu.tsx` | ✅        | Backs `<Header>`'s "Solutions"/"Developers"/"Download" mega-menus, via `<NavMenuPanel>`.                                                                                         |
| `badge.tsx`           | ✅        | Installed but not yet consumed — the home page's icon+label pills needed different proportions, so `common/eyebrow-badge.tsx` is a new component instead. See docs/DECISIONS.md. |

Need another (`dialog`, `tabs`, `tooltip`, `input`…)? Install it via
the CLI, then add a row here.

---

## Features — `src/features/`

### `home` — the home page

`scaffold-preview` (the token-swatch placeholder) is deleted — this is the
first real page section, transcribed from the design PNG (2026-08-24).

`src/app/(marketing)/page.tsx` composes eight sections. Four are **home-only**
and live in `features/home/components/`; four are **shared** and were promoted
to `common/sections/` when the Contract Management page reused them (see
"Shared page sections" above):

| Section                | Component             | Lives in          | Data file                   |
| ---------------------- | --------------------- | ----------------- | --------------------------- |
| Hero                   | `<HomeHero>`          | `features/home`   | — (copy is one-off, inline) |
| Trust bar              | `<HomeTrustBar>`      | `features/home`   | — (one strip image)         |
| Feature grid (8 cards) | `<HomeFeatureGrid>`   | `features/home`   | `feature-grid.data.ts`      |
| Workflow (3 steps)     | `<WorkflowSection>`   | `common/sections` | `workflow-steps.data.ts`    |
| Developers + code      | `<DevelopersSection>` | `common/sections` | — (one panel image)         |
| Pricing (3 tiers)      | `<HomePricing>`       | `features/home`   | `pricing-tiers.data.ts`     |
| FAQ                    | `<FaqSection>`        | `common/sections` | `faq-entries.data.ts`       |
| Closing CTA            | `<CtaSection>`        | `common/sections` | — (copy is one-off, inline) |

### `solutions` — all 14 Solutions pages, from one template

`src/app/(marketing)/solutions/[slug]/page.tsx` renders every Solutions page.
All 14 are statically prerendered via `generateStaticParams`, with
`dynamicParams = false`, so each URL is real static HTML — the dynamic segment
is a code-sharing device, not runtime routing.

**Adding or changing a Solutions page is a data edit, not a component edit.**

| Where                                   | What                                                 |
| --------------------------------------- | ---------------------------------------------------- |
| `config/solutions.ts`                   | `SOLUTIONS` — slug, label, group. The registry.      |
| `features/solutions/use-cases.data.ts`  | Copy for the 5 "By Use Cases" pages                  |
| `features/solutions/industries.data.ts` | Copy for the 5 "By Industry" pages                   |
| `features/solutions/roles.data.ts`      | Copy for the 4 "By Roles" pages                      |
| `features/solutions/solutions.data.ts`  | Joins registry + copy, exposes `findSolution()`      |
| `features/solutions/components/`        | `<SolutionHero>`, `<BenefitGrid>`, `<SolutionIcons>` |

`SOLUTIONS` is the single source of truth for **which pages exist**:
`config/navigation.ts` builds the Solutions mega-menu from it,
`config/routes.ts` builds its sitemap entries from it, and the route generates
its static params from it. Add an entry there and the nav, the sitemap and the
page all follow.

A slug in the registry with no matching copy **fails the build** with a named
error rather than shipping a blank page (verified by deliberately introducing
a mismatch). The `label` doubles as the hero eyebrow text — identical in every
design, so it is stored once.

⚠ **The eyebrow icons are assumptions.** They were read from low-resolution
screenshots and matched to the nearest lucide glyph, not confirmed against
source files. See `solution-icons.tsx` and docs/DECISIONS.md.

> **`features/contract-management/` no longer exists.** It was the one-off
> first Solutions page; when the other 13 designs arrived and proved the shape
> identical, `<ContractHero>` became `<SolutionHero>`, `<BenefitGrid>` moved
> with it, and the page became a data entry. Do not recreate a per-page
> feature directory for a Solutions page.

`<SolutionHero>` is still **not** `<HomeHero>` with props: it sits on the plain
page background, where `<HomeHero>` is an **inset rounded panel** —
`rounded-panel bg-surface-2` on a box inside the section, with the section
reduced to the white margin around it. It also has one CTA with no secondary
button and no trial line. `<BenefitGrid>` uses `max-w-compact` (52rem), the
inset measure the design gives it.

**Card illustrations sit in a FIXED STAGE.** `<FeatureCard>` and
`<WorkflowStepCard>` wrap the image in a box with a fixed `aspect-ratio`
(`FEATURE_STAGE`, `STEP_STAGE`) and fit the artwork with `object-contain`.
The files are all different sizes, so without this every card renders a
different image height and the titles fall out of line. Padding goes on the
stage, not the image: `fill` resolves against the padding box and would ignore
it, hence the inner `relative h-full w-full` wrapper. Never pass a stage
constant to `next/image` as a file's intrinsic size — that was the original bug.

**All illustrations are real design assets, not code.** They were extracted
from the source PNG into `public/images/home/` (see that folder's README for
the extraction geometry). The earlier hand-built approximations — eight
`*-illustration.tsx` files, `<CodePreview>`, `code-snippet.data.ts`,
`trust-logos.data.ts` — are deleted, along with the four
`--code-*` syntax tokens they needed.

`<FeatureCard>` and `<WorkflowStepCard>` each render their card's image via
`next/image` with `alt=""`: every mockup restates the title and description
printed beside it, so announcing it again is redundant for a screen reader.
The trust strip and the API panel **do** carry real alt text, because the
companies named and the code shown are content, not decoration.

`<PricingPeriodToggle>` is a client component (Monthly/Annual) that changes
its own selected state only — the design has no annual pricing figures to
switch to. See docs/DECISIONS.md.

---

## Config — single sources of truth

| File                   | Exports                                                                                                      | Notes                                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config/site.ts`       | `SITE`, `getSiteUrl()`                                                                                       | `description` is now transcribed from the hero copy. ⚠ `tagline` remains **PROVISIONAL** — confirm before launch                                                                                                                                               |
| `config/navigation.ts` | `MAIN_NAV`, `SIGN_IN_NAV`, `SIGN_UP_NAV`, `FOOTER_NAV`, `FOOTER_ACTIONS`, `isNavMenuItem()`                  | Transcribed from the design (2026-08-24) plus user-supplied dropdown screenshots. `MAIN_NAV` entries are `NavItem \| NavMenuItem`; `LEGAL_NAV`/`HEADER_CTA` removed — legal links are now a `FOOTER_NAV` group; header/mobile auth is two actions, not one CTA |
| `config/routes.ts`     | `ROUTES`, `getIndexedRoutes()`, `findRoute()`                                                                | **Add every new route here** or it never reaches the sitemap                                                                                                                                                                                                   |
| `lib/seo.ts`           | `buildMetadata()`, `absoluteUrl()`, JSON-LD builders                                                         | Every page's metadata goes through `buildMetadata()`                                                                                                                                                                                                           |
| `lib/constants.ts`     | `BREAKPOINTS`, `DESIGN_FRAME_WIDTH` (1440), `CONTENT_COLUMN_WIDTH` (1200), `TEST_WIDTHS`, `MIN_TOUCH_TARGET` |                                                                                                                                                                                                                                                                |
| `lib/raw-colors.ts`    | `THEME_COLOR`, `OG_COLORS`                                                                                   | **ESCAPE HATCH**, allowlisted. Read the file header before touching.                                                                                                                                                                                           |
| `lib/utils.ts`         | `cn()`                                                                                                       |                                                                                                                                                                                                                                                                |

### `<NavLink>` — `layout/nav-link.tsx`

A primary-nav link that marks itself current: `text-primary` plus
`aria-current="page"` when the pathname matches. Client component **only**
because it needs `usePathname()` — deliberately the smallest possible leaf so
`<Header>` stays a Server Component. Do not lift `"use client"` to the header.

| Prop        | Type        | Notes                                          |
| ----------- | ----------- | ---------------------------------------------- |
| `href`      | `string`    | Root-relative                                  |
| `children`  | `ReactNode` | Label                                          |
| `className` | `string`    | Merged; colour classes come from the component |

Used for plain `NavItem`s in `MAIN_NAV`. Mega-menu triggers are not links and
do not use it.

### `knowledge-base` — the help centre

Two routes, both composing only their own sections plus the shared
`<CtaSection>` (the design has no workflow/developers/FAQ bands here):

| Route                                    | Page                                               |
| ---------------------------------------- | -------------------------------------------------- |
| `/resources/knowledge-base`              | Headline, intro, search + grid, "Still need help?" |
| `/resources/knowledge-base/[collection]` | One collection's articles (8 prerendered)          |

| Component                | Notes                                                           |
| ------------------------ | --------------------------------------------------------------- |
| `<KnowledgeBaseBrowser>` | **Client.** Owns the search query and renders the filtered grid |
| `<CollectionCard>`       | One tile; whole card is the link, `min-h-40` matches the design |
| `<CollectionBreadcrumb>` | "All Collections > Title" trail                                 |
| `<CollectionArticles>`   | Grouped article list + the not-yet-published note               |

✅ **Rebuilt from the content document, 2026-08-26.** The design's grid showed
20 tiles that were really 4 titles repeated five times, all reading "9
Questions" — Figma duplication. The code carried 4 Q&A collections, one
borrowing the home page's `FAQ_ENTRIES`, with a note saying real content was
coming. The document supplies **8 topic collections holding 52 article
titles**, so the shape changed from questions-and-answers to an article index:

| Was                                                              | Now                                                                                                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document Signing, Self hosting, Workflow Automation, Integration | Getting Started, Common Tasks, Team & Workspaces, Templates & Automation, Security & Compliance, Integrations & APIs, Account & Billing, Troubleshooting |

Counts stay **derived** (`articleCount()`), so a card can never advertise a
number the page lacks: 4 / 16 / 5 / 5 / 6 / 5 / 5 / 6. Only Common Tasks has
sub-groups, which is why `KbCollection` holds `groups` rather than a flat
list. Content lives in `src/content/knowledge-base/`.

⚠ **Article bodies do not exist.** Every article in the document is a bracketed
link placeholder — `[Upload a Document]` — with no body anywhere in its 190
pages. They render as a **list, not links**: 52 dead links or 52 empty pages
would both be worse than an honest index, and the page says so in as many
words. Collection pages are `noIndex` for the same reason. Add bodies in the
content file, then switch the rows to links and flip `isIndexed`.

The collection page's `<h1>` is `sr-only`: the design shows no visible title
beyond the breadcrumb, and `docs/SEO.md` requires exactly one h1. There is no
FAQPage JSON-LD any more — article titles with no answers are not an FAQ, and
the markup must never assert content the page does not show.

### `system-status` — `/resources/system-status`

| Component       | Notes                                                         |
| --------------- | ------------------------------------------------------------- |
| `<UptimeCard>`  | Window label, overall pill, 44-bar chart, uptime scale        |
| `<ServiceList>` | Per-service rows                                              |
| `<StatusPill>`  | Shared by both; `bare` (rows) and `filled` (summary) variants |

The bar chart is a flex row of rounded spans, not a chart library — one datum
per bar, no axes, so a dependency would be pure overhead. Bars flex, so the
strip reflows rather than overflowing at any width. It is `aria-hidden`: the
uptime percentage states the same fact in text, and announcing 44 bars would
be noise.

⚠ **The page renders PLACEHOLDER data — the status shown is not real.** The
endpoint was not ready (2026-08-25). Consequences you must not "tidy away":

- `getSystemStatus()` in `system-status.data.ts` is the **only** seam. Replace
  its body with a real fetch (`next: { revalidate: 60 }`) and map onto the
  `SystemStatus` type; nothing in `components/` changes.
- `isLive: false` drives `noIndex` on the page and `isIndexed: false` in
  `config/routes.ts`. **This is deliberate** — a fabricated "All System
  Operational" must not reach search results. Both clear themselves once a
  real feed sets `isLive: true`.
- The eight rows render the literal string `{Status_category}` because that is
  what the design says — a template token, not a service name. Real names come
  from the endpoint. Do not invent services to make it look finished.

### `sdks` — `/developers/sdks-libraries`

`<SdkCard>` renders one entry from `sdks.data.ts` (10 of them): a language
badge, a description, and an install snippet with a download glyph.

**Layout is measured, not guessed.** A 3-up grid in `max-w-cards` (1040px),
with **`items-center`** — the design vertically centres each row's cards
rather than top-aligning them. Rows 1 and 2 only _look_ top-aligned because
those cards happen to be equal height; row 3's cards (392 / 476 / 562px) all
share one centre line. Do not "fix" this to `items-start`.

The snippet is `<pre><code>` with `font-sans`, because the design sets code in
the body face. It stays a `<pre>` so the Java block's indentation survives.

⚠ **Two snippets are transcribed faithfully but are almost certainly wrong in
the design** — the Java Maven block's closing tags (`<groupId>` where
`</groupId>` is needed, same for `artifactId`) and `.NET`'s `SignSig.SdK`
casing. They are copy-paste targets, so verify before launch. See
docs/DECISIONS.md.

### `integrations` — Integration Hub

| Route                                       | Page                                 |
| ------------------------------------------- | ------------------------------------ |
| `/developers/integration-hub`               | Search + category sidebar + 12 cards |
| `/developers/integration-hub/[integration]` | One setup guide (12 prerendered)     |

| Component                | Notes                                            |
| ------------------------ | ------------------------------------------------ |
| `<IntegrationBrowser>`   | **Client.** Owns search + category filter        |
| `<IntegrationCard>`      | One tile: name, description, use case, link      |
| `<IntegrationGuideBody>` | Purpose / Prerequisites / Steps / Code / Outcome |
| `<CodeBlock>`            | **Client.** Working "Copy code" button           |

The sidebar is a real `radiogroup` — the filters are mutually exclusive, so
arrow keys work and the selection is announced; a row of plain buttons would
look identical and say nothing to assistive tech. Selecting a category also
shows that category's description above the grid.

`<CodeBlock>`'s copy button genuinely copies (a control labelled "Copy code"
that does nothing is worse than none). `navigator.clipboard` is unavailable on
insecure origins, so the failure path falls back to "Press Ctrl+C to copy"
instead of throwing, and the reset timer is cleared on unmount.

**Content lives in `src/content/integrations/`** — `catalog.ts` (twelve
entries, five categories, the custom-integrations block), `types.ts`, and one
file per guide in `guides/`. The feature's `integrations.data.ts` is 66 lines
and only joins the catalog to the guides. See STRUCTURE.md §1.1.

`GuideStep` supports `note` and `block` for steps that are not bullet lists
(Google Drive's folder tree, Slack's JSON payload), and `samples` is a list
because the Salesforce guide has an Apex class and a separate trigger.

✅ Reconciled with the content document 2026-08-26 — 12 integrations not 9,
categories confirmed rather than inferred, "Finance & Accounting" now
populated, and five guides published.

⚠ **Logos are still a placeholder.** All cards in the design show the same
Microsoft-365 glyph. Each renders a neutral tokenised icon instead — using the
design's literally would put Microsoft's mark on the Dropbox and Xero cards.

⚠ **Seven of twelve have no guide.** They render an honest empty state and are
`noIndex`, so every card links somewhere real without thin pages entering the
index. Add a file in `src/content/integrations/guides/` and wire it into
`GUIDES` to publish another.

### `careers` — Careers index and job postings

✅ **Live since 2026-08-29.** Every page here reads GET /Careers/Roles,
GET /Careers/Roles/{id} or GET /Careers/ScreeningQuestions — see
`swagger.json`'s Careers tag and `docs/API.md`. There is no static role data
left in the repo; `careers.data.ts` and `role-details.data.ts` are deleted.

| Route                             | Page                                         |
| --------------------------------- | -------------------------------------------- |
| `/resources/careers`              | "Join the SignSig team" + category accordion |
| `/resources/careers/[role]`       | One job posting, `dynamicParams = true`      |
| `/resources/careers/[role]/apply` | 4-step application wizard, submits for real  |

| Component               | Notes                                                      |
| ----------------------- | ---------------------------------------------------------- |
| `<DepartmentAccordion>` | Categories from the API's `categories[]`, not a fixed list |
| `<RoleDescription>`     | About / Responsibilities / Skills / Nice to Have           |
| `<CareersUnavailable>`  | Shared honest-failure state, all three pages               |

**`careers.api.ts`** (feature root, not `components/`) holds the three
server-side reads — `getJobRolesOverview`, `getJobRoleDetail`,
`getScreeningQuestions` — plus `roleSlug()`, `flattenRoles()`,
`findRoleBySlug()`, `summaryToFallbackDetail()` and `formatSalaryRange()`.
Plain async functions, not `useQuery` hooks: these are reads with no client
interactivity, and `generateStaticParams` cannot use a hook at all. All three
are wrapped in React's `cache()` — `getService` goes through axios, not
`fetch()`, so Next's automatic request dedup doesn't apply, and without
`cache()` `generateMetadata` and the page component would each re-fetch.

**URLs are still slugs, not the API's numeric ids.** `/resources/careers/{id}`
would have been the direct mapping; `roleSlug()` derives a slug from `title`
instead, so the existing pretty URLs survive the switch to a live backend.
`dynamicParams = true` on both `[role]` routes (was `false`): the set of open
roles can now change without a rebuild, and `generateStaticParams` returns `[]`
on any fetch failure rather than failing the build.

**Three honest-failure states, not one.** `<CareersUnavailable>` renders when
a live fetch fails — never `notFound()`, which is reserved for the API
confirming a role genuinely doesn't exist. A network hiccup and "this role
was never posted" are different conditions and get different treatment; see
the doc comment on `[role]/page.tsx` for the exact decision tree.

⚠ **Two enums have no label metadata anywhere in `swagger.json`** —
`NoticePeriod` and `YearsOfRelevantExperience`. See
`application/notice-experience-options.data.ts`'s warning: the option text is
this site's existing content-document copy, kept as the most plausible
ordering, but the number a label maps to is UNCONFIRMED against the backend.
Verify before trusting this in production.

**No `JobPosting` structured data is emitted.** Google requires `datePosted`,
`hiringOrganization` and `validThrough`, which the API doesn't return; add it
once it does.

### `policies` — the three legal pages

| Route                  | Title            |
| ---------------------- | ---------------- |
| `/terms`               | Terms of Service |
| `/privacy`             | Privacy Policy   |
| `/legal/cookie-policy` | Cookie Policy    |

`<PolicyPage>` is the shared shell (centred title, "Last Updated", body, CTA).
The three routes are thin wrappers that pass a `Policy` and hold **no markup of
their own**, so the pages cannot drift apart. They are explicit routes rather
than one `[policy]` segment because the paths were already published in the
footer nav and a single dynamic segment cannot serve both root-level and
`/legal/*` paths.

✅ **All three bodies are published** (2026-08-26) from the content document.
Copy lives in `src/content/legal/`, not in the feature — see
`src/content/blocks.ts` for why. Section headings get slug ids, so
`/terms#12-limitation-of-liability` is a linkable citation.

`isPublished()` still drives indexing and the empty state, for whatever policy
is added next without copy.

Security & Compliance is **no longer here** — see `trust` below.

### `trust` — the five trust & compliance pages

| Route                        | Title                 |
| ---------------------------- | --------------------- |
| `/compliance/soc-2`          | SOC 2 Certified       |
| `/compliance/gdpr`           | GDPR Compliance       |
| `/compliance/hipaa`          | HIPAA Readiness       |
| `/compliance/iso-27001`      | ISO 27001             |
| `/legal/security-compliance` | Security & Compliance |

The first four are the footer's **Compliance** column, which had links but no
pages until 2026-08-26. They share `/compliance/[slug]` because they are one
page shape over different content. Security & Compliance is the fifth, and
keeps its own route so its published path does not change.

`<TrustPage>` = headline, intro, `<ContentSections>`, `<TrustFaq>`, then the
document's own CTA. Every CTA is a `mailto:` — every one of them in the
document is "email this address and we'll send you the document", and a button
opening a form we cannot deliver would be worse.

`<TrustFaq>` is separate from the home page's `<FaqSection>`: that one is a
two-column marketing band with fixed data where four of five questions have no
answer. Extending it would have been a props explosion for two different jobs.

### Shared: `<ContentSections>`

`src/components/common/content-blocks.tsx` renders the `ContentBlock`
vocabulary — `paragraph`, `subheading`, `lead`, `labelled`, `list`, `table` —
for both the legal and trust pages. Tables scroll inside their own
`overflow-x-auto` container so a three-column cookie inventory never pushes
the page sideways at 360px.

### `careers/application` — the 4-step application wizard

`/resources/careers/[role]/apply`. All files under
`src/features/careers/application/`.

✅ **Submits for real** (2026-08-29) — POST /Careers/Roles/{id}/Apply via
`useSubmitApplication()`. Was UI-only with a hardcoded `not-configured` result
(`submit-application.ts`, deleted); that's gone, replaced by the real mutation.

| File                                | Role                                                     |
| ----------------------------------- | -------------------------------------------------------- |
| `application-form.tsx`              | **Client.** Orchestrator: draft state, steps, submit     |
| `application-form-footer.tsx`       | Back/Next/Submit row + the final-step consent note       |
| `step-tabs.tsx`                     | Progress tabs — active / visited / ahead                 |
| `step-body.tsx`                     | Step id → step component; the only dispatch              |
| `step-personal-info.tsx`            | Step 1                                                   |
| `step-professional-info.tsx`        | Step 2 — no "Desired Role"; see below                    |
| `step-screening.tsx`                | Step 3 — questions come from the API, not a static array |
| `step-documents.tsx`                | Step 4 — uploads + consent                               |
| `cover-letter-field.tsx`            | Upload **or** write inline; both optional                |
| `field.tsx`                         | `<Field>`, `<TextField>`, `<SelectField>`                |
| `file-dropzone.tsx`                 | Drop-or-browse with size/type checks                     |
| `success-dialog.tsx`                | "Thank you for applying!"                                |
| `careers-application.api.ts`        | **The seam to the backend** — `useSubmitApplication()`   |
| `build-apply-form-data.ts`          | `ApplyPayload` type + the multipart `FormData` builder   |
| `draft-to-apply-payload.ts`         | `ApplicationDraft` → `ApplyPayload`                      |
| `notice-experience-options.data.ts` | Notice/experience `<select>` labels — read the warning   |
| `application.data.ts`               | Steps, consent copy, upload constraints                  |
| `types.ts`                          | `ApplicationDraft`                                       |

**"Desired Role" is gone.** The real Apply endpoint has no field for it —
which role this is comes from the URL path (`/Roles/{id}/Apply`), not a form
field. Removing a field the API silently ignored was part of the integration,
not a separate content change.

**The cover letter textarea becomes a `.txt` file at submit time.** The API
has one binary `CoverLetter` field, no text-body equivalent for the "write it
inline" alternative — `build-apply-form-data.ts` packages typed text into a
plain-text `File` rather than dropping it. An actual upload wins if both are
present.

`<Field>` takes an optional `help` string; it renders as `id="<htmlFor>-help"`,
so the call site must add `aria-describedby` or the hint is visible but
unannounced. `<FileDropzone>` takes `prompt` — résumé and cover letter use
different copy.

**Screening questions render as required now.** The design/content-document
version had one optional question; `JobScreeningQuestionResponse` has no
per-question required flag at all, so every question defaults to required —
the conservative choice until the backend exposes one.

**Each step is its own `<form>`**, so "Next" is a real submit button and the
browser's own constraint validation gates each step — required fields, `email`
and `url` formats — with no validation library. Word limits are checked in JS
because the browser cannot express them.

**Word counters do not truncate.** Going over turns the counter destructive
and blocks the step. Silently cutting someone's answer mid-sentence is the one
behaviour guaranteed to lose work they thought they had given.

**The dropzone is a real `<input type="file">` inside a `<label>`**, not a div
with a click handler — keyboard focusable and screen-reader operable for free,
with drag-and-drop layered on top. It enforces the 5MB / PDF-DOCX limits the
UI advertises.

⚠ **NOTHING IS SENT.** `submitApplication()` has no endpoint and returns
`not-configured`, surfaced as a visible alert. The success dialog is only
reachable on `{ ok: true }` — verified absent from the built HTML. **Do not
open it optimistically**; a confirmation with nothing sent tells a candidate
they applied when they did not. The route is `noIndex` until wired.

**Draft state is not persisted.** It holds a CV, phone number and LinkedIn
profile; leaving that in `localStorage` on a shared machine is a privacy
problem, not a convenience.

⚠ **Select options are inferred** — the design shows every dropdown closed.
Notice Period and Years of Experience are reasonable defaults; confirm before
launch. "Desired Role" is generated from `ROLES`, so it cannot offer a job
that isn't open. Countries come from ISO codes resolved via
`Intl.DisplayNames` (`config/countries.ts`) rather than a hand-typed list.
