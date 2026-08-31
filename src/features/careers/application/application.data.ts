/**
 * Application form content that ISN'T sourced from the API: the four step
 * definitions, consent copy, and upload constraints.
 *
 * Screening questions, notice-period options and experience-band options
 * used to live here too. They're gone — screening questions come from
 * GET /Careers/ScreeningQuestions (see `careers.api.ts`), and the notice/
 * experience option lists moved to `careers-application.api.ts` because
 * that's where their real enum VALUES (not just their display labels) are
 * defined, right next to the warning about how unconfirmed those values are.
 * "Desired Role" is gone entirely — the real Apply endpoint has no field for
 * it. See docs/DECISIONS.md.
 */

export const APPLICATION_STEPS = [
  { id: "personal", label: "Personal Info" },
  { id: "professional", label: "Professional Info" },
  { id: "screening", label: "Screening Questions" },
  { id: "documents", label: "Document & Consent" },
] as const;

export type StepId = (typeof APPLICATION_STEPS)[number]["id"];

/** Consent block copy, verbatim. The Privacy Policy is a link in the design. */
export const CONSENT = {
  intro:
    "By submitting this application, you agree that SignSig, Inc. may store your personal information (name, email, phone, LinkedIn profile) for up to 12 months. We will only contact you regarding roles relevant to your experience and interests. You can opt-out of future communications by clicking the unsubscribe link in any email. For information on how we handle your data, see our Privacy Policy.",
  store:
    "I agree to allow SignSig to store my application information and contact me about this role and future opportunities that may be relevant to my experience.",
  privacyBefore: "I have read and agree to SignSig's ",
  privacyLink: "Privacy Policy",
  privacyAfter: " and understand how my data will be used.",
  /** Shown beside the submit button, from the content document. */
  submitNote:
    "We review every application. If we think you might be a good fit, we'll reach out within 2 weeks.",
} as const;

/** Upload constraints, from the document's Section 4. */
export const RESUME_RULES = {
  maxSizeLabel: "Max Size: 5MB",
  maxBytes: 5 * 1024 * 1024,
  resumePrompt: "Drop your resume here or click to browse",
  coverLetterPrompt: "Upload a cover letter (optional)",
  formatsLabel: "Accepted Formats: PDF, DOCX.",
  accept: ".pdf,.docx,application/pdf",
  /** Alternative to uploading a cover letter. */
  coverLetterTextLimit: 1000,
  coverLetterTextPlaceholder: "Tell us why you'd be great for this role...",
  coverLetterTextHelp:
    "If you prefer, write your cover letter below instead of uploading a file",
} as const;

/** Count words the way a reviewer would: whitespace-separated tokens. */
export function countWords(value: string): number {
  const trimmed = value.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}
