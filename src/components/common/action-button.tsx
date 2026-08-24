import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Marketing-scale button. The WRAP-DO-NOT-FORK pattern, demonstrated.
 *
 * WHY THIS EXISTS: shadcn's `<Button>` sizes are tuned for dense application UI
 * — its default is 32px tall and its `lg` is 36px. Both are below the 44px
 * minimum target WCAG 2.5.5 asks for (see `MIN_TOUCH_TARGET` in
 * `src/lib/constants.ts`), and both look undersized next to a marketing hero.
 * Rather than editing
 * `src/components/ui/button.tsx` (which `shadcn add` would overwrite, and which
 * would silently diverge from upstream), this wraps it and supplies heights
 * that meet the target.
 *
 * Use `<ActionButton>` for page CTAs. Use the raw `<Button>` for dense UI
 * inside a component — a filter chip, an icon button in a table row.
 *
 * Rendering a link? Pass `asChild` and nest a `next/link`:
 *
 *   <ActionButton asChild>
 *     <Link href="/pricing">See pricing</Link>
 *   </ActionButton>
 */

const ACTION_SIZES = {
  /** 44px tall — the minimum accessible target. */
  md: "h-11 gap-2 px-5 text-body-sm has-[>svg]:px-4",
  /** 52px tall — primary hero CTA. */
  lg: "h-13 gap-2 px-6 text-body has-[>svg]:px-5",
  /** Square 44px — icon-only actions that still need a real target. */
  icon: "size-11",
} as const;

export type ActionButtonSize = keyof typeof ACTION_SIZES;

export type ActionButtonProps = Omit<ComponentProps<typeof Button>, "size"> & {
  size?: ActionButtonSize;
};

export function ActionButton({
  className,
  size = "md",
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      // The underlying size variant is neutralised; ACTION_SIZES wins because
      // cn() runs tailwind-merge, which resolves the height/padding conflicts.
      size="default"
      variant={variant}
      className={cn(
        "rounded-lg font-medium transition-colors duration-fast ease-standard",
        ACTION_SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
