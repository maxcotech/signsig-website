import { SOLUTIONS, type SolutionRef } from "@/config/solutions";

import { INDUSTRY_SOLUTIONS } from "./industries.data";
import { ROLE_SOLUTIONS } from "./roles.data";
import { USE_CASE_SOLUTIONS } from "./use-cases.data";

import type { SolutionCopy } from "./types";

/**
 * Every Solutions page's copy, and the lookup the `[slug]` route uses.
 *
 * Split into three files by nav group so each stays well under the 150-line
 * ceiling; this module only joins them and pairs each with its `SolutionRef`
 * (slug, label, group) from `src/config/solutions.ts`.
 */

const ALL_COPY: readonly SolutionCopy[] = [
  ...USE_CASE_SOLUTIONS,
  ...INDUSTRY_SOLUTIONS,
  ...ROLE_SOLUTIONS,
];

/** A page's registry entry and its copy, resolved together. */
export type Solution = SolutionRef & { copy: SolutionCopy };

/**
 * Built from `SOLUTIONS` rather than from the copy files, so the registry
 * stays authoritative about which pages exist. A slug in `SOLUTIONS` with no
 * matching copy is dropped here AND fails the assertion below, rather than
 * shipping a blank page.
 */
export const SOLUTION_PAGES: readonly Solution[] = SOLUTIONS.flatMap((ref) => {
  const copy = ALL_COPY.find((entry) => entry.slug === ref.slug);
  return copy ? [{ ...ref, copy }] : [];
});

// Fails the build (not a runtime 404) if the registry and the copy drift apart.
if (SOLUTION_PAGES.length !== SOLUTIONS.length) {
  const missing = SOLUTIONS.filter(
    (ref) => !ALL_COPY.some((entry) => entry.slug === ref.slug),
  ).map((ref) => ref.slug);
  throw new Error(
    `Solutions registry/copy mismatch — no copy found for: ${missing.join(", ")}`,
  );
}

export function findSolution(slug: string): Solution | undefined {
  return SOLUTION_PAGES.find((solution) => solution.slug === slug);
}
