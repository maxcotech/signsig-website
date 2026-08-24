import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";
import { OG_COLORS } from "@/lib/raw-colors";

/**
 * Default Open Graph image, generated at request time by `next/og`.
 *
 * Satori (the renderer behind ImageResponse) supports a subset of CSS and does
 * NOT resolve CSS custom properties, so colours come from the allowlisted escape
 * file `src/lib/raw-colors.ts` and layout is written as inline styles rather
 * than Tailwind classes. This is the documented exception, not a precedent for
 * styling anything else this way.
 *
 * No custom font is loaded: doing so needs the font binary at render time, and
 * the default face is legible at 1200x630. If brand typography in the OG image
 * matters later, fetch the .ttf in this file and pass it via `fonts`.
 *
 * A page can override this by adding its own `opengraph-image.tsx` in its route
 * segment, or by passing `image` to `buildMetadata()`.
 */

export const alt = SITE.ogImage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: OG_COLORS.background,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: OG_COLORS.brand,
          }}
        />
        <span
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: OG_COLORS.foreground,
            letterSpacing: -0.5,
          }}
        >
          {SITE.name}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: OG_COLORS.foreground,
          }}
        >
          {SITE.tagline}
        </span>
        <span
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: OG_COLORS.muted,
          }}
        >
          {SITE.description}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          height: 10,
          width: 200,
          borderRadius: 999,
          background: OG_COLORS.brand,
        }}
      />
    </div>,
    size,
  );
}
