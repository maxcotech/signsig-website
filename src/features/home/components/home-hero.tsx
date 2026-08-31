import { ChevronRightIcon, ZapIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { Section } from "@/components/layout/section";
import { getBusinessAppUrl } from "@/config/site";

/**
 * The home page hero. Copy transcribed verbatim from the design.
 *
 * "Get Started" leaves this site entirely — it sends the visitor to the
 * SignSig business app (`getBusinessAppUrl()`) to actually sign up, rather
 * than the in-repo `/sign-up` route other CTAs on this site still use (that
 * route resolves nowhere; changing it site-wide is a separate task). The
 * "View Github" button that used to sit beside it is removed per the task
 * tracker; there is no secondary CTA here now.
 *
 * THE TINTED AREA IS AN INSET PANEL, NOT A FULL-BLEED BAND. This was wrong
 * until 2026-08-26: the background sat on the `<section>`, so the tint ran to
 * the viewport edges. In the design it is a rounded box with white page around
 * it — sampling Home.png at mid-hero gives white at x=20 and the panel colour
 * only from x=130 to x=2429 of 2560, with ~52px of white above it and ~56px
 * below. Hence: no background on the section, a `rounded-panel bg-surface-2`
 * box inside it, and the section reduced to the white margin around that box.
 *
 * WIDTH. The design's panel is 1294px wide at the 1440 frame (73px side
 * margins). This renders it at `max-w-content` (1200) instead, so the hero
 * occupies exactly the same footprint as every other section's container and
 * the page has one content edge rather than two. The design's whole content
 * column measures ~1294 — the feature grid sits on the same 130..2430 frame —
 * so that 94px gap is a site-wide container question, not a hero one. Logged
 * in docs/DECISIONS.md.
 *
 * RESPONSIVE: the design is a single centred column at every width it shows —
 * there is no side-by-side treatment to derive here. Type ramps via
 * `text-display-1`; the button row wraps to a stacked column below `sm` so two
 * 44px+ targets never get squeezed. The panel keeps a gutter of margin at
 * every width, so it never sits flush against the viewport edge.
 */
export function HomeHero() {
  return (
    <Section
      aria-labelledby="home-heading"
      // spacing="none" + explicit py, per the note in section.tsx: this
      // REPLACES the token rather than fighting it. The design's white margin
      // above and below the panel measures 52px and 56px at 1440 — far tighter
      // than py-section-y-lg's 160px, which was sized for a full-bleed band.
      spacing="none"
      // container={false} so the gutters land OUTSIDE the panel as margin.
      // A <Container>'s gutters are padding, which would leave the panel flush
      // to the viewport edge below 1200px.
      container={false}
      className="px-gutter py-8 md:px-gutter-md md:py-14 lg:px-gutter-lg"
    >
      <div className="mx-auto flex max-w-content flex-col items-center rounded-panel bg-surface-2 px-gutter py-14 text-center md:px-gutter-md lg:px-gutter-lg">
        <EyebrowBadge icon={<ZapIcon className="size-full" />}>
          Sign Documents, Automate Workflows
        </EyebrowBadge>

        <h1
          id="home-heading"
          className="mt-6 max-w-narrow text-display-1 text-foreground"
        >
          Verifiable Digital Signatures You Can Trust
        </h1>

        <p className="mt-6 max-w-narrow text-body-lg text-muted-foreground">
          Sign, send, and verify documents with legally binding signatures.
          Every signature includes cryptographic proof of authenticity. Built
          for businesses and institutions that need certainty.
        </p>

        <div className="mt-stack-gap">
          <ActionButton asChild size="lg">
            <a href={getBusinessAppUrl()}>
              Get Started
              <ChevronRightIcon aria-hidden="true" />
            </a>
          </ActionButton>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-body-sm text-muted-foreground">
          Try free for 30 days on all plans &bull; No credit card required
          <ChevronRightIcon
            className="size-5 rounded-full border border-border p-1"
            aria-hidden="true"
          />
        </p>
      </div>
    </Section>
  );
}
