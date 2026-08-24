# src/lib — Pure functions and shared utilities

`utils.ts` (`cn()`), `seo.ts` (metadata and JSON-LD builders), `constants.ts`.

**Belongs here:** pure, testable, framework-agnostic functions. No JSX.

**Does NOT belong here:** React components (even tiny ones), site configuration data (that is `src/config/`), or feature-specific transforms (those are `src/features/<feature>/lib/`).

Files are `kebab-case.ts`, exported functions are `camelCase`, named exports only.
