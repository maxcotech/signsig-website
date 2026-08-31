import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { getJobRolesOverview } from "@/features/careers/careers.api";
import { DepartmentAccordion } from "@/features/careers/components/department-accordion";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * Careers index. Target of the footer's "Careers" link.
 *
 * Fetches GET /Careers/Roles server-side — no client-side data fetching, no
 * loading spinner, matching this codebase's "Server Components by default"
 * default and docs/API.md's guidance that a plain read with no client
 * interactivity doesn't need `useQuery`.
 *
 * The fetch is wrapped in try/catch rather than left to throw: this is a
 * public marketing page, and if the backend or `NEXT_PUBLIC_API_BASE_URL` is
 * momentarily unavailable, an honest "couldn't load open roles" message is
 * the right failure mode — not a crashed page. Same posture this codebase
 * already takes on `resources/system-status`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "We're building open-source tools that make document signing accessible and trustworthy. Join us.",
  path: "/resources/careers",
  keywords: [
    "SignSig careers",
    "jobs at SignSig",
    "remote software jobs",
    "open source careers",
    "engineering jobs",
  ],
});

export default async function CareersPage() {
  const overview = await getJobRolesOverview().catch(() => null);
  const count = overview?.totalOpenRoles ?? 0;

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

        {overview ? (
          <>
            <p className="mt-8 text-center text-body text-foreground">
              Explore {count} Open {count === 1 ? "role" : "roles"}
            </p>
            <div className="mt-stack-gap">
              <DepartmentAccordion categories={overview.categories ?? []} />
            </div>
          </>
        ) : (
          <p
            role="status"
            className="mt-8 text-center text-body-sm text-muted-foreground"
          >
            We couldn&rsquo;t load open roles right now. Please refresh the
            page, or email your CV to{" "}
            <a
              href="mailto:support@signsig.com"
              className="text-primary-text underline underline-offset-4"
            >
              support@signsig.com
            </a>
            .
          </p>
        )}
      </Section>

      <CtaSection />
    </>
  );
}
