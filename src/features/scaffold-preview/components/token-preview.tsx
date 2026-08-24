import { Section } from "@/components/layout/section";

import {
  PAIRED_SWATCHES,
  SURFACE_SWATCHES,
  TYPE_STEPS,
} from "../token-preview.data";

/**
 * SCAFFOLDING — delete once real page sections exist.
 *
 * Purpose: make the token system verifiable by eye. Toggle the theme and every
 * swatch below must change; resize the window and every type step must scale.
 * If a swatch does not flip, its token is missing from the `.dark` block in
 * `globals.css`, which is a bug the preview is designed to surface.
 *
 * It is also a worked example of the rules: no hardcoded colours, no arbitrary
 * type sizes, `<Section>` for rhythm, a colocated `*.data.ts` for the content,
 * and under 150 lines.
 */
export function TokenPreview() {
  return (
    <>
      <Section aria-labelledby="tokens-colour" spacing="sm">
        <h2 id="tokens-colour" className="text-h3">
          Semantic colour tokens
        </h2>
        <p className="mt-2 max-w-narrow text-body text-muted-foreground">
          Every pair below must change when the theme toggles. A swatch that
          does not flip is missing from the <code>.dark</code> block in
          <code> globals.css</code>.
        </p>

        <ul className="mt-stack-gap grid grid-cols-1 gap-grid-gap sm:grid-cols-2 lg:grid-cols-3">
          {PAIRED_SWATCHES.map((swatch) => (
            <li
              key={swatch.token}
              className={`rounded-lg border border-border p-4 shadow-xs ${swatch.className}`}
            >
              <span className="text-body-sm font-medium">{swatch.token}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-grid-gap grid grid-cols-1 gap-grid-gap sm:grid-cols-3">
          {SURFACE_SWATCHES.map((swatch) => (
            <li
              key={swatch.token}
              className={`rounded-lg border border-border p-4 ${swatch.className}`}
            >
              <span className="text-body-sm font-medium">{swatch.token}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="tokens-type" spacing="sm">
        <h2 id="tokens-type" className="text-h3">
          Fluid type scale
        </h2>
        <p className="mt-2 max-w-narrow text-body text-muted-foreground">
          Each step binds size, line-height, letter-spacing and weight. Resize
          the window: everything from <code>h5</code> up interpolates between
          the mobile and 1440px values. Body copy never drops below 16px.
        </p>

        <dl className="mt-stack-gap flex flex-col gap-4">
          {TYPE_STEPS.map((step) => (
            <div
              key={step.token}
              className="flex flex-col gap-1 border-b border-border pb-4 last:border-b-0"
            >
              <dt className="font-mono text-caption text-muted-foreground">
                text-{step.token}
              </dt>
              <dd className={`${step.className} text-foreground`}>
                Sign with confidence
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
