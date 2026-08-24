/**
 * ESCAPE HATCH — the ONE file outside `src/app/globals.css` where a raw colour
 * literal is permitted. It is allowlisted in `scripts/check-colors.mjs`.
 *
 * Both cases below share the same root cause: the consumer is not a CSS engine,
 * so it cannot resolve a custom property. `var(--primary)` is meaningless to a
 * browser chrome painter or to Satori. A literal is genuinely unavoidable.
 *
 * These values MUST be kept in sync BY HAND with the tokens they mirror. Each
 * one names its source token, so a future session can check.
 *
 * DO NOT add colours here to dodge the check. If a colour is consumed by CSS —
 * which is almost every colour — it belongs in the primitives layer of
 * `globals.css` and reaches components as a semantic token.
 * See AGENTS.md § The escape hatch.
 */

/**
 * Browser and OS chrome colour: the Android address bar, the iOS status bar,
 * the macOS titlebar. Painted by the browser, outside our stylesheet.
 *
 * Mirrors the semantic `--background` token:
 *   light -> --white          -> #ffffff
 *   dark  -> --neutral-dark-1 -> #111111
 *
 * If the page background changes, change these or the chrome will show a
 * visible seam against the top of the page.
 */
export const THEME_COLOR = [
  /* ESCAPE: browser UI chrome cannot read CSS custom properties. */
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  /* ESCAPE: browser UI chrome cannot read CSS custom properties. */
  { media: "(prefers-color-scheme: dark)", color: "#111111" },
] as const;

/**
 * Palette for `next/og` images.
 *
 * ESCAPE: Open Graph images are rasterised by Satori, which supports a subset of
 * CSS and does NOT resolve custom properties. OG images are also rendered once
 * and cached, and are viewed inside other products (Slack, X, LinkedIn) that
 * have no notion of our theme — so a single fixed light palette is correct here
 * rather than a theme-aware one.
 *
 * Each value names the token it mirrors.
 */
export const OG_COLORS = {
  /* ESCAPE: Satori cannot read CSS custom properties. --white */
  background: "#ffffff",
  /* ESCAPE: Satori cannot read CSS custom properties. --neutral-12 */
  foreground: "#202020",
  /* ESCAPE: Satori cannot read CSS custom properties. --neutral-11 */
  muted: "#646464",
  /* ESCAPE: Satori cannot read CSS custom properties. --brand-9 (#30A46C) */
  brand: "#30a46c",
  /* ESCAPE: Satori cannot read CSS custom properties. --brand-3 */
  brandSubtle: "#e6f6eb",
  /* ESCAPE: Satori cannot read CSS custom properties. --neutral-6 */
  border: "#d9d9d9",
} as const;
