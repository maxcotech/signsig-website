import Image from "next/image";
import { Code2Icon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import { GithubIcon } from "@/components/common/github-icon";
import { Section } from "@/components/layout/section";

/**
 * "{Built For Developers in mind}" — copy and code sample transcribed
 * verbatim from the design.
 *
 * RESPONSIVE: side-by-side text + code at `lg`+ (matches the design's
 * roughly 2/5–3/5 split); stacked below `lg` with text first, since the copy
 * carries the message and the code panel is supporting evidence. The code
 * panel scrolls horizontally on narrow viewports rather than wrapping, so
 * indentation stays intact.
 */
export function DevelopersSection() {
  return (
    <Section
      id="developers"
      aria-labelledby="developers-heading"
      className="bg-surface-2"
    >
      <div className="grid grid-cols-1 items-center gap-stack-gap lg:grid-cols-[2fr_3fr]">
        <div>
          <Code2Icon className="size-6 text-primary" aria-hidden="true" />
          <h2 id="developers-heading" className="mt-4 text-h2 text-foreground">
            {"{Built For Developers"}
            <br />
            {"in mind}"}
          </h2>
          <p className="mt-4 max-w-narrow text-body-lg text-muted-foreground">
            SignSig is fully open source. Audit the code, contribute features,
            or deploy it on your own infrastructure for complete control.
          </p>
          <ActionButton asChild variant="outline" className="mt-stack-gap">
            <a
              href="https://github.com/signsig"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Github
              <GithubIcon aria-hidden="true" />
            </a>
          </ActionButton>
        </div>

        {/* The API sample ships as the design's own rendered panel. Its alt
            summarises what the code does rather than transcribing it —
            see docs/DECISIONS.md for the trade-off this accepts.

            NO `rounded-*` here: the PNG carries the panel's own 24px corner
            radius baked in, with transparent corners. Clipping it again with
            a CSS radius produced two mismatched curves. */}
        <Image
          src="/images/home/built-for-developers.png"
          alt="SignSig API quickstart: JavaScript code importing the @signsig/sdk package, creating a client with an API key, creating a document from an NDA template with a signer and an approver, then sending it and reading its status."
          width={940}
          height={830}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Section>
  );
}
