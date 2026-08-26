import Link from "next/link";
import { CircleHelpIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFaqSchema } from "@/lib/seo";

import { FAQ_ENTRIES } from "./faq-entries.data";

const ANSWERED_ENTRIES = FAQ_ENTRIES.filter((entry) => entry.answer);

/**
 * "Frequently Asked Questions".
 *
 * Only the first question has an answer in the design — the other 4 are
 * visible but collapsed, with no answer shown anywhere (per the user's
 * direction, 2026-08-24; see docs/DECISIONS.md). They render as static,
 * non-expandable rows rather than fabricated accordion content, and are
 * excluded from the FAQPage JSON-LD below so structured data never claims
 * content the page doesn't have.
 */
export function FaqSection() {
  return (
    <Section aria-labelledby="faq-heading" className="bg-surface-2" id="faq">
      <JsonLd
        schema={buildFaqSchema(
          ANSWERED_ENTRIES.map((entry) => ({
            question: entry.question,
            answer: entry.answer!,
          })),
        )}
      />

      <div className="grid grid-cols-1 gap-stack-gap lg:grid-cols-2">
        <div>
          <CircleHelpIcon className="size-6 text-primary" aria-hidden="true" />
          <h2 id="faq-heading" className="mt-4 text-h2 text-foreground">
            Frequently Asked
            <br />
            <span className="text-primary-text">Questions</span>
          </h2>
          <p className="mt-4 max-w-narrow text-body-lg text-muted-foreground">
            Common questions from teams evaluating SignSig for document
            workflows.
          </p>
          <Link
            href="/resources/knowledge-base"
            className="mt-stack-gap inline-flex min-h-11 items-center rounded-pill border border-border bg-card px-4 text-body-sm font-medium text-foreground transition-colors duration-fast hover:bg-muted"
          >
            Browse knowledge base
          </Link>
        </div>

        <div>
          <Accordion type="single" defaultValue={ANSWERED_ENTRIES[0]?.question}>
            {ANSWERED_ENTRIES.map((entry) => (
              <AccordionItem key={entry.question} value={entry.question}>
                <AccordionTrigger className="text-h5 text-foreground">
                  {entry.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground">
                  {entry.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <ul>
            {FAQ_ENTRIES.filter((entry) => !entry.answer).map((entry) => (
              <li
                key={entry.question}
                className="border-b border-border py-2.5 text-h5 text-foreground"
              >
                {entry.question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
