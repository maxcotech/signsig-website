import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CornerUpLeftIcon } from "lucide-react";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { IntegrationGuideBody } from "@/features/integrations/components/integration-guide-body";
import {
  INTEGRATIONS,
  findIntegration,
} from "@/features/integrations/integrations.data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/** All nine are prerendered; an unknown slug is a build-time 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATIONS.map((integration) => ({
    integration: integration.slug,
  }));
}

function pathFor(slug: string) {
  return `/developers/integration-hub/${slug}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/developers/integration-hub/[integration]">): Promise<Metadata> {
  const { integration: slug } = await params;
  const integration = findIntegration(slug);
  if (!integration) return {};

  return buildMetadata({
    title: integration.guide?.title ?? `${integration.name} Integration`,
    description: integration.guide?.purpose ?? integration.description,
    path: pathFor(slug),
    // Guides that have no content yet should not be indexed as thin pages.
    noIndex: !integration.guide,
  });
}

/**
 * One integration guide.
 *
 * Only Microsoft 365 has a written guide in the design. The other eight
 * render an honest empty state instead of 404ing, so every "View Integration"
 * link on the hub goes somewhere real — and they are `noIndex` so eight
 * near-empty pages do not enter the index. Fill in `guide` in
 * `integrations.data.ts` to publish one.
 */
export default async function IntegrationGuidePage({
  params,
}: PageProps<"/developers/integration-hub/[integration]">) {
  const { integration: slug } = await params;
  const integration = findIntegration(slug);
  if (!integration) notFound();

  const { guide } = integration;

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Integration Hub", path: "/developers/integration-hub" },
          { name: integration.name, path: pathFor(slug) },
        ])}
      />

      <Section spacing="lg" container={false}>
        <Container>
          <div className="mx-auto max-w-cards">
            <nav aria-label="Breadcrumb">
              <Link
                href="/developers/integration-hub"
                className="inline-flex min-h-11 items-center gap-2 text-body-sm text-foreground transition-colors duration-fast hover:text-primary-text"
              >
                <CornerUpLeftIcon className="size-4" aria-hidden="true" />
                Integration Hub
              </Link>
            </nav>

            <h1 className="mt-4 text-h3 text-foreground">
              {guide?.title ?? `${integration.name} Integration`}
            </h1>

            {guide ? (
              <IntegrationGuideBody guide={guide} />
            ) : (
              <p className="mt-6 text-body text-muted-foreground">
                The setup guide for {integration.name} is not published yet. In
                the meantime, the{" "}
                <Link
                  href="/developers/api-documentation"
                  className="text-primary-text underline underline-offset-4"
                >
                  REST API
                </Link>{" "}
                covers the same workflow, or{" "}
                <Link
                  href="/developers/integration-hub"
                  className="text-primary-text underline underline-offset-4"
                >
                  browse the other integrations
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
