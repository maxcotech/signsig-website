# SEO

The infrastructure is built. Your job per page is to **use it correctly** and
tick the checklist in §3.

---

## 1. Metadata — always via `buildMetadata()`

Every page's metadata goes through one function. No page writes a raw `Metadata`
object; no page renders `<head>` tags by hand.

```tsx
// src/app/(marketing)/pricing/page.tsx
import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing", // no brand suffix — the template adds it
  description: "Simple per-seat pricing …", // 120-160 chars
  path: "/pricing", // drives the canonical URL
});
```

| Option        | Type                               | Default            | Notes                                                                                                                     |
| ------------- | ---------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string?`                          | —                  | **Without** the brand. The root template appends `" \| SignSig"`. **Omit on the home page** so the absolute default wins. |
| `description` | `string?`                          | `SITE.description` | Aim 120–160 characters.                                                                                                   |
| `path`        | `string?`                          | `"/"`              | Root-relative. Drives `alternates.canonical` and the OG URL.                                                              |
| `image`       | `{ path, width?, height?, alt? }?` | dynamic OG route   | Per-page social image.                                                                                                    |
| `noIndex`     | `boolean?`                         | `false`            | Sets `robots: { index: false, follow: false }`.                                                                           |

It returns a fully populated object: title, description, canonical,
`openGraph`, `twitter`, `robots`.

Dynamic routes use `generateMetadata()` and call the same function:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params; // params is a Promise in Next 15+
  const post = await getPost(slug);
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}
```

### What is already handled globally

Set once in `src/app/layout.tsx` — do not repeat per page:

- `metadataBase` from `NEXT_PUBLIC_SITE_URL` (falls back to `VERCEL_URL`, then
  `http://localhost:3000`). **Without this every relative OG and canonical URL
  is wrong in production and nobody notices until launch.**
- Title template `"%s | SignSig"` with the absolute default
  `"SignSig — Secure digital signatures"`.
- Default `openGraph` and `twitter` blocks, icons, `referrer`,
  `formatDetection`.
- `viewport` with `themeColor` (light/dark), `initialScale: 1`, and pinch-zoom
  left enabled.
- `Organization` and `WebSite` JSON-LD. **Do not duplicate these per page.**

---

## 2. Route registration — the step people forget

```ts
// src/config/routes.ts
export const ROUTES: readonly RouteEntry[] = [
  {
    path: "/",
    label: "Home",
    changeFrequency: "monthly",
    priority: 1,
    isIndexed: true,
  },
  {
    path: "/pricing",
    label: "Pricing",
    changeFrequency: "monthly",
    priority: 0.8,
    isIndexed: true,
  },
];
```

`sitemap.ts` and `robots.ts` are **generated from this list**. A route that is
not here never reaches the sitemap, no matter how correct the page is.
`isIndexed: false` keeps a route out of both the sitemap and the crawl.

Priority guidance: home `1`, primary conversion pages `0.8`, supporting pages
`0.5`, legal `0.3`.

---

## 3. THE PER-PAGE CHECKLIST

Tick every line before declaring the page done.

- [ ] Page exports `metadata` (or `generateMetadata`) built via
      `buildMetadata()`. **No inline `<head>` tags. No page ships without
      metadata.**
- [ ] Route added to `src/config/routes.ts`.
- [ ] **Exactly one `<h1>`** per page; heading levels descend without skipping
      (no `h2` → `h4`).
- [ ] Semantic landmarks: `<header> <nav> <main> <section> <article> <aside>

<footer>`. **A `<div>` is a last resort, not a default.**
- [ ] Each `<section>` that is a landmark has an accessible name
      (`aria-labelledby` pointing at its heading id).
- [ ] All images via `next/image`, with a **real `alt`** (`alt=""` **only** for
      genuinely decorative images), explicit `width`/`height`, and `priority`
      on the LCP image **and nothing else**.
- [ ] `sizes` set on any image that is not fixed-width — otherwise mobile
      downloads the desktop asset.
- [ ] Links use `next/link`. Anchor text is descriptive ("See pricing", never
      "click here"). External links carry `target="_blank"` +
      `rel="noopener noreferrer"`.
- [ ] Relevant JSON-LD attached via `<JsonLd>`.
- [ ] **Copy transcribed from the PNG exactly.** It is the indexed content.
      Never paraphrase, never lorem-ipsum, never "improve" it. If text is
      illegible, **stop and ask** — do not invent.
- [ ] Server Component by default. `"use client"` only on the interactive leaf,
      pushed as far down the tree as possible.
- [ ] No layout shift: space reserved for images, embeds and fonts.
- [ ] Icon-only interactive elements have an accessible name (`aria-label`), and
      decorative icons are `aria-hidden="true"`.

---

## 4. JSON-LD recipes

Builders live in `src/lib/seo.ts`; render with `<JsonLd>` from
`src/components/seo/json-ld.tsx`.

| Builder                                | Use on                          |
| -------------------------------------- | ------------------------------- |
| `buildOrganizationSchema()`            | Root layout only — already done |
| `buildWebSiteSchema()`                 | Root layout only — already done |
| `buildBreadcrumbSchema(trail)`         | Any page below the root         |
| `buildFaqSchema(entries)`              | A page with a real, visible FAQ |
| `buildSoftwareApplicationSchema(opts)` | Product / pricing page          |

```tsx
const FAQ_ENTRIES = [{ question: "How secure is SignSig?", answer: "…" }];

export default function FaqPage() {
  return (
    <>
      <JsonLd schema={buildFaqSchema(FAQ_ENTRIES)} />
      <Section aria-labelledby="faq-heading">…</Section>
    </>
  );
}
```

Breadcrumbs:

```tsx
<JsonLd
  schema={buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ])}
/>
```

> **The markup must match the visible copy exactly.** Google treats a mismatch
> between structured data and rendered content as spam. Feed `buildFaqSchema()`
> the _same_ array the page renders — never a hand-retyped second copy.

---

## 5. Files and env

| File                          | Role                                                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/sitemap.ts`          | Generated from the route registry                                                                                                                                            |
| `src/app/robots.ts`           | Generated from the route registry; points at the sitemap                                                                                                                     |
| `src/app/manifest.ts`         | PWA manifest. ⚠ declares `/icons/icon-192.png` and `/icons/icon-512.png`, which **do not exist yet** — generate them from the real logo before launch, or remove the entries |
| `src/app/opengraph-image.tsx` | Default OG image via `next/og`, brand-tokened                                                                                                                                |
| `src/app/favicon.ico`         | Default favicon (Next.js placeholder — replace with the real mark)                                                                                                           |

`.env.example` documents `NEXT_PUBLIC_SITE_URL`. Set it in the deployment
environment. Locally it falls back to `http://localhost:3000`.

**Verify after any metadata change:**

```bash
npm run build && npm run start
curl -s localhost:3000/sitemap.xml
curl -s localhost:3000/robots.txt
```
