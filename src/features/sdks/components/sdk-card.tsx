import { DownloadIcon } from "lucide-react";

import type { SdkEntry } from "@/features/sdks/sdks.data";

/**
 * One SDK / library card: language badge, description, install snippet.
 *
 * The snippet is `<pre><code>` with `font-sans` — the design sets code in the
 * body face, not a monospace one, so the default `<pre>` mono is overridden
 * rather than the markup being downgraded to a `<div>`. It stays a `<pre>` so
 * the Java block's indentation survives and screen readers treat it as
 * preformatted.
 *
 * COLOUR: the design draws the snippet in `--primary` (~3.16:1 on this
 * surface, below AA for text this size). `docs/DESIGN-SYSTEM.md` §3 is
 * explicit that brand-coloured TEXT on a light background uses
 * `--primary-text` (step 11, ~4.71:1), so that is what is used here — a
 * deliberate, documented deviation. See docs/DECISIONS.md.
 */
export function SdkCard({ entry }: { entry: SdkEntry }) {
  return (
    <article className="flex animate-in-view flex-col gap-5 rounded-xl bg-surface-2 p-6 shadow-card">
      <h2 className="w-fit rounded-pill border border-border bg-card px-4 py-1.5 text-caption font-medium text-foreground">
        {entry.label}
      </h2>

      <p className="text-body-sm text-foreground">{entry.description}</p>

      <div className="flex items-center gap-3">
        <DownloadIcon
          className="size-4 shrink-0 text-primary-text"
          aria-hidden="true"
        />
        <pre className="min-w-0 flex-1 font-sans text-body-sm break-words whitespace-pre-wrap text-primary-text">
          <code>{entry.command.join("\n")}</code>
        </pre>
      </div>
    </article>
  );
}
