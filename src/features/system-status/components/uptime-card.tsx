import { ClockIcon } from "lucide-react";

import { StatusPill } from "@/features/system-status/components/status-pill";
import type {
  ServiceState,
  SystemStatus,
} from "@/features/system-status/types";

const BAR_COLOR: Record<ServiceState, string> = {
  operational: "bg-primary",
  degraded: "bg-status-degraded",
  down: "bg-destructive",
};

/**
 * The uptime summary: window label, overall pill, the bar chart, and the
 * "90 Days Ago / N% Uptime / Today" scale beneath it.
 *
 * The chart is a plain flex row of rounded bars rather than a chart library —
 * it carries one datum per bar and no axes, so a dependency would be pure
 * overhead. Bars flex to fill the card, so the row reflows at any width
 * instead of overflowing; at 360px they simply get thinner.
 *
 * ACCESSIBILITY: the bars are decorative in aggregate — the uptime percentage
 * beneath states the same fact in text — so the strip is `aria-hidden` and the
 * figure carries a caption instead. Announcing 44 individual bars would be
 * noise, not information.
 */
export function UptimeCard({ status }: { status: SystemStatus }) {
  return (
    <figure className="animate-in-view rounded-xl bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-2 text-h5 text-foreground">
          <ClockIcon className="size-5 shrink-0" aria-hidden="true" />
          {status.windowLabel}
        </h2>
        <StatusPill
          state={status.overall}
          label={status.overallLabel}
          variant="filled"
        />
      </div>

      <div aria-hidden="true" className="mt-6 flex h-16 items-stretch gap-1.5">
        {status.bars.map((bar, index) => (
          <span
            key={index}
            className={`flex-1 rounded-pill ${BAR_COLOR[bar.state]}`}
          />
        ))}
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-4 text-body-sm text-muted-foreground">
        <span>90 Days Ago</span>
        <span className="font-medium text-foreground">
          {status.uptimePercent} Uptime
        </span>
        <span>Today</span>
      </figcaption>
    </figure>
  );
}
