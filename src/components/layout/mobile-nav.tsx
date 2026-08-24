"use client";

import { useState } from "react";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HEADER_CTA, MAIN_NAV } from "@/config/navigation";

/**
 * The mobile navigation drawer.
 *
 * DESIGNED ONCE, HERE. No page session should build its own mobile navigation:
 * per the derivation doctrine in docs/RESPONSIVE.md, the horizontal nav bar
 * collapses to this Sheet at `md` and below, on every page. It reads
 * `MAIN_NAV` and `HEADER_CTA` from `src/config/navigation.ts`, so the desktop
 * and mobile navigations physically cannot drift apart.
 *
 * Notes on the implementation, so a future session does not "fix" them:
 * - Radix (via shadcn's Sheet) already handles focus trapping, Escape, aria
 *   wiring and scroll locking. Do NOT add `useScrollLock` on top of it.
 * - The open state is controlled so a link click can close the drawer. Without
 *   this, tapping a same-page anchor scrolls behind an open overlay.
 * - The trigger is 44px square, and every link is 44px tall, meeting the
 *   minimum touch target. Do not shrink them to match a desktop design.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="size-11 rounded-lg md:hidden"
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col gap-0 pt-safe pb-safe"
      >
        <SheetHeader className="border-b border-border">
          <SheetTitle asChild>
            <Logo isLink={false} />
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Main" className="flex-1 overflow-y-auto p-gutter">
          <ul className="flex flex-col gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center rounded-lg px-3 text-body font-medium text-foreground transition-colors duration-fast hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pinned to the bottom so it stays within thumb reach. */}
        <div className="border-t border-border p-gutter">
          <ActionButton asChild size="lg" className="w-full">
            <Link href={HEADER_CTA.href} onClick={() => setIsOpen(false)}>
              {HEADER_CTA.label}
            </Link>
          </ActionButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
