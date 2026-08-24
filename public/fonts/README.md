# public/fonts — Self-hosted font files

Usually **empty**, and that is correct. Fonts load through `next/font` (see `src/app/layout.tsx`), which self-hosts and subsets them at build time.

Only add files here for a licensed face `next/font/google` cannot provide, loaded via `next/font/local`. Never add a CDN `<link>` for a font — it costs a render-blocking round trip and reintroduces the layout shift `next/font` exists to remove.
