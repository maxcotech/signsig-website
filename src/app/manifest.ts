import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { OG_COLORS } from "@/lib/raw-colors";

/**
 * Web app manifest.
 *
 * `theme_color` and `background_color` must be literal colours — the manifest
 * is parsed by the OS/browser, not by a CSS engine — so they come from the
 * allowlisted escape file rather than being written inline here.
 *
 * The icon paths below are DECLARED but the files do not exist yet. Generate
 * them from the real logo (192px and 512px PNGs into `public/icons/`) before
 * launch, or drop the entries. A manifest pointing at a 404 is worse than a
 * manifest with no icons.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: OG_COLORS.background,
    theme_color: OG_COLORS.brand,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
