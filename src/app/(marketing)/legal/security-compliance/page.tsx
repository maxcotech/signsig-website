import type { Metadata } from "next";

import { TrustPage } from "@/features/trust/components/trust-page";
import { trustMetadata } from "@/features/trust/lib/trust-metadata";
import { findTrustPage } from "@/features/trust/trust.data";

/**
 * Security & Compliance.
 *
 * Now a trust page rather than a policy page. The design PNG showed an empty
 * body under a "Last Updated" line, so it was modelled as a legal document;
 * the content document gives it a headline, subsectioned feature groups, an
 * FAQ and a CTA — the same shape as the four `/compliance/*` pages.
 *
 * The path stays as published: it is in the footer's Legal column and may
 * already have inbound links.
 */
const SLUG = "security-compliance";

const page = findTrustPage(SLUG);

export const metadata: Metadata = page ? trustMetadata(page) : {};

export default function SecurityCompliancePage() {
  if (!page) throw new Error(`Unknown trust page: ${SLUG}`);
  return <TrustPage page={page} />;
}
