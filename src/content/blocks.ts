/**
 * The block vocabulary shared by every long-form page — the three legal
 * policies and the five trust/compliance pages.
 *
 * WHY `src/content/` AND NOT `src/features/`
 *
 * These files are transcribed prose, not code. The 150-line ceiling is a
 * detector for components doing too much; a Privacy Policy is 15 sections
 * because the law has 15 things to say about it, and splitting it into
 * `privacy-part-2.ts` would be the rule violated with extra steps. ESLint's
 * `max-lines` covers `src/app`, `src/components` and `src/features` only, so
 * copy lives here and the components that render it stay small.
 *
 * Nothing in this directory may import from `src/components` or
 * `src/features`. Content is data; it does not know how it is displayed.
 */

export type ContentBlock =
  /** A plain paragraph. */
  | { kind: "paragraph"; text: string }
  /** A sub-heading inside a section — renders as `<h3>`. */
  | { kind: "subheading"; text: string }
  /**
   * A bold standalone line that introduces the list beneath it, e.g.
   * "Key Requirements:". Distinct from `labelled`, which has body text on
   * the same line.
   */
  | { kind: "lead"; text: string }
  /** A bold lead-in with its own text, e.g. "Ownership: You retain…". */
  | { kind: "labelled"; label: string; text: string }
  | { kind: "list"; items: readonly string[] }
  /**
   * A real data table — the Cookie Policy's cookie inventories and the ISO
   * 27001 subprocessor list. Rows must have one cell per column.
   */
  | {
      kind: "table";
      caption: string;
      columns: readonly string[];
      rows: readonly (readonly string[])[];
    };

export type ContentSection = {
  /** e.g. "1. ACCEPTANCE OF TERMS" or "WHAT IS SOC 2?". */
  heading: string;
  blocks: readonly ContentBlock[];
};

/** A question and its answer. Feeds both the accordion and FAQPage JSON-LD. */
export type ContentFaq = {
  question: string;
  answer: string;
};

/**
 * A trust / compliance page — SOC 2, GDPR, HIPAA, ISO 27001, Security &
 * Compliance. The document gives all five the same shape.
 *
 * Declared here rather than in `features/trust` so the content files can be
 * typed without importing from the feature that renders them, which would be
 * a cycle. `features/trust/trust.data.ts` re-exports it.
 */
export type TrustPage = {
  /** Last path segment, and the `[slug]` param for `/compliance/[slug]`. */
  slug: string;
  /** Full route path — Security & Compliance is not under `/compliance`. */
  path: string;
  /** Browser/tab title and `<h1>`. */
  title: string;
  /** The document's "Headline:" line, shown as the lead. */
  headline: string;
  /** The document's "Introduction:" paragraph. */
  intro: string;
  sections: readonly ContentSection[];
  faqs: readonly ContentFaq[];
  /** The document's "CTA:" line, plus where it should go. */
  cta: { label: string; href: string };
};
