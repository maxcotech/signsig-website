import Link from "next/link";

import { Logo } from "@/components/common/logo";
import { Container } from "@/components/layout/container";
import { FOOTER_NAV, LEGAL_NAV } from "@/config/navigation";
import { SITE } from "@/config/site";

/**
 * Site footer.
 *
 * RESPONSIVE (per the derivation doctrine in docs/RESPONSIVE.md):
 * - base: stacked. Brand block first, then each nav group.
 * - md and up: brand block beside a 2-column nav grid.
 *
 * If `FOOTER_NAV` grows past four groups, the doctrine says switch mobile to an
 * accordion rather than letting the stack get taller. Log that change in
 * docs/DECISIONS.md when you make it.
 *
 * The year is computed at build time, which is correct for a static marketing
 * site and avoids a hydration mismatch. It refreshes on each deploy.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-2 pb-safe">
      <Container className="py-section-y-sm">
        <div className="flex flex-col gap-stack-gap md:flex-row md:justify-between">
          <div className="flex max-w-narrow flex-col gap-4 md:max-w-xs">
            <Logo />
            <p className="text-body-sm text-muted-foreground">
              {SITE.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-stack-gap sm:grid-cols-2">
            {FOOTER_NAV.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2
                  id={`footer-${group.title}`}
                  className="text-overline text-muted-foreground uppercase"
                >
                  {group.title}
                </h2>
                <ul className="mt-3 flex flex-col gap-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-body-sm text-foreground transition-colors duration-fast hover:text-primary-text"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-stack-gap flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            &copy; {year} {SITE.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {SITE.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground"
                >
                  {social.handle}
                  <span className="sr-only"> — {social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
