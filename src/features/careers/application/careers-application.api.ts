"use client";

/**
 * The real seam between the application form and the backend — replaces
 * `submit-application.ts`, which returned a hardcoded `not-configured` result
 * because no endpoint existed yet. It exists now: POST
 * /Careers/Roles/{id}/Apply. See docs/API.md for the pattern this follows.
 *
 * The request-body construction lives in `build-apply-form-data.ts` and the
 * notice-period/experience option labels in
 * `notice-experience-options.data.ts` — both re-exported here so the rest of
 * the feature only needs one import path. Read both files' warnings before
 * touching either: the multipart array encoding and the enum-to-label
 * mapping are both best-effort, not verified against a live server.
 */

import { useMutation } from "@tanstack/react-query";

import type { JobApplicationSubmitted } from "@/features/careers/careers.types";
import { postService } from "@/lib/api/methods";
import type { MutationOptionsWithError } from "@/lib/api/types";

import { buildApplyFormData, type ApplyPayload } from "./build-apply-form-data";

export type { ApplyPayload };
export {
  EXPERIENCE_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
} from "./notice-experience-options.data";

export function useSubmitApplication(
  options: MutationOptionsWithError<ApplyPayload, JobApplicationSubmitted> = {},
) {
  return useMutation({
    mutationFn: (payload: ApplyPayload) =>
      postService<FormData, JobApplicationSubmitted>(
        `/Careers/Roles/${payload.roleId}/Apply`,
        buildApplyFormData(payload),
      ),
    ...options,
  });
}
