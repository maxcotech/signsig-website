import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon, CornerUpLeftIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  findRoleBySlug,
  getJobRoleDetail,
  getJobRolesOverview,
  roleSlug,
  summaryToFallbackDetail,
} from "@/features/careers/careers.api";
import { CareersUnavailable } from "@/features/careers/components/careers-unavailable";
import { RoleDescription } from "@/features/careers/components/role-description";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * `dynamicParams = true`, unlike the old static-only registry: the set of
 * open roles is now live and can change without a rebuild. Slugs not
 * returned by `generateStaticParams` (a new posting, or this build's overview
 * fetch simply failing — see below) still resolve on demand at request time.
 */
export const dynamicParams = true;

/**
 * Best-effort. If the API is unreachable at build time (as it is in any
 * environment without NEXT_PUBLIC_API_BASE_URL set), this returns an empty
 * list rather than failing the build — every role still resolves via
 * on-demand rendering once `dynamicParams` allows it.
 */
export async function generateStaticParams() {
  const overview = await getJobRolesOverview().catch(() => null);
  if (!overview) return [];
  return (overview.categories ?? [])
    .flatMap((category) => category.roles ?? [])
    .map((role) => ({ role: roleSlug(role.title) }));
}

function pathFor(slug: string) {
  return `/resources/careers/${slug}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/careers/[role]">): Promise<Metadata> {
  const { role: slug } = await params;
  const overview = await getJobRolesOverview().catch(() => null);
  const role = overview ? findRoleBySlug(overview, slug) : undefined;
  if (!role) return {};

  return buildMetadata({
    title: role.title ?? "Open Role",
    description: `${role.title} — ${role.location}, ${role.employmentTypeText}.`,
    path: pathFor(slug),
    keywords: [
      role.title ?? "open role",
      "SignSig careers",
      "job opening",
      role.employmentTypeText ?? "job",
    ],
  });
}

/**
 * One job posting, from GET /Careers/Roles (for the summary + to resolve the
 * slug to a numeric id) and GET /Careers/Roles/{id} (for the full body).
 *
 * Two distinct failure states, handled differently on purpose:
 *   - The OVERVIEW fetch fails → we cannot tell whether this role exists, so
 *     this renders `<CareersUnavailable>`, NOT `notFound()`. Calling
 *     notFound() here would 404 a real, existing job posting just because the
 *     backend was briefly unreachable.
 *   - The overview succeeds but no role matches this slug → the API has
 *     spoken and the role genuinely doesn't exist → `notFound()` is correct.
 *   - The DETAIL fetch fails after a summary was found → falls back to
 *     `summaryToFallbackDetail()`; `<RoleDescription>` already has an honest
 *     fallback for a role with no published body, so the summary fields
 *     alone still populate the header and the "Apply" link.
 */
export default async function RolePage({
  params,
}: PageProps<"/resources/careers/[role]">) {
  const { role: slug } = await params;
  const overview = await getJobRolesOverview().catch(() => null);
  if (!overview) return <CareersUnavailable what="this role" />;

  const summary = findRoleBySlug(overview, slug);
  if (!summary) notFound();

  const detail =
    (await getJobRoleDetail(summary.id).catch(() => null)) ??
    summaryToFallbackDetail(summary);

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/resources/careers" },
          { name: summary.title ?? "Role", path: pathFor(slug) },
        ])}
      />

      <Section spacing="lg" container={false}>
        <Container>
          <div className="mx-auto max-w-cards">
            <nav aria-label="Breadcrumb">
              <Link
                href="/resources/careers"
                className="inline-flex min-h-11 items-center gap-2 text-body-sm text-foreground transition-colors duration-fast hover:text-primary-text"
              >
                <CornerUpLeftIcon className="size-4" aria-hidden="true" />
                All Roles
              </Link>
            </nav>

            <h1 className="mt-6 text-h4 text-foreground">{summary.title}</h1>

            <RoleDescription role={detail} />

            <ActionButton asChild size="lg" className="mt-stack-gap">
              <Link href={`${pathFor(slug)}/apply`}>
                Apply Now
                <ChevronRightIcon aria-hidden="true" />
              </Link>
            </ActionButton>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
