import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceList } from "@/features/system-status/components/service-list";
import { UptimeCard } from "@/features/system-status/components/uptime-card";
import { getSystemStatus } from "@/features/system-status/system-status.data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * System status.
 *
 * ⚠ Currently rendering PLACEHOLDER data — the real endpoint is not ready
 * (2026-08-25). See `system-status.data.ts` for how to wire it up.
 *
 * While `isLive` is false the page is marked `noIndex`. A status page is a
 * factual claim about whether a service works; letting search engines surface
 * a fabricated "All System Operational" is the one failure mode here that
 * actively misleads people. The flag is derived, not hardcoded, so it clears
 * itself the moment a real feed sets `isLive: true`. The route is likewise
 * `isIndexed: false` in `config/routes.ts` until then.
 *
 * The layout is a ~800px centred column (`max-w-compact`), matching the design.
 */
export async function generateMetadata(): Promise<Metadata> {
  const status = await getSystemStatus();

  return buildMetadata({
    title: "System Status",
    description: "Current status of SignSig infrastructure and APIs.",
    path: "/resources/system-status",
    noIndex: !status.isLive,
    keywords: [
      "SignSig status",
      "SignSig uptime",
      "system status",
      "service health",
    ],
  });
}

export default async function SystemStatusPage() {
  const status = await getSystemStatus();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "System Status", path: "/resources/system-status" },
        ])}
      />

      <Section spacing="lg" container={false} aria-labelledby="status-heading">
        <Container>
          <div className="mx-auto max-w-compact">
            <h1
              id="status-heading"
              className="text-center text-h1 text-balance text-foreground"
            >
              System Status
            </h1>
            <p className="mt-4 text-center text-body text-muted-foreground">
              Current status of SignSig infrastructure and APIs.
            </p>

            <div className="mt-stack-gap">
              <UptimeCard status={status} />
              <ServiceList services={status.services} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
