"use client";

import { COUNTRIES } from "@/config/countries";
import {
  Field,
  SelectField,
  TextField,
} from "@/features/careers/application/components/field";
import type { ApplicationDraft } from "@/features/careers/application/types";

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.code,
  label: c.name,
}));

/**
 * Step 1 — Personal Info.
 *
 * Field pairing follows the design: name split across two columns, email full
 * width, country/phone paired, then the two profile URLs full width. All
 * stack to one column below `sm`.
 *
 * Input `type`s do real work here: `email` and `url` give free browser
 * validation and the right mobile keyboard, and `autoComplete` lets a password
 * manager fill the block in one go.
 */
export function StepPersonalInfo({
  draft,
  update,
}: {
  draft: ApplicationDraft;
  update: (patch: Partial<ApplicationDraft>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-body font-semibold text-foreground">Personal Info</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" htmlFor="firstName" required>
          <TextField
            id="firstName"
            value={draft.firstName}
            onChange={(v) => update({ firstName: v })}
            placeholder="John"
            autoComplete="given-name"
            required
          />
        </Field>
        <Field label="Last Name" htmlFor="lastName" required>
          <TextField
            id="lastName"
            value={draft.lastName}
            onChange={(v) => update({ lastName: v })}
            placeholder="Doe"
            autoComplete="family-name"
            required
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" required>
        <TextField
          id="email"
          type="email"
          value={draft.email}
          onChange={(v) => update({ email: v })}
          placeholder="john@example.com"
          autoComplete="email"
          required
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Country" htmlFor="country" required>
          <SelectField
            id="country"
            value={draft.country}
            onChange={(v) => update({ country: v })}
            placeholder="Select country"
            options={COUNTRY_OPTIONS}
            required
          />
        </Field>
        <Field label="Phone Number" htmlFor="phone" required>
          <TextField
            id="phone"
            type="tel"
            value={draft.phone}
            onChange={(v) => update({ phone: v })}
            placeholder="+1 (555) 123-4567"
            autoComplete="tel"
            required
          />
        </Field>
      </div>

      <Field
        label="LinkedIn Profile"
        htmlFor="linkedIn"
        help="Optional but recommended"
      >
        <TextField
          id="linkedIn"
          type="url"
          value={draft.linkedIn}
          onChange={(v) => update({ linkedIn: v })}
          placeholder="https://linkedin.com/in/johndoe"
          aria-describedby="linkedIn-help"
        />
      </Field>

      <Field
        label="Portfolio / GitHub"
        htmlFor="portfolio"
        help="Link to your work or GitHub profile. Required for engineering roles."
      >
        <TextField
          id="portfolio"
          type="url"
          value={draft.portfolio}
          onChange={(v) => update({ portfolio: v })}
          placeholder="https://github.com/johndoe"
          aria-describedby="portfolio-help"
        />
      </Field>
    </div>
  );
}
