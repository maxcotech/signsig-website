"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SCREENING_QUESTIONS,
  countWords,
} from "@/features/careers/application/application.data";
import type { ApplicationDraft } from "@/features/careers/application/types";
import { cn } from "@/lib/utils";

/**
 * Step 3 — Screening Questions.
 *
 * Six textareas, each with the design's own word limit shown as "N/limit
 * words".
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
  draft,
  update,
}: {
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

      {SCREENING_QUESTIONS.map((question) => {
        const value = draft.answers[question.id] ?? "";
        const words = countWords(value);
        const over = words > question.limit;
        const counterId = `${question.id}-count`;

        return (
          <div key={question.id} className="flex flex-col gap-2">
            {/* The `*` is rendered from the data's `required` flag rather than
                being baked into the label string, so the marker and the actual
                constraint can never disagree. Question 5 is optional. */}
            <Label
              htmlFor={question.id}
              className="text-body-sm text-foreground"
            >
              {question.label}
              {question.required && (
                <span aria-hidden="true" className="text-muted-foreground">
                  {" *"}
                </span>
              )}
            </Label>

            <div className="relative">
              <Textarea
                id={question.id}
                value={value}
                onChange={(event) => setAnswer(question.id, event.target.value)}
                placeholder="Enter response"
                required={question.required}
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
                {words}/{question.limit} words
              </span>
            </div>

            {over && (
              <p className="text-body-sm text-destructive-text">
                {words - question.limit} word
                {words - question.limit === 1 ? "" : "s"} over the limit.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
