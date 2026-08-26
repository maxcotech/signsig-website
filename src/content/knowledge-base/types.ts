/**
 * Knowledge-base types.
 *
 * Declared here, not in the feature, so the content file can be typed without
 * importing from what renders it. `features/knowledge-base/collections.data.ts`
 * re-exports these. See STRUCTURE.md §1.1.
 */

export type KbArticle = {
  title: string;
  /**
   * One-line summary. Only the "Getting Started" articles have one in the
   * content document; the rest are bare titles.
   */
  description?: string;
};

/**
 * A run of articles, optionally under a sub-heading.
 *
 * "Common Tasks" is the only collection the document sub-divides (Creating
 * Documents / Sending for Signature / Managing Workflows / Tracking &
 * Managing). Every other collection is one untitled group.
 */
export type KbGroup = {
  title?: string;
  articles: readonly KbArticle[];
};

export type KbCollection = {
  slug: string;
  /** Card title and collection heading. */
  title: string;
  groups: readonly KbGroup[];
};
