# Decision log

**Append-only.** Add new entries at the bottom. Never rewrite or delete an
existing entry — if a decision is reversed, add a new entry that supersedes it
and say which one it replaces.

Format: `## YYYY-MM-DD — Title`, then **Decision**, **Reasoning**, and
**Consequence** where useful.

---

## 2026-08-24 — Foundation session

All entries below are from the initial scaffold session.

### Tailwind version branch: v4 (CSS-first)

**Decision.** `create-next-app@latest` installed **Tailwind CSS 4.3.3**, so the
project takes the **CSS-first branch**: no `tailwind.config.ts`, all theme
configuration in `@theme` blocks inside `src/app/globals.css`.

**Reasoning.** Verified from `package.json` after install rather than assumed.
The v3 branch (CSS variables + `theme.extend.colors` in a JS config) does not
apply and a `tailwind.config.ts` would be silently ignored.

**Consequence.** Custom utilities use the `@utility` directive.
`prettier-plugin-tailwindcss` needs `tailwindStylesheet`, not `tailwindConfig`.

### Colour space: OKLCH

**Decision.** All colour tokens are `oklch()`.

**Reasoning.** shadcn's own generated tokens are already OKLCH, so any other
choice would put two conventions in one file. OKLCH is also perceptually uniform
(better `color-mix()` and gradient interpolation) and wide-gamut ready.

**Consequence.** Radix hex values were converted programmatically; the source hex
is retained in a trailing comment on every primitive as provenance.

### Radix green finding: `#30A46C` === `green.9` — CONFIRMED

**Decision.** Use the full Radix `green` scale as the brand ramp.

**Reasoning.** Verified against `@radix-ui/colors@3.0.0`: `green.green9` is
exactly `#30a46c`. Because the claim held, we inherit an accessibility-checked
12-step ramp plus dark and alpha ramps rather than hand-tuning a guess.
Re-verify any time with
`node -e "console.log(require('@radix-ui/colors').green.green9)"`.

**Consequence.** `@radix-ui/colors` is kept as a **devDependency** purely so the
values stay verifiable; it is not imported at runtime. Pleasant side effect:
Radix keeps step 9 identical in the light and dark ramps, so the brand solid does
not shift between themes.

### Neutral ramp: Radix `gray`, not `sage`

**Decision.** `--neutral-*` uses Radix `gray` (pure, no hue cast).

**Reasoning.** Radix officially pairs green with the green-harmonised `sage`, but
greys sampled from a Figma file are usually neutral, and a tinted ramp would
fight them — producing exactly the near-miss colour mismatches this system
exists to prevent.

**Consequence.** If a design's greys turn out to be green-tinted, switching to
`sage` is a one-line change per ramp in the primitives block.

### Primitives do not flip; dark ramps are separate tokens

**Decision.** `--brand-1..12` (light) and `--brand-dark-1..12` (dark) both exist
globally in `:root`. Only Layer 2 flips, by pointing at a different ramp inside
`.dark`.

**Reasoning.** A primitive name should always mean exactly one colour. Redefining
`--brand-3` inside `.dark` would make the same token name mean two different
colours depending on context, which is miserable to debug.

### Accessibility trade-off accepted: white on `--primary` is ~3.16:1

**Decision.** `--primary` is Radix step 9 (`#30A46C`) with
`--primary-foreground: white`, which is **≈3.16:1** — AA for large text and
non-text UI, **failing** AA for normal-size text.

**Reasoning.** `#30A46C` is the brand primary and Figma will show buttons in it.
Design fidelity to the PNG is the project's primary deliverable, and silently
darkening the brand to pass a checker would break that.

**Consequence.** `--primary-text` (step 11, ≈4.71:1 on white) is provided for
brand-coloured **text** on light backgrounds. Documented prominently in
`docs/DESIGN-SYSTEM.md` §3. **Open question for the user:** whether small white
text on a `--primary` fill is acceptable, or whether such buttons should use a
darker fill than the design shows.

---

## 2026-08-24 — Deviations from the founding brief

Recorded per the brief's closing instruction: follow the better practice, log the
deviation.

### shadcn CLI flags differ from the brief

**Decision.** Initialised with
`npx shadcn@latest init -b radix -p nova --css-variables --no-monorepo --no-rtl --no-pointer -y`.

**Reasoning.** The brief specified "base colour neutral" via a `--base-color`
flag, which no longer exists in shadcn CLI 4.19. `-b/--base` now selects the
primitive library (`base` | `radix` | `aria`) and the style/base colour comes
from `-p/--preset`. `nova` resolved to style `radix-nova` with
`baseColor: neutral` — the intended outcome, reached through different flags.
CSS variables remain enabled, as required.

### `src/app/page.tsx` omitted in favour of `(marketing)/page.tsx`

**Decision.** The home page lives at `src/app/(marketing)/page.tsx`. There is no
`src/app/page.tsx`.

**Reasoning.** The brief's tree listed both, but both resolve to `/`, which is a
Next.js build error. The route group is the better home for it and is where every
subsequent marketing page belongs.

**Consequence.** Header/footer chrome stays in the **root** layout rather than a
`(marketing)/layout.tsx`, so `not-found.tsx` and `error.tsx` inherit it and a
visitor is never stranded on a bare page. Add `(marketing)/layout.tsx` when
marketing chrome genuinely needs to diverge — and log it then.

### Token layers 1 and 2 kept in `globals.css` despite its size

**Decision.** All three layers live in one ~790-line `src/app/globals.css`,
rather than being split into `src/styles/tokens/*.css`.

**Reasoning.** The brief is explicit that layers 1 and 2 belong in `globals.css`,
and Tailwind v4's `@theme` wants to be in the CSS entry point. One canonical
token file means a future session cannot wonder which of three files is
authoritative. The file is navigable via loud banner comments.

**Consequence.** `src/styles/` stays empty by design, and its README says so.

### Two extra enforcement scripts added beyond the brief

**Decision.** Added `scripts/check-tokens.mjs` and wired both it and
`scripts/check-colors.mjs` into `npm run check`.

**Reasoning.** The brief required a hardcoded-colour check. Token **parity** is a
distinct and equally silent failure: a semantic token defined in `:root` but
missing from `.dark` makes dark mode inherit the light value, and a token missing
from the `@theme inline` bridge exists without a usable utility class — which
leads a future session to conclude "there is no token for this" and hardcode a
value. Both are now mechanically impossible to ship.

**Consequence.** `npm run check` = typecheck → lint → colours → tokens → build.
Verified: 57 semantic tokens, full light/dark parity, all bridged.

### `typecheck` runs `next typegen` first

**Decision.** `"typecheck": "next typegen && tsc --noEmit"`.

**Reasoning.** Next 16 generates typed route helpers (`LayoutProps`, `PageProps`)
into `.next/types`, which `tsconfig.json` includes. On a fresh clone with no
prior build those types do not exist, so `tsc --noEmit` alone fails before the
build has a chance to generate them. Verified by deleting `.next` and re-running.

### `src/lib/raw-colors.ts` is a second allowlisted file

**Decision.** One file outside `globals.css` may contain colour literals, and it
is allowlisted in `check-colors.mjs`.

**Reasoning.** The brief says raw values live in the primitives file. Two
consumers cannot read CSS custom properties at all: browser/OS chrome
(`themeColor` in Next metadata) and `next/og` images (rendered by Satori). A
literal is genuinely unavoidable, and the brief's own guidance is that an
undocumented prohibition just gets broken silently — so the escape is explicit,
narrow, commented with `/* ESCAPE: <reason> */`, and cross-referenced from
`AGENTS.md`.

**Consequence.** Each value names the token it mirrors and must be kept in sync
by hand.

### `src/components/ui/**` exempt from the colour check and `import/order`

**Decision.** Exempt, in addition to the brief's `max-lines` exemption.

**Reasoning.** The directory is shadcn CLI output, regenerated by `shadcn add`.
Policing its import order would mean re-fixing it on every upgrade and any fix
would be overwritten. Our rule for that directory is "do not hand-write here",
not "make the CLI match our style".

### `<ActionButton>` added to meet the 44px touch target

**Decision.** New wrapper in `common/` rather than editing `ui/button.tsx`.

**Reasoning.** shadcn's button sizes are tuned for dense app UI — default 32px,
`lg` 36px — both below the 44px WCAG 2.5.5 minimum the brief requires, and both
undersized next to a marketing hero. Editing `ui/button.tsx` would be a fork that
`shadcn add` overwrites; wrapping is the pattern the brief mandates.

### `<ThemeToggle>` uses a CSS icon swap, not a mount gate

**Decision.** Both icons always render; the `dark:` variant picks one. No
`useState`/`useEffect` mount flag.

**Reasoning.** React 19's `react-hooks/set-state-in-effect` rule makes the
conventional `next-themes` mount-gate pattern a lint **error**. The CSS approach
is better regardless: correct icon on first paint, no flash, no hydration
mismatch, no extra render, and no client state at all.

**Consequence.** The `aria-label` is static ("Toggle dark mode") rather than
describing the target theme, since a dynamic label would reintroduce the
hydration problem.

### `next-sitemap` not installed

**Decision.** Native `src/app/sitemap.ts` and `robots.ts`, generated from a route
registry in `src/config/routes.ts`.

**Reasoning.** The brief's stated preference, and a dependency that generates a
file the framework already generates is one more thing to keep in sync.

---

## Open questions for the user

Not decisions — things the foundation could not settle alone. Carry these
forward.

1. **Copy.** `SITE.tagline`, `SITE.description` and every label in
   `config/navigation.ts` are **provisional placeholders**. Real copy must come
   from a design or from the user.
2. **Logo.** `<LogoMark>` geometry is a placeholder.
3. **`--radius: 0.75rem`** is a provisional guess; confirm against the first
   design showing a card.
4. **Small white text on `--primary`** — accept ~3.16:1 for brand fidelity, or
   deviate from the design for AA compliance? See the accessibility entry above.
5. **PWA icons** declared in `manifest.ts` do not exist yet.
6. **Analytics / error reporting** — none installed. `app/error.tsx` currently
   `console.error`s.

---

## 2026-08-24 — Finding: an explicit `title: undefined` strips the `<title>` tag

**Decision.** `buildMetadata()` **omits** the `title` key entirely when the
caller does not supply one, rather than passing `title: undefined`.

**Reasoning.** Found by inspecting the prerendered HTML, not by reasoning. With
`title: undefined` present as a key, Next.js treats the segment as _defining_
the title and **resets** the parent's `title.default` — the page shipped with no
`<title>` tag at all. The trap is that `og:title` and `twitter:title` were still
populated correctly, so every social preview looked right while the actual
browser/search title was missing.

**Consequence.** The home page (the only page that wants the absolute default)
now correctly renders `<title>SignSig — Secure digital signatures</title>`, and
pages passing a title still get the `"%s | SignSig"` template. Verified in
`.next/server/app/index.html` and `_not-found.html`.

**Do not "simplify"** the conditional spread in `buildMetadata()` back to a bare
`title,`. The comment there explains why.
