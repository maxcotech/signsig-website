/**
 * SCAFFOLDING — safe to delete once real pages exist.
 *
 * This also demonstrates the colocated `*.data.ts` pattern: static content
 * arrays live next to the feature that renders them, never inline in a
 * component (which is how components drift past the 150-line ceiling) and never
 * in `src/config/` (which is for cross-cutting facts, not content).
 *
 * The Tailwind class strings below are written out in full and literally, on
 * purpose. Tailwind scans source text, so a computed class name like
 * `bg-${name}` would produce no CSS at all.
 */

export type Swatch = {
  /** Semantic token name, as it appears in globals.css. */
  token: string;
  /** Class pair: background plus a readable foreground on that background. */
  className: string;
};

/**
 * Every semantic colour token that has a paired foreground. Each of these must
 * visibly change when the theme toggles — that is the dark-mode smoke test.
 */
export const PAIRED_SWATCHES: readonly Swatch[] = [
  {
    token: "background / foreground",
    className: "bg-background text-foreground",
  },
  {
    token: "card / card-foreground",
    className: "bg-card text-card-foreground",
  },
  {
    token: "popover / popover-foreground",
    className: "bg-popover text-popover-foreground",
  },
  {
    token: "primary / primary-foreground",
    className: "bg-primary text-primary-foreground",
  },
  {
    token: "secondary / secondary-foreground",
    className: "bg-secondary text-secondary-foreground",
  },
  {
    token: "muted / muted-foreground",
    className: "bg-muted text-muted-foreground",
  },
  {
    token: "accent / accent-foreground",
    className: "bg-accent text-accent-foreground",
  },
  {
    token: "destructive / destructive-foreground",
    className: "bg-destructive text-destructive-foreground",
  },
  {
    token: "success / success-foreground",
    className: "bg-success text-success-foreground",
  },
  {
    token: "warning / warning-foreground",
    className: "bg-warning text-warning-foreground",
  },
  {
    token: "info / info-foreground",
    className: "bg-info text-info-foreground",
  },
] as const;

/** Surface elevation steps, which should read as three distinct greys. */
export const SURFACE_SWATCHES: readonly Swatch[] = [
  { token: "surface-1", className: "bg-surface-1 text-foreground" },
  { token: "surface-2", className: "bg-surface-2 text-foreground" },
  { token: "surface-3", className: "bg-surface-3 text-foreground" },
] as const;

/** The fluid type scale, smallest to largest. */
export const TYPE_STEPS: readonly { token: string; className: string }[] = [
  { token: "caption", className: "text-caption" },
  { token: "body-sm", className: "text-body-sm" },
  { token: "body", className: "text-body" },
  { token: "body-lg", className: "text-body-lg" },
  { token: "h5", className: "text-h5" },
  { token: "h4", className: "text-h4" },
  { token: "h3", className: "text-h3" },
  { token: "h2", className: "text-h2" },
  { token: "h1", className: "text-h1" },
  { token: "display-2", className: "text-display-2" },
  { token: "display-1", className: "text-display-1" },
] as const;
