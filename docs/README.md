# docs — Governing documents

These are not notes. They are the **only channel** between sessions: every
session works from a single desktop PNG with no memory of the previous one, so
anything not written down here does not exist.

**Belongs here:** rules, doctrine, inventories, and the append-only decision log.

**Does NOT belong here:** scratch notes, session transcripts, or design assets.

## Read in this order

| #   | File                                               | For                                                                                                                                                                     |
| --- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [`../AGENTS.md`](../AGENTS.md)                     | **The constitution.** Absolute rules, pre-flight checklist, definition of done. Read first, every session.                                                              |
| 2   | [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md)           | The token system: Tailwind v4 branch, colour space, the brand ramp, type/spacing/radius/shadow/z-index/motion scales, and how to add a token.                           |
| 3   | [`STRUCTURE.md`](./STRUCTURE.md)                   | Folder tree, placement decision tree, naming table, import order, the 150-line rule and approved decomposition patterns.                                                |
| 4   | [`COMPONENTS.md`](./COMPONENTS.md)                 | **Living inventory.** Every reusable component with props and usage. Read before creating anything; update in the same change.                                          |
| 5   | [`DESIGN-TRANSLATION.md`](./DESIGN-TRANSLATION.md) | The pixel-perfect workflow, step by step, from reading the PNG to reporting.                                                                                            |
| 6   | [`SEO.md`](./SEO.md)                               | `buildMetadata()`, the per-page checklist, JSON-LD recipes, sitemap registration.                                                                                       |
| 7   | [`RESPONSIVE.md`](./RESPONSIVE.md)                 | The canonical 1440px frame, breakpoints, and **the derivation doctrine table**. Designs are desktop-only; this is how every session derives the same tablet and mobile. |
| 8   | [`DECISIONS.md`](./DECISIONS.md)                   | Append-only log: what was decided, why, and open questions. Skim for precedents; append, never rewrite.                                                                 |
| —   | [`SESSION-TEMPLATE.md`](./SESSION-TEMPLATE.md)     | The copy-paste kickoff prompt for a new page session.                                                                                                                   |

## Keeping these honest

- `COMPONENTS.md` and `DECISIONS.md` are **living** — a change that adds a
  component or deviates from doctrine is incomplete until they are updated.
- The other files describe rules. If reality and a rule diverge, **fix one of
  them in the same change** — a stale rule is worse than no rule, because the
  next session will follow it.
- Two facts are duplicated into code on purpose: the 1440px frame width and the
  1200px content column live in `src/lib/constants.ts` and as the
  `--container-content` token. If you change the frame, change all three.
