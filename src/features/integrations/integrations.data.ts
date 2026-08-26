import {
  CUSTOM_INTEGRATIONS,
  INTEGRATION_CATALOG,
  INTEGRATION_CATEGORIES,
} from "@/content/integrations/catalog";
import { GOOGLE_DRIVE_GUIDE } from "@/content/integrations/guides/google-drive";
import { HUBSPOT_GUIDE } from "@/content/integrations/guides/hubspot";
import { MICROSOFT_365_GUIDE } from "@/content/integrations/guides/microsoft-365";
import { SALESFORCE_GUIDE } from "@/content/integrations/guides/salesforce";
import { SLACK_GUIDE } from "@/content/integrations/guides/slack";
import type {
  Integration,
  IntegrationGuide,
} from "@/features/integrations/types";

/**
 * Integration Hub — the registry the UI renders.
 *
 * The COPY lives in `src/content/integrations/`: the twelve catalog entries,
 * the five category descriptions, and one file per setup guide. This file
 * only joins them, which is why it is short. See STRUCTURE.md §1.1 for why
 * transcribed content sits outside the feature tree.
 *
 * ⚠ LOGOS — still unresolved. Every card in the design shows the SAME
 * Microsoft-365-style glyph, a placeholder rather than twelve real marks. Per
 * the user's direction each card renders one neutral tokenised icon instead:
 * putting Microsoft's logo on the Dropbox or Xero card would misattribute a
 * real trademark, which is worse than being visibly unbranded. See
 * docs/DECISIONS.md.
 */

/**
 * Guides by slug. Five of twelve are published — the five the content
 * document specifies in full. The rest render an honest empty state, so
 * every "View Integration" link still goes somewhere real.
 */
const GUIDES: Readonly<Record<string, IntegrationGuide>> = {
  "microsoft-365": MICROSOFT_365_GUIDE,
  "google-drive": GOOGLE_DRIVE_GUIDE,
  slack: SLACK_GUIDE,
  salesforce: SALESFORCE_GUIDE,
  hubspot: HUBSPOT_GUIDE,
};

export const INTEGRATIONS: readonly Integration[] = INTEGRATION_CATALOG.map(
  (entry) => ({ ...entry, guide: GUIDES[entry.slug] }),
);

export { CUSTOM_INTEGRATIONS, INTEGRATION_CATEGORIES };

export function findIntegration(slug: string): Integration | undefined {
  return INTEGRATIONS.find((integration) => integration.slug === slug);
}

/** Case-insensitive match on name, description or use case. */
export function integrationMatches(
  integration: Integration,
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    integration.name.toLowerCase().includes(q) ||
    integration.description.toLowerCase().includes(q) ||
    integration.useCase.toLowerCase().includes(q)
  );
}
