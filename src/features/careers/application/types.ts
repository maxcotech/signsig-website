/**
 * Shape of an in-progress application.
 *
 * One flat object held by `<ApplicationForm>`. Files are real `File` objects,
 * so submitting is a `FormData` append and nothing more — see
 * `careers-application.api.ts`.
 *
 * No `desiredRole` / `roleSlug` field, unlike the earlier UI-only version:
 * the real Apply endpoint is `/Careers/Roles/{id}/Apply` — which role this is
 * comes from the URL path, not the form body, and the request schema has no
 * "desired role" field at all for a candidate to separately declare one.
 */

export type ApplicationDraft = {
  /** The role being applied for. Drives the submit URL, not a form field. */
  roleId: number;

  // Step 1 — Personal Info
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  linkedIn: string;
  portfolio: string;

  // Step 2 — Professional Info
  jobTitle: string;
  employer: string;
  /** Stringified `NoticePeriod` enum value ("1"–"5"); "" until selected. */
  noticePeriod: string;
  /** Stringified `YearsOfRelevantExperience` enum value ("1"–"5"); "" until selected. */
  experience: string;

  // Step 3 — Screening Questions, keyed by the question's numeric id (as a string)
  answers: Record<string, string>;

  // Step 4 — Documents & Consent
  resume: File | null;
  coverLetter: File | null;
  /**
   * Alternative to uploading a cover letter, from the content document. Both
   * are optional and a candidate may use either — the endpoint receives
   * whichever is filled.
   */
  coverLetterText: string;
  consentStore: boolean;
  consentPrivacy: boolean;
};

export function emptyDraft(roleId: number): ApplicationDraft {
  return {
    roleId,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    jobTitle: "",
    employer: "",
    noticePeriod: "",
    experience: "",
    answers: {},
    resume: null,
    coverLetter: null,
    coverLetterText: "",
    consentStore: false,
    consentPrivacy: false,
  };
}
