import type { Metadata } from "next";

import { CtaSection } from "@/components/common/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { SdkCard } from "@/features/sdks/components/sdk-card";
import { SDK_ENTRIES } from "@/features/sdks/sdks.data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

/**
 * SDKs & Libraries.
 *
 * LAYOUT: 3-up grid in a `max-w-cards` (1040px) column, inset from the content
 * column exactly as the design draws it. `items-center` is deliberate and
 * measured — the design vertically centres each row's cards rather than
 * top-aligning them. Rows 1 and 2 only look aligned because those cards happen
 * to be equal height; row 3's three cards (392 / 476 / 562px) all share a
 * centre line. See docs/DECISIONS.md.
 *
 * Each card's badge is an `<h2>`, so the page reads as a list of named
 * sections under the `<h1>` rather than ten unlabelled blocks.
 */
export const metadata: Metadata = buildMetadata({
  title: "SDKs & Libraries",
  description:
    "Integrate digital signatures and approval workflows into your application using our official SDKs, APIs, and developer tools.",
  path: "/developers/sdks-libraries",
  keywords: [
    "SignSig SDK",
    "e-signature API",
    "document signing API",
    "developer SDK",
    "signature verification API",
  ],
});

export default function SdksLibrariesPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "SDKs & Libraries", path: "/developers/sdks-libraries" },
        ])}
      />

      <Section spacing="lg" container={false} aria-labelledby="sdks-heading">
        <Container>
          <h1
            id="sdks-heading"
            className="text-center text-h1 text-balance text-foreground"
          >
            SDKs &amp; Libraries
          </h1>
          <p className="mx-auto mt-4 max-w-narrow text-center text-body text-pretty text-muted-foreground">
            Integrate digital signatures and approval workflows into your
            application using our official SDKs, APIs, and developer tools. We
            support every major programming language and platform.
          </p>

          <div className="mx-auto mt-stack-gap grid max-w-cards grid-cols-1 items-center gap-stack-gap md:grid-cols-2 lg:grid-cols-3">
            {SDK_ENTRIES.map((entry) => (
              <SdkCard key={entry.id} entry={entry} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
