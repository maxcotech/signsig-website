import type { SystemStatus, UptimeBar } from "./types";

/**
 * ⚠⚠ THIS IS PLACEHOLDER DATA. THE STATUS SHOWN IS NOT REAL. ⚠⚠
 *
 * The user's status endpoint is not ready yet (2026-08-25) and asked for the
 * page to be rendered in the meantime. Everything below is a stand-in that
 * reproduces the design; it does not reflect the actual health of anything.
 *
 * **A status page that claims "operational" without measuring anything is
 * worse than no status page** — it will keep saying so during an outage. So:
 *
 *   1. `isLive: false` is set, and the page uses it to avoid presenting this
 *      as a verified claim. Do not flip it by hand — only a real feed sets it.
 *   2. This page must NOT go public with placeholder data. Either wire the
 *      endpoint or take the route out of `config/routes.ts` before launch.
 *
 * WIRING IT UP: implement `getSystemStatus()` below to fetch the endpoint and
 * map the payload onto the `SystemStatus` type. Nothing in `components/` needs
 * to change — the UI is written against that type, not against any provider.
 * Use `next: { revalidate: 60 }` on the fetch so the page stays statically
 * rendered but refreshes each minute.
 *
 * ✅ SERVICE NAMES ARE NOW REAL. The design showed the literal placeholder
 * `{Status_category}` eight times; the content document (2026-08-26) names six
 * monitored components and their uptime figures, which are used below. Those
 * figures are a point-in-time snapshot from the document, NOT a live reading —
 * which is exactly why `isLive` stays false.
 */

/** The design draws 44 bars, with a single degraded day at index 34. */
const BAR_COUNT = 44;
const DEGRADED_BAR_INDEX = 34;

const PLACEHOLDER_BARS: readonly UptimeBar[] = Array.from(
  { length: BAR_COUNT },
  (_, index): UptimeBar => ({
    state: index === DEGRADED_BAR_INDEX ? "degraded" : "operational",
    label: `Day ${index + 1} of ${BAR_COUNT}`,
  }),
);

const PLACEHOLDER: SystemStatus = {
  overall: "operational",
  overallLabel: "All System Operational",
  uptimePercent: "99.9%",
  windowLabel: "90 Days Uptime",
  bars: PLACEHOLDER_BARS,
  // The six monitored components named in the content document, with the
  // uptime figures it lists. Both are snapshots, not live readings.
  services: [
    { id: "web-platform", name: "Web Platform", uptime: "99.9%" },
    { id: "mobile-app", name: "Mobile App", uptime: "99.8%" },
    { id: "api", name: "API", uptime: "99.9%" },
    { id: "document-storage", name: "Document Storage", uptime: "99.95%" },
    { id: "email-delivery", name: "Email Delivery", uptime: "99.7%" },
    { id: "authentication", name: "Authentication", uptime: "99.95%" },
  ].map((service) => ({ ...service, state: "operational" as const })),
  isLive: false,
};

/**
 * The single seam between the page and whatever reports status.
 *
 * Replace the body with a real fetch when the endpoint lands; keep the
 * signature. Returning `isLive: true` is what tells the page it may present
 * the result as a genuine claim.
 */
export async function getSystemStatus(): Promise<SystemStatus> {
  return PLACEHOLDER;
}
