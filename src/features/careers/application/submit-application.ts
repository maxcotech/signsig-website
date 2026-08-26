/**
 * The single seam between the application form and whatever receives it.
 *
 * ⚠⚠ NOT CONNECTED TO ANYTHING. There is no endpoint yet (2026-08-25), and the
 * user asked for the UI only in the meantime.
 *
 * This form collects PII — name, email, phone, LinkedIn, CV and cover letter —
 * and the consent copy explicitly promises SignSig will store it for 12
 * months. So the one thing this must never do is report success without
 * having sent anything: a candidate who sees a confirmation stops looking for
 * the job. `submitApplication()` therefore returns an explicit
 * `not-configured` result, the form surfaces it as a visible error, and the
 * success dialog is only ever reached on `{ ok: true }`.
 *
 * WIRING IT UP — replace the body only, keep the signature:
 *
 *   const body = new FormData();
 *   // ...append fields and files...
 *   const res = await fetch(process.env.NEXT_PUBLIC_APPLICATIONS_ENDPOINT!, {
 *     method: "POST", body,
 *   });
 *   return res.ok ? { ok: true } : { ok: false, reason: "failed" };
 *
 * Nothing in `components/` needs to change — it already branches on the result.
 * Note the files are real `File` objects held in component state, so a
 * multipart `FormData` POST works without any further plumbing.
 */

import type { ApplicationDraft } from "./types";

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "failed"; message: string };

export async function submitApplication(
  _draft: ApplicationDraft,
): Promise<SubmitResult> {
  return {
    ok: false,
    reason: "not-configured",
    message:
      "Applications aren't open through this form yet. Please email your CV to support@signsig.com and we'll pick it up from there.",
  };
}
