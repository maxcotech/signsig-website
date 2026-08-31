import type { Metadata } from "next";

import { SITE, getSiteUrl } from "@/config/site";

/**
 * Metadata and structured-data builders.
 *
 * EVERY page gets its metadata from `buildMetadata()`. No page writes a raw
 * `Metadata` object, and no page renders `<head>` tags by hand. One function
 * means the title template, canonical URL, OG tags and Twitter tags cannot
 * drift between pages. See the per-page checklist in docs/SEO.md.
 */

/** Resolve a root-relative path against the site origin. */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export type BuildMetadataOptions = {
  /**
   * Page title WITHOUT the brand suffix — the template in the root layout adds
   * " | SignSig". Omit entirely on the home page so the absolute default wins.
   */
  title?: string;
  /** Meta description. Defaults to the site description. Aim for 120-160 chars. */
  description?: string;
  /** Root-relative path of this page. Drives the canonical URL. */
  path?: string;
  /** Override the OG/Twitter image. Defaults to the dynamic brand OG route. */
  image?: { path: string; width?: number; height?: number; alt?: string };
  /** Keep this page out of search results. Use for thank-you and preview pages. */
  noIndex?: boolean;
  /**
   * 3-8 terms specific to THIS page — never the site-wide list copy-pasted
   * everywhere, which is the one thing that makes a `keywords` tag worthless.
   * Required, not optional: every call site must supply its own, which is
   * what makes "every page has keywords" a compiler-checked fact rather than
   * a claim that quietly rots as pages are added.
   */
  keywords: readonly string[];
};

export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  image,
  noIndex = false,
  keywords,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const og = image ?? SITE.ogImage;
  const ogImage = {
    url: absoluteUrl(og.path),
    width: og.width ?? SITE.ogImage.width,
    height: og.height ?? SITE.ogImage.height,
    alt: og.alt ?? SITE.ogImage.alt,
  };

  return {
    // The `title` key is OMITTED, not set to undefined, when the page did not
    // supply one. This is load-bearing: an explicitly present `title: undefined`
    // RESETS the parent's `title.default` rather than inheriting it, and the
    // page ships with no <title> tag at all — while og:title still looks
    // correct, so the bug is easy to miss. Omitting the key lets the root
    // layout default ("SignSig — <tagline>") apply, which is what the home
    // page wants. Verified against the prerendered HTML.
    ...(title ? { title } : {}),
    description,
    keywords: [...keywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: canonical,
      title: title
        ? `${title} | ${SITE.name}`
        : `${SITE.name} — ${SITE.tagline}`,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} | ${SITE.name}`
        : `${SITE.name} — ${SITE.tagline}`,
      description,
      images: [ogImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
          },
        },
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD builders                                                           */
/*                                                                            */
/* Each returns a plain object. Render it with <JsonLd schema={...} /> from     */
/* src/components/seo/json-ld.tsx — never with a hand-written <script> tag.    */
/* -------------------------------------------------------------------------- */

export type JsonLdSchema = Record<string, unknown>;

/** Organization entity. Belongs on the root layout, once, site-wide. */
export function buildOrganizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(SITE.ogImage.path),
    description: SITE.description,
    email: SITE.email,
    sameAs: SITE.socials.map((social) => social.href),
  };
}

/** WebSite entity. Belongs on the root layout alongside Organization. */
export function buildWebSiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

/** Breadcrumbs. Pass the trail in order, root first. */
export function buildBreadcrumbSchema(
  trail: readonly { name: string; path: string }[],
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * FAQPage. Questions and answers MUST be the exact strings rendered on the
 * page — Google treats a mismatch between markup and visible copy as spam.
 */
export function buildFaqSchema(
  entries: readonly { question: string; answer: string }[],
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/** SoftwareApplication. Use on the product or pricing page. */
export function buildSoftwareApplicationSchema(options: {
  name?: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: readonly { price: string; currency: string; name?: string }[];
}): JsonLdSchema {
  const {
    name = SITE.name,
    description = SITE.description,
    applicationCategory = "BusinessApplication",
    operatingSystem = "Web",
    offers,
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    operatingSystem,
    url: absoluteUrl("/"),
    ...(offers?.length
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.currency,
            ...(offer.name ? { name: offer.name } : {}),
          })),
        }
      : {}),
  };
}
