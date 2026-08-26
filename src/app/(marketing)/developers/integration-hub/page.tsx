import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { IntegrationBrowser } from "@/features/integrations/components/integration-browser";
import { CUSTOM_INTEGRATIONS } from "@/features/integrations/integrations.data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * Integration Hub index. Target of the "Integration Hub" links already in the
 * header mega-menu and the footer.
 *
 * The `<h1>` is the content document's headline ("Connect SignSig to Your
 * Favorite Tools"), not the design's "Integration Hub", per the user's
 * direction that the document overrides the PNG. "Integration Hub" stays as
 * the metadata title and the breadcrumb, so the page a visitor clicked from
 * the nav is still identifiable by that name in the tab, in search and in the
 * trail — a headline change should not cost the page its name.
 */
export const metadata: Metadata = buildMetadata({
  title: "Integration Hub",
  description:
    "Embed document signing into your existing workflow with pre-built integrations for productivity, storage, CRM, HR and finance tools.",
  path: "/developers/integration-hub",
});

export default function IntegrationHubPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Integration Hub", path: "/developers/integration-hub" },
        ])}
      />

      <Section spacing="lg" aria-labelledby="hub-heading">
        <h1
          id="hub-heading"
          className="text-center text-h1 text-balance text-foreground"
        >
          Connect SignSig to Your Favorite Tools
        </h1>
        <p className="mx-auto mt-4 max-w-narrow text-center text-body text-pretty text-muted-foreground">
          Embed document signing into your existing workflow. We support
          pre-built integrations with productivity, storage, CRM, HR, and
          finance tools—plus a full API for custom integrations.
        </p>

        <div className="mt-stack-gap">
          <IntegrationBrowser />
        </div>
      </Section>

      {/* The document's "CUSTOM INTEGRATIONS" block. It replaces the one-line
          "Can't find a tool?" link that used to sit under the search field:
          the document gives it a headline, a description and a named CTA, and
          it reads better after the grid than before it — someone only asks
          "where's my tool?" once they've looked. */}
      <Section
        spacing="lg"
        aria-labelledby="custom-integrations"
        containerClassName="flex flex-col items-center text-center"
      >
        <h2
          id="custom-integrations"
          className="text-h2 text-balance text-foreground"
        >
          {CUSTOM_INTEGRATIONS.headline}
        </h2>
        <p className="mt-4 max-w-narrow text-body text-balance text-muted-foreground">
          {CUSTOM_INTEGRATIONS.description}
        </p>
        <ActionButton asChild size="lg" variant="outline" className="mt-6">
          <Link href={CUSTOM_INTEGRATIONS.ctaHref}>
            {CUSTOM_INTEGRATIONS.cta}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </ActionButton>
      </Section>

      <CtaSection />
    </>
  );
}
