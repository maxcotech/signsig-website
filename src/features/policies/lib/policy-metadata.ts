import type { Metadata } from "next";

import { findPolicy, isPublished } from "@/features/policies/policies.data";
import { buildMetadata } from "@/lib/seo";

/**
 * Metadata for a policy route.
 *
 * `noIndex` while a policy has no body copy: an unwritten legal page is a thin
 * page, and indexing "Cookie Policy" with no cookie policy on it is worse than
 * not being found. It clears itself the moment `sections` is filled in — see
 * `policies.data.ts`.
 */
export function policyMetadata(id: string): Metadata {
  const policy = findPolicy(id);
  if (!policy) return {};

  const published = isPublished(policy);

  return buildMetadata({
    title: policy.title,
    description: published
      ? `${policy.title} for SignSig. Last updated ${policy.lastUpdated}.`
      : `${policy.title} for SignSig — not yet published.`,
    path: policy.path,
    noIndex: !published,
  });
}
