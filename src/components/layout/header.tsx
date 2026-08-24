import Link from "next/link";

import { ActionButton } from "@/components/common/action-button";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HEADER_CTA, MAIN_NAV } from "@/config/navigation";

/**
 * Site header.
 *
 * A Server Component. The only client code it pulls in is `<ThemeToggle>` and
 * `<MobileNav>`, each a self-contained leaf. Keep it that way — do not add
 * `"use client"` to this file to make some small interaction work; push the
 * interactivity into a leaf component instead.
 *
 * RESPONSIVE (mobile-first, per docs/RESPONSIVE.md):
 * - base: logo + theme toggle + hamburger. The nav list and CTA are hidden.
 * - md and up: horizontal nav appears, hamburger disappears, CTA appears.
 *
 * `z-header` comes from the named z-index scale. Do not write `z-50` here — the
 * whole point of the scale is that the stacking order lives in one place.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-header border-b border-border bg-background/80 pt-safe backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-11 items-center rounded-lg px-3 text-body-sm font-medium text-muted-foreground transition-colors duration-fast ease-standard hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ActionButton asChild className="hidden md:inline-flex">
              <Link href={HEADER_CTA.href}>{HEADER_CTA.label}</Link>
            </ActionButton>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
