"use client";

import {
  DESIRED_ROLES,
  EXPERIENCE_BANDS,
  NOTICE_PERIODS,
} from "@/features/careers/application/application.data";
import {
  Field,
  SelectField,
  TextField,
} from "@/features/careers/application/components/field";
import type { ApplicationDraft } from "@/features/careers/application/types";

/**
 * "Desired Role" is the content document's five JOB FAMILIES, not the list of
 * currently-open roles. That is deliberate: a candidate applies to an area,
 * and the specific opening they came from is already known from the route.
 * It also means the dropdown does not empty out when a posting closes.
 */
const ROLE_OPTIONS = DESIRED_ROLES.map((role) => ({
  value: role,
  label: role,
}));

const toOptions = (values: readonly string[]) =>
  values.map((value) => ({ value, label: value }));

/**
 * Step 2 — Professional Info.
 *
 * All three option sets now come from the content document rather than being
 * inferred from a closed dropdown in the design. See application.data.ts.
 */
export function StepProfessionalInfo({
  draft,
  update,
}: {
  draft: ApplicationDraft;
  update: (patch: Partial<ApplicationDraft>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-body font-semibold text-foreground">
        Professional Info
      </h2>

      <Field label="Current Job Title" htmlFor="jobTitle" required>
        <TextField
          id="jobTitle"
          value={draft.jobTitle}
          onChange={(v) => update({ jobTitle: v })}
          placeholder="Software Engineer"
          autoComplete="organization-title"
          required
        />
      </Field>

      <Field label="Current Employer" htmlFor="employer" required>
        <TextField
          id="employer"
          value={draft.employer}
          onChange={(v) => update({ employer: v })}
          placeholder="Acme Corporation"
          autoComplete="organization"
          required
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Desired Role" htmlFor="desiredRole" required>
          <SelectField
            id="desiredRole"
            value={draft.desiredRole}
            onChange={(v) => update({ desiredRole: v })}
            placeholder="Select"
            options={ROLE_OPTIONS}
            required
          />
        </Field>
        <Field label="Notice Period" htmlFor="noticePeriod" required>
          <SelectField
            id="noticePeriod"
            value={draft.noticePeriod}
            onChange={(v) => update({ noticePeriod: v })}
            placeholder="Select"
            options={toOptions(NOTICE_PERIODS)}
            required
          />
        </Field>
      </div>

      {/* Full width in the design, unlike the paired row above it. */}
      <Field label="Years of Relevant Experience" htmlFor="experience" required>
        <SelectField
          id="experience"
          value={draft.experience}
          onChange={(v) => update({ experience: v })}
          placeholder="Select"
          options={toOptions(EXPERIENCE_BANDS)}
          required
        />
      </Field>
    </div>
  );
}
