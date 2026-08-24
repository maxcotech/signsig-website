import type { MetadataRoute } from "next";

import { ROUTES } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * Native App Router `robots.txt`. No `next-sitemap` dependency needed — the
 * framework already does this, and a dependency that generates a file Next.js
 * can generate itself is one more thing to keep in sync.
 *
 * Non-indexed routes from the registry are disallowed explicitly, so marking a
 * route `isIndexed: false` keeps it out of both the sitemap and the crawl.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ROUTES.filter((route) => !route.isIndexed).map(
    (route) => route.path,
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js internals are never useful to a crawler.
        disallow: ["/_next/", "/api/", ...disallow],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
