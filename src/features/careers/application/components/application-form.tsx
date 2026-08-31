"use client";

import { useState } from "react";

import {
  APPLICATION_STEPS,
  countWords,
} from "@/features/careers/application/application.data";
import { useSubmitApplication } from "@/features/careers/application/careers-application.api";
import { ApplicationFormFooter } from "@/features/careers/application/components/application-form-footer";
import { StepBody } from "@/features/careers/application/components/step-body";
import { StepTabs } from "@/features/careers/application/components/step-tabs";
import { SuccessDialog } from "@/features/careers/application/components/success-dialog";
import { draftToApplyPayload } from "@/features/careers/application/draft-to-apply-payload";
import {
  emptyDraft,
  type ApplicationDraft,
} from "@/features/careers/application/types";
import type { JobScreeningQuestion } from "@/features/careers/careers.types";

/**
 * The four-step application wizard.
 *
 * Each step is its own `<form>`, so "Next" is a real submit button and the
 * browser's own constraint validation runs before advancing — required fields,
 * email and URL formats all enforced with no validation library and no custom
 * error plumbing. The final step's submit calls the real
 * `useSubmitApplication()` mutation — POST /Careers/Roles/{id}/Apply.
 *
 * Draft state is one flat object in this component. It is deliberately NOT
 * persisted to localStorage: it holds a CV, a phone number and a LinkedIn
 * profile, and leaving that in browser storage on a shared machine is a
 * privacy problem, not a convenience feature.
 */
export function ApplicationForm({
  roleId,
  questions,
}: {
  roleId: number;
  questions: readonly JobScreeningQuestion[];
}) {
  const [draft, setDraft] = useState<ApplicationDraft>(() =>
    emptyDraft(roleId),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitApplication();

  const update = (patch: Partial<ApplicationDraft>) =>
    setDraft((current) => ({ ...current, ...patch }));

  const step = APPLICATION_STEPS[stepIndex];
  const isLast = stepIndex === APPLICATION_STEPS.length - 1;

  /** Word limits are not enforceable by the browser, so check them here. */
  function screeningOverLimit(): boolean {
    return questions.some(
      (q) => countWords(draft.answers[String(q.id)] ?? "") > q.maxWords,
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

    // The browser's own `required` on the dropzone already blocks getting
    // this far without a résumé; this is a defensive backstop for the type,
    // not the primary guard.
    if (!draft.resume) {
      setError("Please attach your résumé before submitting.");
      return;
    }

    try {
      await mutateAsync(draftToApplyPayload(draft, questions));
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your application. Please try again, or email your CV to support@signsig.com.",
      );
    }
  }

  return (
    <>
      <StepTabs current={step.id} furthest={furthest} onSelect={goTo} />

      {/* key remounts the form per step so the browser validates only the
          fields currently on screen. */}
      <form key={step.id} onSubmit={handleSubmit} noValidate={false}>
        <div className="mt-8">
          <StepBody
            stepId={step.id}
            questions={questions}
            draft={draft}
            update={update}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-destructive-subtle p-4 text-body-sm text-destructive-text"
          >
            {error}
          </p>
        )}

        <ApplicationFormFooter
          stepIndex={stepIndex}
          isLast={isLast}
          isPending={isPending}
          onBack={() => goTo(Math.max(0, stepIndex - 1))}
        />
      </form>

      <SuccessDialog open={submitted} />
    </>
  );
}
