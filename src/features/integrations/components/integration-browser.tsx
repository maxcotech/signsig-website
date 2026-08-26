"use client";

import { useMemo, useState } from "react";

import { SearchIcon } from "lucide-react";

import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  integrationMatches,
} from "@/features/integrations/integrations.data";
import type { IntegrationCategory } from "@/features/integrations/types";
import { cn } from "@/lib/utils";

import { IntegrationCard } from "./integration-card";

type Filter = IntegrationCategory | "all";

/** "All" plus every category, in sidebar order. */
const FILTERS: ReadonlyArray<{ id: Filter; label: string }> = [
  { id: "all", label: "All Integrations" },
  ...INTEGRATION_CATEGORIES,
];

/**
 * Search field, category sidebar and grid — one client component because all
 * three share the same filter state. The page around it stays a Server
 * Component.
 *
 * The sidebar is a real radio group: the filters are mutually exclusive, so
 * arrow keys move between them and the selected one is announced. A row of
 * plain buttons would look identical and tell assistive tech nothing about
 * the relationship.
 *
 * RESPONSIVE: sidebar beside the grid at `lg`, stacked above it below that;
 * grid 3-up at `lg`, 2-up at `sm`, 1-up at base.
 */
export function IntegrationBrowser({
  belowSearch,
}: {
  /**
   * Slot between the search field and the grid. Passed in from the page so
   * the static "Can't find a tool?" link stays a Server Component instead of
   * being bundled into this client leaf.
   */
  belowSearch?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const matches = useMemo(
    () =>
      INTEGRATIONS.filter(
        (integration) =>
          (filter === "all" || integration.category === filter) &&
          integrationMatches(integration, query),
      ),
    [query, filter],
  );

  /** Undefined for "all", which has no description. */
  const active = INTEGRATION_CATEGORIES.find(
    (category) => category.id === filter,
  );

  return (
    <>
      <div className="flex justify-center">
        <label className="relative flex w-80 max-w-full items-center">
          <SearchIcon
            className="pointer-events-none absolute left-4 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Search for an integration</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for an integration"
            className="h-13 w-full rounded-pill bg-card pr-4 pl-11 text-body-sm text-foreground shadow-pill outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>

      {belowSearch}

      <div className="mt-stack-gap grid grid-cols-1 gap-stack-gap lg:grid-cols-[16rem_1fr]">
        <div
          role="radiogroup"
          aria-label="Filter by category"
          className="h-fit"
        >
          {FILTERS.map((category) => {
            const isActive = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "flex min-h-11 w-full items-center rounded-lg px-4 text-left text-body-sm transition-colors duration-fast",
                  isActive
                    ? "bg-primary-subtle font-medium text-primary-text"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div>
          {/* The document's per-category description. Shown only when a
              category is selected — "All Integrations" has none, and the page
              intro above already says what the hub is. */}
          {active && (
            <p
              role="status"
              className="mb-6 max-w-narrow text-body-sm text-pretty text-muted-foreground"
            >
              {active.description}
            </p>
          )}

          {matches.length > 0 ? (
            <ul className="grid grid-cols-1 gap-grid-gap sm:grid-cols-2 xl:grid-cols-3">
              {matches.map((integration) => (
                <li key={integration.slug} className="flex">
                  <IntegrationCard integration={integration} />
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="text-body text-muted-foreground">
              No integrations match your search. Try a different term or
              category.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
