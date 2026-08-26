/**
 * The 3-step "How You Get Documents Signed" strip. Copy transcribed verbatim
 * from the design, including its inconsistent trailing punctuation (steps 2
 * and 3 end without a period in the source).
 *
 * `image` is the step's mockup, extracted from the design at 633x248 (see
 * public/images/README.md).
 */
export type WorkflowStepData = {
  id: string;
  title: string;
  description: string;
  /** Filename inside /images/home/. Every step image is 633x248. */
  image: string;
};

/** Intrinsic size of every workflow-step mockup, for next/image. */
export const STEP_IMAGE_SIZE = { width: 633, height: 248 } as const;

export const WORKFLOW_STEPS: readonly WorkflowStepData[] = [
  {
    id: "upload",
    title: "Upload or Create",
    description:
      "Upload PDFs, Word files, or build documents from scratch. Add signature fields, dates, and any custom data you need.",
    image: "step-upload-or-create.png",
  },
  {
    id: "send",
    title: "Send to sign",
    description:
      "Recipients sign from any device, no need for account creation. Set signing order, add deadlines",
    image: "step-send-to-sign.png",
  },
  {
    id: "track",
    title: "Track and manage",
    description:
      "Monitor progress in real time. Receive notifications when documents are viewed or signed",
    image: "step-track-and-manage.png",
  },
] as const;
