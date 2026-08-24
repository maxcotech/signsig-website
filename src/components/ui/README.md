# src/components/ui — shadcn/ui primitives (CLI-OWNED)

Install with `npx shadcn@latest add <name>`. **Do not hand-write or hand-edit files in this directory.**

Need project-specific behaviour on a primitive? **Wrap it** in `src/components/common/` — see `action-button.tsx` for the pattern. Do not fork it here: a fork silently diverges from upstream and the next `shadcn add` will fight you.

This directory is exempt from the 150-line ceiling and from the hardcoded-colour check, because its contents are generated. That exemption is exactly why the no-hand-editing rule matters.
