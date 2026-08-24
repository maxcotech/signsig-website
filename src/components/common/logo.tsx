import Link from "next/link";

import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The SignSig logo: a brand mark plus the wordmark.
 *
 * PLACEHOLDER GEOMETRY. The mark below is a token-coloured stand-in so the
 * header and footer render and can be tested. When the real logo arrives,
 * replace the SVG paths in `<LogoMark>` only — every consumer keeps working.
 *
 * The mark inherits `currentColor`, so it themes itself: `text-primary` gives
 * the brand green, and it flips correctly in dark mode because `--primary`
 * flips. Do not hardcode a fill.
 */

export type LogoMarkProps = {
  className?: string;
};

/** The mark on its own, for favicons, OG images and tight spaces. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M8 20.5c3.2 0 5.2-2.4 6.6-5.6 1-2.3 1.7-4.4 2.7-4.4.8 0 1.1.7 1.1 1.9 0 2.6-1.6 5.3-1.6 7.2 0 .9.4 1.4 1.2 1.4 1.3 0 2.6-1.3 3.6-2.9"
        stroke="var(--primary-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type LogoProps = {
  className?: string;
  /** Hide the wordmark, leaving only the mark. Useful in a collapsed header. */
  isMarkOnly?: boolean;
  /**
   * Render as a link to the home page. Default true. Set false when the logo
   * already sits inside a link, or on the home page hero where it is decorative.
   */
  isLink?: boolean;
};

export function Logo({
  className,
  isMarkOnly = false,
  isLink = true,
}: LogoProps) {
  const content = (
    <>
      <LogoMark className="text-primary" />
      {!isMarkOnly && (
        <span className="text-h5 font-semibold tracking-tight">
          {SITE.name}
        </span>
      )}
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2 rounded-md text-foreground",
    className,
  );

  if (!isLink) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link
      href="/"
      className={cn(
        classes,
        "transition-colors duration-fast hover:opacity-90",
      )}
      aria-label={`${SITE.name} — home`}
    >
      {content}
    </Link>
  );
}
