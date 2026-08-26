import Link from "next/link";

import { ActionButton } from "@/components/common/action-button";

import type { PricingTier } from "./pricing-tiers.data";

const TILE_BG: Record<PricingTier["tileToken"], string> = {
  starter: "bg-pricing-tile-starter",
  professional: "bg-pricing-tile-professional",
  enterprise: "bg-pricing-tile-enterprise",
};

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="flex animate-in-view flex-col overflow-hidden rounded-xl bg-card shadow-card">
      <div className="p-6">
        <div className={`rounded-lg p-5 ${TILE_BG[tier.tileToken]}`}>
          <span className="inline-flex rounded-pill bg-card px-3 py-1 text-body-sm font-medium text-foreground">
            {tier.name}
          </span>
          <p className="mt-4 text-h2 text-foreground">
            ₦{tier.priceMonthly.toLocaleString("en-NG")}
            <span className="text-body text-muted-foreground">/month</span>
          </p>
        </div>

        <p className="mt-5 text-body text-muted-foreground">{tier.audience}</p>

        <ActionButton
          asChild
          variant="inverse"
          size="lg"
          className="mt-4 w-full"
        >
          <Link href={tier.ctaHref}>{tier.cta}</Link>
        </ActionButton>
      </div>

      <ul className="flex flex-col gap-3 border-t border-border p-6">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-body-sm text-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-1 h-4 w-0.5 shrink-0 rounded-full bg-primary"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
