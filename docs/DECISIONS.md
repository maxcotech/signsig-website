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
2. **Logo.** ~~`<LogoMark>` geometry is a placeholder.~~ Resolved 2026-08-24:
   the real lockup is now extracted from the design into
   `public/images/signsig-logo.png`. Still **raster** — replace with an SVG
   original when brand assets arrive.
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

---

## 2026-08-24 — Home page implementation (from a real product screenshot)

The source PNG (`Home.png`, 2560×13452) was a full-page capture, not a clean
Figma export: a Software=Figma comment was present, but the width (2560) is
not a clean multiple of 1440 (2560/1440 = 1.778x). Per the user's direction,
it was treated as an 1440px-frame page rendered at a wider capture width —
measured proportionally / by visual landmark, not by a literal pixel-division
scale factor. Colours were still sampled precisely via pixel inspection
(`sharp`, cropped slices) rather than eyeballed.

### Header/footer navigation rewritten from PROVISIONAL placeholders

**Decision.** `MAIN_NAV`, `FOOTER_NAV` and site copy (`SITE.description`,
`SITE.email`) were replaced with content transcribed from the design;
`HEADER_CTA` and `LEGAL_NAV` were removed in favour of `SIGN_IN_NAV` /
`SIGN_UP_NAV` and a `FOOTER_NAV` "Legal" group.

**Reasoning.** These were explicitly marked PROVISIONAL scaffolding pending a
real design (see the "Open questions" list above). The home page PNG is that
design, and it includes the header and footer chrome.

**Consequence.** `Sign In`/`Sign Up` point at routes that do not exist yet
(`/sign-in`, `/sign-up`), consistent with the pre-existing placeholder
pattern for `/privacy` and `/terms`.

### "Solutions", "Developers" and "Download" became real mega-menus

**Decision.** `MAIN_NAV` items can now be a plain `NavItem` (a link, e.g.
"Pricing") or a `NavMenuItem` (`{ label, columns }`, e.g. "Solutions"),
disambiguated with the `isNavMenuItem()` type guard. Menu items render as a
shadcn `NavigationMenu` mega-menu on desktop (`<NavMenuPanel>`) and an
`<Accordion>` group on the mobile Sheet (`<MobileNavList>`).

**Reasoning.** The original design PNG only showed these three nav items
closed, so the first pass (same day) implemented them as plain links with a
decorative, non-functional chevron — see the superseded reasoning above. The
user then supplied screenshots of all three dropdowns open with real content
(Solutions: 3 columns "By Use Cases"/"By Industry"/"By Roles"; Developers: 1
unlabelled column, the same 3 items already in the footer's "Developers"
group; Download: 2 columns "For Android"/"For iOS", each a single Play
Store/App Store link), so they were rebuilt as functional menus instead.

**Consequence.** Download's and Developers' dropdown links reuse the exact
hrefs already defined for `FOOTER_ACTIONS`/`FOOTER_NAV`'s "Developers" group,
rather than inventing a second, possibly-diverging set of placeholder paths
for the same destinations. Solutions' items are new placeholder routes
(`/solutions/<slug>`) — none of these pages exist yet, same scaffolding
pattern as elsewhere in `config/navigation.ts`.

### `<ThemeToggle>` removed from `<Header>` — SUPERSEDED, see below

**Decision.** The header no longer renders `<ThemeToggle>`. The component
itself is untouched and still exists in `common/theme-toggle.tsx`.

**Reasoning.** The design (a real, screenshotted product page) shows no
theme toggle anywhere in the header. Design fidelity to the PNG was weighted
over keeping an element that isn't in the source — the same precedent set by
the accessibility trade-off entry above ("design fidelity to the PNG comes
first").

**Consequence.** Dark mode still activates from `prefers-color-scheme` (via
`next-themes`' `defaultTheme="system"`), there is just no manual in-page
override control right now. Flagged for the user; trivial to re-add if
wanted.

> **Superseded the same day** by "Theme toggle restored to the navbar" below.
> The user asked for it back. Keeping the removal entry because the reasoning
> — fidelity to the PNG as the default tie-breaker — still stands as the
> precedent; this was an explicit override of it, not a reversal of it.

### `<ActionButton>` gains an `"inverse"` variant

**Decision.** Added a home-page-specific `variant="inverse"` to
`common/action-button.tsx` (`bg-foreground text-background`) rather than a
new shadcn Button variant.

**Reasoning.** The pricing cards' "Start Signing"/"Contact Sales" buttons
sampled at `#1b1c1d`, within ~5/255 per channel of `--foreground` in light
mode (`--neutral-12`, `#202020`) — too close to be a deliberate new colour,
read as PNG/anti-aliasing noise. Using `--foreground`/`--background` directly
means the pill inverts correctly for free if the page is ever viewed in dark
mode, with no new token. `ui/button.tsx` is CLI-owned and was not touched.

### `<EyebrowBadge>` added instead of using shadcn's `<Badge>`

**Decision.** New `common/eyebrow-badge.tsx` for the icon+label pills above
section headings, even though shadcn's `<Badge>` was installed in the same
session.

**Reasoning.** `<Badge>` is sized for dense status tags (20px tall, 12px
text) — every property would need overriding to reach the pill's actual
proportions (~40px tall, icon slot, 3 background/text colour variants). That
is a different responsibility, not a fork of the same one. `<Badge>` stays
installed for a future dense-UI status-tag need.

### Pricing tile tints and code syntax colours added as new primitives

**Decision.** Six new Layer 1 primitives (`--tint-lavender/rose/mint`,
`--code-syntax-keyword/entity/string/property`), bridged through Layer 2
(`--pricing-tile-*`, `--code-keyword/entity/string/property`) and the
`@theme inline` bridge.

**Reasoning.** None of these sampled colours are close enough to an existing
ramp step to reuse (see docs/DESIGN-SYSTEM.md "Home page additions" for the
per-colour deltas). Per docs/DESIGN-TRANSLATION.md step 3, a near-miss is
flagged, not silently snapped.

**Consequence.** The code preview's surface/foreground/border did **not**
need new tokens — `<CodePreview>` wraps itself in a literal `dark` class so
`@custom-variant dark (&:is(.dark *))` resolves the ordinary
`bg-surface-2`/`text-foreground`/`border-border` tokens to their dark-mode
values regardless of the page's own theme. Only the 4 syntax colours, which
have no semantic equivalent at all, needed new tokens. `<Footer>` reuses the
same forced-`.dark` trick for the same reason (its dark band is a deliberate
contrast element, not a themed state).

### `text-watermark` added as a non-clamped, viewport-relative type step

**Decision.** `--text-watermark: 16vw` added to the fluid type scale, used
only by the footer's oversized background "SIGNSIG" wordmark.

**Reasoning.** `text-[16vw]` would be the same rule violation as
`text-[42px]` — every arbitrary value needs a named token, decorative or not.
This one is deliberately viewport-relative rather than clamped against the
360–1440 scale, since it's background art that should track the footer's own
width, not page content.

### Monthly/Annual pricing toggle does not change displayed prices

**Decision.** `<PricingPeriodToggle>` is a real, keyboard-accessible tab
control, but selecting "Annual" does not alter the pricing cards.

**Reasoning.** The design shows no annual figures anywhere — only the
monthly price per tier. Fabricating an annual price (e.g. "2 months free")
would be inventing content, not transcribing it. Per the user's direction
(2026-08-24), the FAQ section's missing answers were handled the same way:
render the question, omit invented content.

**Consequence.** Items 2–5 of the FAQ list render as static, non-expandable
rows (only item 1, "Is SignSig really open source?", has an answer in the
design and is a real accordion item). `buildFaqSchema()` is fed only that one
answered entry, so the FAQPage JSON-LD never asserts content the page doesn't
actually show.

### Two sections skip the default 2-up tablet step

**Decision.** `<HomeWorkflow>`'s 3-step row goes 1-column (base) directly to
3-column (`md`+), and `<HomePricing>`'s 3-tier grid goes 1-column (base)
directly to 3-column (`lg`+) — both skip the doctrine table's default 2-up
tablet step for a 3–4up grid.

**Reasoning.** A 2-up step would orphan the 3rd card onto its own row for
both a step-by-step process (workflow) and a plan-comparison table
(pricing), which reads worse than either a clean single column or the full
3-up. `<HomeWorkflow>`'s cards are narrow enough to survive 3-up starting at
`md`; `<HomePricing>`'s are not, so it waits for `lg`.

### Illustrations, trust logos and the GitHub icon are simplified/substituted — SUPERSEDED for the illustrations

**Decision.** The feature grid's 8 decorative mockups are simplified
interpretations (icons + shapes, not pixel-exact reproductions); people's
photos are replaced with icon placeholders; the trust-bar logos render as
styled text wordmarks rather than fetched brand SVGs; the GitHub mark is an
inlined standard octicon (`common/github-icon.tsx`), since this project's
`lucide-react` version does not export one.

**Reasoning.** No licensed brand assets or real user photos were available,
and reproducing them pixel-for-pixel was out of scope for a token-driven
component rebuild. Flagged explicitly rather than silently presented as
exact.

> **Superseded the same day** by "Illustrations ship as extracted design
> assets" below, for everything except the GitHub octicon — that part still
> stands.

### Illustrations ship as extracted design assets, not markup

**Decision.** All 8 feature-card illustrations, the 3 workflow-step mockups,
the API code panel, the trust-logo strip and the logo lockup are now **image
files** in `public/images/`, cropped out of the source design PNG. The
hand-built approximations are deleted: eight `*-illustration.tsx` files,
`<CodePreview>`, `code-snippet.data.ts`, `trust-logos.data.ts`, and the four
`--code-syntax-*` / `--code-*` tokens that only `<CodePreview>` used.

**Reasoning.** The user supplied the real assets and asked for them to be
used. The approximations were visibly wrong next to the design and were never
going to converge — they contained avatar placeholders standing in for
photographs, generic icons standing in for product screenshots, and re-typeset
text standing in for licensed wordmarks. Extraction geometry is recorded in
`public/images/README.md` so the crops are reproducible.

**Consequence, and the trade-off this accepts.** The API sample is now a
**raster image rather than live text**: it is no longer selectable,
searchable, or crisp at high zoom, and it cannot re-theme. That is a real
regression against the previous tokenised `<pre>`, accepted deliberately
because it is the only way to match the design's exact panel rendering. It
carries alt text summarising what the code does rather than transcribing it.
Reverting just that one section is cheap if the trade-off is not wanted.

Feature-card and workflow-step images use `alt=""` — each restates the title
and description printed beside it, so announcing it again is redundant screen
reader noise. The trust strip and API panel carry real alt text, because the
companies named and the code shown are content.

`integrations.png` tiles a third-party product's logo, inherited from the
design. Licensing needs confirming before launch.

### Cards are separated by elevation, not by a border

**Decision.** The feature, workflow-step and pricing cards drop
`border border-border` + `shadow-hairline` in favour of a single new
`--shadow-card` token: `0 1px 3px 0 var(--overlay-1), 0 10px 24px -8px
var(--overlay-2)`. Do not pair `shadow-card` with a `border-*`.

**Reasoning.** The user identified the cards as shadowed, not bordered, and
the previous markup was doubled up anyway — a real 1px CSS border _and_ a
`shadow-hairline` ring. Pixel-profiling the design across a card edge shows a
soft falloff over ~16–20px, strongest just under the bottom edge (~4% black)
and faint above (~0.4%), which is what the token reproduces.

**Honest caveat.** Feature and pricing cards in the design _also_ carry a
crisp 1px `#e7e7e7` ring right at the edge (a single-pixel dip with lighter
values on both sides — not a shadow falloff). The workflow-step cards do not:
their gradient background darkens smoothly into the card with no ring at all.
The implementation follows the stated intent — shadow only, no ring —
consistently across all three, on the grounds that a uniform treatment is
better than reproducing an inconsistency. Adding
`0 0 0 1px var(--overlay-2)` to `--shadow-card` restores the ring if wanted.

The pricing card's _internal_ divider is genuinely a line (`#e7e7e7` at
y=9008 in the source) and keeps its `border-t`.

### The CTA card straddles the page/footer boundary

**Decision.** `<HomeCta>` renders a full-bleed dark band anchored to the
bottom of its own section, so the green panel overlaps the footer's surface
rather than sitting cleanly above it.

**Reasoning.** Measured in the design: the dark band begins 65.2% down the
green card, which overlaps it by 273px of its 785px height (~35%). Rendering
the footer as a plain sibling block lost that overlap entirely.

**Consequence.** The band lives in `<HomeCta>`, not `<Footer>`, because it has
to paint _behind_ the card. It uses `inset-x-0` on the section rather than
`w-screen`, so it is full-bleed without ever introducing horizontal overflow,
and carries a literal `dark` class so `bg-background` resolves to the same
surface `<Footer>` uses — the two are seamless. The section drops its bottom
padding (`spacing="none"` + `pt-section-y`) so it ends flush with the card;
the footer's own top padding provides the gap beneath.

### Baked-in image radii are not re-clipped in CSS

**Decision.** `built-for-developers.png` is masked to its own 44px (≈24px at the
1440 frame) rounded rectangle with transparent corners, and the `<Image>`
carries **no** `rounded-*` class.

**Reasoning.** The first crop was a plain rectangle that included the design's
light page background in the corners, then had a CSS `rounded-xl` (16px)
clipped over the panel's real 24px curve — two mismatched radii, which the
user spotted. The mask is inset 3px so it cuts inside the panel's
antialiased edge; without the inset a light fringe traced the arc.

**Consequence.** Any future image with a baked-in corner radius should be
masked the same way rather than given a CSS radius. The feature-card stage
images are fine as-is: their corners measure ≈32px at 2560 ≈ 18px at the 1440
frame, and the card's `rounded-xl` (16px) is within a pixel of that.

**Cache gotcha, learned the hard way.** The fix above appeared not to work
twice, because re-cropping a file under the _same_ name serves stale: Next's
image optimizer and the browser both key their caches on the URL, and in dev
there is no `.next/cache/images` to clear — the stale copy is in the browser.
The file was renamed from `api-quickstart.png` to `built-for-developers.png`
(which also matches the card-title naming convention) to force a fresh URL.
**When replacing an image in place, rename it or hard-reload** — do not
assume the change is live.

### `cn()` must register the custom type scale with tailwind-merge

**Decision.** `src/lib/utils.ts` now builds its merger with
`extendTailwindMerge`, registering every `--text-*` step under the `font-size`
class group, rather than calling bare `twMerge`.

**Reasoning.** A real, shipped bug, reported by the user as "buttons with a
green background should have white text". `tailwind-merge` identifies a
`text-*` utility by matching the value against Tailwind's **built-in** font
sizes (`sm`, `lg`, `2xl`, …). Our scale uses custom keys (`body`, `h2`,
`display-1`), so it fell through to treating them as text **colours**:

```
twMerge("bg-primary text-primary-foreground", "text-body")
  -> "bg-primary text-body"        // the colour is gone
```

`ACTION_SIZES` carries `text-body` / `text-body-sm`, and those land _after_
the variant classes, so every `<ActionButton>` lost `text-primary-foreground`
and inherited the page's dark `--foreground` on top of the green fill.
Verified before and after with a direct `twMerge` harness, including that
explicit colour overrides still win and two type steps still collapse.

**Consequence.** This was never a token problem — `--primary-foreground` is
`var(--white)` in both `:root` and `.dark`, so green buttons were always
_specified_ as white text. The class was being deleted before it reached the
DOM. Any custom `text-*` step added to `globals.css` must also be added to
`TYPE_SCALE` in `src/lib/utils.ts`, or it silently reintroduces the bug for
that step; both files carry a warning saying so.

### Theme toggle restored to the navbar; logo never changes colour

**Decision.** `<ThemeToggle>` is back in `<Header>`, beside the auth actions,
visible at every width (the auth buttons collapse into the mobile Sheet at
`md`; the toggle does not). `<Logo>` renders a single always-green lockup —
the light variant that briefly existed for the dark footer was deleted.

**Reasoning.** Both at the user's explicit request. On the logo: a brand mark
should not change colour with the theme, and the green reads acceptably on
the footer's near-black band. This supersedes the theme-toggle removal entry
above.

**Consequence.** `<LogoMark>` and the `isMarkOnly` prop no longer exist — the
placeholder SVG they belonged to is gone, replaced by the real extracted
lockup. No code referenced either (docs only), so nothing broke.

---

## 2026-08-24 — Contract Management page, and the first promotion

### Four page sections promoted to `src/components/common/sections/`

**Decision.** `<HomeWorkflow>`, `<HomeDevelopers>`, `<HomeFaq>` and
`<HomeCta>` moved out of `features/home/` into
`src/components/common/sections/`, renamed to `<WorkflowSection>`,
`<DevelopersSection>`, `<FaqSection>` and `<CtaSection>`. Their colocated data
(`workflow-steps.data.ts`, `faq-entries.data.ts`) and the private
`<WorkflowStepCard>` moved with them. All imports updated in the same change.

**Reasoning.** The Contract Management design reuses all four verbatim.
`docs/STRUCTURE.md` forbids a feature importing from another feature, so
`features/contract-management` could not reach into `features/home`; the
alternatives were promotion or duplication, and §4 mandates promotion.

Rather than assume the sections were identical, they were **pixel-diffed**
between the two design exports: high-variance content rows matched with mean
absolute difference 0.00, and the matched offsets were internally consistent
(workflow + developers at delta 3554; FAQ + CTA + footer at delta 5508, the
1954px gap being exactly Home's pricing section, which this page omits). So
none of them needs a prop to vary per page.

**Consequence.** These four take no props, deliberately. Adding a `variant`
prop to make one "slightly different" on a future page would re-create the
drift promotion exists to prevent — a genuinely different section should be a
different component. Note `<FaqSection>` emits FAQPage JSON-LD wherever it is
included; the markup matches visible content on both pages, so this is
correct, but a third page wanting the FAQ without structured data is the
moment to make that opt-in.

### `<ContractHero>` is a new component, not `<HomeHero>` with props

**Decision.** The Contract Management hero is its own component.

**Reasoning.** It differs from the home hero in three ways at once: plain page
background instead of the tinted panel, a single CTA instead of two, and no
free-trial line. Sharing one component would mean three booleans to express
two layouts — the "extending would make it incoherent" escape in §4.

### No data-driven Solutions template yet

**Decision.** Built `/solutions/contract-management` as an ordinary page.
Declined to build a generic `<SolutionPage>` template driven by a data file,
though the nav defines ~14 Solutions routes.

**Reasoning.** Explicit user choice when offered the trade-off, and the
conservative one: only one page's design has been seen, so any template would
be generalising from a single example. If the next few pages share this exact
shape, `<ContractHero>` + `<BenefitGrid>` get promoted and a template becomes
a safe refactor with real evidence behind it.

### `--container-compact` added for the benefit grid

**Decision.** New layout token `--container-compact: 52rem` (832px).

**Reasoning.** The benefit grid is inset to a measured 822px rather than
filling the 1200px content column — two 391px cards with a 40px gap, centred.
`max-w-narrow` (720px) is 12% off, too far to snap to. 822px is not a clean
value, so the token rounds to 52rem (+10px, 1.2%); recorded here and in
docs/DESIGN-SYSTEM.md rather than absorbed silently, per
docs/DESIGN-TRANSLATION.md step 3.

### `public/images/home/` now serves more than the home page

**Note, not a decision.** `built-for-developers.png` and the three
`step-*.png` files are consumed by shared sections and therefore appear on
every page that includes them. The folder name records where the assets were
**extracted from**, not where they are used. Left as-is deliberately: renaming
the folder would churn every reference and re-trigger the image-cache trap
documented above, for no functional gain.

---

## 2026-08-24 — All 14 Solutions pages, from one template

### The template decision, reversed on new evidence

**Decision.** Built a single data-driven template at
`app/(marketing)/solutions/[slug]/page.tsx` serving all 14 Solutions pages.
This **supersedes** "No data-driven Solutions template yet" above.

**Reasoning.** That earlier entry declined a template because only one page's
design existed and any abstraction would have been generalising from a single
example. The user then supplied the remaining 13 designs, and they are the
same shape without exception: eyebrow pill, two-line h1, one paragraph, one
CTA, 2x2 benefit grid, then the four shared sections. The objection was about
missing evidence, and the evidence arrived — so the decision flipped rather
than being defended.

**Consequence.** `features/contract-management/` and the explicit
`solutions/contract-management/` route are **deleted**; that page is now a
data entry like the other 13. `<ContractHero>` became `<SolutionHero>` and
moved to `features/solutions/components/` with `<BenefitGrid>`.

All 14 use `generateStaticParams` + `dynamicParams = false`, so each URL is
prerendered static HTML — the dynamic segment shares code, it does not defer
routing. Verified in the build output (`● SSG`) and in the generated sitemap
(15 URLs: home + 14).

### `config/solutions.ts` is the registry; copy lives in the feature

**Decision.** Split solution data in two. `SOLUTIONS` in `config/solutions.ts`
holds slug + label + group; the visible copy lives in three
`features/solutions/*.data.ts` files, keyed by slug.

**Reasoning.** Which pages exist is a **cross-cutting fact** — the nav, the
route registry and the static params all need it, and `config/` is where
`docs/STRUCTURE.md` puts facts. The page copy is **content**, which the same
document says belongs in a colocated feature data file. Keeping the slug list
in one place means `config/navigation.ts` (mega-menu), `config/routes.ts`
(sitemap) and the `[slug]` route cannot disagree about the page set; before
this, the same 14 slugs were written out by hand in two places.

The copy is split three ways by nav group because `src/features/**` is under
the 150-line ceiling and 14 entries in one file would breach it. The split is
not arbitrary — it mirrors the mega-menu's three columns.

**Consequence.** A slug in the registry with no matching copy throws at module
load, which **fails the build** with a named error rather than shipping a
blank page. Verified by deliberately adding an uncovered slug and confirming
the build aborted with `Solutions registry/copy mismatch — no copy found for:
drift-test`, then reverting.

### Copy transcribed from screenshots, not source files — flagged

**Decision.** All 13 new pages' copy was read from the supplied screenshots.

**Reasoning.** The user was offered the choice and opted for screenshots over
providing 13 source files.

**Consequence — read this before launch.** Unlike the home page, this copy was
**not** verified against a full-resolution export. Specifically uncertain:

- **Trailing punctuation.** The HR & Onboarding description appears to end
  "No printing, no scanning" with **no full stop**, unlike every other page.
  Transcribed as seen; may be a design typo rather than intent.
- **Heading line breaks.** `headingLines` records where each design wraps its
  h1. On the longer headings (Financial Services, For Legal Teams) the break
  point was inferred from the screenshot's line wrap, which is also affected
  by frame width.
- **Eyebrow icons.** Every one is an assumption — the glyphs render ~12px tall
  in the screenshots. Each was matched to the nearest lucide equivalent by
  shape. `Government Forms` (FileStack) and `For Finance & Procurement`
  (ChartColumn) are the least certain.
- **CTA destinations.** The designs show button labels but not targets. Most
  point at `/sign-up`; ones that read as documentation ("Learn about
  verification certificates", "Explore the API documentation") point at the
  relevant placeholder route. All are inferences.

Two screenshots also contained blue Figma selection outlines (around the
Government Forms benefit cards and the For HR Departments CTA). These were
read as editor chrome, not design, and deliberately not implemented.

### Meta descriptions reuse the visible hero paragraph

**Decision.** `generateMetadata` passes each page's visible description
straight through, rather than authoring a separate meta description.

**Reasoning.** Writing 14 new descriptions would mean inventing copy the user
has not approved, and it would create a second string that can drift from the
page. Several run past the 120-160 character guidance in `docs/SEO.md`; search
engines truncate rather than reject. Accuracy beat length here — flagged
rather than silently padded or trimmed.

---

## 2026-08-25 — The whole site was rendering in Times

### `next/font` variables belong on `<html>`, not `<body>`

**Decision.** `layout.tsx` moves `${inter.variable} ${geistMono.variable}` from
the `<body>` className onto `<html>`.

**Reasoning.** A shipped bug: every page rendered in the browser's default
serif instead of Inter. The chain broke in one link —

- `globals.css` base layer: `html { @apply font-sans }`
- `--font-sans: var(--font-inter), ui-sans-serif, …`
- but `--font-inter` was defined by a class on **`<body>`**

Custom properties inherit downward only, so at `<html>` scope
`var(--font-inter)` was undefined. A `var()` with no fallback that fails to
resolve makes the **entire** declaration invalid at computed-value time — the
rest of the font stack is not consulted. `font-family` therefore fell back to
the initial value (a serif), and `<body>` inherited it. The generous fallback
stack gave a false sense of safety: it could never apply, because the whole
declaration was already dead.

The comment in `globals.css` had said "sets `--font-inter` … on `<html>`" since
the scaffold. The CSS documented the contract correctly and `layout.tsx`
violated it; nothing mechanically enforced it, and it survived every
`npm run check` because the build is completely valid — only the rendering is
wrong.

**Consequence.** Verified end-to-end in the production bundle rather than by
inspection: `<html>` now carries `.inter_…__variable`, that class defines
`--font-inter: "Inter", "Inter Fallback"`, and `html{font-family:var(--font-sans)}`
resolves against it on the same element.

**No fallback was added inside `var(--font-inter, …)`,** deliberately. A silent
degradation to system-ui would have hidden this for far longer; the jarring
serif is what made it visible. The invariant is instead documented loudly at
both ends — in `layout.tsx` beside the `<html>` tag and in the `@theme` block.

**Worth noting for future sessions:** `npm run check` cannot catch this class
of bug. Typecheck, lint, the colour scan, the token parity check and the build
all passed throughout. Only looking at the rendered page catches it.

---

## 2026-08-25 — Eyebrow pills: shadow, and the variants really do differ

**Decision.** New `--shadow-pill` token
(`0 0 0 1px var(--overlay-2), 0 1px 3px 0 var(--overlay-2)`). The `neutral`
`<EyebrowBadge>` variant drops `border-border` and uses it. `brand` and
`on-dark` **keep** their borders.

**Reasoning.** The user reported the pills as shadowed, not bordered. Measuring
all three against the design showed they are not the same treatment, so this
was not a global find-and-replace:

| Variant   | In the design                                                         |
| --------- | --------------------------------------------------------------------- |
| `neutral` | White fill, 1px `#e7e7e7` edge (~9.4% black), soft ~5px falloff below |
| `brand`   | Mint `#eaf6f0` fill with a genuine 1px `#30a46c` stroke               |
| `on-dark` | Translucent white over the green band, with a light 1px stroke        |

Only `neutral` matched the report. `brand` was also **wrong in a second way**
and got fixed while here: it was a white pill with a faint green border, where
the design has a mint fill (`bg-primary-subtle`) and a solid `border-primary`
stroke. Near-miss noted: measured `#eaf6f0` against `--brand-3` `#e6f6eb`, a
~4/255 per-channel difference, snapped to the token rather than adding a new
primitive for it.

`border` was removed from the component's base classes, since only two of the
three variants have one now.

**Consequence, and a deliberate difference from `--shadow-card`.** For the
cards I dropped the design's hairline entirely and used a purely diffuse
shadow. That is wrong for a pill: the hero pill is white on a `#fbfbfb`
section — a 1.5% difference — so with no edge definition it washes out
completely. `--shadow-pill` therefore keeps a 1px **spread** (still a
box-shadow, never a `border-*`), which is also what the design measures. If
purely diffuse is wanted, drop the first shadow in the token.

---

## 2026-08-25 — Pricing page, and a type-scale discrepancy worth knowing about

### `<PricingSection>` promoted, with a `headingLevel` prop

**Decision.** `<HomePricing>` became `<PricingSection>` in
`common/sections/`, along with `pricing-card.tsx`,
`pricing-period-toggle.tsx` and `pricing-tiers.data.ts`. It takes
`headingLevel?: "h1" | "h2"` (default `"h2"`).

**Reasoning.** Second consumer, so the promotion rule applies. The prop is the
interesting part: `COMPONENTS.md` says not to add variant props to shared
sections, and that still stands — but this is not a style variant. On
`/pricing` the section IS the page subject, so its heading must be the single
`<h1>`; on the home page it is one section among many and must be an `<h2>`
(`docs/SEO.md`: exactly one h1, levels descend without skipping). Document
structure is a different category from cosmetics.

The design independently confirms it: the heading measures **~49.5px cap-derived
on /pricing against ~35.6px on home** — a 1.39x ratio, far too large to be
anything but a deliberate level change. Verified in the prerendered HTML that
each page emits exactly one `<h1>` and that the pricing heading is `<h1>` there
and `<h2>` on home.

### Nav active state, via a client leaf

**Decision.** New `<NavLink>` (`layout/nav-link.tsx`), a `"use client"`
component using `usePathname()`, replaces the plain `<Link>` for non-menu
primary nav items. Active items get `text-primary`.

**Reasoning.** The design shows "Pricing" in brand green on the pricing page
and grey everywhere else — sampled as exactly `--primary`. Detecting the
current route needs the pathname, which is client-only.

**Consequence.** `<NavLink>` is deliberately the smallest possible leaf so
`<Header>` stays a Server Component; lifting `"use client"` to the header
would pull the whole nav tree into the client bundle. It sets
`aria-current="page"`, because colour alone does not convey state to assistive
tech — and colour is never our only signal.

`MAIN_NAV`'s Pricing entry changed from the `/#pricing` anchor to the real
`/pricing` route. The footer "Resources → Pricing" link followed.

### ⚠ FINDING, NOT FIXED: `--text-h2` is ~12% larger than the design

**Not a decision — an open issue for the user.**

While measuring the pricing heading, three of the home page's centred section
headings were measured for comparison. They agree with each other and disagree
with our token:

| Heading (home)               | Design (cap-derived, @1440) | We render        |
| ---------------------------- | --------------------------- | ---------------- |
| How You Get Documents Signed | ~35.6px                     | 40px (`text-h2`) |
| Pricing Plans                | ~35.6px                     | 40px (`text-h2`) |
| Frequently Asked Questions   | ~35.6px                     | 40px (`text-h2`) |

The design's section heading is a consistent **~36px**; `--text-h2`'s desktop
end is **40px**. So every `h2` on the site renders ~12% oversized. By contrast
`--text-h1` (48px) matches the pricing page's ~49.5px well, so the scale is
only wrong at this step.

The type scale was authored during the scaffold session with no design to check
against ("computed, not eyeballed"), which is exactly where a plausible-looking
error hides. The fix is a one-line change to `--text-h2`'s clamp, but it moves
every heading on every page — a design-system change that should be the user's
call, not a side effect of building the pricing page. **Deliberately left
alone and surfaced instead.**

---

## 2026-08-25 — Knowledge base: reading past the design's duplication

### 4 collections, not 20; counts derived, not written

**Decision.** `/resources/knowledge-base` renders **4** collections, and each
card's "N Questions" is computed from that collection's own `questions` array.

**Reasoning.** The design's grid shows 20 tiles — but only 4 distinct titles
(Document Signing, Self hosting, Workflow Automation, Integration) repeated
five times, every single one reading "9 Questions". That is Figma duplication
to fill out a grid, not twenty collections with a coincidentally identical
question count. Confirmed with the user, who chose 4 with derived counts.

Reproducing it literally would have shipped four identical "Document Signing"
tiles all linking to the same page and all claiming nine questions that do not
exist — a page that lies about its own contents.

**Consequence.** Three collections currently have empty `questions` arrays, so
they render "No questions yet" on the card and a real empty state on the page.
That is the honest output of derived counts and is **not** a bug to patch with
a hardcoded 9. Real Q&A is coming from the user; filling in `questions` makes
the counts and pages correct with no component change.

`Document Signing` references `FAQ_ENTRIES` instead of duplicating those five
strings, since the design shows exactly the home FAQ set there.

### The search field is real

**Decision.** `<KnowledgeBaseBrowser>` is a client component with a working
filter: a query matches a collection's title **or** any of its question text.

**Reasoning.** The user chose a functional filter over a decorative one. The
placeholder reads "Search for a question", so matching question text — not
just titles — is what makes typing part of a question actually find the
collection that answers it.

**Consequence, flagged as invention.** The design shows **no** results state,
so the "No collections match …" copy is mine, not transcribed. It carries
`role="status"` so the change is announced. The label is `sr-only` because the
design has only a placeholder, and a placeholder is not an accessible name.

### The collection page's `<h1>` is screen-reader-only

**Decision.** `<h1 className="sr-only">{collection.title}</h1>`, with the
visible breadcrumb below it.

**Reasoning.** The design gives the collection page no visible heading — just
"All Collections > Document Signing" and straight into the questions. But
`docs/SEO.md` requires exactly one `<h1>` per page. The options were to invent
a visible heading the design does not have, to promote the breadcrumb's current
segment to an `<h1>` (odd markup: a heading inside a `<nav>`, at breadcrumb
type size), or to name the page for assistive tech and crawlers without
altering the visual. The third is the least invasive and is a standard
technique.

Verified in the prerendered HTML that all three knowledge-base pages emit
exactly one `<h1>`, and that the index shows "5 Questions" / "No questions
yet" rather than the design's "9 Questions".

### Grid width: content column, not the design's 1133px

**Decision.** The card grid uses the standard content container (1200px) with
`gap-stack-gap` (48px at desktop).

**Reasoning.** Measured, the design's grid is four 249px cards with 46px gaps —
2014px at 2560, i.e. **~1133px at the 1440 frame**, against the 1200px content
column. `gap-stack-gap`'s 48px matches the 46px gap well, but the total comes
out ~6% wider than drawn, making cards 264px instead of 249px.

Unlike the solutions benefit grid — inset to 822px, a deliberate 32% narrower
than content and worth its own `--container-compact` token — 6% reads as
incidental Figma layout rather than intent. Using the content column keeps the
grid aligned with the `<CtaSection>` band directly below it and every other
section on the site, which is worth more than 15px per card. Flagged rather
than absorbed silently; a `71rem` token would make it exact if wanted.

---

## 2026-08-25 — System status: rendering a page whose data does not exist yet

### The UI is written against a provider-agnostic type, not a payload

**Decision.** `features/system-status/types.ts` defines `SystemStatus`,
`ServiceStatus`, `UptimeBar` and a `ServiceState` union. Components consume
only those. `getSystemStatus()` in `system-status.data.ts` is the single seam
between the page and whatever eventually reports status.

**Reasoning.** The user chose a live feed but the endpoint is not ready and
asked for the page to be rendered meanwhile. Writing the UI against a
normalised type means the wait costs nothing: the adapter is one function body,
and swapping providers later touches one file instead of every component.

### `isLive: false` drives `noIndex` — deliberately, not by oversight

**Decision.** While the data is placeholder, the page is `noIndex` and the
route is `isIndexed: false` in `config/routes.ts`. Both derive from `isLive`
rather than being hardcoded, so they clear themselves when a real feed lands.

**Reasoning.** This is the one page in the site whose content is a _factual
claim about whether the service works_. Every other page shipping placeholder
copy is merely unfinished; a status page shipping placeholder copy actively
misleads — it will keep reporting "All System Operational" straight through an
outage, which is worse than having no status page at all.

The user asked for the page to be rendered, so it is rendered exactly as
designed — no invented banner, no visual deviation. The mitigation is
deliberately **invisible**: it keeps the page out of search results without
touching the design. One line to remove.

**Flagged for the user:** this page must not go public with placeholder data.
Either wire the endpoint or drop the route before launch.

### The eight rows render `{Status_category}` verbatim

**Decision.** The service rows display the literal string `{Status_category}`,
braces included, eight times.

**Reasoning.** That is exactly what the design says. It is a template token,
not a service name — the same class of placeholder as the knowledge base's
repeated "9 Questions". Inventing eight plausible service names would be
inventing indexed content, which `AGENTS.md` forbids; rendering the token
verbatim satisfies "transcribe copy exactly" _and_ is unmistakably a
placeholder to anyone who sees it. Real names will come from the endpoint.

### Measurements, and two design/content mismatches

Card and rows both measure **~800px** at the 1440 frame. Reused
`max-w-compact` (52rem / 832px) rather than adding a second near-identical
token — a 4% difference, flagged. Two consumers now share it: this page and
the solutions benefit grid (822px).

Bars: **44** of them, 11.2px wide with 5.6px gaps and 66px tall, one degraded
at index 34. Row height 66px, gap ~22px (rendered with `gap-5`, 20px). The h1
measures ~51.1px, consistent with `text-h1` on `/pricing` and the knowledge
base.

Two things in the design that do not add up, reproduced as drawn and noted
rather than silently "corrected":

1. The card is labelled **"90 Days Uptime"** but draws **44** bars. Either each
   bar is ~2 days or the count is illustrative. `BAR_COUNT` is a named constant
   so a real feed can set whatever it actually reports.
2. **"All System Operational"** is the design's wording (not "All Systems").
   Transcribed verbatim as indexed copy.

---

## 2026-08-25 — SDKs & Libraries

### The grid is centre-aligned, and that was measured rather than assumed

**Decision.** The card grid uses `items-center` in a `max-w-cards` (1040px)
column.

**Reasoning.** Row 3's cards visibly start at different heights in the design,
which initially read as a masonry layout. Measuring every card killed that
theory: the three row-3 cards are 392, 476 and 562px tall with tops at 1804,
1762 and 1719 — all sharing centre line y=2000. Rows 1 and 2 only appear
top-aligned because every card in them is exactly 392px.

So it is an ordinary CSS grid with vertically centred rows, not masonry. That
matters: a real masonry implementation would have meant CSS `columns`
(which reorders items column-major and would have put Node/TypeScript/Python
down the first column instead of across the first row) or a JS layout, both
wrong and both far more code than `items-center`.

**Consequence.** Documented in `COMPONENTS.md` as "do not fix this to
`items-start`", because top-aligning is the conventional choice and a future
session would otherwise read the centring as a mistake.

### `--container-cards` added (65rem)

**Decision.** New layout token, 1040px.

**Reasoning.** The grid measures 1038px — three 319px cards with 41px gaps.
`max-w-content` (1200) is 16% wider and `max-w-compact` (832) is 20%
narrower; neither is close enough to reuse without a visible difference. This
is now the third mid-width measure across the designs (822, 1038, 1133), which
do not sit on any shared scale — so each is matched to the nearest sensible
token rather than chasing all of them to the pixel, and the gaps are logged.

### Snippet colour deviates from the design, deliberately

**Decision.** Install snippets use `--primary-text` (step 11), not the
`--primary` the design draws.

**Reasoning.** `docs/DESIGN-SYSTEM.md` §3 already settled this: brand-coloured
**text** on a light background uses step 11 (~4.71:1), because step 9 is
~3.16:1 and fails WCAG AA for text this size. The design uses step 9. Rather
than treat that as a new decision, this follows the rule the design system
already documents for exactly this case. The two greens are close enough that
the difference reads as rendering, not redesign.

Note this is the mirror image of the accepted trade-off recorded during the
foundation session: there, white ON a primary fill was kept at 3.16:1 for
brand fidelity on large button text. Here it is small body-size text, where
the system's own guidance points the other way.

### ⚠ Two snippets are transcribed verbatim but look broken

**Not a decision — a defect to verify before launch.**

`AGENTS.md` §5 forbids "improving" design copy, so both are reproduced exactly
as drawn. But unlike prose typos these are **copy-paste targets**, so a reader
who trusts them gets a broken build:

1. **JAVA.** The Maven block closes with `<groupId>` and `<artifactId>` where
   valid XML needs `</groupId>` and `</artifactId>`. As printed the snippet
   does not parse.
2. **.NET.** `dotnet add package SignSig.SdK` — lowercase `d`, capital `K`.
   Almost certainly meant to be `SignSig.Sdk`.

Both are flagged in `sdks.data.ts` itself so they cannot be missed by someone
editing that file. Correcting them is a two-string change; it was not done
unilaterally because the transcription rule is explicit and `SdK` could
conceivably be the real package id.

---

## 2026-08-25 — Integration Hub and integration guides

### Neutral glyphs instead of the design's repeated logo

**Decision.** Every integration card renders one neutral tokenised icon. The
data type has room for a per-integration `logo` when licensed assets arrive.

**Reasoning.** All nine cards in the design show the same Microsoft-365-style
mark — a placeholder, like the knowledge base's repeated "9 Questions". Here
copying it literally would be worse than untidy: it would put **Microsoft's
trademark on the Dropbox, Slack, Salesforce and BambooHR cards**, which is a
factual misattribution of someone else's brand, not merely an unfinished
visual. Confirmed with the user, who chose the neutral placeholder.

### Categories inferred from grid order

**Decision.** The five sidebar categories map onto the nine integrations by
reading the grid's ordering: row 1 productivity, row 2 storage, row 3
CRM/CRM/HR.

**Reasoning.** The design only ever shows "All Integrations" selected, so the
real mapping is never visible. The grid is unambiguously ordered by category,
which makes this a strong inference rather than a guess — but it is still an
inference, and it leaves **"Finance & Accounting" with no members**, rendering
an empty state. Flagged in the data file for confirmation before launch.

### Eight integrations get an empty state, not a 404

**Decision.** All nine slugs prerender. The eight without a written guide show
an honest "not published yet" page pointing at the REST API and the hub, and
carry `noIndex`; only Microsoft 365 reaches the sitemap.

**Reasoning.** Every card in the design has a "View Integration" link, but only
the Microsoft 365 guide exists. Three options: dead links, 404s, or honest
empty pages. The user chose the third. `noIndex` on the eight keeps thin,
content-free pages out of search results while still honouring every link —
the same reasoning as the system-status page, applied to a different failure
mode.

### `belowSearch` slot keeps static content on the server

**Decision.** `<IntegrationBrowser>` (a client component) accepts a
`belowSearch` ReactNode, and the page passes the "Can't find a tool? Build
Your Own Integration" link into it.

**Reasoning.** That link sits between the search field and the grid in the
design, so it is inside the client component's markup — but it is entirely
static. Passing it as a slot keeps it a Server Component instead of shipping
it in the client bundle. This is the standard Next.js pattern for exactly this
situation and is worth copying whenever static content lands inside an
interactive shell.

### The guide code sample is valid, unlike the SDK snippets

**Note.** The Microsoft 365 code block was transcribed the same way as the SDK
install commands, but it is **valid JavaScript as drawn** — no malformed tags
or odd casing. The transcription caveats logged for `sdks.data.ts` do not
apply here.

### Data split three ways to hold the line ceiling

**Decision.** `types.ts`, `integrations.data.ts` (cards + categories), and one
file per guide under `guides/`.

**Reasoning.** A single data file came to 260 lines and failed `max-lines`.
Rather than shave comments, it was split by responsibility per
docs/STRUCTURE.md §5 — guides are the part that grows (this one is ~110 lines,
mostly the code sample), so one file each keeps every future guide bounded.

---

## 2026-08-25 — Careers: index and postings (wizard deferred)

### Open-roles count is derived, not the design's "149"

**Decision.** The index heading reads "Explore 2 Open roles", computed from
`ROLES`.

**Reasoning.** The design says 149 and lists two, with six of seven
departments drawn collapsed and empty. Confirmed with the user: two real
roles, derived count. Rendering 149 literally would be a false statement about
the company's hiring on a page candidates act on — the same class of problem
as the knowledge base's "9 Questions", but with a real-world consequence.

### The application wizard was deliberately NOT built this pass

**Decision.** `[role]/apply` is a stub that renders **no form** and points
candidates at an email address. It is `noIndex`.

**Reasoning.** The user chose to sequence the work (index + posting first,
wizard second). A partially built application form is the worst possible
intermediate state: a candidate who fills in half a form and sees any kind of
confirmation reasonably believes they have applied. A stub that says plainly
"the form isn't open yet, email us" cannot mislead anyone. It also keeps
"Apply Now" from 404ing in the meantime.

**When building the wizard**, the constraints agreed with the user:

- Submission goes through **one** `submitApplication()` seam, mirroring
  `getSystemStatus()`.
- The submit control stays **disabled with a visible reason** until a real
  endpoint is configured. It must never show "application received" without
  having sent anything.
- The form collects PII (name, email, phone, LinkedIn, CV, cover letter) and
  the consent copy promises 12-month storage — so an unwired form is a
  data-handling problem, not only a UX one. Do not "temporarily" wire it to
  something that drops data.

### No `JobPosting` structured data

**Decision.** Only `BreadcrumbList` is emitted on postings.

**Reasoning.** Google's `JobPosting` type requires `datePosted`,
`hiringOrganization` and `validThrough`. None exists in the design, and
inventing dates would publish fabricated hiring timelines into search results
— a worse failure than having no rich result. Add it when roles carry real
posting dates.

### Security Engineer: meta plus an honest note

**Decision.** The role with no written description shows its location,
employment type and salary, states that the full description is not published,
keeps a working Apply route, and is `noIndex`. Only roles with a `detail`
reach the sitemap.

**Reasoning.** Same treatment as the integration guides and knowledge-base
collections — every link goes somewhere real, and thin pages stay out of the
index. A candidate can still apply, which is the point of the page.

### Width: reused `max-w-cards`, no new token

Measured: the index accordion is ~1073px at the 1440 frame and the posting's
prose measure ~1000-1080px. `max-w-cards` (65rem / 1040px) sits within ~3% of
both, so no fourth mid-width token was added. That is now the fourth distinct
mid-width across the designs (822, 1038, 1073, 1133) — they do not share a
scale, so each is matched to the nearest existing token and the delta logged
rather than chasing every one to the pixel.

---

## 2026-08-25 — Policy pages: shells now, legal copy from source

### Legal text is not transcribed from a PNG

**Decision.** The four policy routes ship as shells. Terms of Service — the
only one with copy in the design — has an empty body pending text from the
user.

**Reasoning.** Two independent reasons, both agreed with the user:

1. **Legal copy is operative text.** Everywhere else in this build, a
   transcription slip would be a cosmetic typo. In a liability, indemnity or
   governing-law clause it changes what the document means, and it would likely
   survive review because it reads plausibly. OCR-from-image is the wrong
   input channel for that.
2. **The design's version is defective.** Section 5 "USER CONTENT AND
   DOCUMENTS" appears **twice, back to back** (verified by cropping the
   boundary), and section 18 contains unfilled `[Company Address]` and
   `[Support Phone]` placeholders. Transcribing faithfully would publish a
   legal document with a repeated clause; silently fixing it would mean
   editing legal text on my own judgement. Neither is acceptable, so the user
   is sending corrected copy.

**The other three were never written.** Cookie Policy, Privacy Policy and
Security And Compliance show a title, "Last Updated", and nothing else.
Confirmed rather than assumed: scanning the full page height for body text
returned **0 ink rows** for each, against 4,860 for Terms.

### `isPublished()` drives the empty state, indexing and the sitemap

**Decision.** One derived predicate controls all three behaviours.

**Reasoning.** An unwritten legal page is a thin page, and having Google index
"Cookie Policy" on a URL with no cookie policy on it is worse than not being
found — visitors arrive expecting a legal answer and get nothing. So while
`sections` is empty the page renders an honest note pointing at support, is
`noIndex`, and is absent from the sitemap. Filling in `sections` flips all
three at once, with no separate flag to remember.

The footer already linked to all four paths, so these routes replace four
links that previously went nowhere.

### Four explicit routes, not one dynamic segment

**Decision.** `/terms`, `/privacy`, `/legal/security-compliance` and
`/legal/cookie-policy` are four ~25-line route files wrapping one
`<PolicyPage>`.

**Reasoning.** A `[policy]` segment cannot serve both root-level paths and
`/legal/*` ones, and those paths were already published in the footer nav.
Normalising them all under `/legal/*` would have been cleaner but would change
`/terms` and `/privacy` — conventional, expectable URLs that other copy (the
careers consent text) points at. The duplication is four wrappers with no
markup, which is cheap; the shell is the single source of layout.

---

## 2026-08-25 — The application wizard (UI only)

### Submit is enabled but cannot succeed — a change from the earlier plan

**Decision.** The "Submit Application" button is **enabled** and calls
`submitApplication()`, which returns `not-configured`. That surfaces as a
visible alert. The success dialog is only reachable on `{ ok: true }`.

**Reasoning, and how this differs from what was agreed earlier.** The previous
entry said the submit control would be _disabled_ until an endpoint existed.
The user then asked for "only the UI", and a permanently disabled button makes
the last and most important interaction unreviewable — you cannot see what
submitting feels like. An enabled button that reports honestly satisfies both:
the whole flow is walkable, and no one is ever told their application was
received when it was not.

The invariant that actually matters is unchanged and is what the code enforces:
**no success state without a successful send.** Verified by grepping the built
HTML — "Thank you for applying" appears **zero** times, because the dialog is
gated on the result rather than on reaching step 4.

The route stays `noIndex`. An application form that cannot accept applications
should not be a search result.

### Each step is its own `<form>`

**Decision.** Four separate `<form>` elements, remounted per step via `key`,
with "Next" as each one's submit button.

**Reasoning.** This gets required-field, email-format and URL-format validation
from the browser for free — real, localised, accessible error messages with no
validation library and no dependency added. Remounting per step means the
browser only validates the fields currently on screen, which is exactly the
wizard semantics wanted. Word limits are the one rule the browser cannot
express, so those are checked in JS before advancing.

### Word counters warn; they never truncate

**Decision.** Exceeding a limit turns the counter destructive and blocks the
step. It does not cut the text.

**Reasoning.** Silently truncating is the one failure mode that loses work the
candidate believes they submitted — they would not find out until an
interviewer read half an answer. Blocking is visible and recoverable.

### Draft state is deliberately not persisted

**Decision.** No `localStorage`, no autosave.

**Reasoning.** The draft holds a CV file, phone number, LinkedIn profile and
free-text answers. Persisting that to browser storage on a shared or public
machine leaks PII to the next user, which is a worse outcome than losing a
half-finished form on refresh. If autosave is wanted later it needs an
explicit opt-in and a clear-on-submit, not a silent default.

### The dropzone is a real file input

**Decision.** `<input type="file">` inside a `<label>`, with drag-and-drop
layered on top, rather than a styled `<div>` with a click handler.

**Reasoning.** The native control is keyboard focusable, opens the picker on
Enter/Space, and is announced correctly — all for free. It also enforces the
5MB and PDF/DOCX limits the UI advertises: a field that states a limit and then
accepts a 40MB `.zip` has lied to the user.

### Select options are inferred; countries are generated

**Decision.** Notice Period and Years of Experience are invented option sets,
flagged in `application.data.ts`. "Desired Role" is generated from `ROLES`.
Countries come from ISO 3166 codes resolved through `Intl.DisplayNames`.

**Reasoning.** The design shows every dropdown **closed**, so no option list is
visible anywhere in it. For Desired Role, generating from the real openings
means the form cannot offer a job that does not exist. For countries, a
hand-typed list of ~200 names would be bulk to review, easy to get subtly
wrong, and English-only; codes plus platform locale data is smaller, complete
and correct. It evaluates identically on server and client, so there is no
hydration mismatch — verified in the build (196 options, `NG` → "Nigeria",
`GB` → "United Kingdom").

### Notice Period gets a chevron the design omits

The design draws a chevron on every select except Notice Period. Read as an
oversight and given one: a dropdown with no affordance does not read as a
dropdown. Logged rather than silently matched.

---

## 2026-08-25 — Card animation

### Scroll-driven CSS, not JavaScript

**Decision.** Two utilities in `globals.css`: `animate-in-view` (fade + rise as
a card scrolls into view) and `card-lift` (hover raise). Applied to all 10 card
components. No JS, no new dependency.

**Reasoning.** The designs are static exports with no motion specified, so this
is a §9 judgement call. `animation-timeline: view()` does the whole job in CSS:
no IntersectionObserver, no `"use client"` added anywhere, no hydration cost,
and cards inside Server Components stay Server Components. Each card is timed
against its own viewport position, so a grid staggers naturally without
per-item delays or index-based `animation-delay`.

### The guards are the feature, not boilerplate

**Decision.** The rule lives inside `@supports (animation-timeline: view())`
**and** `@media (prefers-reduced-motion: no-preference)`. There is no base
`opacity: 0` outside them.

**Reasoning.** The standard way scroll animations fail is content stuck at
`opacity: 0` because the mechanism that was going to reveal it never ran.
Nesting the whole rule means an unsupporting browser or a reduced-motion
visitor gets _no rule at all_ — the card is just visible. Verified in the
compiled bundle rather than assumed:

```css
@supports (animation-timeline:view()){@media (prefers-reduced-motion:no-preference){.animate-in-view{…}}}
```

Worth recording: the global `prefers-reduced-motion` rule in the base layer
**cannot** handle this case. It works by forcing `animation-duration: 0.01ms`,
and duration is ignored on a scroll-driven animation — the animation would
still play, scroll-linked, for someone who asked for no motion. The explicit
`no-preference` gate is what actually honours the preference.

I also initially misread my own verification and reported that the guards had
been flattened by Tailwind's `@utility` compilation. They had not; the grep
only captured the rule body without its wrapping at-rules. Corrected after
printing the surrounding block.

### Hover lift only on cards that are links

**Decision.** `card-lift` is on `<CollectionCard>` and the careers `RoleRow`
only. The other eight card types get the entrance animation and nothing else.

**Reasoning.** Those two are whole-card links; the rest are static content. A
hover lift is an affordance — it tells you the thing is clickable. Putting it
on a pricing card or a feature card would promise an interaction that does not
exist. Verified: `card-lift` appears 4× on the knowledge base and careers
pages and **zero** times on the home page.

This also replaced the ad-hoc `hover:shadow-md` those two cards had, so the
hover treatment is now defined once instead of drifting per component.

---

## 2026-08-25 — Dark-mode variants for the illustration PNGs

**Decision.** Each light illustration gets a generated `*-dark.png` sibling,
swapped in CSS (`dark:hidden` / `hidden dark:block`) by `<FeatureCard>` and
`<WorkflowStepCard>`. Produced by `scripts/generate-dark-images.mjs`.

**Reasoning.** This closes the gap flagged when the assets were first
extracted: the design ships light-background PNGs, so on a dark page the cards
were glaring white blocks.

**The CSS-only option was tried first and rejected on evidence.** The standard
trick — `invert(1) hue-rotate(180deg)` — needs no extra files, so it was
simulated pixel-for-pixel and rendered before deciding. It is fine on line
art, but two of these illustrations contain **photographs of people**, and
inverting turns them into negatives: wrong hair, wrong skin tones. Unusable.
Had I applied it without looking, that would have shipped.

**What the generator does instead.** It inverts the lightness of _neutral_
pixels only:

- Coloured pixels are untouched, so photographs, the Figma logos and the exact
  brand green survive.
- A neutral pixel whose _surroundings_ are coloured is also left alone. This
  was the second iteration: a naive neutral inversion turned the white text on
  the green "James Signed" pills dark and unreadable. Sampling a ring around
  each neutral pixel and skipping it when the local field is coloured fixes it.
- Everything else flips, with white landing near `#1a1a1a` to match the dark
  `--surface-2`.

**Consequence — the trade-off.** Both variants are in the DOM, so browsers
generally fetch both: the home page carries 11 illustrations, hence 22 image
requests. Accepted because `next/image` serves AVIF/WebP (far smaller than the
472KB of source PNGs), the cards are lazy-loaded below the fold, and the
alternative — CSS `background-image`, which fetches only the matching rule —
would give up `next/image` optimisation, explicit dimensions and lazy loading.
Revisit if the home page's image budget becomes a problem.

`darkVariant()` lives in `src/lib/` rather than the home feature, because
`<WorkflowStepCard>` is in `components/common/` and common must not depend on
a feature.

---

## 2026-08-26 — Dark-mode illustrations: previous entry SUPERSEDED and reverted

**This reverses "Dark-mode variants for the illustration PNGs" above.** That
entry, the 11 `*-dark.png` files, `scripts/generate-dark-images.mjs` and
`src/lib/dark-variant.ts` are all **deleted**. The components render a single
`<Image>` again.

### Why the generated-variants approach was wrong

The user pointed out the better answer: the PNGs' backgrounds should simply be
**transparent**, so an illustration inherits whatever surface it sits on —
light in light mode, dark in dark mode. One file, no swap, no doubled image
requests, and it stays correct if the card surface ever changes.

That is plainly better than generating a second recoloured copy of every
image. The generated-variant approach solved a problem that should not exist.

### But it cannot be derived from the flattened PNGs — tested, not assumed

Three separate attempts, each rendered and inspected:

1. **Key out all near-white** (un-composite from white). Destroys the artwork:
   the white document card, the grey placeholder bars and the dark body text
   all disappear or become invisible on dark.
2. **Edge flood-fill, generous tolerance (34).** Leaks through the light-grey
   card borders (`#e7e7e7` is only ~20 from the `#fbfbfb` background) and eats
   the white card interiors.
3. **Edge flood-fill, tight tolerance + hard cut.** Correct on
   `workflow-automation.png` — white circles and green pills preserved on a
   transparent field, matching the user's Figma reference exactly. Still
   destroys `document-signing.png`.

The blocker is not tuning. **The artwork's own white panels are the same
colour as the background** — `#ffffff` against `#fbfbfb`, a distance of 4 per
channel. In a flattened raster there is no information that separates "the
background" from "a white card drawn on the background". In Figma they are
different layers, which is why exporting with the background hidden is trivial
there and impossible here.

### What is set up now

`<FeatureCard>` and `<WorkflowStepCard>` each render one `<Image>` over a
tokenised stage — `bg-surface-2` and `bg-card` respectively. Those backgrounds
are currently invisible behind the opaque PNGs and take over automatically the
moment transparent files replace them. **Dropping transparent re-exports in
over the same filenames is the only change required**; no component or CSS
edit.

Noted in `public/images/README.md` so the next session does not re-attempt the
derivation. Watch the image-cache trap documented above when replacing files
under the same names.

---

## 2026-08-26 — Content document vs. design PNGs: how conflicts were resolved

The user supplied a 190-page content document and asked for the site to be
updated from it. The document and the design PNGs disagree in places. The rule
applied throughout, and the one to keep applying:

> **The document wins on copy. The design still owns layout.**

Where the document supplies content the design only showed as a placeholder
(closed dropdowns, `{Status_category}`, a single job posting), the document is
simply filling in what the PNG could not express, and there is no conflict.

### Resolved in the document's favour

- **SDK install snippets.** The design's Java block had unbalanced Maven tags
  and the .NET package read `SignSig.SdK`. A snippet is a copy-paste target: a
  design that shows broken code is showing a typo, not a specification.
- **`required` flags on the application form.** The design printed `*` after
  LinkedIn Profile, Portfolio / GitHub and screening question 5; the document
  makes all three optional. The `*` is now rendered _from_ the `required` flag
  rather than baked into the label string, so the marker and the constraint
  cannot drift apart again.
- **Résumé dropzone copy.** Design: "Drop your document here or click to
  browse". Document: "Drop your resume here…". Same control, better word.

### Resolved in the design's favour

- **The application form has no visible page header.** The document gives one
  ("Apply to SignSig" + a subtitle), but all four apply frames show only the
  Back link and the step tabs above "Personal Info". That is a layout claim,
  not a copy claim, so the design holds. The copy is recorded as a comment in
  `application.data.ts` rather than deleted, and raised for the user.
- **Careers salary ranges.** Only the design has ₦ figures, and only for the
  two roles it draws. `salaryRange` is therefore **optional** on `Role`, and
  both consumers guard it — otherwise the three document-only roles would
  render a dangling separator with nothing after it.

### Added beyond both

- **Cover letter: upload _or_ write inline.** The document adds a 1000-word
  textarea as an alternative to the design's upload-only control. Neither
  disables the other: a candidate who drafts in the box and then decides to
  attach a polished PDF should not have to clear the box first. Both are
  optional and the endpoint takes whichever is filled.
- **"Desired Role" lists job _families_, not open roles.** Previously derived
  from `ROLES` so it could not offer a closed position. The document's five
  families are better: the specific opening is already known from the route,
  and the dropdown does not empty out when postings close.

### Still open — needs the user

- **"Last updated" on the legal pages.** Document says January 2025, the
  design PNGs say January 2026. Not guessable, and wrong on a legal page is
  worse than absent.
- **Two inconsistent passes at the solutions copy.** Part 1 (p4) matches the
  design for Contract Management but not HR & Onboarding; the p17 "SIGNSIG
  SOLUTION PAGES" section is the reverse and gives Contract Management an
  entirely different headline. One of the two is stale; nothing in the
  document says which.
- **The document's SDK card is a redesign** (Best For / Status / per-SDK CTA,
  page retitled "Build With SignSig" with an intro section). That is new
  layout, not new copy, so it was not applied.

---

## 2026-08-26 — `src/content/`: where transcribed prose lives

The user directed that the content document overrides the design PNGs
everywhere, and asked for the legal pages plus the four footer Compliance
links to be built from it. That is roughly 3,000 words of operative legal text
and 8,000 words of compliance copy. It does not belong in `src/features/`.

**New directory: `src/content/`.** ESLint's `max-lines` covers `src/app`,
`src/components` and `src/features` — deliberately not this. The 150-line
ceiling is a detector for a component doing too much; a Privacy Policy is
15 sections because the law has 15 things to say, and `privacy-part-2.ts`
would be the rule violated with extra steps. The components that _render_ the
copy stay well inside the ceiling, which is the thing the rule is actually
protecting.

The rule for the directory: **nothing in `src/content/` may import from
`src/components` or `src/features`.** Content is data; it does not know how it
is displayed. `TrustPage` is declared in `src/content/blocks.ts` and
re-exported by `features/trust/trust.data.ts` for exactly this reason —
declaring it in the feature would have made the content files import from the
thing that renders them.

### One block vocabulary, two page types

`ContentBlock` — `paragraph`, `subheading`, `lead`, `labelled`, `list`,
`table` — is rendered by `<ContentSections>` and shared by the legal pages and
the trust pages. Six kinds covers every shape in the document. `lead` and
`labelled` are separate because the document uses both: "Service Delivery:" on
its own line introducing a list, versus "Ownership: You retain all…" inline.

Tables are real `<table>` elements, not flattened bullets. A cookie inventory
with Name / Purpose / Duration is the one part of a cookie policy people scan
rather than read. Each scrolls inside its own `overflow-x-auto` container, so
a three-column table at 360px scrolls itself instead of the page.

### Section headings are anchors

`slugify()` gives every section an id, so `/terms#12-limitation-of-liability`
works. That matters more here than anywhere else on the site: people quote
clauses at each other. The ids derive from the numbered headings, so they are
as stable as the numbering is — renumber a clause and its link moves, same as
in any printed contract.

### Security & Compliance moved out of `policies`

The design PNG showed it as a title, a "Last Updated" line and an empty body,
so it was modelled as a legal document. The content document gives it a
headline, an introduction, subsectioned feature groups, an FAQ and a CTA —
structurally identical to the four `/compliance/*` pages and nothing like the
numbered clauses of the Terms. It moved to `features/trust/` and **keeps its
published `/legal/security-compliance` path**, because it is in the footer's
Legal column and may already have inbound links.

### Placeholders are omitted, not printed

The document still carries unfilled placeholders in three places:

| Where                   | Placeholder                            |
| ----------------------- | -------------------------------------- |
| Terms §18 Contact       | `[Company Address]`, `[Support Phone]` |
| Privacy §15 Contact     | `[Company Address]`, `[Support Phone]` |
| Cookie Policy §14       | `[Company Address]`, `[Support Phone]` |
| ISO 27001 certification | `[Date]`, `[Date + 3 years]`           |

All are left out and the real values around them kept. A legal page printing
"Address: [Company Address]" is worse than one giving only the email it has,
and "Certification Date: [Date]" on a page whose whole purpose is to evidence
a certification actively undermines the claim. Each omission is recorded in a
comment at the top of its content file. Fill them in there.

### "Last updated" resolved

**January 2025**, from the document, on all three legal pages. The PNGs said
January 2026. The user's direction — the document overrides the PNG — settles
it, and it also settles the duplicated Terms §5 the PNG contained: the
document has it once.

### FAQ: a second component, not a prop on the first

`<TrustFaq>` is not `<FaqSection>` with props. The home FAQ is a two-column
marketing band with an icon, a fixed heading, a knowledge-base link, and fixed
data in which four of five questions have no answer at all and are excluded
from the JSON-LD. The trust FAQ is a plain accordion over supplied questions,
all of which have answers. Making one component serve both would have meant a
props explosion across two genuinely different responsibilities — the case
§4 of AGENTS.md describes as "create the new component and record why".

---

## 2026-08-26 — Integration Hub, Pricing and Solutions reconciled with the document

Three more areas checked line by line against the content document, under the
standing rule that **the document overrides the design PNG**.

### The solutions conflict is resolved — and the later section wins

I previously flagged that the document contains two disagreeing passes at the
solution copy. It is now settled, on evidence rather than preference:

- **"SOLUTION PAGES (REFINED)" (p75)** covers only five pages, and two of them
  — Identity Verification, Self-Hosting — are _product features_ in this
  site's IA, not solutions. It is a partial early pass.
- **"SIGNSIG SOLUTION PAGES" (p367)** covers **fourteen** pages, grouped By
  Use Case / By Industry / By Role, in the **exact same order and grouping as
  `config/solutions.ts`**. That is not a coincidence; it is the spec the site
  was built from.

So p367 is authoritative for solution pages. A mechanical diff of all 14 pages
(headline, description, four benefits, CTA — 98 fields) found:

| Page                       | Delta                                               |
| -------------------------- | --------------------------------------------------- |
| Contract Management        | **Full rewrite** — the design had used the p75 pass |
| HR & Onboarding            | Missing full stop                                   |
| Sales Agreements           | CTA: "…agreement" → "…agreement today"              |
| Government Forms           | Benefit 1 cropped mid-clause                        |
| Government & Public Sector | CTA: "Access" → "View"                              |
| For Sales Teams            | CTA and benefit 1 both cropped                      |
| The other 8                | **Already exact**                                   |

All 14 now diff clean against the document.

### Pricing

Prices (₦2,000 / ₦23,500 / ₦40,000) and audience lines were **identical** in
both sources. The changes were structural:

- Support lines moved out of the per-tier lists. The design put "Community
  support" on Starter and "Priority email support" on Professional; the
  document lists community support **once**, in a new "All plans include"
  block. Priority support appears nowhere in the document, so it is dropped
  rather than invented — a pricing table is a promise.
- "Email & SMS notifications" → "Email notifications". No SMS on Starter.
- Two features regained the qualifiers the design elided: "(sequential &
  parallel)" and "(email, phone, biometric)".
- New: the "All plans include" strip and the free-trial line + CTA.

`<PricingSection>` gained `variant: "summary" | "page"` in place of
`headingLevel`. One prop for two genuinely different jobs — home gets `<h2>`
and the design's short subtitle; `/pricing` gets `<h1>`, the document's
headline and description, and the two new blocks. The additions are **not** on
home: that page already ends in the site-wide CTA band, and a second trial CTA
one screen above it would compete with it.

The document has a second, shorter pricing spec (p534, "PRICING DESTINATION
PAGE") with a different headline. It reads as a summary of where a CTA lands,
not a page spec — it has no tier detail at all — so the expanded p267 version
is the one applied.

### Integration Hub

- **Three integrations were missing.** 9 designed, 12 specified: Workday,
  QuickBooks Online, Xero.
- **"Finance & Accounting" is no longer an empty category.** That was flagged
  in the code as "confirm before launch". QuickBooks and Xero are its members.
- **The inferred category mapping was correct.** All nine existing assignments
  match. The inference had been read off the grid ordering.
- New per-card "Example Use Case", new per-category descriptions, and the
  "Build Your Own Integration" block — which moved from a one-line link above
  the grid to a proper section below it. Someone only asks "where's my tool?"
  after they have looked.
- The `<h1>` is now the document's headline; "Integration Hub" survives as the
  metadata title and breadcrumb. A headline change should not cost a page the
  name its nav entry uses.
- **Four more guides published** — Google Drive, Slack, Salesforce, HubSpot.
  Only Microsoft 365 was designed.

Two shape changes fell out of the new guides, both forced by real content:
`GuideStep` gained `note`/`block` (Google Drive's Step 3 is a folder tree and
Slack's Step 4 is a JSON payload — rendering either as bullets destroys the
indentation that _is_ the content), and `codeIntro`/`code` became a `samples`
list (the Salesforce guide ships an Apex class and a separate platform-event
trigger, which go in different files in a Salesforce org).

### More content moved to `src/content/`

`hubspot.ts`, `slack.ts` and `integrations.data.ts` all crossed 150 lines. The
ceiling did its job as a detector, and the answer was the same as for the
legal pages: transcribed source content does not belong in the feature tree.

- `src/content/integrations/guides/` — the five guide bodies
- `src/content/integrations/catalog.ts` — twelve entries, five categories, the
  custom-integrations block
- `src/content/integrations/types.ts` — guide and entry types, re-exported by
  `features/integrations/types.ts` so consumers keep one import path

`features/integrations/integrations.data.ts` is now 66 lines and does one
thing: join the catalog to the guides. That is the split by responsibility the
rule is meant to produce — not `hubspot-part-2.ts`.

---

## 2026-08-26 — Knowledge Base rebuilt from the document

The content document's "OPERATIONAL PAGES → PAGE: Knowledge Base" is the real
content the placeholder was waiting for, and it changes the section's shape.

### From questions to articles

The design's grid showed 20 tiles that were 4 titles repeated five times, every
one reading "9 Questions" — Figma duplication to fill a grid. The code modelled
4 collections of question-and-answer pairs, one of which borrowed the home
page's `FAQ_ENTRIES`, with a note saying real content was coming.

The document supplies **8 topic collections holding 52 article titles**. Not
questions — articles. So the model changed with it: `KbCollection` now holds
`groups` of `articles` rather than `questions`. `groups` exists because "Common
Tasks" is the one collection the document sub-divides (Creating Documents /
Sending for Signature / Managing Workflows / Tracking & Managing); everything
else is a single untitled group.

Counts stay derived — 4 / 16 / 5 / 5 / 6 / 5 / 5 / 6 = 52 — for the same
reason as before: the design's cards all claimed "9 Questions" regardless of
content, and a card must never advertise a number the page lacks.

The four old slugs (`document-signing`, `self-hosting`, `workflow-automation`,
`integration`) no longer exist. They were never launched, so no redirects.

### Article titles are NOT rendered as links

Every article in the document is a bracketed placeholder — `[Upload a
Document]`, `[Change Password]` — and no article body appears anywhere in the
190 pages. The titles are real content; the articles are not written.

Three options, and why the third won:

1. **Link each to a real page.** 52 empty pages. Worse than nothing, and 52
   thin pages in the index.
2. **Link them anyway.** 52 links that 404. A dead link is worse than text.
3. **Render as a list, and say so.** The page shows the real structure and a
   line explaining the articles are being written, with a support address.

Collection pages are `noIndex` for the same reason: a page of headings would
put an empty result in front of someone searching for the answer. Both flip
together once bodies land — add them to the content file, switch the rows to
links, set `isIndexed: true`.

The FAQPage JSON-LD is gone from collection pages. Article titles with no
answers are not an FAQ, and structured data must never assert content the page
does not show.

### The home FAQ still has four unanswered questions

Checked deliberately, since the KB was the likeliest source. The document does
**not** answer any of "Can I deploy SignSig on-premise or self-hosted?", "Are
SignSig signatures legally binding?", "Does SignSig support workflow
automation?" or "Can developers integrate SignSig into their apps?".

The nearest match is the Security & Compliance FAQ's "Can I deploy SignSig on
my servers? — Yes. Enterprise plans include self-hosted deployment options."
That is a different question with a narrower answer (Enterprise only), so
using it would be paraphrase dressed as transcription. The four rows stay
static and excluded from the JSON-LD. Still outstanding from the user.

### Two other Knowledge Base specs in the document, not used

- **p220, "Page: Knowledge Base"** under CTA destinations — a short summary
  with five "popular guides" and four developer resources. No structure.
- **p578, "PAGE: Help Center"** — a four-line summary of the same idea under a
  different name.

Both read as specs for where a CTA lands, not for the page itself; the p2437
version is the only one with real structure, so it is the one built. If "Help
Center" is meant to be a separate page from "Knowledge Base", that is a
question for the user — right now the nav has only one of them.

---

## 2026-08-26 — `<Section className>` vs `containerClassName`: a quiet centring bug

Reported from screenshots: on the Integration Hub the "Build Your Own
Integration" paragraph sat left of the heading and button above and below it.

### Cause

`<Section>` puts `className` on the outer `<section>`, whose **only child** is
the `<Container>`; `children` live inside that container. So:

```tsx
<Section className="flex flex-col items-center text-center">
```

makes a flex column whose single item is the full-width container — a no-op —
while the content inside stays ordinary block flow.

It fails **quietly**, which is why it survived. `text-center` inherits down, so
every unconstrained child still centres correctly. Only a child with a `max-w-*`
exposes it: its box is flush left with its text centred inside, so the page
reads as "the paragraph is off-centre but the heading isn't".

`containerClassName` exists for exactly this and was already used correctly by
`home-hero.tsx` and `solution-hero.tsx` — which is why the home hero never
showed the problem.

### Fixed

| File                                                  | Note                          |
| ----------------------------------------------------- | ----------------------------- |
| `app/(marketing)/developers/integration-hub/page.tsx` | Added this session            |
| `app/(marketing)/resources/knowledge-base/page.tsx`   | Added this session            |
| `components/common/sections/pricing-section.tsx`      | **Latent since it was built** |

Pricing had the bug from the start; it was invisible because no child had a
max-width. Adding the document's `max-w-narrow` paragraphs is what surfaced it
— the fix was already needed, the new copy just made it visible.

A sweep confirmed no other `<Section>` passes inner-layout classes through
`className`.

### Prevented

The trap is now documented at the top of `section.tsx` with both forms side by
side and an explanation of why the wrong one looks fine until it doesn't. The
rule: `className` is for the section's own concerns (background, id, spacing
override, stacking); anything that lays out the content goes on
`containerClassName`.

### Also: `text-pretty` → `text-balance` on short centred paragraphs

The same two paragraphs wrapped with a stranded last line ("…It's simple and /
well-documented."). `text-pretty` only prevents single-word orphans;
`text-balance` evens line lengths and is meant for exactly this — short,
centred blocks under a heading. Applied to the custom-integrations description
and both pricing leads. Longer left-aligned prose keeps `text-pretty`, which is
the right tool there.

---

## 2026-08-26 — The subtle surface is `#fbfbfb`, and card image stages are fixed

Two reports off the running site: the hero band was the wrong grey, and the
home-page cards did not line up.

### 1. `--surface-2` was one step too dark

Reported as "this section has a different bg color #FBFBFB". Rather than patch
the hero, I sampled the modal background colour of **every horizontal band down
`Home.png`**. The result is unambiguous:

| Colour          | Where                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| `#ffffff`       | page background, feature-card bodies                                           |
| the subtle grey | hero panel, feature-card image stages, workflow cards, pricing cards, FAQ band |

The subtle grey is the same value everywhere, and Radix `gray.2` — what
`--surface-2` pointed at — **appears nowhere in the design**. So this was never
a hero-specific tweak; the whole subtle-surface role was off by one step.

Radix `gray` has no step between 1 and 2, so the ramp gained `--neutral-1-5`
(AGENTS.md §3: a colour in the design that is not in the token system means the
token system is incomplete). Its OKLCH lightness was derived with the sRGB→OKLab
transform and checked against the ramp's existing entries, which it reproduces
exactly; the built CSS confirms it compiles to the intended value. `--surface-2`
now points at it in light mode. Dark mode is untouched.

### 2. Card image stages: a constant that lied

`FEATURE_IMAGE_SIZE = {1112, 467}` and `STEP_IMAGE_SIZE = {633, 248}` were
documented as "every card image is 1112x467" / "every step image is 633x248".
Neither was true. The real files:

| Feature cards | ratio |     | Step cards | ratio |
| ------------- | ----- | --- | ---------- | ----- |
| 804×622       | 1.29  |     | 436×96     | 4.54  |
| 880×272       | 3.24  |     | 565×179    | 3.16  |
| 617×427       | 1.45  |     | 670×188    | 3.56  |
| … 1196×384    | 3.12  |     |            |       |

Those constants were handed to `next/image` as each file's intrinsic size. With
`className="w-full"` the browser derives height from the file's **actual**
ratio, not the declared one — so every card got a different image height and
the titles fell out of line across the grid. The constants were decorative.

**Fix:** the constants now describe the **stage** — the fixed box the artwork is
fitted into — and actually drive it, via `aspect-ratio` on a wrapper with
`<Image fill className="object-contain" />` inside.

`FEATURE_STAGE` was corrected to **1112×454**, measured off `Home.png`: 454
recurs exactly on all three grid rows. `STEP_STAGE` keeps 633×248; re-measuring
the design gives ~610×236 design px for that stage, a ratio of 2.59 against the
constant's 2.55 — inside measurement noise, so the original transcription
stands.

**`contain`, not `cover`.** These are UI mockups. Cropping document-signing
(1.29) into a 2.45 stage would cut away nearly half the interface. Contain shows
all of it and letterboxes instead.

The aspect ratio is set with an inline `style` rather than `aspect-[1112/454]`
so the number has one source of truth shared with the `sizes` budget. That is
not an arbitrary-value escape: `aspect-ratio` is not one of the tokenised
categories, and duplicating the ratio into a class string is exactly the drift
that caused this bug.

### 3. The illustrations are already transparent

Checked while choosing the fit: **all eleven PNGs have `alpha = 0` at every
corner.** The transparent Figma re-exports requested during the dark-mode work
have landed. So the letterboxing `object-contain` introduces is invisible — the
stage colour shows through the gap and through the artwork's own ground alike,
and both follow the theme into dark mode. No dark variants are needed, and
`public/images/README.md` has been corrected: it still described the old
flattened crops.

### Not changed — reported instead

Measured while investigating, outside what was asked:

- **The hero is an inset rounded panel in the design, not a full-bleed band.**
  It spans x 130–2429 of 2560 (≈73px side margins at 1440), is ~498px tall, and
  has a corner radius of roughly 34px. We render it edge to edge.
- **The hero panel carries a faint grid.** 1px lines at the subtle-grey-on-white
  boundary, every 320 design px (180 css). We render none.
- **Workflow card bodies are the subtle grey in the design, not white.** Their
  stage and body are one colour there; ours are both `bg-card`, so they are
  still internally consistent and the letterboxing stays invisible — but the
  card reads white where the design reads grey.

---

## 2026-08-26 (later) — The hero is an inset panel, and card images get padding

Two follow-ups to the entry above, both from the user pointing at the running
site.

### The tint belongs to the panel, not the section

The earlier entry listed "the hero is an inset rounded panel in the design, not
a full-bleed band" under _reported, not changed_. The user then clarified that
**the highlighted box** — the container-width region, not the full-width band —
is the one that should carry the colour. That is the same finding, so it is now
implemented.

Measured off `Home.png`, all at the 1440 frame:

|               |                                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| Panel box     | x 73.1 → 1366.9 (**1293.7 wide**), y 151.9 → 650.2 (**498.4 tall**)              |
| Corner radius | **32.6px** — panel colour reaches the left edge 58px below the top at 2560 scale |
| White margin  | **51.7px** above, **56.2px** below                                               |

Three consequences for the markup:

1. **No background on the `<section>`.** It moved to a `rounded-panel
bg-surface-2` box inside.
2. **`container={false}`.** A `<Container>`'s gutters are _padding_, so with the
   background on the container the panel would sit flush against the viewport
   edge below 1200px. The section now supplies the gutters as margin and the
   panel is a `max-w-content` box inside them.
3. **`spacing="none"` plus `py-8 md:py-14`.** The old `spacing="lg"` was 160px
   at 1440 — correct for a full-bleed band, four times too much as a margin
   around a panel. 56px matches the measured 52/56.

`--radius-panel: 2rem` is a new token rather than `rounded-[32px]`: radius is
tokenised (AGENTS.md §3), and nothing the shadcn `--radius` scale derives comes
close to 32px.

**Width deliberately not matched.** The design's panel is 1293.7px; this renders
it at `max-w-content` (1200) so the hero occupies the same footprint as every
other section's container. The design's whole content column measures ~1294 —
the feature grid sits on the same 130..2430 frame — so closing that 94px gap is
a site-wide container decision, not a hero one. Left open.

### Padding inside the card image stages

Requested. Measuring first: in the design the mockups **bleed to the stage
edges** — sampling the artwork bounds inside each stage returns zero clearance.
But the PNGs were re-exported cropped tight to their visible artwork, so with
`object-contain` they now butt against the edge rather than fading into it.

The stage padding matches each card's own body padding — `p-6` on feature
cards, `p-5` on step cards — so the illustration's optical edge lines up with
the title beneath it.

**The padding goes on the stage, not the image.** `fill` resolves against the
containing block's _padding box_, so padding on the same element is ignored
entirely. Hence the inner `relative h-full w-full` wrapper: the outer box keeps
the fixed `aspect-ratio` (which applies to the border box, so the cards stay
aligned) and the inner box is what the image actually fills.
