# src/styles — Overflow stylesheets ONLY

Almost always empty, and that is correct.

All design tokens and base styles live in `src/app/globals.css`. This directory exists only for CSS that genuinely cannot: a vendor stylesheet that must be imported separately, or a keyframe-heavy animation file that would bloat globals.css.

**Do NOT** create a second token file here. Two token files means two conventions, and future sessions will not know which is authoritative. If you add a file here, record why in docs/DECISIONS.md.
