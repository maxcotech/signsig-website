"use client";

import type { ComponentProps } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark-mode provider.
 *
 * `attribute="class"` is required: `globals.css` declares
 * `@custom-variant dark (&:is(.dark *))`, so every `dark:` utility depends on a
 * `.dark` class being present on `<html>`. Switching to `data-theme` would
 * silently disable every dark style in the project.
 *
 * `<html>` carries `suppressHydrationWarning` in the root layout because this
 * provider writes the class before React hydrates, to avoid a flash of the
 * wrong theme. Without that attribute React logs a mismatch on every load.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
