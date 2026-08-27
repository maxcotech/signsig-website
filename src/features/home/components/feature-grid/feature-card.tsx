import Image from "next/image";

import { FEATURE_STAGE } from "@/features/home/feature-grid.data";

/**
 * One card in the 8-up "Purposefully Built To Replace Manual Paperwork" grid:
 * an illustration stage above, title and description below.
 *
 * THE STAGE IS A FIXED BOX. The eight illustrations were exported cropped
 * tight to their artwork, so their intrinsic ratios run from 1.29 to 3.24. Let
 * them size themselves and every card gets a different image height, which
 * pushes the titles out of line across the grid — the bug this fixes. The
 * stage locks the design's 1112x454 ratio and `object-contain` fits each
 * illustration inside it, centred.
 *
 * `contain`, not `cover`: these are UI mockups. Cropping document-signing
 * (1.29) into a 2.45 box would cut away nearly half the interface. Contain
 * shows all of it and letterboxes instead.
 *
 * The stage's `p-6` matches the card body's, so the illustration's optical
 * edge lines up with the title beneath it. The design's mockups bleed to the
 * stage edges, but they were exported cropped tight to their artwork, so
 * without this they butt against the edge instead.
 *
 * The letterboxing is invisible because the PNGs are transparent and the stage
 * carries `bg-surface-2`, the same subtle surface the design puts behind
 * these stages, so the gap and the artwork's own ground are one colour — and
 * both follow the theme into dark mode.
 *
 * `alt=""` is deliberate: each mockup restates the title and description
 * beside it, so announcing it again is redundant noise for a screen reader.
 */
export type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <div className="flex animate-in-view flex-col overflow-hidden rounded-xl bg-card shadow-card">
      <div
        className="w-full bg-surface-2 p-6"
        // Inline rather than `aspect-[1112/454]` so the ratio has exactly one
        // source of truth, shared with the `sizes` budget below. It applies to
        // the border box, so the padding sits inside the fixed stage and the
        // cards stay aligned.
        style={{
          aspectRatio: `${FEATURE_STAGE.width} / ${FEATURE_STAGE.height}`,
        }}
      >
        {/* `fill` resolves against the padding box, so the padding has to live
            on the parent and this inner box is what the image actually fills. */}
        <div className="relative h-full w-full">
          <Image
            src={`/images/home/${image}`}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-h4 text-foreground">{title}</h3>
        <p className="mt-2 text-body text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
