import Link from "next/link";

import { Logo } from "@/components/common/logo";
import { Container } from "@/components/layout/container";
import { FOOTER_ACTIONS, FOOTER_NAV } from "@/config/navigation";
import { SITE } from "@/config/site";

/**
 * Site footer.
 *
 * The design's footer is dark regardless of the page theme (a deliberate
 * contrast band, not a dark-mode state) — the `dark` class here FORCES the
 * dark semantic tokens for this subtree via the `@custom-variant dark
 * (&:is(.dark *))` rule in globals.css, rather than adding new "always dark"
 * tokens. It looks identical whether the rest of the page is light or dark.
 *
 * RESPONSIVE (per the derivation doctrine in docs/RESPONSIVE.md):
 * - base: logo + copyright stacked above the action row, then the five nav
 *   groups stacked full width.
 * - md and up: logo/copyright beside the action row; nav groups in a 5-column
 *   grid (2-column below `lg`, since five items don't divide evenly).
 *
 * The year is computed at build time, which is correct for a static marketing
 * site and avoids a hydration mismatch. It refreshes on each deploy.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark relative mt-auto overflow-hidden bg-background pb-safe">
      <Container className="relative z-10 py-section-y-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-caption text-muted-foreground">
              &copy; {year} {SITE.legalName}. All rights reserved.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-2">
            {FOOTER_ACTIONS.map((action) => (
              <li key={action.href}>
                <a
                  href={action.href}
                  {...(action.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center rounded-pill border border-border px-4 text-body-sm text-foreground transition-colors duration-fast hover:bg-surface-2"
                >
                  {action.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-stack-gap grid grid-cols-2 gap-stack-gap sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2
                id={`footer-${group.title}`}
                className="text-body-sm font-semibold text-foreground"
              >
                {group.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-6 items-center text-body-sm text-muted-foreground transition-colors duration-fast hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/4 text-center text-watermark tracking-tighter text-foreground/4 select-none"
      >
        {SITE.name.toUpperCase()}
      </p>
    </footer>
  );
}
