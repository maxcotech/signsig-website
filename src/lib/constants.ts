/**
 * Cross-cutting constants.
 *
 * Site *facts* (name, URL, socials) live in `src/config/site.ts`. This file is
 * for behavioural limits and shared magic numbers — the values that would
 * otherwise get retyped slightly differently in three components.
 */

/**
 * Tailwind breakpoints, mirrored in TypeScript.
 *
 * These MUST stay in sync with the `--breakpoint-*` values Tailwind v4 uses
 * (they are Tailwind defaults; we have not overridden them). `useMediaQuery`
 * needs them at runtime, where CSS variables are not reachable.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

/**
 * The canonical desktop design frame width, in CSS pixels.
 *
 * Every Figma export is a frame of THIS width. A page session divides the PNG
 * pixel width by this number to get the export scale (1x/2x/3x) before taking
 * any measurement. Get it wrong and every spacing and type value in the section
 * is off by a constant multiple. See docs/RESPONSIVE.md and
 * docs/DESIGN-TRANSLATION.md step 2.
 */
export const DESIGN_FRAME_WIDTH = 1440;

/**
 * The content column inside that frame: 1440 - (2 x 120px gutter) = 1200.
 * Mirrors the `--container-content` token, which is the value actually applied.
 * Duplicated here only so scale arithmetic can be done in TS.
 */
export const CONTENT_COLUMN_WIDTH = 1200;

/**
 * Widths every section must be checked at before a session declares done.
 * See the test matrix in docs/RESPONSIVE.md.
 */
export const TEST_WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920] as const;

/**
 * Minimum effective interactive target, in CSS pixels (WCAG 2.5.5 / 2.5.8).
 * shadcn default button sizes are smaller than this because they are tuned for
 * dense app UI; `<ActionButton>` exists to meet this on marketing pages.
 */
export const MIN_TOUCH_TARGET = 44;

/** Below this width, the primary navigation collapses into the mobile Sheet. */
export const MOBILE_NAV_BREAKPOINT: BreakpointName = "md";
