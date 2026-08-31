import type { MetadataRoute } from "next";

import { getIndexedRoutes } from "@/config/routes";
import {
  flattenRoles,
  getJobRolesOverview,
  roleSlug,
} from "@/features/careers/careers.api";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated from the route registry in `src/config/routes.ts` — never
 * hand-maintained. A hand-written list is guaranteed to fall out of date the
 * first time someone adds a page and forgets to edit two files.
 *
 * Add a page => add its entry to ROUTES => it appears here automatically.
 *
 * Individual career role pages are the one exception: they come from a live
 * API, not `ROUTES`, so they are fetched here directly. This function is
 * async specifically to allow that — Next.js supports an async `sitemap()`.
 * The fetch is try/caught: if the backend is unreachable when the sitemap is
 * generated, the site's static routes still produce a valid sitemap with the
 * role pages simply absent, rather than the whole sitemap request failing.
 *
 * `lastModified` uses build/request time. That is honest for a statically
 * generated marketing site: the content genuinely did last change then.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries = getIndexedRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const overview = await getJobRolesOverview().catch(() => null);
  const roleEntries = overview
    ? flattenRoles(overview).map((role) => ({
        url: absoluteUrl(`/resources/careers/${roleSlug(role.title)}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }))
    : [];

  return [...staticEntries, ...roleEntries];
}
