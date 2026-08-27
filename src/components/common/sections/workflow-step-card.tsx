import Image from "next/image";

import { STEP_STAGE, type WorkflowStepData } from "./workflow-steps.data";

/**
 * One card in the "How You Get Documents Signed" strip.
 *
 * Same fixed-stage treatment as the feature cards, for the same reason: the
 * three mockups were exported at 436x96, 565x179 and 670x188, so letting them
 * size themselves put the three titles at three different heights. The stage
 * locks the design's ratio and `object-contain` centres each mockup inside it.
 *
 * The stage takes `bg-card`, matching the card body, so the letterboxing
 * around the narrower mockups is invisible — the PNGs are transparent. Its
 * `p-5` matches the body's, lining the mockup's edge up with the title.
 *
 * `alt=""` for the same reason as the feature cards: it restates the title and
 * description beneath it.
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
      <div
        className="w-full bg-card p-5"
        style={{ aspectRatio: `${STEP_STAGE.width} / ${STEP_STAGE.height}` }}
      >
        {/* Padding on the parent, not here: `fill` resolves against the
            padding box and would ignore it. */}
        <div className="relative h-full w-full">
          <Image
            src={`/images/home/${image}`}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-h5 text-foreground">{title}</h3>
        <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
