import type { Metadata } from "next";

import { ActionButton } from "@/components/common/action-button";
import { CtaSection } from "@/components/common/sections/cta-section";
import { Section } from "@/components/layout/section";
import { KB_PAGE } from "@/features/knowledge-base/collections.data";
import { KnowledgeBaseBrowser } from "@/features/knowledge-base/components/knowledge-base-browser";
import { buildMetadata } from "@/lib/seo";

/**
 * Knowledge base index.
 *
 * The `<h1>` is the content document's headline; the design's "How Can We Help
 * You?" is gone, per the user's direction that the document overrides the PNG.
 * The intro paragraph and the "Still need help?" block are also new from the
 * document.
 *
 * The only sections are this one and the shared `<CtaSection>` — the design
 * has no workflow/developers/FAQ bands here. This is the target of the
 * footer's "Knowledge Base" link and of `<FaqSection>`'s "Browse knowledge
 * base" button, both of which already pointed at this path.
 */
export const metadata: Metadata = buildMetadata({
  title: "Knowledge Base",
  description: KB_PAGE.intro,
  path: "/resources/knowledge-base",
});

export default function KnowledgeBasePage() {
  return (
    <>
      <Section spacing="lg" aria-labelledby="kb-heading">
        <h1
          id="kb-heading"
          className="text-center text-h1 text-balance text-foreground"
        >
          {KB_PAGE.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-narrow text-center text-body text-pretty text-muted-foreground">
          {KB_PAGE.intro}
        </p>

        <div className="mt-stack-gap">
          <KnowledgeBaseBrowser />
        </div>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="still-need-help"
        containerClassName="flex flex-col items-center text-center"
      >
        <h2 id="still-need-help" className="text-h2 text-foreground">
          {KB_PAGE.stillNeedHelp.heading}
        </h2>
        <p className="mt-4 text-body text-muted-foreground">
          {KB_PAGE.stillNeedHelp.text}
        </p>
        <ActionButton asChild size="lg" variant="outline" className="mt-6">
          <a href={KB_PAGE.stillNeedHelp.contactHref}>
            {KB_PAGE.stillNeedHelp.contactLabel}
          </a>
        </ActionButton>
      </Section>

      <CtaSection />
    </>
  );
}
