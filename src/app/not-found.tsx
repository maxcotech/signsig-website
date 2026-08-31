import type { Metadata } from "next";
import Link from "next/link";

import { ActionButton } from "@/components/common/action-button";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";

/**
 * 404 page. Rendered inside the root layout, so it keeps the header and footer
 * and the visitor has somewhere to go.
 *
 * `noIndex` matters here: a 404 that is indexable competes with real pages in
 * search results.
 */
export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist.",
  path: "/404",
  noIndex: true,
  keywords: ["404", "page not found"],
});

export default function NotFound() {
  return (
    <Section spacing="lg" aria-labelledby="not-found-heading">
      <p className="text-overline text-muted-foreground uppercase">Error 404</p>
      <h1
        id="not-found-heading"
        className="mt-4 max-w-narrow text-h1 text-foreground"
      >
        We could not find that page
      </h1>
      <p className="mt-6 max-w-narrow text-body-lg text-muted-foreground">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-stack-gap">
        <ActionButton asChild size="lg">
          <Link href="/">Back to home</Link>
        </ActionButton>
      </div>
    </Section>
  );
}
