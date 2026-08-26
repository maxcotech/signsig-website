import Link from "next/link";
import { ChevronRightIcon, ZapIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { GithubIcon } from "@/components/common/github-icon";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

/**
 * The closing "Automate Everything" CTA band. Copy transcribed verbatim.
 * `bg-primary` matches the design's fill exactly — sampled pixel-for-pixel
 * against the brand primitive already in the token system, so no new token
 * is needed here.
 *
 * The footer's dark surface starts BEHIND the lower part of this card, so the
 * green panel straddles the boundary between the page and the footer — that
 * overlap is the section's defining detail. Measured in the design: the dark
 * band begins 65% down the card, i.e. the card overlaps it by ~35% of its own
 * height.
 *
 * It is rendered here rather than in `<Footer>` because it has to sit BEHIND
 * this card; the band is a full-bleed child of the section (`inset-x-0`, not
 * `w-screen`, so it can never cause horizontal overflow) and carries a literal
 * `dark` class so `bg-background` resolves to the same surface the footer
 * uses. Bottom padding is dropped so the section ends flush with the card and
 * the footer's own top padding provides the gap beneath it.
 */
export function CtaSection() {
  return (
    <Section
      container={false}
      spacing="none"
      className="pt-section-y"
      aria-labelledby="cta-heading"
    >
      <span
        aria-hidden="true"
        className="dark absolute inset-x-0 bottom-0 h-1/3 bg-background"
      />

      <Container className="relative">
        <div className="flex flex-col items-center rounded-2xl bg-primary px-6 py-section-y-sm text-center">
          <EyebrowBadge
            variant="on-dark"
            icon={<ZapIcon className="size-full" />}
          >
            Automate Everything
          </EyebrowBadge>

          <h2
            id="cta-heading"
            className="mt-6 max-w-narrow text-h2 text-primary-foreground"
          >
            Sign, Route, and Verify Documents Without the Paperwork
          </h2>

          <div className="mt-stack-gap flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton
              asChild
              size="lg"
              className="bg-white text-primary-text hover:bg-white/90"
            >
              <Link href="/sign-up">
                Get Started
                <ChevronRightIcon aria-hidden="true" />
              </Link>
            </ActionButton>
            <ActionButton
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"
            >
              <a
                href="https://github.com/signsig"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Github
                <GithubIcon aria-hidden="true" />
              </a>
            </ActionButton>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-body-sm text-primary-foreground/80">
            Try free for 30 days on all plans &bull; No credit card required
            <ChevronRightIcon
              className="size-5 rounded-full border border-white/40 p-1"
              aria-hidden="true"
            />
          </p>
        </div>
      </Container>
    </Section>
  );
}
