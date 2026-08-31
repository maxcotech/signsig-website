import { ActionButton } from "@/components/common/action-button";
import { CONSENT } from "@/features/careers/application/application.data";

/**
 * The Back/Next/Submit row plus the final-step consent note. Split out of
 * `<ApplicationForm>` purely to clear the 150-line ceiling — this is UI, not
 * state; all of it lives in the parent form's `<form>` element.
 */
export function ApplicationFormFooter({
  stepIndex,
  isLast,
  isPending,
  onBack,
}: {
  stepIndex: number;
  isLast: boolean;
  isPending: boolean;
  onBack: () => void;
}) {
  return (
    <>
      <div className="mt-stack-gap flex flex-wrap items-center justify-center gap-4">
        <ActionButton
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={stepIndex === 0}
        >
          Back
        </ActionButton>
        <ActionButton type="submit" size="lg" disabled={isPending}>
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
    </>
  );
}
