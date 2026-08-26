# public/images — Raster and vector imagery

Photos, illustrations, screenshots, OG images. Serve via `next/image` with explicit `width`/`height`, a real `alt`, and `sizes` on anything that is not fixed-width.

Name files `kebab-case` and descriptively (`pricing-hero-desktop.webp`, not `img1.png`). Prefer WebP or AVIF. Do not commit multi-megabyte source exports — compress first.

---

## `home/` — extracted from the home page design PNG

These are **not** hand-authored assets. Every file was cropped out of the
source design export (`Home.png`, 2560×13452, Figma) on 2026-08-24, because
the illustrations are product mockups that would be lossy and laborious to
rebuild in markup — the first pass tried that and the approximations were
visibly wrong. See `docs/DECISIONS.md`.

Filenames match the card title they belong to.

| File                              | Source rect in `Home.png` `[x, y, w, h]` |
| --------------------------------- | ---------------------------------------- |
| `document-signing.png`            | `[143, 1945, 1112, 467]`                 |
| `workflow-automation.png`         | `[1317, 1945, 1112, 467]`                |
| `security-compliance.png`         | `[143, 2735, 1112, 467]`                 |
| `audit-trails.png`                | `[1317, 2735, 1112, 467]`                |
| `templates.png`                   | `[143, 3525, 1112, 467]`                 |
| `workspaces-collaboration.png`    | `[1317, 3525, 1112, 467]`                |
| `integrations.png`                | `[143, 4315, 1112, 467]`                 |
| `personalized-deployment.png`     | `[1317, 4315, 1112, 467]`                |
| `step-upload-or-create.png`       | `[269, 5942, 633, 248]`                  |
| `step-send-to-sign.png`           | `[963, 5942, 633, 248]`                  |
| `step-track-and-manage.png`       | `[1657, 5942, 633, 248]`                 |
| `built-for-developers.png`        | `[1350, 6876, 940, 830]` + rounded mask  |
| `trusted-without-limitations.png` | `[88, 1388, 2382, 52]` + alpha cut       |

The feature-card grid in the source is two columns at `x = 142` and
`x = 1316` (each 1113 wide, 61px gutter) and four rows at `y = 1944, 2734,
3524, 4314` (each 729 tall). Each card's illustration stage is the top 468px;
the crops above inset by 1px to drop the design's own 1px card edge. The
component does not redraw it — cards are separated by elevation
(`shadow-card`), not a border. See `docs/DECISIONS.md`.

Each illustration **includes its own background**, so the component renders it
flush with no `bg-*` on the stage. Do not add one — it will show as a seam.

`built-for-developers.png` is the exception: it is masked to the panel's own
44px (≈24px at the 1440 frame) rounded rectangle, with the corners cut to
**transparent** and the mask inset 3px so it trims the antialiased edge (a
fringe of the design's light page background traces the arc otherwise).
Because the radius is baked in, that image must **not** be given a CSS
`rounded-*` class — doing so clips a second, mismatched curve over it.

`trusted-without-limitations.png` is the other exception: it is
un-composited from the design's white page to a real alpha channel, so the
page background shows through rather than a white bar. Its ink lands as black
at ~17% alpha, so the component adds `dark:invert` to flip it to white at the
same alpha for dark mode — contrast works out about the same (~1.5:1 against
the page) in both themes, preserving the deliberately muted look.

That trick only works because the strip is **pure greyscale**. A blanket
`invert` would wreck the brand green and the photographs in the colour
illustrations — see "Dark mode" below for what those need instead.

> **Re-cropping an existing filename will not show up in the browser.** Next's
> image optimizer and the browser both cache by URL, so a same-named
> replacement serves stale. Either hard-reload, or rename the file — which is
> why the panel above is no longer called `api-quickstart.png`.

`../signsig-logo.png` is the header/footer lockup, cropped from `[47, 66, 173,
56]` and un-composited from its white background to a real alpha channel
(alpha from the darkest channel's distance from white, then colour
un-premultiplied). Verified to composite cleanly on white, tinted and
near-black surfaces.

**All of these are raster stand-ins for real brand assets.** Replace them with
SVG/vector originals when those arrive; the component API does not change.
Note `integrations.png` tiles a third-party product's logo, inherited from the
design — confirm licensing before launch.

## ⚠ Dark mode — these files need transparent re-exports from Figma

The illustrations above have the design's light background **baked in**, so on
a dark page every card shows a light block.

**The fix is to re-export them from Figma with the background layer hidden**,
so the artwork sits on transparency and inherits whatever surface it is placed
on — light in light mode, dark in dark mode. The components are already set up
for exactly that: each renders a single `<Image>` on a tokenised stage
(`bg-surface-2` on `<FeatureCard>`, `bg-card` on `<WorkflowStepCard>`), which
is hidden behind today's opaque PNGs and takes over the moment they are
transparent. **Dropping transparent files in over these same names is the only
change needed** — no component or CSS edits.

**Do not try to derive the transparency from these flattened PNGs.** It was
attempted and it cannot work reliably: the artwork's own white panels are the
same colour as the background (`#ffffff` against `#fbfbfb`, a distance of 4 per
channel), so neither colour keying nor an edge flood-fill can tell them apart.
It succeeds on `workflow-automation.png` and destroys `document-signing.png`,
whose white document card dissolves into the background. In Figma the
background is a separate layer, which is why the export is trivial there and
impossible here. See docs/DECISIONS.md.

Files that do **not** need re-exporting: `built-for-developers.png` (already a
dark panel) and `trusted-without-limitations.png` (greyscale, already
transparent and handled with `dark:invert`).
