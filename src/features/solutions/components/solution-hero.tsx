import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { Section } from "@/components/layout/section";
import { SOLUTION_ICONS } from "@/features/solutions/components/solution-icons";
import type { Solution } from "@/features/solutions/solutions.data";

/**
 * The hero shared by all 14 Solutions pages.
 *
 * Promoted from the one-off `<ContractHero>` once 13 more designs confirmed
 * the shape is identical everywhere: eyebrow pill, two-line h1, one paragraph,
 * a single CTA. Deliberately NOT merged with `<HomeHero>`, which sits on a
 * tinted panel and has two CTAs plus a trial line.
 *
 * RESPONSIVE: a single centred column at every width. The design's two-line
 * heading break is applied only from `sm` up; below that the text wraps
 * naturally, because forcing the break at 360px produces very short lines.
 */
export function SolutionHero({ solution }: { solution: Solution }) {
  const { label, copy } = solution;
  const [firstLine, secondLine] = copy.headingLines;

  return (
    <Section
      spacing="lg"
      aria-labelledby="solution-hero-heading"
      containerClassName="flex flex-col items-center text-center"
    >
      <EyebrowBadge icon={SOLUTION_ICONS[copy.icon]}>{label}</EyebrowBadge>

      <h1
        id="solution-hero-heading"
        className="mt-6 text-display-1 text-balance text-foreground"
      >
        {firstLine}
        <br className="hidden sm:inline" /> {secondLine}
      </h1>

      <p className="mt-6 max-w-narrow text-body-lg text-pretty text-muted-foreground">
        {copy.description}
      </p>

      <ActionButton asChild size="lg" className="mt-stack-gap">
        <Link href={copy.ctaHref}>
          {copy.ctaLabel}
          <ChevronRightIcon aria-hidden="true" />
        </Link>
      </ActionButton>
    </Section>
  );
}
