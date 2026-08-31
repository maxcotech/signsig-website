"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { countWords } from "@/features/careers/application/application.data";
import type { ApplicationDraft } from "@/features/careers/application/types";
import type { JobScreeningQuestion } from "@/features/careers/careers.types";
import { cn } from "@/lib/utils";

/**
 * Step 3 — Screening Questions.
 *
 * `questions` now comes from GET /Careers/ScreeningQuestions, fetched
 * server-side by the apply page and passed down — not a static local array.
 * Word limits are `question.maxWords`, from the API.
 *
 * ⚠ Every question renders as required. The API gives no per-question
 * required flag (unlike the earlier content-document-driven version, which
 * had one optional question) — `JobScreeningQuestionResponse` is just
 * `{id, questionText, maxWords, sortOrder}`. Requiring all of them is the
 * conservative default until the backend exposes one.
 *
 * The counter is NOT a hard cap: typing past the limit turns it destructive
 * and blocks the step rather than silently truncating what someone wrote.
 * Truncating mid-sentence is the one behaviour guaranteed to lose an answer
 * the candidate thought they had given.
 *
 * `aria-describedby` ties each counter to its field so the limit and the
 * current count are announced with the question, not stranded as decoration.
 */
export function StepScreening({
  questions,
  draft,
  update,
}: {
  questions: readonly JobScreeningQuestion[];
  draft: ApplicationDraft;
  update: (patch: Partial<ApplicationDraft>) => void;
}) {
  function setAnswer(id: string, value: string) {
    update({ answers: { ...draft.answers, [id]: value } });
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-body font-semibold text-foreground">
        Screening Questions
      </h2>

      {questions.map((question) => {
        const key = String(question.id);
        const value = draft.answers[key] ?? "";
        const words = countWords(value);
        const over = words > question.maxWords;
        const fieldId = `screening-${key}`;
        const counterId = `${fieldId}-count`;

        return (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={fieldId} className="text-body-sm text-foreground">
              {question.questionText}
              <span aria-hidden="true" className="text-muted-foreground">
                {" *"}
              </span>
            </Label>

            <div className="relative">
              <Textarea
                id={fieldId}
                value={value}
                onChange={(event) => setAnswer(key, event.target.value)}
                placeholder="Enter response"
                required
                aria-describedby={counterId}
                aria-invalid={over || undefined}
                className="min-h-28 rounded-lg pr-28 text-body-sm"
              />
              <span
                id={counterId}
                aria-live="polite"
                className={cn(
                  "pointer-events-none absolute top-3 right-4 text-body-sm",
                  over ? "text-destructive-text" : "text-muted-foreground",
                )}
              >
                {words}/{question.maxWords} words
              </span>
            </div>

            {over && (
              <p className="text-body-sm text-destructive-text">
                {words - question.maxWords} word
                {words - question.maxWords === 1 ? "" : "s"} over the limit.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
