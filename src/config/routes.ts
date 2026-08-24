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
] as const;

/** Every indexable route, for the sitemap. */
export function getIndexedRoutes(): readonly RouteEntry[] {
  return ROUTES.filter((route) => route.isIndexed);
}

/** Look up a route entry by path. Returns undefined for unregistered paths. */
export function findRoute(path: string): RouteEntry | undefined {
  return ROUTES.find((route) => route.path === path);
}
