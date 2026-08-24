"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle.
 *
 * A client component by necessity — it writes the theme. It is deliberately a
 * LEAF: the header around it stays a Server Component, which is the pattern
 * every page session should follow. Push `"use client"` as far down as it goes.
 *
 * WHY NO MOUNT GATE: the obvious implementation renders the icon from
 * `resolvedTheme`, which is unknown on the server, so it needs a
 * `useState`/`useEffect` mount flag — which React 19 now flags
 * (`react-hooks/set-state-in-effect`) and which costs an extra render.
 *
 * Instead, BOTH icons are always rendered and CSS picks one via the `dark:`
 * variant. `next-themes` puts the `.dark` class on `<html>` before hydration, so
 * the correct icon is right on first paint, there is no flash, no hydration
 * mismatch, and no effect. The label stays static for the same reason.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="default"
      onClick={handleToggle}
      // Size matches the mobile nav trigger so the header row stays even, and
      // meets the 44px minimum touch target.
      className={cn("size-11 rounded-lg", className)}
      aria-label="Toggle dark mode"
    >
      <SunIcon className="hidden size-5 dark:block" aria-hidden="true" />
      <MoonIcon className="size-5 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
