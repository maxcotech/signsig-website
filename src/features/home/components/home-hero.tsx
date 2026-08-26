import Link from "next/link";
import { ChevronRightIcon, ZapIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { GithubIcon } from "@/components/common/github-icon";
import { Section } from "@/components/layout/section";

/**
 * The home page hero. Copy transcribed verbatim from the design.
 *
 * RESPONSIVE: the design is a single centred column at every width it shows —
 * there is no side-by-side treatment to derive here. Type ramps via
 * `text-display-1`; the button row wraps to a stacked column below `sm` so
 * two 44px+ targets never get squeezed.
 */
export function HomeHero() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="home-heading"
      className="bg-surface-2"
      containerClassName="flex flex-col items-center text-center"
    >
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
        Sign, send, and verify documents with legally binding signatures. Every
        signature includes cryptographic proof of authenticity. Built for
        businesses and institutions that need certainty.
      </p>

      <div className="mt-stack-gap flex flex-col gap-3 sm:flex-row sm:items-center">
        <ActionButton asChild size="lg">
          <Link href="/sign-up">
            Get Started
            <ChevronRightIcon aria-hidden="true" />
          </Link>
        </ActionButton>
        <ActionButton asChild size="lg" variant="outline">
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

      <p className="mt-6 inline-flex items-center gap-2 text-body-sm text-muted-foreground">
        Try free for 30 days on all plans &bull; No credit card required
        <ChevronRightIcon
          className="size-5 rounded-full border border-border p-1"
          aria-hidden="true"
        />
      </p>
    </Section>
  );
}
