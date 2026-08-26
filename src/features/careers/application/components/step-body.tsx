"use client";

import type { StepId } from "@/features/careers/application/application.data";
import { StepDocuments } from "@/features/careers/application/components/step-documents";
import { StepPersonalInfo } from "@/features/careers/application/components/step-personal-info";
import { StepProfessionalInfo } from "@/features/careers/application/components/step-professional-info";
import { StepScreening } from "@/features/careers/application/components/step-screening";
import type { ApplicationDraft } from "@/features/careers/application/types";

/**
 * Which step is on screen.
 *
 * Split out of `<ApplicationForm>` so that component is the wizard's state
 * machine and nothing else — this file is the only place that knows the four
 * steps map to four components, and adding a fifth touches only here.
 */
export function StepBody({
  stepId,
  draft,
  update,
}: {
  stepId: StepId;
  draft: ApplicationDraft;
  update: (patch: Partial<ApplicationDraft>) => void;
}) {
  switch (stepId) {
    case "personal":
      return <StepPersonalInfo draft={draft} update={update} />;
    case "professional":
      return <StepProfessionalInfo draft={draft} update={update} />;
    case "screening":
      return <StepScreening draft={draft} update={update} />;
    case "documents":
      return <StepDocuments draft={draft} update={update} />;
  }
}
