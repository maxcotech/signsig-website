# src/config — Single sources of truth

Static, typed configuration read across the app.

- `site.ts` — canonical name, URL, description, locale, socials, default OG image.
- `navigation.ts` — every nav tree (header, footer, mobile). One source of truth, consumed by both `<Header>` and `<MobileNav>`.
- `routes.ts` — the route registry `sitemap.ts` is generated from.

**Belongs here:** data that must be identical everywhere it appears.

**Does NOT belong here:** page-specific copy or content arrays — colocate those as `*.data.ts` next to the feature that renders them. Config is for cross-cutting facts, not for content.

Adding a route? Register it in `routes.ts` or it will never reach the sitemap.
