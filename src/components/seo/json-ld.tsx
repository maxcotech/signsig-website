import type { JsonLdSchema } from "@/lib/seo";

/**
 * Renders a JSON-LD structured-data block.
 *
 * Build the object with a helper from `src/lib/seo.ts` — `buildFaqSchema()`,
 * `buildBreadcrumbSchema()`, and so on — then hand it to this component. Never
 * hand-write a `<script type="application/ld+json">` tag in a page.
 *
 * Safe by construction: the schema is serialised with `JSON.stringify`, so the
 * only injection surface is a literal `</script>` inside a string value. That
 * sequence is escaped below. Do not replace this with template interpolation.
 *
 * Usage — one block per entity, as many as the page needs:
 *
 *   <JsonLd schema={buildFaqSchema(FAQ_ENTRIES)} />
 */
export function JsonLd({ schema }: { schema: JsonLdSchema }) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // The payload is JSON we serialised ourselves, with `<` escaped.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
