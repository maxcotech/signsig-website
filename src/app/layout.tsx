import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/common/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE, getSiteUrl } from "@/config/site";
import { THEME_COLOR } from "@/lib/raw-colors";
import {
  absoluteUrl,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";

import "./globals.css";

/**
 * Fonts are self-hosted and subset at build time by `next/font`, so there is no
 * render-blocking third-party request and no layout shift. `variable` exposes
 * each face as a CSS custom property that `globals.css` consumes via
 * `--font-sans` / `--font-display` / `--font-mono`.
 *
 * `display: "swap"` plus the fallback stacks in `globals.css` means text is
 * readable immediately. Never add a CDN <link> for a font.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * `metadataBase` is what makes every relative canonical and OG URL resolve
 * correctly. Without it, production emits relative OG image paths that no
 * crawler can fetch — and nothing visibly breaks until launch.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    // Pages pass a bare title; this appends the brand.
    template: `%s | ${SITE.name}`,
    // The home page and anything without an explicit title gets this.
    default: `${SITE.name} — ${SITE.tagline}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl(SITE.ogImage.path),
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: SITE.ogImage.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never set maximumScale or userScalable:false — it blocks pinch-zoom.
  themeColor: [...THEME_COLOR],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning is required by next-themes: it writes the theme
    // class onto <html> before React hydrates, to avoid a flash of the wrong
    // theme. Without this attribute React logs a mismatch on every page load.
    <html lang={SITE.lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} flex min-h-dvh flex-col`}
      >
        <ThemeProvider>
          <SkipLink />
          <Header />
          {/* The id is the target of <SkipLink>. Do not rename it. */}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        <JsonLd schema={buildOrganizationSchema()} />
        <JsonLd schema={buildWebSiteSchema()} />
      </body>
    </html>
  );
}
