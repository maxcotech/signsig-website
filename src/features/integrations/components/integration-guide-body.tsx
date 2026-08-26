import { CodeBlock } from "@/features/integrations/components/code-block";
import type { IntegrationGuide } from "@/features/integrations/types";

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-body-sm text-foreground marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * The long-form body of an integration guide: Purpose, Prerequisites, Setup
 * Steps, Code Example, Expected Outcome.
 *
 * Heading levels descend properly — the page supplies the `<h1>`, each
 * section is an `<h2>` and each "Step N" an `<h3>` — so the document outline
 * reflects the visual hierarchy rather than just its type sizes.
 */
export function IntegrationGuideBody({ guide }: { guide: IntegrationGuide }) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <section aria-labelledby="guide-purpose">
        <h2 id="guide-purpose" className="text-h5 text-foreground">
          Purpose
        </h2>
        <p className="mt-3 text-body-sm text-foreground">{guide.purpose}</p>
      </section>

      <section aria-labelledby="guide-prerequisites">
        <h2 id="guide-prerequisites" className="text-h5 text-foreground">
          Prerequisites
        </h2>
        <Bullets items={guide.prerequisites} />
      </section>

      <section aria-labelledby="guide-steps">
        <h2 id="guide-steps" className="text-h5 text-foreground">
          Setup Steps
        </h2>
        <div className="mt-4 flex flex-col gap-6">
          {guide.steps.map((step) => (
            <div key={step.title}>
              <h3 className="text-body-sm font-semibold text-foreground">
                {step.title}
              </h3>
              {step.note && (
                <p className="mt-3 text-body-sm text-foreground">{step.note}</p>
              )}
              {step.items && <Bullets items={step.items} />}
              {/* A folder tree, where indentation IS the content. Scrolls in
                  its own container so it never widens the page at 360px. */}
              {step.block && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-2 p-4 font-mono text-body-sm text-foreground">
                  {step.block.join("\n")}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="guide-code">
        <h2 id="guide-code" className="text-h5 text-foreground">
          {guide.samples.length > 1 ? "Code Examples" : "Code Example"}
        </h2>
        <div className="flex flex-col gap-4">
          {guide.samples.map((sample) => (
            <CodeBlock
              key={sample.intro}
              intro={sample.intro}
              lines={sample.lines}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="guide-outcome">
        <h2 id="guide-outcome" className="text-h5 text-foreground">
          Expected Outcome
        </h2>
        <p className="mt-3 text-body-sm font-semibold text-foreground">
          {guide.outcomeIntro}
        </p>
        <Bullets items={guide.outcomes} />
      </section>
    </div>
  );
}
