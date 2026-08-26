/**
 * Shape of one Solutions page's copy.
 *
 * The slug, nav label and eyebrow text come from `SOLUTIONS` in
 * `src/config/solutions.ts` — this file only carries what is unique to the
 * page body. All strings are transcribed verbatim from the design; see
 * docs/DECISIONS.md for the ones flagged as uncertain.
 */

/**
 * Key into `SOLUTION_ICONS` in `solution-icons.tsx`.
 *
 * ⚠ Every one of these is an ASSUMPTION. The eyebrow glyphs were read from
 * low-resolution screenshots and mapped to the nearest lucide icon; they have
 * not been confirmed against the source files. Verify before launch.
 */
export type SolutionIconName =
  | "contract"
  | "people"
  | "handshake"
  | "scale"
  | "forms"
  | "wallet"
  | "health"
  | "property"
  | "landmark"
  | "code"
  | "briefcase"
  | "chart";

export type SolutionCopy = {
  /** Matches a `slug` in `SOLUTIONS` (config/solutions.ts). */
  slug: string;
  icon: SolutionIconName;
  /** The h1, split exactly where the design breaks it across two lines. */
  headingLines: readonly [string, string];
  description: string;
  ctaLabel: string;
  /** Destination for the single hero CTA. */
  ctaHref: string;
  /** The 2x2 grid. Always four, one short line each. */
  benefits: readonly [string, string, string, string];
};
