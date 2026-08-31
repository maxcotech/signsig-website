/**
 * Server-side reads for the Careers pages — GET /Careers/Roles,
 * GET /Careers/Roles/{id}, GET /Careers/ScreeningQuestions.
 *
 * Deliberately NOT `useQuery` hooks and NOT "use client". These three are
 * pure reads that feed page content with no client-side interactivity (no
 * refetch button, no pagination) — exactly the case docs/API.md carves out
 * for a plain Server Component calling `getService` directly, per AGENTS.md's
 * "Server Components by default." Plain async functions also work inside
 * `generateStaticParams`, which cannot use a React hook at all.
 *
 * The application MUTATION is different — see
 * `application/careers-application.api.ts` for the client-side `useMutation`.
 *
 * The three reads are wrapped in React's `cache()`. `getService` goes through
 * axios, not the built-in `fetch()`, so Next's automatic per-request request
 * deduplication does not apply to it — without `cache()`,
 * `generateMetadata()` and the page component (which Next calls separately
 * for the same request) would each independently re-fetch the same data,
 * doubling every role-page request against the backend for no reason.
 * `cache()` memoizes by arguments for the lifetime of one request, which is
 * exactly that window.
 */

import { cache } from "react";

import { getService } from "@/lib/api/methods";
import { slugify } from "@/lib/slugify";

import type {
  JobRoleDetail,
  JobRoleListItem,
  JobRolesOverview,
  JobScreeningQuestion,
} from "./careers.types";

export const getJobRolesOverview = cache((): Promise<JobRolesOverview> => {
  return getService<JobRolesOverview>("/Careers/Roles");
});

export const getJobRoleDetail = cache((id: number): Promise<JobRoleDetail> => {
  return getService<JobRoleDetail>(`/Careers/Roles/${id}`);
});

/** Sorted by `sortOrder` — that field exists specifically to define this order. */
export const getScreeningQuestions = cache(
  async (): Promise<JobScreeningQuestion[]> => {
    const questions = await getService<JobScreeningQuestion[]>(
      "/Careers/ScreeningQuestions",
    );
    return [...questions].sort((a, b) => a.sortOrder - b.sortOrder);
  },
);

/**
 * The route param for a role. The API identifies roles by numeric `id`; this
 * site's URLs (`/resources/careers/senior-backend-engineer`) predate this
 * integration and are worth keeping for readability and SEO, so the slug is
 * derived from `title` rather than the route scheme changing to numeric ids.
 */
export function roleSlug(title: string | null): string {
  return slugify(title ?? "");
}

/** Every role across every category, flattened — for slug lookup and counts. */
export function flattenRoles(overview: JobRolesOverview): JobRoleListItem[] {
  return (overview.categories ?? []).flatMap(
    (category) => category.roles ?? [],
  );
}

/** Finds the role whose derived slug matches the route param, or undefined. */
export function findRoleBySlug(
  overview: JobRolesOverview,
  slug: string,
): JobRoleListItem | undefined {
  return flattenRoles(overview).find((role) => roleSlug(role.title) === slug);
}

/**
 * A `JobRoleDetail`-shaped object built from just the summary, for when
 * GET /Careers/Roles/{id} fails after the summary was already found.
 * `<RoleDescription>` already has an honest fallback for a role with no
 * `aboutTheRole`, so this only needs to carry the fields the summary has.
 */
export function summaryToFallbackDetail(
  summary: JobRoleListItem,
): JobRoleDetail {
  return {
    id: summary.id,
    jobCategoryId: 0,
    categoryName: null,
    title: summary.title,
    location: summary.location,
    employmentType: summary.employmentType,
    employmentTypeText: summary.employmentTypeText,
    salaryMin: summary.salaryMin,
    salaryMax: summary.salaryMax,
    salaryCurrency: summary.salaryCurrency,
    aboutTheRole: null,
    keyResponsibilities: null,
    requiredSkills: null,
    niceToHave: null,
  };
}

/**
 * "₦1,800,000 – ₦2,500,000" from `salaryMin`/`salaryMax`/`salaryCurrency`,
 * all nullable — undefined when there's nothing to show, so a card can
 * render its separator only when this has a value (same pattern the old
 * static `salaryRange` field used).
 *
 * Uses `Intl.NumberFormat`'s real currency formatting rather than a
 * hand-rolled "₦1.8M" abbreviation: the API gives a currency CODE (e.g.
 * "NGN"), not a symbol, and there's no reliable way to turn one into the
 * other without a lookup table this project doesn't have. Depending on the
 * runtime's ICU data this prints the currency code instead of a symbol
 * (verified: Node here renders "NGN 1,800,000") — correct either way, just
 * not always symbolised.
 */
export function formatSalaryRange(role: {
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
}): string | undefined {
  const { salaryMin, salaryMax, salaryCurrency } = role;
  if (salaryMin == null && salaryMax == null) return undefined;

  const currency = salaryCurrency ?? "USD";
  const fmt = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  if (salaryMin != null && salaryMax != null) {
    return `${fmt(salaryMin)} – ${fmt(salaryMax)}`;
  }
  return `${fmt((salaryMin ?? salaryMax)!)}+`;
}
