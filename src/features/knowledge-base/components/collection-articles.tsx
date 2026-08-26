import Link from "next/link";
import { ChevronRightIcon, CornerUpLeftIcon } from "lucide-react";

import type {
  KbCollection,
  KbGroup,
} from "@/features/knowledge-base/collections.data";

/**
 * "All Collections > <Title>" trail above a collection's articles.
 *
 * The design shows no page heading beyond this trail, so the page's `<h1>` is
 * rendered screen-reader-only by the route (docs/SEO.md requires exactly one
 * h1). The trail itself stays a `<nav>` and does not contain the heading.
 */
export function CollectionBreadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-3">
      <Link
        href="/resources/knowledge-base"
        className="inline-flex min-h-11 items-center gap-2 text-body-sm text-foreground transition-colors duration-fast hover:text-primary-text"
      >
        <CornerUpLeftIcon className="size-4" aria-hidden="true" />
        All Collections
      </Link>
      <ChevronRightIcon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <span aria-current="page" className="text-body-sm text-foreground">
        {title}
      </span>
    </nav>
  );
}

function ArticleGroup({ group }: { group: KbGroup }) {
  return (
    <div>
      {group.title && (
        <h2 className="text-h5 text-foreground">{group.title}</h2>
      )}
      <ul className={group.title ? "mt-3" : undefined}>
        {group.articles.map((article) => (
          <li
            key={article.title}
            className="border-b border-border py-3 last:border-b-0"
          >
            <span className="text-body font-medium text-foreground">
              {article.title}
            </span>
            {article.description && (
              <p className="mt-1 text-body-sm text-muted-foreground">
                {article.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A collection's articles.
 *
 * ⚠ TITLES ONLY, AND NOT LINKS. Every article in the content document is a
 * bracketed placeholder with no body written anywhere in it. Rendering them as
 * links would mean 52 dead links or 52 empty pages; both are worse than an
 * honest index that says the articles are on their way. The note below says so
 * in as many words rather than leaving a reader clicking at plain text.
 *
 * Turn these into links once bodies exist — see the content file.
 */
export function CollectionArticles({
  collection,
}: {
  collection: KbCollection;
}) {
  return (
    <div className="mt-stack-gap flex max-w-cards flex-col gap-8">
      {collection.groups.map((group, index) => (
        <ArticleGroup key={group.title ?? index} group={group} />
      ))}

      <p className="text-body-sm text-muted-foreground">
        These articles are being written and aren&rsquo;t published yet. For
        help with any of them in the meantime, contact{" "}
        <a
          href="mailto:support@signsig.com"
          className="text-primary-text underline underline-offset-4"
        >
          support@signsig.com
        </a>
        .
      </p>
    </div>
  );
}
