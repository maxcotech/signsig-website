"use client";

import { useState } from "react";

import { ActionButton } from "@/components/common/action-button";
import {
  APPLICATION_STEPS,
  CONSENT,
  SCREENING_QUESTIONS,
  countWords,
} from "@/features/careers/application/application.data";
import { StepBody } from "@/features/careers/application/components/step-body";
import { StepTabs } from "@/features/careers/application/components/step-tabs";
import { SuccessDialog } from "@/features/careers/application/components/success-dialog";
import { submitApplication } from "@/features/careers/application/submit-application";
import {
  emptyDraft,
  type ApplicationDraft,
} from "@/features/careers/application/types";

/**
 * The four-step application wizard.
 *
 * Each step is its own `<form>`, so "Next" is a real submit button and the
 * browser's own constraint validation runs before advancing — required fields,
 * email and URL formats all enforced with no validation library and no custom
 * error plumbing. The final step's submit calls `submitApplication()`.
 *
 * ⚠ NOTHING IS SENT. `submitApplication()` has no endpoint yet and returns
 * `not-configured`, which surfaces as the visible alert below. The success
 * dialog is only reachable on `{ ok: true }` — see submit-application.ts for
 * why that matters and how to wire it up.
 *
 * Draft state is one flat object in this component. It is deliberately NOT
 * persisted to localStorage: it holds a CV, a phone number and a LinkedIn
 * profile, and leaving that in browser storage on a shared machine is a
 * privacy problem, not a convenience feature.
 */
export function ApplicationForm({ roleSlug }: { roleSlug: string }) {
  const [draft, setDraft] = useState<ApplicationDraft>(() =>
    emptyDraft(roleSlug),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const update = (patch: Partial<ApplicationDraft>) =>
    setDraft((current) => ({ ...current, ...patch }));

  const step = APPLICATION_STEPS[stepIndex];
  const isLast = stepIndex === APPLICATION_STEPS.length - 1;

  /** Word limits are not enforceable by the browser, so check them here. */
  function screeningOverLimit(): boolean {
    return SCREENING_QUESTIONS.some(
      (q) => countWords(draft.answers[q.id] ?? "") > q.limit,
    );
  }

  function goTo(index: number) {
    setError(null);
    setStepIndex(index);
    setFurthest((f) => Math.max(f, index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (step.id === "screening" && screeningOverLimit()) {
      setError("One or more answers are over the word limit.");
      return;
    }

    if (!isLast) {
      goTo(stepIndex + 1);
      return;
    }

    setIsSending(true);
    const result = await submitApplication(draft);
    setIsSending(false);

    if (result.ok) setSubmitted(true);
    else setError(result.message);
  }

  return (
    <>
      <StepTabs current={step.id} furthest={furthest} onSelect={goTo} />

      {/* key remounts the form per step so the browser validates only the
          fields currently on screen. */}
      <form key={step.id} onSubmit={handleSubmit} noValidate={false}>
        <div className="mt-8">
          <StepBody stepId={step.id} draft={draft} update={update} />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-destructive-subtle p-4 text-body-sm text-destructive-text"
          >
            {error}
          </p>
        )}

        <div className="mt-stack-gap flex flex-wrap items-center justify-center gap-4">
          <ActionButton
            type="button"
            variant="outline"
            size="lg"
            onClick={() => goTo(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
          >
            Back
          </ActionButton>
          <ActionButton type="submit" size="lg" disabled={isSending}>
            {isLast ? "Submit Application" : "Next"}
          </ActionButton>
        </div>

        {/* Content-document copy that isn't in the design. Only on the final
            step, where it is a statement about what happens next rather than
            a claim floating over an unfinished form. */}
        {isLast && (
          <p className="mt-4 text-center text-body-sm text-muted-foreground">
            {CONSENT.submitNote}
          </p>
        )}
      </form>

      <SuccessDialog open={submitted} />
    </>
  );
}
