import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { Section } from "@/components/layout/section";

import { PricingCard } from "./pricing-card";
import { PricingPeriodToggle } from "./pricing-period-toggle";
import {
  PRICING_INCLUDED,
  PRICING_TIERS,
  PRICING_TRIAL,
} from "./pricing-tiers.data";

/**
 * The 3-tier pricing table. Shared by the home page and `/pricing`.
 *
 * ONE PROP, TWO GENUINELY DIFFERENT JOBS — not a style variant:
 *
 *   "summary" (home). One section among many. Its heading must be an `<h2>`
 *   (docs/SEO.md: exactly one h1 per page, levels descend without skipping)
 *   and it carries the design's own "Pricing Plans" / "Transparent Pricing
 *   for Every Team" pair. The design backs the size difference up: ~35.6px
 *   here against ~49.5px on /pricing.
 *
 *   "page" (/pricing). This section IS the page's subject, so its heading is
 *   the `<h1>`, and it uses the content document's headline and description
 *   plus the document's two additions — the "All plans include" strip and the
 *   free-trial CTA. Those are deliberately NOT on home: that page already
 *   ends in the site-wide CTA band, and a second trial CTA a screen above it
 *   would compete with it.
 *
 * RESPONSIVE: 3 columns at `lg`+ (matches the design), 1 column at base —
 * skipping a 2-up tablet step, since a 3rd card orphaned onto its own row
 * reads worse than a clean single column for a comparison table like this.
 * The "All plans include" strip runs 1 / 2 / 3 up, so its five items never
 * strand one item alone on the last line.
 */
export type PricingSectionProps = {
  variant?: "summary" | "page";
};

const COPY = {
  summary: {
    heading: "Pricing Plans",
    lead: "Transparent Pricing for Every Team",
  },
  page: {
    heading: "Transparent pricing for every team",
    lead: "Start free, scale as you grow. All plans include legally binding signatures and verification certificates.",
  },
} as const;

export function PricingSection({ variant = "summary" }: PricingSectionProps) {
  const isPage = variant === "page";
  const Heading = isPage ? "h1" : "h2";
  const copy = COPY[variant];

  return (
    <Section
      id="pricing"
      aria-labelledby="pricing-heading"
      // containerClassName, NOT className: `className` lands on the outer
      // <section>, whose only child is the <Container>, so `items-center`
      // there centres nothing and any max-w-* box inside sits flush left with
      // its text centred inside it. Inner layout belongs on the container.
      containerClassName="flex flex-col items-center text-center"
    >
      <Heading
        id="pricing-heading"
        className={`${isPage ? "text-h1" : "text-h2"} text-balance text-foreground`}
      >
        {copy.heading}
      </Heading>
      <p className="mt-4 max-w-narrow text-body-lg text-balance text-muted-foreground">
        {copy.lead}
      </p>

      <div className="mt-stack-gap">
        <PricingPeriodToggle />
      </div>

      <div className="mt-stack-gap grid w-full grid-cols-1 gap-grid-gap text-left lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>

      {isPage && (
        <>
          <div className="mt-stack-gap w-full rounded-xl bg-surface-2 p-6 text-left">
            <h2 className="text-body font-semibold text-foreground">
              {PRICING_INCLUDED.heading}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING_INCLUDED.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-body-sm text-foreground"
                >
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-stack-gap max-w-narrow text-body text-balance text-muted-foreground">
            <strong className="font-semibold text-foreground">
              {PRICING_TRIAL.label}
            </strong>{" "}
            {PRICING_TRIAL.text}
          </p>

          <ActionButton asChild size="lg" className="mt-4">
            <Link href={PRICING_TRIAL.ctaHref}>{PRICING_TRIAL.cta}</Link>
          </ActionButton>
        </>
      )}
    </Section>
  );
}
