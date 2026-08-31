/**
 * Types matching the Careers section of `swagger.json` exactly — property
 * names and nullability transcribed field-for-field from
 * `components.schemas`, not inferred from the old static `careers.data.ts`
 * shape (deleted; see docs/DECISIONS.md). If a field here looks oddly named
 * or oddly optional, that's the contract, not a typo.
 */

/** `JobRoleListItemResponse` — one role inside a category's `roles[]`. */
export type JobRoleListItem = {
  id: number;
  title: string | null;
  location: string | null;
  employmentType: number;
  /** Human label for `employmentType`, supplied by the API — never guess this. */
  employmentTypeText: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  timeCreated: string;
};

/** `JobCategoryWithRolesResponse` — a department, in the API's own words. */
export type JobCategory = {
  id: number;
  name: string | null;
  roleCount: number;
  roles: JobRoleListItem[] | null;
};

/** `JobRolesOverviewResponse` — GET /Careers/Roles. */
export type JobRolesOverview = {
  totalOpenRoles: number;
  categories: JobCategory[] | null;
};

/** `JobRoleDetailResponse` — GET /Careers/Roles/{id}. */
export type JobRoleDetail = {
  id: number;
  jobCategoryId: number;
  categoryName: string | null;
  title: string | null;
  location: string | null;
  employmentType: number;
  employmentTypeText: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  aboutTheRole: string | null;
  keyResponsibilities: string[] | null;
  requiredSkills: string[] | null;
  niceToHave: string[] | null;
};

/** `JobScreeningQuestionResponse` — one entry of GET /Careers/ScreeningQuestions. */
export type JobScreeningQuestion = {
  id: number;
  questionText: string | null;
  maxWords: number;
  sortOrder: number;
};

/** `JobApplicationSubmittedResponse` — the 200 body of POST .../Apply. */
export type JobApplicationSubmitted = {
  applicationId: number;
  jobRoleId: number;
  jobRoleTitle: string | null;
  submittedAt: string;
};
