import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  KB_COLLECTIONS,
  articleCount,
  findCollection,
} from "@/features/knowledge-base/collections.data";
import {
  CollectionArticles,
  CollectionBreadcrumb,
} from "@/features/knowledge-base/components/collection-articles";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/** All eight collections are prerendered; an unknown slug is a build-time 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return KB_COLLECTIONS.map((collection) => ({
    collection: collection.slug,
  }));
}

function pathFor(slug: string) {
  return `/resources/knowledge-base/${slug}`;
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/knowledge-base/[collection]">): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = findCollection(slug);
  if (!collection) return {};

  return buildMetadata({
    title: collection.title,
    description: `${articleCount(collection)} guides on ${collection.title.toLowerCase()} in the SignSig knowledge base.`,
    path: pathFor(slug),
    // The articles themselves aren't written yet, so this is a page of
    // titles. Indexing it would put an empty result in front of someone
    // searching for the answer. Flip when bodies land.
    noIndex: true,
  });
}

/**
 * One knowledge-base collection.
 *
 * The design shows no visible page title — just the breadcrumb — so the `<h1>`
 * is `sr-only`. That satisfies "exactly one h1 per page" (docs/SEO.md) without
 * inventing a heading the design does not have. See docs/DECISIONS.md.
 *
 * There is no FAQPage JSON-LD any more: the content document replaced the
 * question-and-answer shape with an article index, and FAQPage markup over
 * article titles with no answers would assert content that does not exist.
 */
export default async function KnowledgeBaseCollectionPage({
  params,
}: PageProps<"/resources/knowledge-base/[collection]">) {
  const { collection: slug } = await params;
  const collection = findCollection(slug);
  if (!collection) notFound();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Knowledge Base", path: "/resources/knowledge-base" },
          { name: collection.title, path: pathFor(slug) },
        ])}
      />

      <Section spacing="lg">
        <h1 className="sr-only">{collection.title}</h1>
        <CollectionBreadcrumb title={collection.title} />
        <CollectionArticles collection={collection} />
      </Section>

      <CtaSection />
    </>
  );
}
