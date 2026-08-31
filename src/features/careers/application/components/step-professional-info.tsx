"use client";

import {
  EXPERIENCE_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
} from "@/features/careers/application/careers-application.api";
import {
  Field,
  SelectField,
  TextField,
} from "@/features/careers/application/components/field";
import type { ApplicationDraft } from "@/features/careers/application/types";

const NOTICE_PERIOD_SELECT = NOTICE_PERIOD_OPTIONS.map((option) => ({
  value: String(option.value),
  label: option.label,
}));

const EXPERIENCE_SELECT = EXPERIENCE_OPTIONS.map((option) => ({
  value: String(option.value),
  label: option.label,
}));

/**
 * Step 2 — Professional Info.
 *
 * No "Desired Role" field, unlike the earlier UI-only version: the real Apply
 * endpoint has no such field, and applying against a specific posting already
 * says which role this is. See `careers-application.api.ts` for where Notice
 * Period and Years of Experience now come from, and the warning on their
 * option labels — real enum values, unconfirmed labels.
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
        <Field label="Notice Period" htmlFor="noticePeriod" required>
          <SelectField
            id="noticePeriod"
            value={draft.noticePeriod}
            onChange={(v) => update({ noticePeriod: v })}
            placeholder="Select"
            options={NOTICE_PERIOD_SELECT}
            required
          />
        </Field>
        <Field
          label="Years of Relevant Experience"
          htmlFor="experience"
          required
        >
          <SelectField
            id="experience"
            value={draft.experience}
            onChange={(v) => update({ experience: v })}
            placeholder="Select"
            options={EXPERIENCE_SELECT}
            required
          />
        </Field>
      </div>
    </div>
  );
}
