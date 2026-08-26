import { StatusPill } from "@/features/system-status/components/status-pill";
import type { ServiceStatus } from "@/features/system-status/types";

const STATE_LABEL = {
  operational: "Operational",
  degraded: "Degraded",
  down: "Down",
} as const;

/**
 * The per-service status rows beneath the uptime card.
 *
 * A `<ul>`: it is a list of services and their state, and nothing about it is
 * interactive. Row height (66px) and the 20px gap come from the design.
 */
export function ServiceList({
  services,
}: {
  services: readonly ServiceStatus[];
}) {
  if (services.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-col gap-5">
      {services.map((service) => (
        <li
          key={service.id}
          className="flex min-h-16 animate-in-view flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg bg-surface-2 px-6 py-5"
        >
          <span className="text-body font-medium text-foreground">
            {service.name}
          </span>
          <span className="flex items-center gap-4">
            {/* Uptime is not in the design's row — it comes from the content
                document's Component/Status/Uptime table. Omitted silently if a
                provider does not report it. */}
            {service.uptime && (
              <span className="text-body-sm text-muted-foreground">
                {service.uptime} uptime
              </span>
            )}
            <StatusPill
              state={service.state}
              label={STATE_LABEL[service.state]}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
