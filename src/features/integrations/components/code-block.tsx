"use client";

import { useEffect, useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";

/**
 * The "Code Example" block with a working Copy code button.
 *
 * A client component because copying needs the Clipboard API. The button
 * genuinely copies — a control labelled "Copy code" that does nothing is
 * worse than no control.
 *
 * The confirmation is a real one: `aria-live` announces it, and the reset
 * timer is cleared on unmount so it cannot fire after the component is gone.
 * `navigator.clipboard` is unavailable on insecure origins, so the failure
 * path is handled rather than throwing an unhandled rejection.
 */
export function CodeBlock({
  intro,
  lines,
}: {
  intro: string;
  lines: readonly string[];
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const message =
    state === "copied"
      ? "Copied"
      : state === "failed"
        ? "Press Ctrl+C to copy"
        : "Copy code";

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-sm text-foreground">{intro}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-body-sm font-medium text-primary-text transition-colors duration-fast hover:text-primary"
        >
          {state === "copied" ? (
            <CheckIcon className="size-4" aria-hidden="true" />
          ) : (
            <CopyIcon className="size-4" aria-hidden="true" />
          )}
          {message}
        </button>
        <span aria-live="polite" className="sr-only">
          {state === "copied" ? "Code copied to clipboard" : ""}
        </span>
      </div>

      <pre className="mt-3 overflow-x-auto rounded-xl bg-surface-2 p-6 text-body-sm text-foreground">
        <code className="font-sans">{lines.join("\n")}</code>
      </pre>
    </>
  );
}
