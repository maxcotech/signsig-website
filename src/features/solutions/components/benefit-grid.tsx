import { ZapIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

/**
 * The 2x2 benefit grid beneath a Solutions hero.
 *
 * WIDTH: the design insets this grid to ~822px rather than filling the 1200px
 * content column, so it reads as a tight cluster under the hero instead of a
 * full-width band. That measure is `max-w-compact` (52rem) — see
 * docs/DESIGN-SYSTEM.md for the 1.2% rounding.
 *
 * RESPONSIVE: 2 columns at `sm`+ (each card holds one short line, so they
 * survive below the doctrine's usual `md` step), 1 column at base.
 *
 * Every card carries the same lightning glyph and no heading of its own, so
 * this is a `<ul>` — a list is what it actually is — and the glyph is
 * `aria-hidden`, since four identical icons announce nothing useful.
 */
export function BenefitGrid({ benefits }: { benefits: readonly string[] }) {
  return (
    <Section spacing="none" container={false} className="pb-section-y">
      <Container>
        <ul className="mx-auto grid max-w-compact grid-cols-1 gap-grid-gap sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex animate-in-view flex-col gap-4 rounded-lg bg-surface-2 p-5 shadow-card"
            >
              <span className="inline-flex w-fit items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5">
                <ZapIcon className="size-4 text-primary" aria-hidden="true" />
              </span>
              <span className="text-body text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
