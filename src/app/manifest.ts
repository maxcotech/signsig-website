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
 * The icons below now EXIST (2026-08-26), generated from
 * `public/images/signsig-favicon.webp`. They were declared but missing until
 * then — a manifest pointing at a 404 is worse than one with no icons.
 *
 * 192 is `maskable`, so it is opaque and keeps the mark inside the inner 80%
 * safe zone; Android crops maskable icons to whatever shape the launcher uses.
 * 512 is `any`, so it stays transparent.
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
