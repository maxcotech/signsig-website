import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { DevelopersSection } from "@/components/common/sections/developers-section";
import { FaqSection } from "@/components/common/sections/faq-section";
import { PricingSection } from "@/components/common/sections/pricing-section";
import { WorkflowSection } from "@/components/common/sections/workflow-section";
import { HomeFeatureGrid } from "@/features/home/components/home-feature-grid";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeTrustBar } from "@/features/home/components/home-trust-bar";
import { buildMetadata } from "@/lib/seo";

/**
 * Home page. Composes the sections transcribed from the design PNG
 * (2026-08-24) — this file stays a table of contents; each section
 * implements itself in `src/features/home/components/` (home-only) or
 * `src/components/common/sections/` (shared with other marketing pages).
 *
 * No `title` passed to `buildMetadata()`: the home page wants the absolute
 * default from the root layout rather than the "%s | SignSig" template.
 */
export const metadata: Metadata = buildMetadata({
  path: "/",
  keywords: [
    "digital signature software",
    "electronic signature",
    "e-signature platform",
    "document signing",
    "open source e-signature",
    "SignSig",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeTrustBar />
      <HomeFeatureGrid />
      <WorkflowSection />
      <DevelopersSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
