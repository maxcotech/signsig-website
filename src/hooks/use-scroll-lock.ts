"use client";

import { useEffect } from "react";

/**
 * Lock body scrolling while an overlay is open.
 *
 * Compensates for the disappearing scrollbar by padding the body, so locking
 * does not shift the whole page sideways — the classic "everything jumps 15px
 * when the modal opens" bug.
 *
 * NOTE: shadcn's `<Sheet>` and `<Dialog>` already handle scroll locking through
 * Radix, so `<MobileNav>` does NOT need this. It is here for bespoke overlays
 * that are not built on a Radix primitive. If you are reaching for it on top of
 * a Radix component, you probably have a double lock.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isLocked]);
}
