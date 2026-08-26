import Link from "next/link";

import { ActionButton } from "@/components/common/action-button";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { NavMenuPanel } from "@/components/layout/nav-menu-panel";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  MAIN_NAV,
  SIGN_IN_NAV,
  SIGN_UP_NAV,
  isNavMenuItem,
} from "@/config/navigation";

/**
 * Site header.
 *
 * A Server Component. The only client code it pulls in is `<ThemeToggle>`,
 * `<MobileNav>` and Radix's `NavigationMenu` (self-contained leaves). Keep it
 * that way — do not add `"use client"` to this file to make some small
 * interaction work.
 *
 * `<ThemeToggle>` sits beside the auth actions and is visible at every width
 * (the auth buttons collapse into the mobile Sheet; the toggle does not).
 *
 * "Solutions", "Developers" and "Download" open real mega-menus (transcribed
 * from user-supplied screenshots, 2026-08-24 — the design PNG only showed
 * them closed); "Pricing" is a plain link. See docs/DECISIONS.md.
 *
 * RESPONSIVE (mobile-first, per docs/RESPONSIVE.md):
 * - base: logo + hamburger. The nav list and auth actions are hidden.
 * - md and up: horizontal nav appears, hamburger disappears, auth actions appear.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-header border-b border-border bg-background/80 pt-safe backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo />

          <NavigationMenu className="hidden md:block" viewport={false}>
            <NavigationMenuList>
              {MAIN_NAV.map((item, index) =>
                isNavMenuItem(item) ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="bg-transparent text-body-sm font-medium text-muted-foreground hover:text-foreground">
                      {item.label}
                    </NavigationMenuTrigger>
                    {/* Panels anchor to their own trigger. The last one is
                        right-aligned so a wide menu opens inward instead of
                        off the right edge of the viewport. */}
                    <NavigationMenuContent
                      className={
                        index === MAIN_NAV.length - 1
                          ? "md:right-0 md:left-auto"
                          : undefined
                      }
                    >
                      <NavMenuPanel columns={item.columns} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavLink
                      href={item.href}
                      className="inline-flex h-11 items-center rounded-lg px-3 text-body-sm font-medium"
                    >
                      {item.label}
                    </NavLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ActionButton
              asChild
              variant="outline"
              className="hidden md:inline-flex"
            >
              <Link href={SIGN_IN_NAV.href}>{SIGN_IN_NAV.label}</Link>
            </ActionButton>
            <ActionButton asChild className="hidden md:inline-flex">
              <Link href={SIGN_UP_NAV.href}>{SIGN_UP_NAV.label}</Link>
            </ActionButton>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
