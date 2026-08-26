import { ZapIcon } from "lucide-react";

import type { ServiceState } from "@/features/system-status/types";
import { cn } from "@/lib/utils";

/**
 * The green "All System Operational" pill, and the per-row status label.
 *
 * One component for both because the design draws them identically apart from
 * the background: the row variant is bare text, the summary variant sits on a
 * tinted pill.
 */
const STATE_TEXT: Record<ServiceState, string> = {
  operational: "text-primary-text",
  degraded: "text-status-degraded",
  down: "text-destructive-text",
};

export function StatusPill({
  state,
  label,
  variant = "bare",
  className,
}: {
  state: ServiceState;
  label: string;
  variant?: "bare" | "filled";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-body-sm font-medium",
        STATE_TEXT[state],
        variant === "filled" && "rounded-lg bg-primary-subtle px-4 py-2.5",
        className,
      )}
    >
      <ZapIcon className="size-4 shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}
