import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CornerUpLeftIcon } from "lucide-react";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ApplicationForm } from "@/features/careers/application/components/application-form";
import { ROLES, findRole } from "@/features/careers/careers.data";
import { buildMetadata } from "@/lib/seo";

/**
 * The application form for one role.
 *
 * ⚠ UI ONLY — no endpoint yet (2026-08-25), by the user's direction. The form
 * validates and holds real state, but `submitApplication()` returns
 * `not-configured` and the success dialog is unreachable, so it cannot tell a
 * candidate their application was received when it was not. See
 * `submit-application.ts` to wire it up.
 *
 * `noIndex` while unwired: an application form that cannot accept
 * applications should not be a search result. Remove the flag once the
 * endpoint is live.
 *
 * The `<h1>` names the role rather than just "Apply", so the page is
 * self-describing if it is ever reached directly.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/careers/[role]/apply">): Promise<Metadata> {
  const { role: slug } = await params;
  const role = findRole(slug);
  if (!role) return {};

  return buildMetadata({
    title: `Apply — ${role.title}`,
    description: `Apply for the ${role.title} role at SignSig.`,
    path: `/resources/careers/${slug}/apply`,
    noIndex: true,
  });
}

export default async function ApplyPage({
  params,
}: PageProps<"/resources/careers/[role]/apply">) {
  const { role: slug } = await params;
  const role = findRole(slug);
  if (!role) notFound();

  return (
    <>
      <Section spacing="lg" container={false}>
        <Container>
          <div className="mx-auto max-w-cards">
            <nav aria-label="Breadcrumb">
              <Link
                href={`/resources/careers/${slug}`}
                className="inline-flex min-h-11 items-center gap-2 text-body-sm text-foreground transition-colors duration-fast hover:text-primary-text"
              >
                <CornerUpLeftIcon className="size-4" aria-hidden="true" />
                Back
              </Link>
            </nav>

            <h1 className="sr-only">Apply for {role.title}</h1>

            <div className="mt-4">
              <ApplicationForm roleSlug={slug} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
