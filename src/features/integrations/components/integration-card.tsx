import Link from "next/link";
import { ArrowRightIcon, PuzzleIcon } from "lucide-react";

import type { Integration } from "@/features/integrations/types";

/**
 * One integration tile.
 *
 * The glyph is a single neutral icon for every integration. The design draws
 * the same Microsoft-365 mark on all nine cards — a placeholder — and using it
 * literally would put Microsoft's logo on the Dropbox and Slack cards.
 * See integrations.data.ts.
 *
 * "View Integration" is a real link on every card: integrations without a
 * published guide get an honest empty state rather than a dead link or a 404.
 */
export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <article className="flex w-full animate-in-view flex-col gap-4 rounded-xl bg-card p-6 shadow-card">
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-lg bg-primary-subtle text-primary"
      >
        <PuzzleIcon className="size-5" />
      </span>

      <h3 className="text-h5 text-foreground">{integration.name}</h3>

      <p className="text-body-sm text-muted-foreground">
        {integration.description}
      </p>

      {/* The document's "Example Use Case" — a concrete team doing a concrete
          thing, which does more to sell an integration than its feature list.
          Not in the design; `flex-1` moved here so the CTA still bottom-aligns
          across a row of cards with uneven copy. */}
      <p className="flex-1 border-l-2 border-border pl-3 text-body-sm text-pretty text-muted-foreground italic">
        {integration.useCase}
      </p>

      <Link
        href={`/developers/integration-hub/${integration.slug}`}
        className="group inline-flex w-fit items-center gap-2 text-body-sm font-medium text-primary-text"
      >
        View Integration
        <ArrowRightIcon
          className="size-4 transition-transform duration-fast group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only">for {integration.name}</span>
      </Link>
    </article>
  );
}
