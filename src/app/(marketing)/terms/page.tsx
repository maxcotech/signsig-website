import type { Metadata } from "next";

import { PolicyPage } from "@/features/policies/components/policy-page";
import { policyMetadata } from "@/features/policies/lib/policy-metadata";
import { findPolicy } from "@/features/policies/policies.data";

/**
 * Terms of Service — a thin wrapper around the shared `<PolicyPage>` shell.
 *
 * Body copy lives in `policies.data.ts`. This route holds no markup of its own
 * so the four policy pages cannot drift apart.
 *
 * ⚠ The body is currently empty. The design HAS ~19 sections for this page,
 * but they are not transcribed: legal copy is operative text, and the design's
 * version duplicates section 5 and leaves `[Company Address]` /
 * `[Support Phone]` unfilled. The user is supplying corrected copy. See
 * `policies.data.ts` and docs/DECISIONS.md.
 */
const POLICY_ID = "terms";

export const metadata: Metadata = policyMetadata(POLICY_ID);

export default function TermsPage() {
  const policy = findPolicy(POLICY_ID);
  if (!policy) throw new Error(`Unknown policy id: ${POLICY_ID}`);
  return <PolicyPage policy={policy} />;
}
