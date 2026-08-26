/**
 * The FAQ list. Copy transcribed verbatim from the design.
 *
 * The design only shows the FIRST question's answer expanded — the other 4
 * are visible but collapsed, with their answers not present anywhere in the
 * design. Per the user's direction (2026-08-24, see docs/DECISIONS.md), those
 * 4 render as static, non-expandable rows until real answers are supplied,
 * and are excluded from `buildFaqSchema()` so structured data never asserts
 * content that isn't actually on the page.
 */
export type FaqEntry = {
  question: string;
  /** Undefined means "no answer yet" — renders as a static, closed row. */
  answer?: string;
};

export const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    question: "Is SignSig really open source?",
    answer:
      "Yes. The entire core platform is fully open source, transparent, and auditable. You can inspect the codebase, contribute, or self-host SignSig on your own infrastructure for complete control.",
  },
  { question: "Can I deploy SignSig on-premise or self-hosted?" },
  { question: "Are SignSig signatures legally binding?" },
  { question: "Does SignSig support workflow automation?" },
  { question: "Can developers integrate SignSig into their apps?" },
] as const;
