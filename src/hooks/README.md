# src/hooks — Global hooks

Hooks used across features: `use-media-query.ts`, `use-scroll-lock.ts`.

**Belongs here:** a hook that two or more features (or a layout component) use.

**Does NOT belong here:** feature-specific hooks — those go in `src/features/<feature>/hooks/`.

Naming is mechanical: file `use-media-query.ts`, named export `useMediaQuery`. No default exports.
