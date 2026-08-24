import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The horizontal frame for all page content.
 *
 * Width comes from the `--container-*` tokens, which encode the canonical
 * 1440px design frame and its 1200px content column. The gutter classes are the
 * MINIMUM edge breathing room and only bite once the viewport is narrower than
 * the content column: 16px base, 32px at `md`, 48px at `lg`. That is the
 * derivation doctrine in docs/RESPONSIVE.md, implemented once, here.
 *
 * NEVER write `max-w-[1200px]` or `px-[120px]` in a section. Use this component.
 * If a design needs a width this does not offer, add a `--container-*` token.
 */

const CONTAINER_SIZES = {
  /** 1200px — the default. The content column of the 1440px design frame. */
  content: "max-w-content",
  /** 720px — long-form prose, where 1200px would be unreadable. */
  narrow: "max-w-narrow",
  /** 1440px — sections that should fill the whole frame, still clamped. */
  wide: "max-w-wide",
  /** No clamp. For genuinely full-bleed rows; you still get the gutters. */
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof CONTAINER_SIZES;

export type ContainerProps = ComponentProps<"div"> & {
  size?: ContainerSize;
};

export function Container({
  className,
  size = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter md:px-gutter-md lg:px-gutter-lg",
        CONTAINER_SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
