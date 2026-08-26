/**
 * Shape of an in-progress application.
 *
 * One flat object held by `<ApplicationForm>`. Files are real `File` objects
 * so that wiring the endpoint later is a `FormData` append and nothing more —
 * see `submit-application.ts`.
 */

export type ApplicationDraft = {
  /** Slug of the role being applied for, from the route. */
  roleSlug: string;

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
  desiredRole: string;
  noticePeriod: string;
  experience: string;

  // Step 3 — Screening Questions, keyed by question id
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

export function emptyDraft(roleSlug: string): ApplicationDraft {
  return {
    roleSlug,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    jobTitle: "",
    employer: "",
    desiredRole: "",
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
