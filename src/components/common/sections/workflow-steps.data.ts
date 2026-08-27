/**
 * The 3-step "How You Get Documents Signed" strip. Copy transcribed verbatim
 * from the design, including its inconsistent trailing punctuation (steps 2
 * and 3 end without a period in the source).
 *
 * `image` is the step's mockup. Same trap as the feature cards: the three
 * exports are cropped tight to their artwork and are NOT the same size —
 * 436x96, 565x179 and 670x188, ratios 4.54 / 3.16 / 3.56. STEP_STAGE is what
 * keeps the three cards aligned.
 */
export type WorkflowStepData = {
  id: string;
  title: string;
  description: string;
  /** Filename inside /images/home/. Sizes vary — see STEP_STAGE. */
  image: string;
};

/**
 * The mockup STAGE — the fixed box every step image is fitted into. NOT the
 * files' intrinsic size; all three differ.
 *
 * 633x248 is the design's stage, kept from the original transcription and
 * corroborated by re-measuring Home.png: the cards are 610 design px wide and
 * the artwork centres on a stage of roughly 236 design px, i.e. a ratio of
 * ~2.59 against this constant's 2.55. It was previously handed to next/image
 * as each file's real size, which it never was, so the rendered heights came
 * from the files' own ratios and the three cards did not line up.
 */
export const STEP_STAGE = { width: 633, height: 248 } as const;

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
