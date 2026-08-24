import type { MetadataRoute } from "next";

import { getIndexedRoutes } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated from the route registry in `src/config/routes.ts` — never
 * hand-maintained. A hand-written list is guaranteed to fall out of date the
 * first time someone adds a page and forgets to edit two files.
 *
 * Add a page => add its entry to ROUTES => it appears here automatically.
 *
 * `lastModified` uses build time. That is honest for a statically generated
 * marketing site: the content genuinely did last change when it was deployed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getIndexedRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
