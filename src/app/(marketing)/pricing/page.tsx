import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { DevelopersSection } from "@/components/common/sections/developers-section";
import { FaqSection } from "@/components/common/sections/faq-section";
import { PricingSection } from "@/components/common/sections/pricing-section";
import { PRICING_TIERS } from "@/components/common/sections/pricing-tiers.data";
import { WorkflowSection } from "@/components/common/sections/workflow-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildSoftwareApplicationSchema,
} from "@/lib/seo";

/**
 * Pricing page.
 *
 * Every section here is shared with the home page — verified pixel-identical
 * against both design exports for the workflow, developers, FAQ, CTA and
 * footer bands. `variant="page"` is what makes this the pricing page rather
 * than a copy of the home summary: `<h1>` instead of `<h2>` (~49.5px here
 * against ~35.6px on home, which the design confirms), the content
 * document's headline and description, and the document's "All plans
 * include" strip and free-trial CTA.
 */
export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Start free, scale as you grow. All plans include legally binding signatures and verification certificates. From ₦2,000/month, with a 30-day free trial and no credit card required.",
  path: "/pricing",
  keywords: [
    "SignSig pricing",
    "e-signature pricing",
    "document signing plans",
    "electronic signature cost",
    "free trial e-signature",
  ],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      {/* Offers mirror the visible table exactly — the tiers array the page
          renders is the same one fed to the schema, so they cannot drift. */}
      <JsonLd
        schema={buildSoftwareApplicationSchema({
          offers: PRICING_TIERS.map((tier) => ({
            name: tier.name,
            price: String(tier.priceMonthly),
            currency: "NGN",
          })),
        })}
      />

      <PricingSection variant="page" />
      <WorkflowSection />
      <DevelopersSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
