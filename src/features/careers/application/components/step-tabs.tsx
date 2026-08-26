"use client";

import {
  APPLICATION_STEPS,
  type StepId,
} from "@/features/careers/application/application.data";
import { cn } from "@/lib/utils";

/**
 * The four step tabs.
 *
 * The design encodes progress in three states, which this reproduces:
 *   active   — brand green with a green underline
 *   visited  — full-strength foreground (a step you have been through)
 *   ahead    — muted
 *
 * Only visited steps are clickable. Jumping ahead would skip the validation
 * on the steps between, so those tabs are real `disabled` buttons rather than
 * links that quietly do nothing — the cursor and screen reader both say so.
 *
 * `role="tablist"` with `aria-selected` makes the progress legible to
 * assistive tech, which colour alone would not convey.
 */
export function StepTabs({
  current,
  furthest,
  onSelect,
}: {
  current: StepId;
  /** Index of the furthest step reached, so earlier tabs stay reachable. */
  furthest: number;
  onSelect: (index: number) => void;
}) {
  const currentIndex = APPLICATION_STEPS.findIndex((s) => s.id === current);

  return (
    <div
      role="tablist"
      aria-label="Application steps"
      className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border"
    >
      {APPLICATION_STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isReachable = index <= furthest;

        return (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={!isReachable}
            onClick={() => onSelect(index)}
            className={cn(
              "-mb-px min-h-11 border-b-2 px-1 text-body-sm transition-colors duration-fast",
              isActive
                ? "border-primary font-medium text-primary-text"
                : "border-transparent",
              !isActive &&
                isReachable &&
                "text-foreground hover:text-primary-text",
              !isReachable && "cursor-not-allowed text-muted-foreground",
            )}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
}
