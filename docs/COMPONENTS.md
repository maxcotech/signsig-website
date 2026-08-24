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
below. Reads `MAIN_NAV` and `HEADER_CTA` from `src/config/navigation.ts`. No
props.

### `<MobileNav>` — `layout/mobile-nav.tsx`

**THE** mobile navigation. Client component. shadcn `<Sheet>` from the right,
44px targets, CTA pinned to the bottom within thumb reach, closes on navigation.
Hidden at `md`+. No props.

> **No page session builds its own mobile navigation.** This one is wired to
> `config/navigation.ts`, so it cannot drift from the desktop nav. Radix already
> handles focus trap, Escape and scroll lock — do not add `useScrollLock` on top.

### `<Footer>` — `layout/footer.tsx`

Site footer. Server Component. Stacked at base, brand block beside a 2-column
nav grid at `md`+. Reads `FOOTER_NAV`, `LEGAL_NAV`, `SITE`. No props.

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

| Prop      | Type                                         | Default     | Notes                                                             |
| --------- | -------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `size`    | `"md" \| "lg" \| "icon"`                     | `"md"`      | 44px / 52px / 44px square                                         |
| `variant` | shadcn Button variants                       | `"default"` | `default`, `outline`, `secondary`, `ghost`, `destructive`, `link` |
| `asChild` | `boolean`                                    | `false`     | Render a `next/link` instead of a `<button>`                      |
| …rest     | `ComponentProps<typeof Button>` minus `size` | —           |                                                                   |

```tsx
<ActionButton asChild size="lg">
  <Link href="/pricing">See pricing</Link>
</ActionButton>
```

**Use `<ActionButton>` for page CTAs. Use the raw `<Button>` for dense UI**
inside a component — a filter chip, an icon button in a table row.

### `<Logo>` / `<LogoMark>` — `common/logo.tsx`

| Prop         | Type      | Default | Notes                 |
| ------------ | --------- | ------- | --------------------- |
| `isMarkOnly` | `boolean` | `false` | Hide the wordmark     |
| `isLink`     | `boolean` | `true`  | Wrap in a link to `/` |
| `className`  | `string`  | —       |                       |

⚠ **The mark geometry is a token-coloured PLACEHOLDER.** When the real logo
arrives, replace the SVG paths inside `<LogoMark>` only — every consumer keeps
working. The mark uses `currentColor` and `var(--primary-foreground)`, so it
themes itself; do not hardcode a fill.

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

| Component       | Installed | Notes                                                         |
| --------------- | --------- | ------------------------------------------------------------- |
| `button.tsx`    | ✅        | Dense app sizes. For page CTAs use `<ActionButton>`.          |
| `sheet.tsx`     | ✅        | Backs `<MobileNav>`. Handles focus trap, Escape, scroll lock. |
| `separator.tsx` | ✅        |                                                               |

Need another (`accordion`, `dialog`, `tabs`, `tooltip`, `input`…)? Install it via
the CLI, then add a row here.

---

## Features — `src/features/`

### `scaffold-preview` ⚠ SCAFFOLDING — DELETE ME

`<TokenPreview>` (`features/scaffold-preview/components/token-preview.tsx`) plus
`token-preview.data.ts`.

Renders every semantic colour token and every type step so the token system is
verifiable by eye: toggle the theme and every swatch must change; resize and
every type step must ramp.

**Delete this feature once real page sections exist.** It is also a worked
example of the rules — colocated `*.data.ts`, no hardcoded values, `<Section>`
for rhythm, under 150 lines.

---

## Config — single sources of truth

| File                   | Exports                                                                                                      | Notes                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `config/site.ts`       | `SITE`, `getSiteUrl()`                                                                                       | ⚠ `tagline` and `description` are **PROVISIONAL** placeholder copy — confirm before launch |
| `config/navigation.ts` | `MAIN_NAV`, `HEADER_CTA`, `FOOTER_NAV`, `LEGAL_NAV`                                                          | ⚠ labels are **PROVISIONAL** scaffolding                                                   |
| `config/routes.ts`     | `ROUTES`, `getIndexedRoutes()`, `findRoute()`                                                                | **Add every new route here** or it never reaches the sitemap                               |
| `lib/seo.ts`           | `buildMetadata()`, `absoluteUrl()`, JSON-LD builders                                                         | Every page's metadata goes through `buildMetadata()`                                       |
| `lib/constants.ts`     | `BREAKPOINTS`, `DESIGN_FRAME_WIDTH` (1440), `CONTENT_COLUMN_WIDTH` (1200), `TEST_WIDTHS`, `MIN_TOUCH_TARGET` |                                                                                            |
| `lib/raw-colors.ts`    | `THEME_COLOR`, `OG_COLORS`                                                                                   | **ESCAPE HATCH**, allowlisted. Read the file header before touching.                       |
| `lib/utils.ts`         | `cn()`                                                                                                       |                                                                                            |
