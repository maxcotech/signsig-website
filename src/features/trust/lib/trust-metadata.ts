import type { Metadata } from "next";

import type { TrustPage } from "@/features/trust/trust.data";
import { buildMetadata } from "@/lib/seo";

/** One small set per page, keyed by slug — not a single list reused across all five. */
const KEYWORDS: Record<string, readonly string[]> = {
  "soc-2": ["SOC 2 certified", "SOC 2 Type II", "SignSig security"],
  gdpr: ["GDPR compliance", "GDPR compliant", "data protection"],
  hipaa: ["HIPAA compliant", "HIPAA ready", "healthcare data protection"],
  "iso-27001": ["ISO 27001 certified", "information security management"],
  "security-compliance": [
    "SignSig security",
    "SignSig compliance",
    "SOC 2 GDPR HIPAA",
  ],
};

/**
 * Metadata for a trust page.
 *
 * The description is the document's own headline rather than a generated
 * summary: it is one sentence, written to be read cold, which is exactly what
 * a search snippet is. No `noIndex` — every one of these pages has full copy,
 * and they are the pages a security reviewer searches for by name.
 */
export function trustMetadata(page: TrustPage): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.headline,
    path: page.path,
    keywords: KEYWORDS[page.slug] ?? [page.title, "SignSig compliance"],
  });
}
