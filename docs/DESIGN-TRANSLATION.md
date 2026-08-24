# The pixel-perfect workflow

Follow these steps **in order**, every session. Steps 1–4b happen **before** you
write code. That ordering is the point: restructuring after the fact is where
the line limit, the token discipline and the mobile derivation all quietly get
abandoned.

---

## Step 1 — Read the design before writing any code

Inventory the PNG systematically. Write the inventory down; do not hold it in
your head.

- **Layout structure** — the grid, column count, alignment, where things bleed
  past the content column.
- **Every distinct spacing value** — gaps, padding, margins. List them.
- **Every colour** — fills, text, borders, shadows, gradients.
- **Every type style** — family, size, weight, line-height, letter-spacing,
  case, colour.
- **Border radii**, **shadows**, **borders**, **dividers**.
- **Icons** — which ones, what size. Check `lucide-react` for each before
  assuming you need an SVG asset.
- **Imagery** — dimensions, aspect ratio, crop, whether it is decorative or
  carries meaning.
- **States visible in the design** — hover, active, disabled, error, empty,
  selected.
- **Every string of copy, transcribed verbatim.** This is the indexed content
  and it is not yours to edit.

---

## Step 2 — Establish the scale factor

**The canonical desktop frame is 1440px** (`docs/RESPONSIVE.md`).

```
export scale = PNG pixel width / 1440
true measurement = measured pixels / export scale
```

| PNG width | Scale | Divide every measurement by |
| --------- | ----- | --------------------------- |
| 1440      | 1x    | 1                           |
| 2880      | 2x    | 2                           |
| 4320      | 3x    | 3                           |

**Get this wrong and every spacing and type value in the section is wrong by a
constant multiple** — which looks perfectly plausible in isolation and only
reveals itself when your section sits next to someone else's.

**If the PNG width is not a clean multiple of 1440, stop and ask.** Do not
guess, and do not "normalise" it yourself.

---

## Step 3 — Map to tokens, and report the gaps

Match every extracted value against the existing tokens in
`docs/DESIGN-SYSTEM.md`. Then produce an **explicit list of values that have no
token.**

For each gap: propose the token addition (primitive + semantic name), add it,
document it, then consume it. Never hardcode.

**Do not silently snap a near-miss.** If the design shows `#2F9E68` and
`--brand-9` is `#30A46C`, that is a 1-unit difference — but **flag it, do not
absorb it**. It may be a Figma inconsistency, or it may be deliberate. The user
is the one who knows. The same applies to a 22px gap when the scale has 20 and
24: report it rather than rounding in silence.

Note that the fluid tokens are _ranges_, so compare against the **desktop end**:
`text-h2` is 40px at 1440, not 26px.

---

## Step 4 — Plan the component breakdown, in writing

Before implementing, state:

1. **Which components already exist and will be reused.** Run the
   anti-duplication protocol (`AGENTS.md` §4) first — read
   `docs/COMPONENTS.md`, `rg` for synonyms, check `ui/`, `common/`, `layout/`.
2. **Which components are new**, where each file goes (per the decision tree in
   `docs/STRUCTURE.md`), and each one's props interface.
3. **Confirmation that no duplicate is being created.** If something similar
   exists, extend it with props or `cva` variants instead — or, if the
   responsibility is genuinely different, create the new one and record why in
   `docs/DECISIONS.md`.
4. **A line-count sanity check**: does the plan keep every file under 150 lines?
   If a section looks like 300 lines, decompose it _now_, not later.

---

## Step 4b — Plan the responsive derivation, in writing

**The PNG shows one width. You are shipping three.**

For each layout block in the section, state:

- The **tablet** (`md`) treatment.
- The **mobile** (base) treatment.
- The **reading order after collapse**, and confirmation that **source order
  matches it** (no `order-*`).
- Anything you intend to **drop, reposition or restructure** on smaller screens.

Use the doctrine table in `docs/RESPONSIVE.md` as the default. Deviating is
allowed; deviating **silently** is not — log the reason in `docs/DECISIONS.md`.

> Deriving mobile _while_ writing desktop markup is how sections end up with a
> mobile layout nobody chose.

Example of the level of detail expected:

> - Hero: 2-col text+image at `lg`. Stacks at `md` with text first (the copy
>   carries the message; the screenshot is supporting). Screenshot drops to
>   `aspect-video` and full width at base.
> - Feature grid: 3-up at `lg` → 2-up at `md` → 1-up at base.
> - Background blob: `hidden md:block`. Removed on mobile rather than shrunk —
>   at 360px it would be illegible noise.

---

## Step 5 — Implement

- **Server Components by default.** `"use client"` only on the interactive leaf.
- **Semantic HTML.** `<header> <nav> <main> <section> <article> <footer>`.
  A `<div>` is a last resort.
- **Tokens only.** No colour literals, no `text-[42px]`, no `z-[9999]`, no
  `duration-[437ms]`.
- **Mobile-first.** Write the derived mobile state as the base classes and layer
  desktop on top with `md:` / `lg:`.
- **Real copy from the PNG**, verbatim.
- `<Container>` and `<Section>` for structure — never `max-w-[1200px]`.
- `<ActionButton>` for CTAs (44px+ targets), raw `<Button>` for dense UI.

---

## Step 6 — Self-review, before involving the user

- [ ] Spacing, type, colour and radii match the design **at 1440px** — the only
      width where "matches the design" is a meaningful claim.
- [ ] Tablet and mobile derived per `docs/RESPONSIVE.md`; every deviation from
      the doctrine table logged in `docs/DECISIONS.md`.
- [ ] Reading order after collapse follows the desktop visual hierarchy, and
      source order matches it — no `order-*` patches.
- [ ] **Zero hardcoded colour values** — `npm run check` proves it.
- [ ] All files under 150 lines.
- [ ] No duplicated components; `docs/COMPONENTS.md` updated.
- [ ] SEO checklist in `docs/SEO.md` complete; route registered.
- [ ] Responsive 360 → 1920: no horizontal overflow, no orphaned or overlapping
      elements at any width in the test matrix.
- [ ] Keyboard navigable, visible focus, sensible tab order,
      `prefers-reduced-motion` respected, targets ≥44×44px.
- [ ] `npm run check` passes clean.

---

## Step 7 — Report, then ask

Present:

- What was built.
- Files created and modified.
- Tokens added (and any near-miss values you flagged rather than snapped).
- Components **reused** vs. **new**.
- **Every responsive derivation made at tablet and mobile.**
- Every deviation from the design, with the reason.
- Every assumption (see step 8).

Then **stop and ask**, explicitly:

> "Implementation complete and self-reviewed. Would you like me to run a visual
> test — start the dev server, capture screenshots at desktop, tablet and
> mobile, and compare the desktop capture against the design PNG?"

**Do not start a dev server, launch a browser, or capture screenshots without an
explicit yes.** Wait for the answer.

If yes:

- Compare the **desktop** capture against the PNG pixel-for-pixel.
- Present the **tablet and mobile** captures for approval — those have no
  reference to compare against, so the user's eyes are the only check that
  exists.
- **Report differences honestly, including ones the user might not have
  spotted.** An inaccurate "pixel-perfect ✅" is worse than a list of known
  gaps.

---

## Step 8 — Ambiguity policy

A desktop-only PNG under-determines a great deal:

- hover, focus, active, disabled states
- loading, empty, error states
- tablet and mobile layout
- content overflow with longer strings
- scroll and entrance motion
- text that is illegible in the export

Follow the doctrine table where it applies. Choose the most reasonable option
where it does not. Then **list every assumption in the final report** so the user
can correct it. **Never present an assumption as if it were in the design.**

When an assumption is both **consequential and cheap to check** — the mobile
treatment of the primary navigation, whether a hero visual survives at 360px,
what a form does on submit — **ask before building**, not after.
