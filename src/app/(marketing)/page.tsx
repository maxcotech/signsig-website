import type { Metadata } from "next";
import Link from "next/link";

import { ActionButton } from "@/components/common/action-button";
import { Section } from "@/components/layout/section";
import { TokenPreview } from "@/features/scaffold-preview/components/token-preview";
import { buildMetadata } from "@/lib/seo";

/**
 * Home page — PLACEHOLDER.
 *
 * This is scaffolding, not design work. A future session replaces the body with
 * real sections from a Figma PNG. What should survive that replacement is the
 * SHAPE of this file: metadata via `buildMetadata()`, exactly one `<h1>`,
 * `<Section>` for rhythm, tokens for every value, and a body that composes
 * feature components rather than implementing them.
 *
 * Note there is no `title` passed to `buildMetadata()`. The home page wants the
 * absolute default from the root layout ("SignSig — ...") rather than the
 * "%s | SignSig" template. Every other page passes a title.
 */
export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Section spacing="lg" aria-labelledby="home-heading">
        <p className="text-overline text-primary-text uppercase">
          Foundation scaffold
        </p>

        {/* Exactly one h1 per page. */}
        <h1
          id="home-heading"
          className="mt-4 max-w-narrow text-display-1 text-foreground"
        >
          Sign with confidence
        </h1>

        <p className="mt-6 max-w-narrow text-body-lg text-muted-foreground">
          This placeholder exists to prove the foundation works: tokens resolve,
          dark mode flips, the type scale ramps, and the chrome is usable at
          360px. Replace it with the real home page design.
        </p>

        <div className="mt-stack-gap flex flex-col gap-3 sm:flex-row sm:items-center">
          <ActionButton asChild size="lg">
            <Link href="#tokens-colour">View the design tokens</Link>
          </ActionButton>
          <ActionButton asChild size="lg" variant="outline">
            <Link href="#tokens-type">View the type scale</Link>
          </ActionButton>
        </div>
      </Section>

      <TokenPreview />
    </>
  );
}
