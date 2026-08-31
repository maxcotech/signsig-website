/**
 * `NoticePeriod` and `YearsOfRelevantExperience` option labels for the two
 * remaining `<select>`s in Step 2 — split out of `careers-application.api.ts`
 * to keep that file under the line ceiling; read the warning below before
 * touching either list.
 *
 * ⚠ BOTH ARE BEST-EFFORT. `NoticePeriod` and `YearsOfRelevantExperience` are
 * bare integer enums (1–5 each) with zero label metadata anywhere in
 * `swagger.json` — no `x-enum-varnames`, no description, and no sibling
 * `...Text` field the way `employmentType` gets `employmentTypeText`. The
 * labels below are this site's existing content-document copy, kept as the
 * most plausible ordering (ascending urgency / ascending experience), but the
 * number a given label maps to has NOT been confirmed against the backend's
 * own definition of those five values. Verify before this goes to production.
 */

export const NOTICE_PERIOD_OPTIONS = [
  { value: 1, label: "Immediately available" },
  { value: 2, label: "1-2 weeks notice" },
  { value: 3, label: "2-4 weeks notice" },
  { value: 4, label: "1-3 months notice" },
  { value: 5, label: "3+ months notice" },
] as const;

/**
 * The content document's original list had SIX bands ("0–1", "2–3", "4–5",
 * "6–8", "9–12", "12+"), one more than this enum's five values. Rather than
 * invent a fresh five-way split, the first four bands are kept verbatim and
 * only the top two are merged ("9–12" + "12+" → "9+") — the smallest change
 * that fits the contract, not a new guess at every boundary.
 */
export const EXPERIENCE_OPTIONS = [
  { value: 1, label: "0–1 years" },
  { value: 2, label: "2–3 years" },
  { value: 3, label: "4–5 years" },
  { value: 4, label: "6–8 years" },
  { value: 5, label: "9+ years" },
] as const;
