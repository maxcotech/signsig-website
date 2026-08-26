"use client";

import { useState } from "react";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { Logo } from "@/components/common/logo";
import { MobileNavList } from "@/components/layout/mobile-nav-list";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SIGN_IN_NAV, SIGN_UP_NAV } from "@/config/navigation";

/**
 * The mobile navigation drawer.
 *
 * DESIGNED ONCE, HERE. No page session should build its own mobile navigation:
 * per the derivation doctrine in docs/RESPONSIVE.md, the horizontal nav bar
 * collapses to this Sheet at `md` and below, on every page. The nav list
 * (`<MobileNavList>`) and auth actions read `MAIN_NAV`, `SIGN_IN_NAV` and
 * `SIGN_UP_NAV` from `src/config/navigation.ts`, so the desktop and mobile
 * navigations physically cannot drift apart.
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
          <MobileNavList onNavigate={() => setIsOpen(false)} />
        </nav>

        {/* Pinned to the bottom so both actions stay within thumb reach. */}
        <div className="flex flex-col gap-2 border-t border-border p-gutter">
          <ActionButton asChild variant="outline" size="lg" className="w-full">
            <Link href={SIGN_IN_NAV.href} onClick={() => setIsOpen(false)}>
              {SIGN_IN_NAV.label}
            </Link>
          </ActionButton>
          <ActionButton asChild size="lg" className="w-full">
            <Link href={SIGN_UP_NAV.href} onClick={() => setIsOpen(false)}>
              {SIGN_UP_NAV.label}
            </Link>
          </ActionButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
