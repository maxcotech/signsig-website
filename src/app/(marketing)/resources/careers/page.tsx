import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { openRolesLabel } from "@/features/careers/careers.data";
import { DepartmentAccordion } from "@/features/careers/components/department-accordion";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * Careers index. Target of the footer's "Careers" link.
 *
 * The open-roles count is derived from the data, so it cannot claim the
 * design's "149" while listing two — see careers.data.ts.
 */
export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "We're building open-source tools that make document signing accessible and trustworthy. Join us.",
  path: "/resources/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/resources/careers" },
        ])}
      />

      <Section spacing="lg" aria-labelledby="careers-heading">
        <h1
          id="careers-heading"
          className="text-center text-h1 text-balance text-foreground"
        >
          Join the SignSig team
        </h1>
        <p className="mx-auto mt-4 max-w-narrow text-center text-body text-pretty text-muted-foreground">
          We&rsquo;re building open-source tools that make document signing
          accessible and trustworthy. Join us.
        </p>
        <p className="mt-8 text-center text-body text-foreground">
          {openRolesLabel()}
        </p>

        <div className="mt-stack-gap">
          <DepartmentAccordion />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
