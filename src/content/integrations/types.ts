/**
 * Types for integration catalog entries and setup guides.
 *
 * Declared here rather than in `features/integrations` so the content files
 * can be typed without importing from the feature that renders them, which
 * would be a cycle. `features/integrations/types.ts` re-exports these. Same
 * pattern as `TrustPage` in `src/content/blocks.ts` — see STRUCTURE.md §1.1.
 */

export type IntegrationCategory =
  "productivity" | "storage" | "crm" | "hr" | "finance";

/**
 * One "Step N: ..." block in a guide.
 *
 * `note` and `block` exist for steps that are not a plain bullet list: Google
 * Drive's Step 3 is a folder tree and Slack's Step 4 is a JSON payload. A
 * directory tree rendered as bullets is unreadable — the indentation is the
 * content — so those get a `<pre>`.
 */
export type GuideStep = {
  title: string;
  /** Sentence before the list or block, e.g. "Create folders in Drive:". */
  note?: string;
  items?: readonly string[];
  /** Pre-formatted lines. Whitespace is significant. */
  block?: readonly string[];
};

/** One captioned code sample. Lines are joined with newlines into a <pre>. */
export type GuideSample = { intro: string; lines: readonly string[] };

export type IntegrationGuide = {
  /** h1 on the detail page, e.g. "Microsoft 365 Integration". */
  title: string;
  purpose: string;
  prerequisites: readonly string[];
  steps: readonly GuideStep[];
  /**
   * A list rather than a single block: the Salesforce guide ships an Apex
   * class and a separate platform-event trigger, each with its own caption.
   */
  samples: readonly GuideSample[];
  outcomeIntro: string;
  outcomes: readonly string[];
};

/** A catalog entry: everything about an integration except its guide. */
export type IntegrationEntry = {
  slug: string;
  name: string;
  description: string;
  /**
   * "Example Use Case" from the content document — a concrete team doing a
   * concrete thing. New in the document; the design's cards had none.
   */
  useCase: string;
  category: IntegrationCategory;
};

/** A catalog entry with its guide attached, if one is published. */
export type Integration = IntegrationEntry & {
  /** Undefined means no guide yet; the page shows an honest empty state. */
  guide?: IntegrationGuide;
};
