import { KB_COLLECTIONS, KB_PAGE } from "@/content/knowledge-base/collections";
import type { KbCollection } from "@/content/knowledge-base/types";

/**
 * Knowledge-base registry and helpers.
 *
 * The content — eight collections, 52 article titles, the page copy — lives in
 * `src/content/knowledge-base/`. This file is the feature's public face: it
 * re-exports it and owns the derived values and search.
 *
 * ⚠ Article bodies do not exist yet. See the content file for why they are
 * rendered as a list rather than links.
 */

export type {
  KbArticle,
  KbCollection,
  KbGroup,
} from "@/content/knowledge-base/types";
export { KB_COLLECTIONS, KB_PAGE };

export function findCollection(slug: string): KbCollection | undefined {
  return KB_COLLECTIONS.find((collection) => collection.slug === slug);
}

/**
 * Total articles in a collection, across its groups.
 *
 * Derived, never hardcoded: the design's cards all read "9 Questions"
 * regardless of content, and a card must not advertise a number the page does
 * not have.
 */
export function articleCount(collection: KbCollection): number {
  return collection.groups.reduce(
    (total, group) => total + group.articles.length,
    0,
  );
}

/** "12 articles" / "1 article" / "No articles yet". */
export function articleCountLabel(count: number): string {
  if (count === 0) return "No articles yet";
  return `${count} ${count === 1 ? "article" : "articles"}`;
}

/** Every article in a collection, flattened. */
export function collectionArticles(collection: KbCollection) {
  return collection.groups.flatMap((group) => group.articles);
}

/** Case-insensitive match on the collection title, a group title or an article. */
export function collectionMatches(
  collection: KbCollection,
  query: string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (collection.title.toLowerCase().includes(q)) return true;
  return collection.groups.some(
    (group) =>
      group.title?.toLowerCase().includes(q) ||
      group.articles.some((article) => article.title.toLowerCase().includes(q)),
  );
}
