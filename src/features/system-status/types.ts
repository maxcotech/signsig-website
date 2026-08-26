/**
 * Provider-agnostic shape of the system-status page's data.
 *
 * The UI is written against THIS type, never against a provider's response.
 * When the real endpoint is ready, write one adapter that maps its payload
 * into these types and nothing in `components/` has to change.
 */

/** Health of one service, or of the platform overall. */
export type ServiceState = "operational" | "degraded" | "down";

/** One bar in the uptime chart. The design draws 44 of them. */
export type UptimeBar = {
  state: ServiceState;
  /** Shown to assistive tech and on hover, e.g. "12 days ago". */
  label: string;
};

/** One row in the per-service list. */
export type ServiceStatus = {
  id: string;
  /** Service name as displayed. */
  name: string;
  state: ServiceState;
  /**
   * Formatted uptime for this component, e.g. "99.9%".
   *
   * Optional because the DESIGN's rows show only name + status — this comes
   * from the content document, which specifies a Component / Status / Uptime
   * table. A provider that does not report per-component uptime simply omits
   * it and the row renders as designed.
   */
  uptime?: string;
};

export type SystemStatus = {
  overall: ServiceState;
  /** Headline pill copy, e.g. "All System Operational" (verbatim from design). */
  overallLabel: string;
  /** Formatted for display, e.g. "99.9%" — the provider decides precision. */
  uptimePercent: string;
  /** Window label, e.g. "90 Days Uptime". */
  windowLabel: string;
  bars: readonly UptimeBar[];
  services: readonly ServiceStatus[];
  /**
   * False while the page is rendering placeholder data rather than a live
   * feed. The page uses this to avoid asserting a health claim it cannot
   * back up — see `system-status.data.ts`.
   */
  isLive: boolean;
};
