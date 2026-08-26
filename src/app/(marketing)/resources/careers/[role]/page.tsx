import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon, CornerUpLeftIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ROLES, findRole } from "@/features/careers/careers.data";
import { RoleDescription } from "@/features/careers/components/role-description";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.slug }));
}

function pathFor(slug: string) {
  return `/resources/careers/${slug}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/careers/[role]">): Promise<Metadata> {
  const { role: slug } = await params;
  const role = findRole(slug);
  if (!role) return {};

  return buildMetadata({
    title: role.title,
    description:
      role.detail?.about ??
      `${role.title} — ${role.location}, ${role.employmentType}.`,
    path: pathFor(slug),
    // A posting with no description is a thin page; keep it out of the index.
    noIndex: !role.detail,
  });
}

/**
 * One job posting.
 *
 * Only Senior Backend Engineer has a written description. Security Engineer
 * shows its meta plus an honest note, and is `noIndex` — the same treatment
 * the integration guides get. A candidate can still apply either way.
 *
 * NOTE: JobPosting structured data is deliberately NOT emitted. Google
 * requires `datePosted`, `hiringOrganization` and a `validThrough`, and
 * inventing those would put fabricated dates in the search index. Add it once
 * the roles carry real posting dates.
 */
export default async function RolePage({
  params,
}: PageProps<"/resources/careers/[role]">) {
  const { role: slug } = await params;
  const role = findRole(slug);
  if (!role) notFound();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/resources/careers" },
          { name: role.title, path: pathFor(slug) },
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

            <h1 className="mt-6 text-h4 text-foreground">{role.title}</h1>

            <RoleDescription role={role} />

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
