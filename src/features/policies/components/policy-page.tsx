import Link from "next/link";

import { ContentSections } from "@/components/common/content-blocks";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { isPublished, type Policy } from "@/features/policies/policies.data";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { slugify } from "@/lib/slugify";

/**
 * The shared shell for all three policy pages: centred title, "Last Updated",
 * body, then the standard CTA band.
 *
 * One component rather than three near-identical pages — the routes are thin
 * wrappers that pass a `Policy`. The paths differ (`/terms`, `/privacy`,
 * `/legal/cookie-policy`) because they were already published in the footer
 * nav, so a single dynamic segment could not serve them all.
 *
 * Section headings get slug ids, so "…/terms#12-limitation-of-liability" is a
 * linkable citation. That matters more for a legal document than for any
 * other page on the site: people quote clauses at each other.
 *
 * A policy with no `sections` renders an honest empty state instead of a
 * blank page. All three are published now; the branch stays for the next one.
 */
export function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: policy.title, path: policy.path },
        ])}
      />

      <Section spacing="lg" container={false}>
        <Container>
          <div className="mx-auto max-w-cards">
            <h1 className="text-center text-h1 text-balance text-foreground">
              {policy.title}
            </h1>
            <p className="mt-3 text-center text-body-sm text-muted-foreground">
              Last Updated: {policy.lastUpdated}
            </p>

            {isPublished(policy) ? (
              <div className="mt-10">
                <ContentSections
                  sections={policy.sections ?? []}
                  idFor={(section) => slugify(section.heading)}
                />
              </div>
            ) : (
              <p className="mt-10 text-center text-body text-muted-foreground">
                This policy hasn&rsquo;t been published yet. For questions about
                it in the meantime, contact{" "}
                <a
                  href="mailto:support@signsig.com"
                  className="text-primary-text underline underline-offset-4"
                >
                  support@signsig.com
                </a>
                . You can also review our{" "}
                <Link
                  href="/legal/security-compliance"
                  className="text-primary-text underline underline-offset-4"
                >
                  other legal pages
                </Link>
                .
              </p>
            )}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
