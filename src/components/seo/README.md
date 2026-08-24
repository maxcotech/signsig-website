# src/components/seo — SEO markup helpers

Components that render SEO-relevant markup, chiefly `<JsonLd>` for structured data.

**Belongs here:** JSON-LD emitters and structured-data wrappers.

**Does NOT belong here:** the metadata builders themselves — those are pure functions in `src/lib/seo.ts`. This directory is for things that _render_; `lib/seo.ts` is for things that _compute_.
