/**
 * The three legal policy pages.
 *
 * ✅ BODIES NOW PUBLISHED (2026-08-26) from the content document, at the
 * user's direction that the document overrides the design PNGs. The copy
 * itself lives in `src/content/legal/` — see `src/content/blocks.ts` for why
 * transcribed prose sits outside the feature tree.
 *
 * That direction also settles two things the design got wrong:
 *
 *   - **"Last Updated"** is now **January 2025**, from the document. The PNGs
 *     said January 2026.
 *   - **Terms section 5** appeared twice, back to back, in the PNG. The
 *     document has it once.
 *
 * Security & Compliance is no longer here. The document gives it a marketing
 * trust-page shape — headline, intro, subsectioned features, FAQ, CTA — not a
 * numbered legal document, so it moved to `src/features/trust/` and keeps its
 * published `/legal/security-compliance` path. See docs/DECISIONS.md.
 */

import type { ContentBlock, ContentSection } from "@/content/blocks";
import { COOKIE_SECTIONS } from "@/content/legal/cookies";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy";
import { TERMS_SECTIONS } from "@/content/legal/terms";

/** Re-exported so existing consumers keep one import path for these types. */
export type PolicyBlock = ContentBlock;
export type PolicySection = ContentSection;

export type Policy = {
  id: string;
  /** Route path. These already exist in `config/navigation.ts`'s footer. */
  path: string;
  title: string;
  /** From the content document, without the "Last Updated: " prefix. */
  lastUpdated: string;
  sections?: readonly ContentSection[];
};

const LAST_UPDATED = "January 2025";

export const POLICIES: readonly Policy[] = [
  {
    id: "terms",
    path: "/terms",
    title: "Terms of Service",
    lastUpdated: LAST_UPDATED,
    sections: TERMS_SECTIONS,
  },
  {
    id: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED,
    sections: PRIVACY_SECTIONS,
  },
  {
    id: "cookie-policy",
    path: "/legal/cookie-policy",
    title: "Cookie Policy",
    lastUpdated: LAST_UPDATED,
    sections: COOKIE_SECTIONS,
  },
] as const;

export function findPolicy(id: string): Policy | undefined {
  return POLICIES.find((policy) => policy.id === id);
}

/**
 * True once a policy has body copy. Drives indexing and the empty state.
 *
 * All three are published now, but the check stays: a future policy added
 * without copy should be `noIndex` and show the honest empty state rather
 * than render as a blank legal page.
 */
export function isPublished(policy: Policy): boolean {
  return (policy.sections?.length ?? 0) > 0;
}
