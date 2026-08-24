# src/components — Reusable UI

Four subdirectories, and the boundary between them is load-bearing:

- `ui/` — shadcn/ui primitives. CLI-owned. Do not hand-write files here.
- `layout/` — page-structural chrome (Header, Footer, Container, Section, MobileNav).
- `common/` — cross-feature reusables, used by **2 or more** features.
- `seo/` — structured-data helpers that render markup.

Used by exactly one feature? It does not go here — it goes in `src/features/<feature>/components/`. See the decision tree in docs/STRUCTURE.md.
