/**
 * The Solutions route registry — slug, label and group for all 14 pages.
 *
 * This is a cross-cutting FACT, not page copy: `config/navigation.ts` builds
 * the Solutions mega-menu from it, `config/routes.ts` builds its sitemap
 * entries from it, and the `[slug]` route generates its static params from it.
 * Keeping one list means those three can never disagree about which pages
 * exist.
 *
 * The visible COPY for each page (heading, description, benefits) lives in
 * `src/features/solutions/*.data.ts`, keyed by the same slug.
 *
 * `label` is also the page's eyebrow-pill text — they are identical in every
 * design, so it is stored once rather than twice.
 */

export type SolutionGroup = "use-cases" | "industries" | "roles";

export type SolutionRef = {
  slug: string;
  /** Nav label AND hero eyebrow text. Indexed content — match the design. */
  label: string;
  group: SolutionGroup;
};

/** Column headings for the Solutions mega-menu, in render order. */
export const SOLUTION_GROUP_TITLES: Record<SolutionGroup, string> = {
  "use-cases": "By Use Cases",
  industries: "By Industry",
  roles: "By Roles",
};

export const SOLUTIONS: readonly SolutionRef[] = [
  // By Use Cases
  {
    slug: "contract-management",
    label: "Contract Management",
    group: "use-cases",
  },
  { slug: "hr-onboarding", label: "HR & Onboarding", group: "use-cases" },
  { slug: "sales-agreements", label: "Sales Agreements", group: "use-cases" },
  { slug: "legal-documents", label: "Legal Documents", group: "use-cases" },
  { slug: "government-forms", label: "Government Forms", group: "use-cases" },
  // By Industry
  {
    slug: "financial-services",
    label: "Financial Services",
    group: "industries",
  },
  { slug: "healthcare", label: "Healthcare", group: "industries" },
  { slug: "real-estate", label: "Real Estate", group: "industries" },
  {
    slug: "government-public-sector",
    label: "Government & Public Sector",
    group: "industries",
  },
  { slug: "technology-saas", label: "Technology & SaaS", group: "industries" },
  // By Roles
  { slug: "legal-teams", label: "For Legal Teams", group: "roles" },
  { slug: "hr-departments", label: "For HR Departments", group: "roles" },
  { slug: "sales-teams", label: "For Sales Teams", group: "roles" },
  {
    slug: "finance-procurement",
    label: "For Finance & Procurement",
    group: "roles",
  },
] as const;

/** Root-relative path for a solution page. */
export function solutionHref(slug: string): string {
  return `/solutions/${slug}`;
}

/** The solutions in one group, in declaration order. */
export function solutionsInGroup(group: SolutionGroup): readonly SolutionRef[] {
  return SOLUTIONS.filter((solution) => solution.group === group);
}
