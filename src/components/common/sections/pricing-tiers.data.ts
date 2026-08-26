/**
 * The 3-tier pricing table.
 *
 * ✅ RECONCILED WITH THE CONTENT DOCUMENT (2026-08-26), "Page: Pricing
 * (Expanded Detail)". Per the user's direction the document overrides the
 * design PNG. What changed and why:
 *
 *   - The three PRICES and the three AUDIENCE lines are **identical** in both
 *     sources. Nothing to reconcile there.
 *   - Two features gained the qualifiers the design elided: "Advanced
 *     workflows (sequential & parallel)" and "Identity verification (email,
 *     phone, biometric)".
 *   - "Email & SMS notifications" → "Email notifications". The document does
 *     not offer SMS on Starter, and a pricing table is a promise.
 *   - Support lines moved OUT of the per-tier lists. The design listed
 *     "Community support" on Starter and "Priority email support" on
 *     Professional; the document lists community support once, under "All
 *     plans include". Priority support appears nowhere in the document, so it
 *     is dropped rather than invented.
 *   - "Custom integrations" dropped from Enterprise: it is in the document's
 *     shorter pricing summary (p534) but not in the expanded tier list, and
 *     the expanded list is the one that specifies the table.
 *
 * Only monthly prices exist in either source — see docs/DECISIONS.md for why
 * the Monthly/Annual toggle does not change the figures.
 */
export type PricingTier = {
  id: "starter" | "professional" | "enterprise";
  name: string;
  /** Naira, per month. Formatted for display in the component. */
  priceMonthly: number;
  audience: string;
  cta: string;
  ctaHref: string;
  /** Selects the `--pricing-tile-*` token for this tier's price tile. */
  tileToken: "starter" | "professional" | "enterprise";
  features: readonly string[];
};

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 2000,
    audience: "For individuals and small teams",
    cta: "Start Signing",
    ctaHref: "/sign-up?plan=starter",
    tileToken: "starter",
    features: [
      "10 documents per month",
      "Unlimited signers",
      "Email notifications",
      "Basic templates",
      "30-day document storage",
      "Mobile app access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    priceMonthly: 23500,
    audience: "For growing businesses",
    cta: "Start Signing",
    ctaHref: "/sign-up?plan=professional",
    tileToken: "professional",
    features: [
      "Unlimited documents",
      "Advanced workflows (sequential & parallel)",
      "Identity verification (email, phone, biometric)",
      "Custom branding",
      "API & webhook access",
      "1-year document retention",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 40000,
    audience: "For regulated industries",
    cta: "Contact Sales",
    ctaHref: "/contact-sales",
    tileToken: "enterprise",
    features: [
      "Everything in Professional",
      "Self-hosted deployment option",
      "SSO (SAML, OAuth)",
      "Advanced audit logs & compliance exports",
      "Dedicated account manager",
      "SLA guarantees",
      "Unlimited storage",
    ],
  },
] as const;

/**
 * Benefits every tier gets. New in the document — the design had no such
 * block, which is why "Community support" was previously duplicated into the
 * Starter column and nowhere else.
 */
export const PRICING_INCLUDED = {
  heading: "All plans include:",
  items: [
    "Legally binding signatures",
    "Tamper-proof audit trails",
    "Verification certificates",
    "Mobile and desktop apps",
    "Community support",
  ],
} as const;

/** The document's closing free-trial line and CTA. Also new. */
export const PRICING_TRIAL = {
  label: "Free trial:",
  text: "Try any plan free for 30 days. No credit card required.",
  cta: "Start free trial",
  ctaHref: "/sign-up",
} as const;
