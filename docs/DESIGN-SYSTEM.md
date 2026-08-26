# Design system

Everything in this document is implemented in **`src/app/globals.css`**. That
file is the single source of truth. There is no second token file, and there
must not be one.

---

## 1. Tailwind version branch — READ THIS FIRST

**Installed: Tailwind CSS 4.3.3 → the CSS-first branch.**

- There is **no `tailwind.config.ts`**, and you must not create one. Tailwind v4
  configures itself from `@theme` blocks inside CSS.
- Tokens are CSS custom properties. Theme keys live in `@theme` / `@theme inline`.
- Custom utilities are declared with the `@utility` directive, not a plugin.
- `prettier-plugin-tailwindcss` needs `tailwindStylesheet: "./src/app/globals.css"`
  (the v3 option was `tailwindConfig`). Already set in `prettier.config.mjs`.

### shadcn/ui setup, as actually chosen

The shadcn CLI has changed since most documentation was written. What was run:

```bash
npx shadcn@latest init -b radix -p nova --css-variables --no-monorepo --no-rtl --no-pointer -y
```

- There is no `--base-color` flag any more. `-b/--base` selects the **primitive
  library** (`base` | `radix` | `aria`); we chose `radix`.
- Style/base colour comes from `-p/--preset` (`nova`, `vega`, `maia`, …). We
  chose `nova`, which resolved to style `radix-nova` with `baseColor: neutral`.
- CSS variables: **enabled** (non-negotiable — the whole token system depends
  on it).
- Components path: `@/components/ui`.
- Icon library: `lucide-react`.

Add components with `npx shadcn@latest add <name>`. Never hand-write files in
`src/components/ui/`.

---

## 2. Colour space: OKLCH

**Decision: OKLCH.** Reasons:

1. shadcn's own generated tokens are already OKLCH, so anything else would mean
   two conventions in one file.
2. Perceptually uniform lightness, so `color-mix()` and gradients interpolate
   without the muddy midpoints sRGB/HSL produce.
3. Wide-gamut ready.

Every colour in the file is `oklch(L C H)` or `oklch(L C H / alpha)`, with the
**source hex retained in a trailing comment** as provenance.

---

## 3. The brand colour

**`#30A46C` is the SignSig brand primary.**

**Verified:** it is exactly Radix Colors `green.9` — checked against
`@radix-ui/colors@3.0.0`. Re-verify any time with:

```bash
node -e "console.log(require('@radix-ui/colors').green.green9)"   # -> #30a46c
```

Because the claim held, we get the whole accessibility-checked 12-step ramp for
free, plus the dark ramp and the alpha ramp, instead of a hand-tuned guess. The
12 steps were converted to OKLCH and copied into the primitives layer;
`@radix-ui/colors` remains a devDependency purely so the values stay verifiable.

A pleasant property of Radix: **step 9 is identical in the light and dark
ramps**, so `--brand-9` and `--brand-dark-9` are both `#30a46c`. The brand solid
does not shift between themes.

### Radix step semantics

Why a given step is used where it is:

| Step  | Role                                        |
| ----- | ------------------------------------------- |
| 1     | App background                              |
| 2     | Subtle background                           |
| 3     | UI element background                       |
| 4     | Hovered UI element background               |
| 5     | Active / selected UI element background     |
| 6     | Subtle border and separator                 |
| 7     | UI element border, focus ring               |
| 8     | Hovered UI element border                   |
| **9** | **Solid background — the brand colour**     |
| 10    | Hovered solid background                    |
| 11    | Low-contrast text (accessible on steps 1–3) |
| 12    | High-contrast text                          |

### ⚠ Known accessibility trade-off — read before styling a button

White text on `--primary` (step 9, `#30A46C`) is **≈3.16:1**.

- ✅ Passes WCAG AA for **large** text (≥18.66px bold / ≥24px) and for non-text
  UI components (3:1).
- ❌ **Fails** WCAG AA for normal-size body text (needs 4.5:1).

This is inherent to Radix step 9 and to the brand colour itself, and we keep it
because **design fidelity to the PNG comes first** — Figma will show buttons in
`#30A46C` and we match them. Mitigation, already built:

- `--primary-text` (step 11, `#218358`, **≈4.71:1** on white) — use this for
  brand-coloured **text** on a light background.
- `--primary-hover` (step 10) and `--primary-active` (step 11) for states.

If a design puts small white text on a `--primary` fill, implement it as
designed and **flag it in your report**. Do not silently darken the brand.

---

## 4. Token layers

### Layer 1 — Primitives

Named for what they **are**, never what they do. **The only place in the
repository where a raw colour literal may appear.** Primitives **do not flip**
between light and dark: a primitive name always means exactly one colour, and
the dark ramps are separate tokens.

| Ramp        | Tokens                                    | Source                        |
| ----------- | ----------------------------------------- | ----------------------------- |
| Brand       | `--brand-1..12`, `--brand-dark-1..12`     | Radix `green` / `greenDark`   |
| Brand alpha | `--brand-a-1..12`, `--brand-dark-a-1..12` | Radix `greenA` / `greenDarkA` |
| Neutral     | `--neutral-1..12`, `--neutral-dark-1..12` | Radix `gray` / `grayDark`     |
| Danger      | `--danger-1..12`, `--danger-dark-1..12`   | Radix `red` / `redDark`       |
| Warning     | `--warning-1..12`, `--warning-dark-1..12` | Radix `amber` / `amberDark`   |
| Info        | `--info-1..12`, `--info-dark-1..12`       | Radix `blue` / `blueDark`     |
| Overlay     | `--overlay-1..12`, `--overlay-dark-1..12` | Radix `blackA` / `whiteA`     |
| Anchors     | `--white`, `--black`                      | Absolute                      |

Neutral is **pure `gray`** (no hue cast) rather than Radix's green-harmonised
`sage`, deliberately: greys sampled from Figma are usually neutral, and a tinted
ramp would fight them. If a design's greys turn out to be green-tinted, swapping
to `sage` is a one-line change per ramp in the primitives block.

### Home page additions (2026-08-24)

One small primitive group, sampled directly from the home page PNG, which does
not map closely enough to an existing ramp to justify snapping to it:

- `--tint-lavender` / `--tint-rose` / `--tint-mint` (`#f4f4f8` / `#f4eeee` /
  `#ecf6f1`) — the three pricing-card price-tile backgrounds. Rose and mint
  are within ~10/255 per channel of `--danger-3` / `--brand-3` but not
  identical; flagged per docs/DESIGN-TRANSLATION.md rather than silently
  snapped. Bridged as `--pricing-tile-starter/professional/enterprise`
  (Layer 2, both `:root` and `.dark` — dark-mode values pick the nearest
  tinted step in the dark ramp, since the design has no dark comp).

`--orange-9` (`#ffa944`) was added later for the system-status uptime chart:
the "degraded" bar, bridged as `--status-degraded`. It is oranger than Radix
`amber` step 9 (`#ffc53d`), so it is a genuinely new value rather than a
near-miss worth snapping. It completes a three-state set with `--success`
(operational) and `--destructive` (down), and holds the same value in both
themes — the amber reads correctly on light and dark, like the brand solid.

A second group, `--code-syntax-*` / `--code-*` (4 syntax-highlight colours),
existed briefly for a hand-built code preview and was **removed** when that
component was replaced by the design's own rendered panel as an image. Do not
re-add them unless a live code block returns.

`--warning-*` is Radix `amber`, a **bright** scale: step 9 needs a **dark**
foreground, never white. `--warning-foreground` already accounts for this.

### Layer 2 — Semantic tokens

Named for their **role**. This is what components consume. **These flip.**
Names are deliberately shadcn-compatible so shadcn components theme themselves
with zero patching — **do not rename them.**

| Group         | Tokens                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page          | `--background`, `--foreground`                                                                                                                                      |
| Surfaces      | `--surface-1`, `--surface-2`, `--surface-3`                                                                                                                         |
| Cards         | `--card`, `--card-foreground`, `--popover`, `--popover-foreground`                                                                                                  |
| Brand         | `--primary`, `--primary-foreground`, `--primary-hover`, `--primary-active`, `--primary-subtle`, `--primary-subtle-foreground`, `--primary-text`, `--primary-border` |
| Neutral roles | `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`                                                         |
| Status        | `--destructive(+-foreground/-subtle/-text)`, `--success(+…)`, `--warning(+…)`, `--info(+…)`                                                                         |
| Lines & focus | `--border`, `--border-strong`, `--input`, `--ring`                                                                                                                  |
| Overlay       | `--scrim`                                                                                                                                                           |
| shadcn compat | `--chart-1..5`, `--sidebar*`                                                                                                                                        |

**57 semantic tokens.** `npm run check:tokens` proves every one exists in
`:root`, in `.dark`, and in the `@theme inline` bridge.

### Layer 3 — Component usage

Utility classes only: `bg-primary`, `text-muted-foreground`, `border-border`.

---

## 5. Adding a token — copy-pasteable

Say a design introduces a "highlight" surface. **Three places, in order.**

**1. Primitive** (only if the value is genuinely new; prefer an existing step):

```css
/* in :root, LAYER 1 */
--brand-3: oklch(0.9582 0.0223 155.92); /* #e6f6eb */   <- already exists
```

**2. Semantic token — in BOTH blocks:**

```css
:root {
  --highlight: var(--brand-3);
  --highlight-foreground: var(--brand-11);
}

.dark {
  --highlight: var(--brand-dark-3);
  --highlight-foreground: var(--brand-dark-11);
}
```

**3. Bridge it to Tailwind:**

```css
@theme inline {
  --color-highlight: var(--highlight);
  --color-highlight-foreground: var(--highlight-foreground);
}
```

Now `bg-highlight` and `text-highlight-foreground` exist. Verify:

```bash
npm run check:tokens
```

Then document the token in the Layer 2 table above.

> `@theme inline` is **required** for anything that flips: it makes the utility
> emit `var(--highlight)` instead of baking in the light value, so `.dark` wins.
> Non-flipping scales (type, spacing, radius) use plain `@theme`.

---

## 6. Type scale

Fluid, interpolating between **360px and the canonical 1440px frame**. Each step
binds **size + line-height + letter-spacing + weight**, so `text-h2` sets all
four in one class. Never use `text-[42px]`.

| Utility          | Mobile → Desktop | Line height | Tracking | Weight |
| ---------------- | ---------------- | ----------- | -------- | ------ |
| `text-display-1` | 40 → 72px        | 1.05        | -0.022em | 700    |
| `text-display-2` | 34 → 60px        | 1.08        | -0.02em  | 700    |
| `text-h1`        | 30 → 48px        | 1.1         | -0.02em  | 700    |
| `text-h2`        | 26 → 40px        | 1.15        | -0.015em | 600    |
| `text-h3`        | 22 → 32px        | 1.2         | -0.01em  | 600    |
| `text-h4`        | 20 → 24px        | 1.3         | -0.005em | 600    |
| `text-h5`        | 18 → 20px        | 1.4         | 0        | 600    |
| `text-body-lg`   | 17 → 18px        | 1.6         | 0        | 400    |
| `text-body`      | 16px (fixed)     | 1.6         | 0        | 400    |
| `text-body-sm`   | 14px (fixed)     | 1.5         | 0        | 400    |
| `text-caption`   | 12px (fixed)     | 1.4         | 0.01em   | 400    |
| `text-overline`  | 12px (fixed)     | 1.4         | 0.08em   | 600    |

**Body copy never shrinks below 16px.** That is why `text-body` and below are
fixed rather than fluid.

> ⚠ **Adding a step? Add its key to `TYPE_SCALE` in `src/lib/utils.ts` too.**
> `tailwind-merge` identifies a `text-*` class by matching the value against
> Tailwind's built-in font sizes. It does not recognise our custom keys, so an
> unregistered step is treated as a text **colour** and silently deletes the
> real colour class merged before it — which is how every `<ActionButton>`
> shipped with dark text on a green fill. `cn()` registers the scale to
> prevent it; a step missing from that list reintroduces the bug.

`text-watermark` (`16vw`, weight 800) is a deliberate exception, added for the
footer's oversized background wordmark: it is decorative background art, not
a content heading, so it stays viewport-relative rather than clamped against
the 360–1440 content scale the rest of the type steps interpolate against.

The `clamp()` values were computed, not eyeballed: for a mobile size `M` and a
desktop size `X`, `slope = (X - M) / (1440 - 360)`, expressed as
`clamp(M, (M - slope*360) + slope*100vw, X)`.

---

## 7. Typography — fonts and substitutions

Loaded via `next/font/google` in `src/app/layout.tsx`: self-hosted, subset at
build time, no render-blocking third-party request, no layout shift.

| Role        | Face           | Variable                            | Notes                                                 |
| ----------- | -------------- | ----------------------------------- | ----------------------------------------------------- |
| Sans / body | **Inter**      | `--font-inter` → `--font-sans`      | Confirmed with the user. No substitution.             |
| Display     | **Inter**      | `--font-display`                    | Same face; swap here if a display face is introduced. |
| Mono        | **Geist Mono** | `--font-geist-mono` → `--font-mono` | Only for code/reference strings.                      |

**Substitutions made: none.** Inter was confirmed as the design face and is
available on Google Fonts.

If a future design uses a face `next/font/google` cannot serve: pick the closest
**metric-compatible** substitute, set an explicit fallback stack, record the
substitution **in this table**, and log it in `docs/DECISIONS.md`. Never load a
font from a CDN `<link>`.

Fallback stacks are defined in the `@theme` block and end in system fonts, so
text is always readable.

---

## 8. Spacing, layout and radius

| Token / utility             | Value                         | Use                                                                                                                                                                                                                                                                  |
| --------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--spacing`                 | 0.25rem (4px)                 | Base of the numeric scale (`p-4` = 16px)                                                                                                                                                                                                                             |
| `max-w-content`             | 75rem / **1200px**            | **Default page width** — the content column of the 1440px frame                                                                                                                                                                                                      |
| `max-w-narrow`              | 45rem / 720px                 | Prose, single-column reading                                                                                                                                                                                                                                         |
| `max-w-cards`               | 65rem / 1040px                | A 3-up card grid inset from the content column (SDKs page). Measured 1038px — three 319px cards with 41px gaps. Neither `content` (16% wider) nor `compact` (20% narrower) was close enough to reuse                                                                 |
| `max-w-compact`             | 52rem / 832px                 | A centred measure narrower than the content column, for a secondary 2-up grid that would look stranded at full width (solutions-page benefit grid). Measured 822px in the design; rounded to a clean 52rem — a 1.2% difference, flagged rather than snapped silently |
| `max-w-wide`                | 90rem / 1440px                | Full-frame sections                                                                                                                                                                                                                                                  |
| `max-w-menu`                | `min(44rem, 100vw − gutters)` | Header mega-menu panel. Viewport-aware on purpose: the panel is absolutely positioned under its trigger, so a fixed width would run off the right edge on a narrow desktop — this lets the columns wrap instead                                                      |
| `px-gutter` / `-md` / `-lg` | 16 / 32 / 48px                | Minimum viewport-edge breathing room                                                                                                                                                                                                                                 |
| `py-section-y`              | 64 → 120px                    | Standard section rhythm                                                                                                                                                                                                                                              |
| `py-section-y-sm`           | 40 → 80px                     | Compact section                                                                                                                                                                                                                                                      |
| `py-section-y-lg`           | 88 → 160px                    | Hero / feature section                                                                                                                                                                                                                                               |
| `gap-stack-gap`             | 32 → 48px                     | Between major blocks in a section                                                                                                                                                                                                                                    |
| `gap-grid-gap`              | 20 → 32px                     | Between cards in a grid                                                                                                                                                                                                                                              |
| `--radius`                  | 0.75rem (12px)                | shadcn derives `rounded-sm/md/lg/xl/2xl…` from this one value                                                                                                                                                                                                        |
| `rounded-pill`              | 9999px                        | Pills and fully-round chips                                                                                                                                                                                                                                          |

`--radius` is **provisional** — confirm it against the first design that shows a
card. Changing that single value rescales the whole radius set coherently.

Use `<Container>` and `<Section>` rather than these utilities directly. Never
write `max-w-[1200px]` or `px-[120px]`.

---

## 9. Shadows

Built from the overlay alpha ramp, not raw `rgba()`:
`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`,
plus `shadow-hairline` (a 1px ring for card borders that must not affect layout).

`shadow-card` is the standard treatment for a **content card** (home feature
grid, workflow steps, pricing tiers): a tight contact shadow plus a soft
downward falloff, profiled against the design. Cards are separated from the
page by **elevation, not by a border** — never pair `shadow-card` with a
`border-*`, and do not reintroduce `shadow-hairline` alongside it. See
docs/DECISIONS.md.

---

## 10. Z-index scale

Tailwind v4 has **no `--z-index-*` theme namespace**, so these are custom
properties plus explicit `@utility` declarations. They are real, greppable
classes — which is what makes `z-[9999]` unnecessary.

| Utility       | Value | For                    |
| ------------- | ----- | ---------------------- |
| `z-base`      | 0     | Default                |
| `z-raised`    | 10    | Cards lifting on hover |
| `z-sticky`    | 20    | Sticky sub-navigation  |
| `z-header`    | 30    | The site header        |
| `z-dropdown`  | 40    | Menus, comboboxes      |
| `z-overlay`   | 50    | Scrims and backdrops   |
| `z-modal`     | 60    | Dialogs, drawers       |
| `z-popover`   | 70    | Popovers above modals  |
| `z-toast`     | 80    | Notifications          |
| `z-tooltip`   | 90    | Tooltips               |
| `z-skip-link` | 100   | Must beat everything   |

Need a new layer? **Add a named one here.** Never invent a value inline.

---

## 11. Motion

| Duration           | Value |     | Easing            | Curve                               |
| ------------------ | ----- | --- | ----------------- | ----------------------------------- |
| `duration-instant` | 75ms  |     | `ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)`        |
| `duration-fast`    | 150ms |     | `ease-emphasized` | `cubic-bezier(0.05, 0.7, 0.1, 1)`   |
| `duration-base`    | 250ms |     | `ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)`        |
| `duration-slow`    | 400ms |     | `ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)`        |
| `duration-slower`  | 600ms |     | `ease-spring`     | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

`duration-[437ms]` is a rule violation. `--ease-*` is a native Tailwind
namespace so those utilities are generated automatically; the durations are
explicit `@utility` declarations for the same reason as the z-index scale.

### Card entrance animation

`animate-in-view` fades and rises a card as it scrolls into view, and
`card-lift` raises an interactive card on hover.

**No JavaScript.** It is a scroll-driven CSS animation (`animation-timeline:
view()`), so there is no IntersectionObserver, no client component and no
hydration cost — a card in a Server Component stays one. Each card is timed
against its own position, so grids stagger naturally with no per-item delays.

The whole rule sits inside **two guards**, and that is the load-bearing part:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) { .animate-in-view { … } }
}
```

A browser without scroll timelines, or a visitor who has asked for less
motion, never gets the rule at all — so the card is simply visible. It never
sits at `opacity: 0` waiting for a mechanism that is not there, which is the
usual way scroll animations hide content permanently. **Content must never
depend on an animation to become visible.**

Note the global reduced-motion rule below cannot cover this case on its own:
it only shortens durations, and duration is ignored on a scroll-driven
animation. Hence the explicit `no-preference` gate.

⚠ `card-lift` belongs **only** on a card that is itself a link. On a static
card a hover lift promises clickability that is not there.

**`prefers-reduced-motion: reduce` is honoured globally** in the base layer:
animations and transitions are neutralised for those users without any component
opting in. Bespoke JS/canvas motion should still check
`usePrefersReducedMotion()`.

---

## 12. Dark mode

- `next-themes` with **`attribute="class"`**, `defaultTheme="system"`.
- `globals.css` declares `@custom-variant dark (&:is(.dark *))`, so **every**
  `dark:` utility depends on the `.dark` class. Switching to `data-theme` would
  silently disable every dark style in the project.
- `<html>` carries `suppressHydrationWarning` — required, because the theme
  class is written before React hydrates.
- **Semantic tokens flip; primitives do not.**
- Dark mode is not optional and not a follow-up. Because it is driven entirely
  by Layer 2, a new page gets it **for free** — provided you only use tokens.

Verify visually with the token preview on the home page: toggle the theme and
every swatch must change.

---

## 13. Safe-area insets

`pt-safe`, `pb-safe`, `px-safe` map to `env(safe-area-inset-*)` with a `0px`
floor. Apply to any fixed or sticky chrome so it clears notches and home
indicators. Already applied to `<Header>`, `<Footer>` and the mobile nav sheet.
