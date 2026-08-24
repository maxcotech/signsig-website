# src/types — Shared global types

Types used by **two or more** unrelated modules.

**Belongs here:** genuinely cross-cutting shapes.

**Does NOT belong here:** component prop types (colocate them with the component that uses them), or feature types (those go in `src/features/<feature>/types.ts`).

`PascalCase` names, no `I` prefix. Prefer `type` aliases; reach for `interface` when you need `extends` or declaration merging.
