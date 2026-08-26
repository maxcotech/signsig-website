"use client";

import { useMemo, useState } from "react";

import { SearchIcon } from "lucide-react";

import {
  KB_COLLECTIONS,
  KB_PAGE,
  collectionMatches,
} from "@/features/knowledge-base/collections.data";

import { CollectionCard } from "./collection-card";

/**
 * The search field and the collection grid, together.
 *
 * A client component because the two share the query — splitting them would
 * mean lifting state into a context for no gain. It is still a leaf: the page
 * around it stays a Server Component.
 *
 * WHAT THE SEARCH MATCHES: a collection's title, any of its group titles, or
 * any article title — so typing "webhook" or "invoice" surfaces the collection
 * that covers it. The placeholder is the content document's "Search for
 * help...". The design shows no results state at all, so the "no matches" copy
 * below is an invention and is flagged in docs/DECISIONS.md.
 *
 * RESPONSIVE: 4 columns at `lg` (matches the design), 2 at `sm`, 1 at base —
 * the doctrine's default for a 3-4up grid.
 */
export function KnowledgeBaseBrowser() {
  const [query, setQuery] = useState("");

  const matches = useMemo(
    () => KB_COLLECTIONS.filter((c) => collectionMatches(c, query)),
    [query],
  );

  return (
    <>
      <div className="flex justify-center">
        <label className="relative flex w-70 max-w-full items-center">
          <SearchIcon
            className="pointer-events-none absolute left-4 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">{KB_PAGE.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={KB_PAGE.searchPlaceholder}
            className="h-13 w-full rounded-pill bg-card pr-4 pl-11 text-body-sm text-foreground shadow-pill outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>

      {matches.length > 0 ? (
        <ul className="mt-stack-gap grid grid-cols-1 gap-stack-gap sm:grid-cols-2 lg:grid-cols-4">
          {matches.map((collection) => (
            <li key={collection.slug} className="flex">
              <CollectionCard collection={collection} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-stack-gap text-center text-body text-muted-foreground"
        >
          No collections match &ldquo;{query.trim()}&rdquo;. Try a different
          search term.
        </p>
      )}
    </>
  );
}
