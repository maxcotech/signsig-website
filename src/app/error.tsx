"use client";

import { useEffect } from "react";

import { ActionButton } from "@/components/common/action-button";
import { Section } from "@/components/layout/section";

/**
 * Route-level error boundary.
 *
 * MUST be a Client Component and MUST be a default export — this is one of the
 * few places Next.js requires a default export, and one of the few places
 * `"use client"` belongs at the top of a file in `src/app/`.
 *
 * No `metadata` export: error boundaries cannot define metadata, because they
 * render after the response has already begun.
 *
 * The raw error message is deliberately NOT rendered. It can carry internal
 * detail, and in production Next.js redacts it anyway; showing `error.message`
 * would display "An unexpected error occurred" and look broken. The `digest`
 * is the value that correlates with server logs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real error reporter (Sentry et al) when one is added.
    console.error(error);
  }, [error]);

  return (
    <Section spacing="lg" aria-labelledby="error-heading">
      <p className="text-overline text-destructive-text uppercase">Error</p>
      <h1
        id="error-heading"
        className="mt-4 max-w-narrow text-h1 text-foreground"
      >
        Something went wrong
      </h1>
      <p className="mt-6 max-w-narrow text-body-lg text-muted-foreground">
        The page failed to load. Trying again often resolves it.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-caption text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-stack-gap">
        <ActionButton size="lg" onClick={reset}>
          Try again
        </ActionButton>
      </div>
    </Section>
  );
}
