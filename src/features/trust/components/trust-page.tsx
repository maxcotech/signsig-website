import { ArrowRightIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { ContentSections } from "@/components/common/content-blocks";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { TrustFaq } from "@/features/trust/components/trust-faq";
import type { TrustPage as TrustPageData } from "@/features/trust/trust.data";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { slugify } from "@/lib/slugify";

/**
 * The shared shell for the five trust & compliance pages.
 *
 * Same reading-column layout as `<PolicyPage>` — these sit alongside the
 * legal pages in the footer and a reader moving between them should not feel
 * the change — but with a headline and intro at the top, an FAQ accordion,
 * and the document's own CTA before the standard band.
 *
 * The CTA is a `mailto:` in every case, because every one of the document's
 * CTAs is "email this address and we'll send you the document". A button
 * that opened a form we cannot yet deliver would be worse than the mail
 * client the copy actually describes.
 */
export function TrustPage({ page }: { page: TrustPageData }) {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.title, path: page.path },
        ])}
      />

      <Section spacing="lg" container={false}>
        <Container>
          <div className="mx-auto max-w-cards">
            <h1 className="text-center text-h1 text-balance text-foreground">
              {page.title}
            </h1>
            <p className="mt-4 text-center text-body-lg text-balance text-foreground">
              {page.headline}
            </p>
            <p className="mt-4 text-center text-body-sm text-muted-foreground">
              {page.intro}
            </p>

            <div className="mt-10">
              <ContentSections
                sections={page.sections}
                idFor={(section) => slugify(section.heading)}
              />
            </div>

            <TrustFaq faqs={page.faqs} />

            <ActionButton asChild size="lg" className="mt-10">
              <a href={page.cta.href}>
                {page.cta.label}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </a>
            </ActionButton>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
