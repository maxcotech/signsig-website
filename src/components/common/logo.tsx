import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The SignSig logo — mark plus wordmark, as one lockup.
 *
 * Extracted from the design PNG and un-composited to a transparent alpha
 * channel, so it sits correctly on any surface (verified against white, tinted
 * and near-black backgrounds).
 *
 * The logo always renders in its default brand green, including on the dark
 * footer band and in dark mode — a brand mark should not change colour with
 * the theme. Do not reintroduce a light/dark variant swap here.
 *
 * ⚠ This is a RASTER asset lifted from a screenshot. It is accurate but will
 * not stay crisp at very large sizes and cannot be recoloured. Swap the file
 * for a real SVG when the brand assets arrive — every consumer of `<Logo>`
 * keeps working. See docs/DECISIONS.md.
 */

/** Intrinsic size of the logo file. */
const LOGO_SIZE = { width: 173, height: 56 } as const;

/** Rendered height; width follows from the intrinsic aspect ratio. */
const RENDERED_HEIGHT = 32;
const RENDERED_WIDTH = Math.round(
  (LOGO_SIZE.width / LOGO_SIZE.height) * RENDERED_HEIGHT,
);

export type LogoProps = {
  className?: string;
  /**
   * Render as a link to the home page. Default true. Set false when the logo
   * already sits inside a link, or where it is decorative.
   */
  isLink?: boolean;
};

export function Logo({ className, isLink = true }: LogoProps) {
  const image = (
    <Image
      src="/images/signsig-logo.png"
      alt={SITE.name}
      width={RENDERED_WIDTH}
      height={RENDERED_HEIGHT}
      priority
      className="h-8 w-auto"
    />
  );

  const classes = cn("inline-flex items-center", className);

  if (!isLink) {
    return <span className={classes}>{image}</span>;
  }

  return (
    <Link
      href="/"
      className={cn(
        classes,
        "transition-opacity duration-fast hover:opacity-90",
      )}
    >
      {image}
    </Link>
  );
}
