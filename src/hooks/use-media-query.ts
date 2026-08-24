"use client";

import { useCallback, useSyncExternalStore } from "react";

import { BREAKPOINTS, type BreakpointName } from "@/lib/constants";

/**
 * Subscribe to a CSS media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect` so the
 * server snapshot is explicit: it returns `false` during SSR and on the first
 * client render, then settles to the real value. That avoids a hydration
 * mismatch without an extra render pass.
 *
 * IMPORTANT: this is a *behavioural* escape hatch, not a layout tool. Responsive
 * LAYOUT belongs in Tailwind breakpoint classes, which work without JavaScript
 * and do not flash the wrong state on first paint. Reach for this hook only
 * when you need to change behaviour — mount a focus trap, swap a carousel for a
 * grid, stop an animation — not to choose between two markup trees.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // Server and first-paint value. `false` is the safe default: it means
  // "assume the smaller/simpler case", which matches mobile-first.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * True at or above the named Tailwind breakpoint.
 *
 * `useBreakpoint("md")` is true from 768px up, matching what `md:` classes do,
 * so behaviour and layout cannot disagree about where the boundary is.
 */
export function useBreakpoint(name: BreakpointName): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[name]}px)`);
}

/**
 * True when the user has asked the OS to reduce motion.
 *
 * `globals.css` already neutralises transitions and animations globally for
 * these users. Use this hook only for motion CSS cannot reach — an autoplaying
 * video, a canvas loop, a scroll-driven JS animation.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
