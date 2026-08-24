import type { ComponentProps } from "react";

import { Container, type ContainerSize } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * A page section: vertical rhythm plus the content container, in one place.
 *
 * The vertical padding comes from fluid `--spacing-section-y*` tokens, which
 * interpolate between mobile and the 1440px frame. That is why sections do not
 * need `py-16 md:py-24 lg:py-30` sprinkled on them — the token already ramps.
 *
 * ACCESSIBILITY: a bare `<section>` is not a landmark. Give it an accessible
 * name by pointing `aria-labelledby` at the id of its heading:
 *
 *   <Section aria-labelledby="pricing-heading">
 *     <h2 id="pricing-heading">Pricing</h2>
 *   </Section>
 *
 * SPECIFICITY: pass extra vertical padding via `className` only when you mean
 * to REPLACE the token, and use the `spacing="none"` variant when you do. A
 * `py-*` in `className` alongside the default `spacing` produces two competing
 * padding rules — the classic "fine on desktop, broken at 768" bug.
 */

const SECTION_SPACING = {
  /** 64px -> 120px. The default rhythm for a standard content section. */
  base: "py-section-y",
  /** 40px -> 80px. Tight sections: logo strips, single-line CTAs. */
  sm: "py-section-y-sm",
  /** 88px -> 160px. Heroes and headline feature sections. */
  lg: "py-section-y-lg",
  /** No vertical padding. Use when you are supplying your own. */
  none: "",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

export type SectionProps = ComponentProps<"section"> & {
  spacing?: SectionSpacing;
  /**
   * Container width for the inner content. Pass `false` for a full-bleed
   * section (an edge-to-edge background image, a horizontally scrolling row)
   * and place your own `<Container>` around the parts that should be clamped.
   */
  container?: ContainerSize | false;
  /** Classes for the inner container, when one is rendered. */
  containerClassName?: string;
};

export function Section({
  className,
  children,
  spacing = "base",
  container = "content",
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative", SECTION_SPACING[spacing], className)}
      {...props}
    >
      {container === false ? (
        children
      ) : (
        <Container size={container} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}
