/**
 * The `ApplyPayload` type and the multipart `FormData` it becomes — split out
 * of `careers-application.api.ts` to keep that file under the line ceiling.
 *
 * ⚠ `ScreeningAnswers[i].questionId` / `.answer` is a BEST-EFFORT multipart
 * array encoding. `swagger.json` shows the field as an array of
 * `{questionId, answer}` with no `encoding` style beyond the default, which
 * doesn't disambiguate how an ASP.NET Core `[FromForm]` list expects a nested
 * array serialized over multipart/form-data. This is the standard convention
 * for that binder — but it is a convention, not something the spec states
 * outright. Verify against a live server before trusting it in production.
 */

import { COUNTRIES } from "@/config/countries";

export type ApplyPayload = {
  roleId: number;
  firstName: string;
  lastName: string;
  email: string;
  /** ISO 3166-1 alpha-2 — resolved to a display name before sending; see below. */
  country: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  jobTitle: string;
  employer: string;
  noticePeriod: number;
  experience: number;
  screeningAnswers: readonly { questionId: number; answer: string }[];
  resume: File;
  coverLetter: File | null;
  /** Alternative to uploading a cover letter — see below. */
  coverLetterText: string;
  consentStore: boolean;
  consentPrivacy: boolean;
};

/**
 * `Country` in the schema is a bare `string` with no format hint. Sending the
 * two-letter code this form stores internally (see `config/countries.ts`)
 * risks looking like a typo to whatever reads it downstream, so this resolves
 * it to the display name shown in the dropdown — "Nigeria", not "NG".
 */
function countryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name ?? code;
}

export function buildApplyFormData(payload: ApplyPayload): FormData {
  const body = new FormData();
  body.append("FirstName", payload.firstName);
  body.append("LastName", payload.lastName);
  body.append("Email", payload.email);
  body.append("Country", countryName(payload.country));
  body.append("PhoneNumber", payload.phone);
  body.append("LinkedInProfileUrl", payload.linkedIn);
  body.append("PortfolioUrl", payload.portfolio);
  body.append("CurrentJobTitle", payload.jobTitle);
  body.append("CurrentEmployer", payload.employer);
  body.append("NoticePeriod", String(payload.noticePeriod));
  body.append("YearsOfRelevantExperience", String(payload.experience));

  payload.screeningAnswers.forEach((answer, index) => {
    body.append(
      `ScreeningAnswers[${index}].questionId`,
      String(answer.questionId),
    );
    body.append(`ScreeningAnswers[${index}].answer`, answer.answer);
  });

  body.append("Resume", payload.resume);

  // The schema has one binary CoverLetter field — no text-body equivalent for
  // the content document's "write it inline" alternative. A typed cover
  // letter is packaged into a plain-text file so that alternative still
  // reaches the backend, rather than being silently dropped for not fitting
  // the wire format. An actual uploaded file wins if both are present.
  if (payload.coverLetter) {
    body.append("CoverLetter", payload.coverLetter);
  } else if (payload.coverLetterText.trim()) {
    body.append(
      "CoverLetter",
      new File([payload.coverLetterText], "cover-letter.txt", {
        type: "text/plain",
      }),
    );
  }

  body.append("AgreedToDataStorage", String(payload.consentStore));
  body.append("AgreedToPrivacyPolicy", String(payload.consentPrivacy));
  return body;
}
