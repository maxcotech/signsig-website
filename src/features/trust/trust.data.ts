/**
 * The trust & compliance pages.
 *
 * These are the destinations for the footer's **Compliance** column — SOC 2
 * Certified, GDPR Compliant, HIPAA Ready, ISO 27001 — which had links but no
 * pages until now, plus Security & Compliance, which moved here from
 * `features/policies` because the content document gives it a marketing shape
 * (headline, intro, subsectioned features, FAQ, CTA) rather than the numbered
 * clauses of a legal document.
 *
 * All copy is transcribed from the document's "MARKETING TRUST PAGES"
 * section, 2026-08-26. Files live in `src/content/trust/`.
 *
 * Security & Compliance keeps its published `/legal/security-compliance`
 * path; the four new pages sit under `/compliance/*` because that is where
 * `config/navigation.ts` already pointed at them.
 */

import type { TrustPage } from "@/content/blocks";
import { GDPR_PAGE } from "@/content/trust/gdpr";
import { HIPAA_PAGE } from "@/content/trust/hipaa";
import { ISO_27001_PAGE } from "@/content/trust/iso-27001";
import { SECURITY_COMPLIANCE_PAGE } from "@/content/trust/security-compliance";
import { SOC_2_PAGE } from "@/content/trust/soc-2";

export type { TrustPage };

export const TRUST_PAGES: readonly TrustPage[] = [
  SOC_2_PAGE,
  GDPR_PAGE,
  HIPAA_PAGE,
  ISO_27001_PAGE,
  SECURITY_COMPLIANCE_PAGE,
];

/** The four that live under `/compliance/[slug]`. */
export const COMPLIANCE_PAGES = TRUST_PAGES.filter((page) =>
  page.path.startsWith("/compliance/"),
);

export function findTrustPage(slug: string): TrustPage | undefined {
  return TRUST_PAGES.find((page) => page.slug === slug);
}
