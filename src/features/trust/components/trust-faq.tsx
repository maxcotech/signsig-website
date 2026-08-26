import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ContentFaq } from "@/content/blocks";
import { buildFaqSchema } from "@/lib/seo";
import { slugify } from "@/lib/slugify";

/**
 * The FAQ block that closes every trust page.
 *
 * Separate from the home page's `<FaqSection>`: that one is a two-column
 * marketing band with its own heading, illustration and fixed data, and four
 * of its five questions have no answer at all. This is a plain accordion over
 * whatever questions the page supplies. Extending the home component to cover
 * both would have meant a props explosion for two genuinely different jobs —
 * see docs/DECISIONS.md.
 *
 * Every question here has a real answer, so all of them go into the FAQPage
 * JSON-LD. Structured data must never claim content the page doesn't show.
 */
export function TrustFaq({ faqs }: { faqs: readonly ContentFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq" className="mt-12">
      <JsonLd schema={buildFaqSchema(faqs)} />

      <h2 id="faq" className="text-h3 text-foreground">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="mt-4 w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={slugify(faq.question)}>
            <AccordionTrigger className="text-left text-body-sm font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-body-sm text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
