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
 * RESPONSIVE: the strip is one wide image, so it scales down proportionally
 * rather than wrapping. At 360px the wordmarks get small but stay legible as
 * a group; the doctrine's "reduce or reposition" for decorative art applies.
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

      <Image
        src="/images/home/trusted-without-limitations.png"
        alt="Trusted by access, flutterwave, paystack, cowrywise, Bolt, Uber, LeMFi and Vercel."
        width={2382}
        height={52}
        sizes="100vw"
        className="mt-stack-gap h-auto w-full dark:invert"
      />
    </Section>
  );
}
