import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CornerUpLeftIcon } from "lucide-react";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ApplicationForm } from "@/features/careers/application/components/application-form";
import {
  findRoleBySlug,
  getJobRolesOverview,
  getScreeningQuestions,
  roleSlug,
} from "@/features/careers/careers.api";
import { CareersUnavailable } from "@/features/careers/components/careers-unavailable";
import { buildMetadata } from "@/lib/seo";

/**
 * The application form for one role — POST /Careers/Roles/{id}/Apply.
 *
 * `noIndex`: an application form is never a useful search result regardless
 * of whether the endpoint is live.
 *
 * Same best-effort static params as the role detail page — see its doc
 * comment for why `dynamicParams = true` and an empty-list fallback are
 * correct here, not a build failure.
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  const overview = await getJobRolesOverview().catch(() => null);
  if (!overview) return [];
  return (overview.categories ?? [])
    .flatMap((category) => category.roles ?? [])
    .map((role) => ({ role: roleSlug(role.title) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/careers/[role]/apply">): Promise<Metadata> {
  const { role: slug } = await params;
  const overview = await getJobRolesOverview().catch(() => null);
  const role = overview ? findRoleBySlug(overview, slug) : undefined;
  if (!role) return {};

  return buildMetadata({
    title: `Apply — ${role.title}`,
    description: `Apply for the ${role.title} role at SignSig.`,
    path: `/resources/careers/${slug}/apply`,
    noIndex: true,
    keywords: [`apply ${role.title ?? "role"}`, "SignSig job application"],
  });
}

/**
 * Two live reads gate this page: the role (to resolve the slug to the
 * numeric id the form submits against) and the screening questions (Step 3
 * of the wizard has nothing to render without them). Both are wrapped in
 * try/catch; if either fails, this shows one honest "unavailable" message
 * rather than a form that's silently missing a step or submits against a
 * role it never confirmed exists.
 *
 * `notFound()` is reserved for the case the overview fetch DID succeed and
 * genuinely has no matching role — never for a fetch failure, which is a
 * recoverable-later condition, not "this page doesn't exist."
 */
export default async function ApplyPage({
  params,
}: PageProps<"/resources/careers/[role]/apply">) {
  const { role: slug } = await params;
  const overview = await getJobRolesOverview().catch(() => null);

  if (overview) {
    const role = findRoleBySlug(overview, slug);
    if (!role) notFound();

    const questions = await getScreeningQuestions().catch(() => null);
    if (questions) {
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
                  <ApplicationForm roleId={role.id} questions={questions} />
                </div>
              </div>
            </Container>
          </Section>

          <CtaSection />
        </>
      );
    }
  }

  return <CareersUnavailable what="this application form" />;
}
