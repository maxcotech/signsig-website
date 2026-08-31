import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/common/sections/cta-section";
import { DevelopersSection } from "@/components/common/sections/developers-section";
import { FaqSection } from "@/components/common/sections/faq-section";
import { WorkflowSection } from "@/components/common/sections/workflow-section";
import { JsonLd } from "@/components/seo/json-ld";
import { solutionHref } from "@/config/solutions";
import { BenefitGrid } from "@/features/solutions/components/benefit-grid";
import { SolutionHero } from "@/features/solutions/components/solution-hero";
import {
  SOLUTION_PAGES,
  findSolution,
} from "@/features/solutions/solutions.data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * All 14 Solutions pages, from one template.
 *
 * Every design in this set is the same shape — eyebrow, two-line h1,
 * paragraph, one CTA, 2x2 benefit grid, then the four shared sections. So the
 * page body is data-driven from `SOLUTION_PAGES` and the per-page difference
 * is a copy entry, not a component. See docs/DECISIONS.md.
 *
 * `generateStaticParams` makes every route statically prerendered, exactly as
 * if each had its own folder; `dynamicParams = false` means an unknown slug is
 * a build-time-known 404 rather than an on-demand render.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTION_PAGES.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = findSolution(slug);
  if (!solution) return {};

  return buildMetadata({
    title: solution.label,
    // The visible hero paragraph, verbatim. A few run past the 120-160 char
    // guidance in docs/SEO.md; using the real copy is preferred over writing
    // a second, invented description that could drift from the page.
    description: solution.copy.description,
    path: solutionHref(slug),
    keywords: [
      solution.label,
      `${solution.label} e-signature`,
      "SignSig",
      "document signing solution",
    ],
  });
}

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = findSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: solution.label, path: solutionHref(slug) },
        ])}
      />

      <SolutionHero solution={solution} />
      <BenefitGrid benefits={solution.copy.benefits} />
      <WorkflowSection />
      <DevelopersSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
