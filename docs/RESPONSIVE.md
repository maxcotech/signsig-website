# Responsive doctrine

**This is the most consequential document in the repository after `AGENTS.md`.**

Here is why. Every design you will ever be handed is a **desktop frame only**.
There are no tablet comps and no mobile comps, and there never will be. Tablet
and mobile are **derived**, not designed.

Without a shared derivation rule, eight sessions produce eight mutually
inconsistent mobile layouts and the site feels assembled by strangers — because
it was. The job of this document is to make derivation **deterministic**: two
different sessions, given the same desktop section, should independently arrive
at the same mobile layout.

---

## 1. The canonical desktop frame

| Fact                             | Value           |
| -------------------------------- | --------------- |
| **Canonical design frame width** | **1440px**      |
| Content column                   | **1200px**      |
| Implied gutter at frame width    | 120px each side |

Mirrored in code as `DESIGN_FRAME_WIDTH` and `CONTENT_COLUMN_WIDTH` in
`src/lib/constants.ts`, and as the `--container-content: 75rem` token that
`<Container>` applies.

**Every measurement you take is relative to 1440.** Divide the PNG's pixel width
by 1440 to get the export scale (1x / 2x / 3x), then divide every measurement by
that factor. If the PNG width is not a clean multiple of 1440, **stop and ask** —
do not guess. See `docs/DESIGN-TRANSLATION.md` step 2.

### Breakpoints

Tailwind defaults, unmodified, mirrored in `BREAKPOINTS` in
`src/lib/constants.ts` for the rare case JS needs them:

| Name     | Min width | Typical role                                 |
| -------- | --------- | -------------------------------------------- |
| _(base)_ | 0         | **Mobile. The default state.**               |
| `sm`     | 640px     | Large phones / small tablets portrait        |
| `md`     | **768px** | **Tablet. Nav collapses at and below this.** |
| `lg`     | 1024px    | Small laptop                                 |
| `xl`     | 1280px    | Desktop                                      |
| `2xl`    | 1536px    | Wide desktop                                 |

The design frame (1440) sits between `xl` and `2xl`. That is expected: the
1200px content column is fully realised from `xl` up, and the page simply centres
in wider viewports.

---

## 2. THE DERIVATION DOCTRINE

These are the **presumed** transformations from a desktop frame. Follow them
unless the content clearly demands otherwise. **A session may deviate only with
a stated reason logged in `docs/DECISIONS.md`** — so the next session inherits
the precedent instead of contradicting it.

| Desktop pattern               | Tablet (`md`)                                                    | Mobile (base)                                                 |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| Multi-column grid (3–4 up)    | 2 columns                                                        | 1 column, full width                                          |
| 2-column grid                 | 2 columns, tighter gap                                           | 1 column                                                      |
| Side-by-side text + image     | Stacked, or 2-col if both survive                                | Stacked — **text first unless the image carries the meaning** |
| Horizontal nav bar            | Collapsed to Sheet at `md` and below                             | Sheet / drawer                                                |
| Horizontal card row           | 2-up grid, or horizontal scroll if the design implies a carousel | Vertical stack, or scroll-snap carousel                       |
| Wide data table               | Horizontal scroll with a sticky first column                     | Card-per-row transformation                                   |
| Section vertical padding      | ~75% of desktop                                                  | ~50–60% of desktop                                            |
| Display / hero type           | Interpolated                                                     | ~55–65% of desktop size, tighter line-height, looser tracking |
| Body type                     | Unchanged                                                        | Unchanged — **never below 16px**                              |
| Container gutters             | 32–48px                                                          | 16–24px                                                       |
| Multi-column footer           | 2 columns                                                        | Stacked, or accordion if there are many groups                |
| Fixed-position decorative art | Reduce or reposition                                             | Usually **remove** — do not shrink it into illegibility       |

**Most of this is already implemented in tokens.** Section padding, type sizes
and gutters ramp automatically — `py-section-y` and `text-display-1` already do
the 75%/55% arithmetic for you. Do not hand-pick `text-3xl md:text-5xl`; that is
how the type scale dies by a thousand cuts.

### Two standing rules

**Reading order is derived from the desktop _visual_ hierarchy, not from DOM
convenience.** When a desktop row collapses, the element that reads first on
desktop reads first on mobile. If the DOM order fights that, **fix the DOM
order** rather than reaching for `order-*` — source order is what screen readers
and crawlers follow, and `order-*` desynchronises them from the visual order.

**The 150-line rule and the derivation work together.** If handling mobile makes
a component balloon past 150 lines, that is the signal to **split the
component** — never the signal to drop mobile handling.

---

## 3. Rules every session inherits

### Mobile-first, always

Unprefixed classes are the **mobile** state; `md:` / `lg:` add complexity
upward.

```tsx
/* WRONG — desktop-first. Lets an unhandled mobile state slip through silently. */
<div className="grid w-[1200px] grid-cols-3 md:w-auto md:grid-cols-1">

/* RIGHT — mobile-first. The mobile case is stated explicitly. */
<div className="grid grid-cols-1 gap-grid-gap md:grid-cols-2 lg:grid-cols-3">
```

This matters doubly here: the _design_ is desktop-first, so writing
desktop-first _code_ lets an unhandled mobile state pass unnoticed. Writing
mobile-first forces you to state the mobile case.

### A desktop-only PNG is not a licence to ship desktop-only markup

Mobile is not optional, not a follow-up task, and not "responsive enough because
it's flexbox". **A session that ships a section which only works at the design
width has not finished.**

### Report every derivation you made

The user has never seen these layouts and cannot approve what is not surfaced.
This level of detail is required:

> "Stacked the 3-up feature grid to 1 column below `md`; dropped the background
> blob on mobile; hero display type ramps 72→40px; moved the screenshot below
> the copy on mobile because the text carries the meaning."

### Other hard rules

- **No fixed pixel widths on layout containers.** Use `max-w-*`, fluid widths,
  `min()` / `clamp()`, grid and flex. Fixed `px` is fine for hairlines, icons and
  true fixed-size assets.
- Prefer **container queries** (`@container`) for a component that must adapt to
  its _slot_ rather than to the viewport — a card that appears both in a sidebar
  and in a 3-up grid.
- **Interactive targets ≥44×44px** effective (`MIN_TOUCH_TARGET`). shadcn's
  default button is 32px tall; use `<ActionButton>` for page CTAs.
- **Visible keyboard focus everywhere.** Never remove the ring without replacing
  it. The base layer supplies a token-driven `:focus-visible` ring.
- **Respect `prefers-reduced-motion`** — handled globally in `globals.css`; JS
  and canvas motion must check `usePrefersReducedMotion()`.
- **Safe-area insets** (`pt-safe`, `pb-safe`, `px-safe`) on any fixed or sticky
  chrome.
- **Long content must not blow out the layout.** Test with a long unbroken word,
  a long name, a long heading. Reach for `text-balance`, `text-pretty`,
  `break-words`, `truncate`, `min-w-0`.
- **Watch specificity collisions on vertical spacing.** A `py-*` in `className`
  fighting `<Section>`'s default padding is the classic source of "fine at
  desktop, broken at 768". Use `spacing="none"` when you mean to replace it.

---

## 4. The building blocks — already built, use them

Do not reinvent these. See `docs/COMPONENTS.md` for props.

| Component                         | Job                                                                      |
| --------------------------------- | ------------------------------------------------------------------------ |
| `<Container>`                     | Page width (`max-w-content` = 1200px) + responsive gutters (16/32/48px)  |
| `<Section>`                       | Fluid vertical rhythm + the inner container, in one wrapper              |
| `<Header>`                        | Sticky chrome; horizontal nav at `md`+, hamburger below                  |
| `<MobileNav>`                     | **The** mobile navigation. Sheet/drawer, wired to `config/navigation.ts` |
| `<Footer>`                        | Stacked at base, 2-column at `md`+                                       |
| `useMediaQuery` / `useBreakpoint` | **Behavioural** adaptation only — not layout                             |

**The mobile navigation is designed once, here.** No page session invents its
own. Because `<Header>` and `<MobileNav>` both read `MAIN_NAV` from
`src/config/navigation.ts`, the desktop and mobile navs physically cannot drift.

> **`useMediaQuery` is not a layout tool.** Layout belongs in Tailwind
> breakpoint classes, which work without JavaScript and never flash the wrong
> state on first paint. Use the hook only to change _behaviour_ — mount a focus
> trap, swap a carousel for a grid, stop an animation.

---

## 5. Test matrix

Check every section at all of these before declaring done
(`TEST_WIDTHS` in `src/lib/constants.ts`):

| Width      | Represents                                                                     |
| ---------- | ------------------------------------------------------------------------------ |
| **360px**  | Small Android. The hard floor.                                                 |
| 390px      | iPhone 14/15/16                                                                |
| **768px**  | iPad portrait — the `md` boundary, where collapse bugs hide                    |
| 1024px     | iPad landscape / small laptop                                                  |
| 1280px     | Common desktop                                                                 |
| **1440px** | **The design frame. The only width where "matches the design" is meaningful.** |
| 1920px     | Wide desktop — content must centre, not stretch                                |

At every width:

- [ ] No horizontal overflow. Nothing clipped.
- [ ] No overlapping or orphaned elements.
- [ ] All text legible; no 12px body copy.
- [ ] All interactive targets reachable and ≥44px.
- [ ] Images not distorted; `sizes` set so mobile does not download the desktop
      asset.
- [ ] Sticky header does not swallow content or anchor targets.
