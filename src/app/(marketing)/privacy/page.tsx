import type { Metadata } from "next";

import { PolicyPage } from "@/features/policies/components/policy-page";
import { policyMetadata } from "@/features/policies/lib/policy-metadata";
import { findPolicy } from "@/features/policies/policies.data";

/**
 * Privacy Policy — a thin wrapper around the shared `<PolicyPage>` shell.
 *
 * The design's body for this page is **completely empty** (verified by ink
 * measurement across the full page height), so there is nothing to
 * transcribe. Add `sections` in `policies.data.ts` to publish it.
 */
const POLICY_ID = "privacy";

export const metadata: Metadata = policyMetadata(POLICY_ID);

export default function PrivacyPage() {
  const policy = findPolicy(POLICY_ID);
  if (!policy) throw new Error(`Unknown policy id: ${POLICY_ID}`);
  return <PolicyPage policy={policy} />;
}
