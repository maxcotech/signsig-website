# src/components/common — Cross-feature reusables

Components used by **two or more** features: Logo, ActionButton, ThemeToggle.

**Belongs here:** a component a second feature now needs, or a wrapper around a `ui/` primitive that adds project behaviour.

**Does NOT belong here:** anything only one feature uses. Keep it feature-local until a second caller appears — then promote it here, update all imports, and update docs/COMPONENTS.md in the same change.

Every component in this directory MUST be listed in docs/COMPONENTS.md.
