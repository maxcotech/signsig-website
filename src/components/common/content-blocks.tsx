import type { ContentBlock, ContentSection } from "@/content/blocks";

/**
 * Renders the `ContentBlock` vocabulary from `src/content/blocks.ts`.
 *
 * Shared by the legal policies and the trust/compliance pages: both are long
 * prose documents made of the same six block kinds, and neither should own a
 * private copy of this markup.
 *
 * Headings are `<h3>` because every caller puts these inside an `<h2>`
 * section — see `<ContentSections>` below, which is the only intended entry
 * point.
 */
function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "subheading":
      return (
        <h3 className="mt-3 text-body font-semibold text-foreground">
          {block.text}
        </h3>
      );

    case "lead":
      return (
        <p className="text-body-sm font-semibold text-foreground">
          {block.text}
        </p>
      );

    case "labelled":
      return (
        <p className="text-body-sm text-foreground">
          <strong className="font-semibold">{block.label}</strong> {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-body-sm text-foreground marker:text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "table":
      return (
        // Tables are the one block that can be wider than the column, so each
        // scrolls in its own container rather than pushing the page sideways.
        <div className="overflow-x-auto">
          <table className="w-full min-w-narrow border-collapse text-left text-body-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border-b border-border py-2 pr-4 font-semibold text-foreground"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td
                      key={index}
                      className="border-b border-border py-2 pr-4 align-top text-muted-foreground first:text-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="text-body-sm text-foreground">{block.text}</p>;
  }
}

/** A run of `<h2>` sections. `idFor` builds each section's anchor id. */
export function ContentSections({
  sections,
  idFor,
}: {
  sections: readonly ContentSection[];
  idFor: (section: ContentSection, index: number) => string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section, sectionIndex) => {
        const id = idFor(section, sectionIndex);
        return (
          <section key={id} aria-labelledby={id}>
            <h2 id={id} className="text-body font-semibold text-foreground">
              {section.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
