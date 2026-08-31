import Image from "next/image";
import { ShieldCheckIcon } from "lucide-react";

import { EyebrowBadge } from "@/components/common/eyebrow-badge";
import { Section } from "@/components/layout/section";

/**
 * "Trusted, Without Limitations By" logo strip.
 *
 * The wordmarks ship as the design's own rendered strip, so they are exactly
 * the licensed lockups rather than re-typeset approximations. The alt text
 * names every company, because which companies these are IS the content.
 *
 * THEMING: the strip is un-composited from the design's white page to a real
 * alpha channel, so the page background shows through instead of a white bar.
 * The ink lands as black at ~17% alpha, which would disappear on a dark page,
 * so `dark:invert` flips it to white at the same alpha. Contrast is
 * effectively identical in both themes (~1.5:1 against the page), which keeps
 * the deliberately muted look the design has. Because the artwork is pure
 * greyscale, inverting cannot shift a hue — do not copy this to the colour
 * illustrations, which have no dark-mode treatment yet.
 *
 * RESPONSIVE — CORRECTED 2026-08-26. Below `md` this used to be `w-full
 * h-auto`, so the wordmarks shrank with the viewport: at 360px the strip
 * rendered at ~7.5px tall, not merely "small" as the old comment claimed but
 * genuinely illegible. Flagged as a bug on the task tracker.
 *
 * This is content, not decorative art — the alt text names every company
 * because which companies these are IS the point — so the doctrine's "shrink
 * decorative art into illegibility" escape does not apply here. The nearer
 * precedent is "Horizontal card row" → mobile: scroll rather than shrink.
 * Below `md` the image now holds a fixed, legible height and the strip
 * scrolls horizontally in its own `overflow-x-auto` container instead of
 * compressing; at `md`+, where the fluid width was never flagged as broken,
 * it is unchanged.
 *
 * ⚠ Logos pending. This still ships the design's original companies (access,
 * Flutterwave, Paystack, Cowrywise, Bolt, Uber, LeMFi, Vercel). The user has
 * a replacement export coming with a different company set — when that file
 * lands, update `alt` to match; leaving the old names on a swapped image
 * would be worse than the sizing bug this fixes.
 */
export function HomeTrustBar() {
  return (
    <Section spacing="sm" aria-label="Trusted by">
      <div className="flex items-center justify-center gap-4">
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-linear-to-r from-transparent to-primary-border/50 sm:block"
        />
        <EyebrowBadge
          variant="brand"
          icon={<ShieldCheckIcon className="size-full" />}
        >
          Trusted, Without Limitations By
        </EyebrowBadge>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-linear-to-l from-transparent to-primary-border/50 sm:block"
        />
      </div>

      <div className="mt-stack-gap overflow-x-auto md:overflow-visible">
        <Image
          src="/images/home/trusted-without-limitations.png"
          alt="Trusted by access, flutterwave, paystack, cowrywise, Bolt, Uber, LeMFi and Vercel."
          width={2382}
          height={52}
          sizes="(min-width: 768px) 100vw, 1300px"
          className="h-7 w-auto md:h-auto md:w-full dark:invert"
        />
      </div>
    </Section>
  );
}
