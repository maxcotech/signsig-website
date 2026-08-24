# src/features — Feature-scoped, non-reusable UI

One directory per feature, named in `kebab-case`, each with this shape:

    <feature-name>/
      components/   # UI used only by this feature
      hooks/        # hooks used only by this feature
      lib/          # pure helpers used only by this feature
      types.ts      # types local to this feature

**Belongs here:** the actual implementation of page sections — hero, pricing table, FAQ, testimonials. This is where most of the code written in a page session lands.

**Does NOT belong here:** anything a second feature imports. The moment a second feature needs it, promote it to `src/components/common/` and update docs/COMPONENTS.md.

A feature never imports from another feature. If two features need the same thing, it belongs in `common/`.
