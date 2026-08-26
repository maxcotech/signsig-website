/**
 * Application form content: the four steps, the screening questions and the
 * select options.
 *
 * ✅ NOW FROM THE CONTENT DOCUMENT (2026-08-26), not inferred. The design
 * showed every dropdown closed, so the option lists were previously guesses.
 * The document specifies them, and also corrects several `required` flags the
 * design's `*` markers got wrong. Where the two disagree the document wins on
 * content; the design still owns layout.
 *
 * Design vs document differences, all resolved in the document's favour:
 *
 *   - LinkedIn Profile and Portfolio / GitHub were marked `*` in the design.
 *     The document makes both OPTIONAL (portfolio "required for engineering
 *     roles", which is per-role logic the form cannot express, so it is a
 *     helper hint instead).
 *   - Phone placeholder was "+0 (000) 000-0000"; the document gives
 *     "+1 (555) 123-4567".
 *   - Screening question 5 was `*` in the design; the document makes it
 *     optional.
 *   - The document adds a "write your cover letter" textarea as an
 *     alternative to uploading one. See docs/DECISIONS.md.
 */

export const APPLICATION_STEPS = [
  { id: "personal", label: "Personal Info" },
  { id: "professional", label: "Professional Info" },
  { id: "screening", label: "Screening Questions" },
  { id: "documents", label: "Document & Consent" },
] as const;

export type StepId = (typeof APPLICATION_STEPS)[number]["id"];

/**
 * NOT EXPORTED, deliberately. The document gives the form a visible header —
 * "Apply to SignSig" / "We're building the future of digital agreements. Tell
 * us about yourself." — but all four design frames show only the Back link and
 * the step tabs above "Personal Info". The document wins on copy; the design
 * still owns layout, so the header is recorded here and not rendered. The page
 * has an `sr-only` <h1> naming the role instead. Raised for the user's call.
 */

/** Desired Role — the document's four job families plus Support. */
export const DESIRED_ROLES = [
  "Engineering (Backend, Frontend, Full-stack, DevOps, Security)",
  "Product (Product Manager, Designer, Researcher)",
  "Go-to-Market (Sales, Business Development, Customer Success)",
  "Operations (HR, Finance, Legal, Communications)",
  "Support (Customer Support, Technical Support)",
] as const;

export const NOTICE_PERIODS = [
  "Immediately available",
  "1-2 weeks notice",
  "2-4 weeks notice",
  "1-3 months notice",
  "3+ months notice",
] as const;

export const EXPERIENCE_BANDS = [
  "0–1 years",
  "2–3 years",
  "4–5 years",
  "6–8 years",
  "9–12 years",
  "12+ years",
] as const;

/**
 * The six screening questions with their word limits. Question 5 is optional
 * per the document, which is why `required` is explicit rather than assumed.
 */
export const SCREENING_QUESTIONS = [
  {
    id: "interest",
    label: "Why are you interested in working at SignSig?",
    limit: 500,
    required: true,
  },
  {
    id: "complex-problem",
    label:
      "Describe a time when you solved a complex problem. What was your approach?",
    limit: 300,
    required: true,
  },
  {
    id: "disagreement",
    label:
      "Tell us about a time when you disagreed with a colleague or manager. How did you handle it?",
    limit: 300,
    required: true,
  },
  {
    id: "learning",
    label:
      "What is one thing you've learned in the past year that has changed how you work?",
    limit: 200,
    required: true,
  },
  {
    id: "relationships",
    label:
      "How do you approach building or maintaining relationships with people you work with?",
    limit: 250,
    required: false,
  },
  {
    id: "environment",
    label:
      "Describe your ideal work environment and what makes a team functional.",
    limit: 250,
    required: true,
  },
] as const;

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
