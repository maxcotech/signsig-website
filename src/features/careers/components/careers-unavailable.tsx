import { Section } from "@/components/layout/section";

/**
 * The honest "we couldn't load this right now" state, shared by the careers
 * index, role detail and apply pages whenever a live fetch fails. Never used
 * in place of `notFound()` — that's reserved for the API confirming a role
 * genuinely doesn't exist. This is for the recoverable-later case: the
 * backend or `NEXT_PUBLIC_API_BASE_URL` was momentarily unavailable.
 */
export function CareersUnavailable({ what }: { what: string }) {
  return (
    <Section spacing="lg" aria-labelledby="careers-unavailable">
      <p
        id="careers-unavailable"
        role="status"
        className="text-center text-body-sm text-muted-foreground"
      >
        We couldn&rsquo;t load {what} right now. Please refresh the page, or
        email your CV to{" "}
        <a
          href="mailto:support@signsig.com"
          className="text-primary-text underline underline-offset-4"
        >
          support@signsig.com
        </a>
        .
      </p>
    </Section>
  );
}
