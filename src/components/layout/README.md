# src/components/layout — Page-structural chrome

The frame around content: Header, Footer, Container, Section, MobileNav, SkipLink.

**Belongs here:** anything that defines page structure or shell and is used across many pages.

**Does NOT belong here:** content components (cards, feature tiles, testimonials) — those are `common/` or feature-local.

Never hardcode a page width here. Width comes from the `--container-content` token, via `<Container>`.
