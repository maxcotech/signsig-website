import Image from "next/image";

import { FEATURE_IMAGE_SIZE } from "@/features/home/feature-grid.data";

/**
 * One card in the 8-up "Purposefully Built To Replace Manual Paperwork" grid:
 * an illustration stage above, title and description below.
 *
 * The illustration is an image extracted from the design, and it supplies its
 * own background, so the stage needs no `bg-*` of its own. `alt=""` is
 * deliberate: each mockup restates the title and description beside it, so
 * announcing it again is redundant noise for a screen reader.
 */
export type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <div className="flex animate-in-view flex-col overflow-hidden rounded-xl bg-card shadow-card">
      <Image
        src={`/images/home/${image}`}
        alt=""
        width={FEATURE_IMAGE_SIZE.width}
        height={FEATURE_IMAGE_SIZE.height}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="w-full bg-surface-2"
      />
      <div className="p-6">
        <h3 className="text-h4 text-foreground">{title}</h3>
        <p className="mt-2 text-body text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
