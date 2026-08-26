import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import {
  articleCount,
  articleCountLabel,
  type KbCollection,
} from "@/features/knowledge-base/collections.data";

/**
 * One tile in the knowledge-base grid.
 *
 * The whole card is the link, so the target is a single ~160px hit area rather
 * than a small chevron. `min-h-40` matches the design's 159px card height,
 * which keeps the row even when one title wraps to two lines.
 *
 * The count comes from the collection's own array, never a hardcoded number —
 * see collections.data.ts for why that matters here.
 */
export function CollectionCard({ collection }: { collection: KbCollection }) {
  return (
    <Link
      href={`/resources/knowledge-base/${collection.slug}`}
      className="group flex min-h-40 w-full card-lift animate-in-view flex-col justify-between gap-4 rounded-xl bg-surface-2 p-6 shadow-card"
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-caption font-bold text-background"
      >
        ?
      </span>

      <span className="flex flex-col gap-1">
        <span className="text-h5 text-foreground">{collection.title}</span>
        <span className="flex items-center justify-between gap-2 text-body-sm text-muted-foreground">
          {articleCountLabel(articleCount(collection))}
          <ChevronRightIcon
            className="size-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </Link>
  );
}
