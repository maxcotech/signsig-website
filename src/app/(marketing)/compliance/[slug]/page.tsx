import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrustPage } from "@/features/trust/components/trust-page";
import { trustMetadata } from "@/features/trust/lib/trust-metadata";
import { COMPLIANCE_PAGES, findTrustPage } from "@/features/trust/trust.data";

/**
 * The four compliance pages the footer has been linking to since the nav was
 * built: SOC 2, GDPR, HIPAA and ISO 27001.
 *
 * One dynamic segment rather than four routes, because all four are the same
 * page shape over different content — see `<TrustPage>`. Security &
 * Compliance is the fifth trust page but keeps its own
 * `/legal/security-compliance` route, so it is filtered out of the params
 * here by `COMPLIANCE_PAGES`.
 *
 * `dynamicParams = false`: the set is closed. An unknown slug is a broken
 * link, and should 404 rather than render an empty compliance claim.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPLIANCE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/compliance/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = findTrustPage(slug);
  return page ? trustMetadata(page) : {};
}

export default async function CompliancePage({
  params,
}: PageProps<"/compliance/[slug]">) {
  const { slug } = await params;
  const page = findTrustPage(slug);
  if (!page) notFound();

  return <TrustPage page={page} />;
}
