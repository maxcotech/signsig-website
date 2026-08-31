import type { ApplyPayload } from "@/features/careers/application/build-apply-form-data";
import type { ApplicationDraft } from "@/features/careers/application/types";
import type { JobScreeningQuestion } from "@/features/careers/careers.types";

/**
 * Maps the wizard's flat draft state onto the shape the Apply endpoint
 * expects. Split out of `<ApplicationForm>` so that component stays the
 * wizard's state machine and doesn't also own request-shape knowledge.
 *
 * Screening answers are built from `questions`, not from `draft.answers`
 * directly, so a question the candidate never focused stays represented as
 * an empty string rather than being missing from the array entirely.
 */
export function draftToApplyPayload(
  draft: ApplicationDraft,
  questions: readonly JobScreeningQuestion[],
): ApplyPayload {
  return {
    roleId: draft.roleId,
    firstName: draft.firstName,
    lastName: draft.lastName,
    email: draft.email,
    country: draft.country,
    phone: draft.phone,
    linkedIn: draft.linkedIn,
    portfolio: draft.portfolio,
    jobTitle: draft.jobTitle,
    employer: draft.employer,
    noticePeriod: Number(draft.noticePeriod),
    experience: Number(draft.experience),
    screeningAnswers: questions.map((q) => ({
      questionId: q.id,
      answer: draft.answers[String(q.id)] ?? "",
    })),
    // Callers guard `!draft.resume` before invoking this — see
    // <ApplicationForm>'s handleSubmit.
    resume: draft.resume as File,
    coverLetter: draft.coverLetter,
    coverLetterText: draft.coverLetterText,
    consentStore: draft.consentStore,
    consentPrivacy: draft.consentPrivacy,
  };
}
