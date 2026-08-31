import { ZapIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { Section } from "@/components/layout/section";
import { getBusinessAppUrl } from "@/config/site";

import { WorkflowStepCard } from "./workflow-step-card";
import { WORKFLOW_STEPS } from "./workflow-steps.data";

/**
 * "How You Get Documents Signed" — the 3-step workflow strip.
 *
 * "Get Started With SignSig" routes to the SignSig business app
 * (`getBusinessAppUrl()`), same as the hero's "Get Started" — this is where a
 * visitor actually starts using the product, not an in-repo `/sign-up` route.
 *
 * RESPONSIVE: 3 columns at `md`+ (the design's row of 3 already fits within
 * one column at the doctrine's 2-up tablet step, so 2 columns would leave an
 * awkward orphan; 3-up survives down to `md` at this card width), 1 column
 * at base.
 */
export function WorkflowSection() {
  return (
    <Section
      id="how-it-works"
      aria-labelledby="workflow-heading"
      className="rounded-2xl bg-linear-to-br from-surface-1 to-primary-subtle/40"
    >
      <div className="flex flex-col items-center text-center">
        <EyebrowBadge icon={<ZapIcon className="size-full" />}>
          SignSig Workflow
        </EyebrowBadge>

        <h2 id="workflow-heading" className="mt-4 text-h2 text-foreground">
          How You Get Documents{" "}
          <span className="text-primary-text">Signed</span>
        </h2>

        <p className="mt-4 max-w-narrow text-body-lg text-muted-foreground">
          A simple, streamlined process that gets your documents signed faster
          from upload to signature to storage.
        </p>

        <ActionButton asChild size="lg" className="mt-stack-gap">
          <a href={getBusinessAppUrl()}>Get Started With SignSig</a>
        </ActionButton>
      </div>

      <div className="mt-stack-gap grid grid-cols-1 gap-grid-gap md:grid-cols-3">
        {WORKFLOW_STEPS.map((step) => (
          <WorkflowStepCard
            key={step.id}
            title={step.title}
            description={step.description}
            image={step.image}
          />
        ))}
      </div>
    </Section>
  );
}
