import { Section } from "@/components/layout/section";
import { FEATURE_CARDS } from "@/features/home/feature-grid.data";

import { FeatureCard } from "./feature-grid/feature-card";

/**
 * "Purposefully Built To Replace Manual Paperwork" — the 8-card feature grid.
 *
 * RESPONSIVE (per docs/RESPONSIVE.md): 2 columns at `md`+ (matches the
 * design), 1 column at base. The design itself is already 2 columns at the
 * 1440px frame, not the doctrine's default 3-4up-to-2up, so there is no `lg`
 * step to add.
 */
export function HomeFeatureGrid() {
  return (
    <Section id="solutions" aria-labelledby="solutions-heading">
      <h2 id="solutions-heading" className="text-h2 text-foreground">
        Purposefully Built To
        <br />
        <span className="text-primary-text">Replace Manual Paperwork</span>
      </h2>
      <p className="mt-4 max-w-narrow text-body-lg text-muted-foreground">
        Open-source tools for signing, routing, and verifying documents, without
        the enterprise price tag.
      </p>

      <div className="mt-stack-gap grid grid-cols-1 gap-grid-gap md:grid-cols-2">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </Section>
  );
}
