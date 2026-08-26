import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The small icon + label pill used above a section heading across the home
 * page ("Sign Documents, Automate Workflows", "Trusted, Without Limitations
 * By", "SignSig Workflow", "Automate Everything").
 *
 * Not built on shadcn's `<Badge>`: that primitive is sized for dense status
 * tags (20px tall, 12px text) and every property would need overriding to
 * reach this pill's proportions. This is a genuinely different responsibility
 * — a section eyebrow, not a status indicator — so it is a new component
 * rather than a fork. See docs/DECISIONS.md.
 */

/**
 * The three variants are NOT stylistic choices — each was measured off the
 * design and they genuinely differ:
 *
 * - `neutral` is a white pill lifted by a shadow with **no border**.
 * - `brand` really does have a 1px green stroke over a mint fill.
 * - `on-dark` really does have a translucent white stroke over the green band.
 *
 * So "use a shadow, not a border" applies to `neutral` only. Do not
 * normalise them onto one treatment.
 */
const EYEBROW_VARIANTS = {
  /** White pill on a light section; muted label, brand-coloured icon. */
  neutral: "bg-card text-muted-foreground shadow-pill",
  /** Mint fill + green stroke; the label itself is brand-coloured. */
  brand: "border border-primary bg-primary-subtle text-primary-text",
  /** Translucent white on the brand-green CTA band. */
  "on-dark": "border border-white/25 bg-white/10 text-white backdrop-blur-sm",
} as const;

export type EyebrowBadgeVariant = keyof typeof EYEBROW_VARIANTS;

export type EyebrowBadgeProps = {
  icon?: ReactNode;
  children: ReactNode;
  variant?: EyebrowBadgeVariant;
  className?: string;
};

export function EyebrowBadge({
  icon,
  children,
  variant = "neutral",
  className,
}: EyebrowBadgeProps) {
  return (
    <span
      className={cn(
        // No `border` in the base: only two of the three variants have one,
        // and `neutral` uses `shadow-pill` instead.
        "inline-flex items-center gap-2 rounded-pill px-4 py-2 text-body-sm font-medium",
        EYEBROW_VARIANTS[variant],
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            "inline-flex size-4 shrink-0 items-center justify-center",
            variant === "on-dark" ? "text-white" : "text-primary",
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
