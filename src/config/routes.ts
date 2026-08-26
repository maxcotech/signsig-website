/**
 * The route registry.
 *
 * `src/app/sitemap.ts` and `src/app/robots.ts` are GENERATED from this list, so
 * it is the one place a new page has to be declared. A route that is not here
 * will never reach the sitemap, no matter how correct the page itself is.
 *
 * Adding a page? Add its entry here in the same change. This is a step in the
 * per-page checklist in docs/SEO.md.
 */

import { SOLUTIONS, solutionHref } from "@/config/solutions";
import { ROLES } from "@/features/careers/careers.data";
import { INTEGRATIONS } from "@/features/integrations/integrations.data";
import { KB_COLLECTIONS } from "@/features/knowledge-base/collections.data";
import { POLICIES, isPublished } from "@/features/policies/policies.data";
import { TRUST_PAGES } from "@/features/trust/trust.data";

/** Matches the `changeFrequency` union Next.js accepts in a sitemap entry. */
export type ChangeFrequency =
  "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type RouteEntry = {
  /** Root-relative path, leading slash, no trailing slash (except "/"). */
  path: string;
  /** Short human label. Not user-facing copy — this is for maintainers. */
  label: string;
  /** Sitemap hint. Marketing pages change rarely; use "monthly" by default. */
  changeFrequency: ChangeFrequency;
  /** 0..1. Home is 1; primary conversion pages 0.8; supporting pages 0.5. */
  priority: number;
  /**
   * `false` keeps the route out of the sitemap AND makes `buildMetadata()`
   * emit `robots: { index: false }` when it is passed `noIndex`. Use for
   * thank-you pages, previews and legal boilerplate you would rather not rank.
   */
  isIndexed: boolean;
};

export const ROUTES: readonly RouteEntry[] = [
  {
    path: "/",
    label: "Home",
    changeFrequency: "monthly",
    priority: 1,
    isIndexed: true,
  },
  {
    path: "/pricing",
    label: "Pricing",
    changeFrequency: "monthly",
    priority: 0.8,
    isIndexed: true,
  },
  {
    path: "/developers/integration-hub",
    label: "Integration Hub",
    changeFrequency: "monthly",
    priority: 0.5,
    isIndexed: true,
  },
  // Only integrations with a published guide reach the sitemap; the rest are
  // near-empty pages and are noIndex until their `guide` is filled in.
  ...INTEGRATIONS.filter((integration) => integration.guide).map(
    (integration): RouteEntry => ({
      path: `/developers/integration-hub/${integration.slug}`,
      label: `${integration.name} Integration`,
      changeFrequency: "monthly",
      priority: 0.5,
      isIndexed: true,
    }),
  ),
  {
    path: "/developers/sdks-libraries",
    label: "SDKs & Libraries",
    changeFrequency: "monthly",
    priority: 0.5,
    isIndexed: true,
  },
  {
    // isIndexed:false ON PURPOSE while the status feed is placeholder data —
    // a fabricated "All System Operational" must not reach search results.
    // Flip to true once `getSystemStatus()` returns a live feed.
    path: "/resources/system-status",
    label: "System Status",
    changeFrequency: "daily",
    priority: 0.3,
    isIndexed: false,
  },
  // The three legal pages. `isIndexed` is derived: an unwritten policy is a
  // thin page, and indexing "Cookie Policy" with no cookie policy on it is
  // worse than not being found. Fill in `sections` and it flips itself. All
  // three are published as of 2026-08-26.
  ...POLICIES.map((policy): RouteEntry => ({
    path: policy.path,
    label: policy.title,
    changeFrequency: "yearly",
    priority: 0.3,
    isIndexed: isPublished(policy),
  })),
  // The five trust pages — four under /compliance plus Security & Compliance.
  // Higher priority than the legal boilerplate: these are the pages a
  // security reviewer searches for by name during a vendor assessment.
  ...TRUST_PAGES.map((page): RouteEntry => ({
    path: page.path,
    label: page.title,
    changeFrequency: "yearly",
    priority: 0.5,
    isIndexed: true,
  })),
  {
    path: "/resources/careers",
    label: "Careers",
    changeFrequency: "weekly",
    priority: 0.5,
    isIndexed: true,
  },
  // Only roles with a published description reach the sitemap; the rest are
  // thin postings and stay noIndex until their `detail` is filled in.
  ...ROLES.filter((role) => role.detail).map((role): RouteEntry => ({
    path: `/resources/careers/${role.slug}`,
    label: role.title,
    changeFrequency: "weekly",
    priority: 0.5,
    isIndexed: true,
  })),
  {
    path: "/resources/knowledge-base",
    label: "Knowledge Base",
    changeFrequency: "weekly",
    priority: 0.5,
    isIndexed: true,
  },
  // Knowledge-base collections, derived from their data so the sitemap cannot
  // list a collection that does not exist.
  //
  // isIndexed:false ON PURPOSE. The content document supplies 52 article
  // TITLES and no article bodies, so each collection page is currently an
  // index of headings. Indexing it would put an empty result in front of
  // someone searching for the answer. Flip when the bodies land — see
  // src/content/knowledge-base/collections.ts.
  ...KB_COLLECTIONS.map((collection): RouteEntry => ({
    path: `/resources/knowledge-base/${collection.slug}`,
    label: collection.title,
    changeFrequency: "weekly",
    priority: 0.5,
    isIndexed: false,
  })),
  // The 14 Solutions pages, derived from the registry so this list can never
  // disagree with the nav or with which pages actually build.
  ...SOLUTIONS.map((solution): RouteEntry => ({
    path: solutionHref(solution.slug),
    label: solution.label,
    changeFrequency: "monthly",
    priority: 0.8,
    isIndexed: true,
  })),
] as const;

/** Every indexable route, for the sitemap. */
export function getIndexedRoutes(): readonly RouteEntry[] {
  return ROUTES.filter((route) => route.isIndexed);
}

/** Look up a route entry by path. Returns undefined for unregistered paths. */
export function findRoute(path: string): RouteEntry | undefined {
  return ROUTES.find((route) => route.path === path);
}
