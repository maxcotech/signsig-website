import Image from "next/image";

import { STEP_IMAGE_SIZE, type WorkflowStepData } from "./workflow-steps.data";

/**
 * One card in the "How You Get Documents Signed" strip.
 *
 * The mockup image supplies its own card-coloured background, so it sits
 * flush at the top of the card. `alt=""` for the same reason as the feature
 * cards: it restates the title and description beneath it.
 */
export type WorkflowStepCardProps = Pick<
  WorkflowStepData,
  "title" | "description" | "image"
>;

export function WorkflowStepCard({
  title,
  description,
  image,
}: WorkflowStepCardProps) {
  return (
    <div className="flex animate-in-view flex-col overflow-hidden rounded-xl bg-card shadow-card">
      <Image
        src={`/images/home/${image}`}
        alt=""
        width={STEP_IMAGE_SIZE.width}
        height={STEP_IMAGE_SIZE.height}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="w-full bg-card"
      />
      <div className="p-5">
        <h3 className="text-h5 text-foreground">{title}</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
