/**
 * Every navigation tree in the site.
 *
 * `<Header>`, `<MobileNav>` and `<Footer>` all read from here. That is the point:
 * the desktop nav and the mobile Sheet must never drift apart, and they cannot
 * if there is only one list. Do not hardcode a nav item in a component.
 *
 * Transcribed from the home page design (2026-08-24) plus the user-supplied
 * dropdown screenshots for "Solutions", "Developers" and "Download" (same
 * date) — the original design PNG only showed these nav items closed.
 *
 * The Solutions menu is NOT hardcoded here: it is generated from `SOLUTIONS`
 * in `config/solutions.ts`, which the `[slug]` route and the sitemap also read.
 * Add a solution there, and the nav, the routes and the page all follow.
 */

import { getBusinessAppUrl } from "@/config/site";
import {
  SOLUTION_GROUP_TITLES,
  type SolutionGroup,
  solutionHref,
  solutionsInGroup,
} from "@/config/solutions";

export type NavItem = {
  /** Visible label. Must match the design exactly — this is indexed content. */
  label: string;
  /** Root-relative path, or an absolute URL for an external destination. */
  href: string;
  /** Set for links that leave the site; adds target and rel handling. */
  isExternal?: boolean;
  /** Optional one-line description, for nav layouts that show one. */
  description?: string;
};

export type NavColumn = {
  /** Column heading, e.g. "By Use Cases". Omitted for a plain, unlabelled list. */
  title?: string;
  items: readonly NavItem[];
};

/** A primary nav item that opens a mega-menu instead of navigating directly. */
export type NavMenuItem = {
  label: string;
  columns: readonly NavColumn[];
};

export type NavGroup = {
  /** Group heading. Rendered as a real heading in the footer. */
  title: string;
  items: readonly NavItem[];
};

/**
 * The Solutions mega-menu, derived from the route registry in
 * `config/solutions.ts` so the menu can never advertise a page that does not
 * exist — or omit one that does. Column order follows SOLUTION_GROUP_TITLES.
 */
const SOLUTIONS_MENU: NavMenuItem = {
  label: "Solutions",
  columns: (Object.keys(SOLUTION_GROUP_TITLES) as readonly SolutionGroup[]).map(
    (group) => ({
      title: SOLUTION_GROUP_TITLES[group],
      items: solutionsInGroup(group).map((solution) => ({
        label: solution.label,
        href: solutionHref(solution.slug),
      })),
    }),
  ),
};

/**
 * Primary navigation. Rendered horizontally at `md` and above, and inside the
 * mobile Sheet (as expandable accordion groups) below `md`.
 */
export const MAIN_NAV: readonly (NavItem | NavMenuItem)[] = [
  SOLUTIONS_MENU,
  { label: "Pricing", href: "/pricing" },
  {
    label: "Developers",
    columns: [
      {
        items: [
          { label: "API Documentation", href: "/developers/api-documentation" },
          { label: "SDKs & Libraries", href: "/developers/sdks-libraries" },
          // "Integration Hub" removed from navigation at the user's request
          // ("comment out till we have something") — the route, its
          // sitemap entries and its content are untouched, so it stays
          // reachable by direct URL. See docs/DECISIONS.md.
        ],
      },
    ],
  },
  {
    label: "Download",
    columns: [
      {
        title: "For Android",
        items: [
          {
            label: "Get SignSig app on Play Store",
            href: "https://play.google.com/store",
            isExternal: true,
          },
        ],
      },
      {
        title: "For iOS",
        items: [
          {
            label: "Get SignSig app on App Store",
            href: "https://www.apple.com/app-store/",
            isExternal: true,
          },
        ],
      },
    ],
  },
] as const;

/**
 * Header/mobile-sheet auth actions — "Sign In" (text) and "Sign Up" (button).
 *
 * "Sign In" routes straight to the business app's real login route
 * (`signsig-web`'s `routes/(auth)/login.tsx` — the parenthesised segment is a
 * route group and does not appear in the URL, so the path is just `/login`),
 * since there is nothing to sign in to on this marketing site. "Sign Up"
 * still points at the in-repo `/sign-up` placeholder — untouched, out of
 * scope for this change. See docs/DECISIONS.md.
 */
export const SIGN_IN_NAV: NavItem = {
  label: "Sign In",
  href: `${getBusinessAppUrl()}/login`,
};
export const SIGN_UP_NAV: NavItem = { label: "Sign Up", href: "/sign-up" };

/**
 * Footer columns, five across at `md`+, stacked at base. If this grows past
 * five groups, switch the mobile treatment to an accordion — see
 * docs/RESPONSIVE.md.
 */
export const FOOTER_NAV: readonly NavGroup[] = [
  {
    title: "Features",
    items: [
      { label: "Document Signing", href: "/features/document-signing" },
      { label: "Workflow Automation", href: "/features/workflow-automation" },
      {
        label: "Identity Verification",
        href: "/features/identity-verification",
      },
      { label: "Self-Hosting", href: "/features/self-hosting" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "API Documentation", href: "/developers/api-documentation" },
      { label: "SDKs & Libraries", href: "/developers/sdks-libraries" },
      // "Integration Hub" removed — see the matching note on MAIN_NAV above.
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      // "Security & Compliance" removed at the user's request ("till we have
      // something") — the route and its content are untouched and still
      // reachable directly; only this nav entry is hidden. See
      // docs/DECISIONS.md.
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "System Status", href: "/resources/system-status" },
      { label: "Careers", href: "/resources/careers" },
      { label: "Knowledge Base", href: "/resources/knowledge-base" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "SOC 2 Certified", href: "/compliance/soc-2" },
      { label: "GDPR Compliant", href: "/compliance/gdpr" },
      { label: "HIPAA Ready", href: "/compliance/hipaa" },
      { label: "ISO 27001", href: "/compliance/iso-27001" },
    ],
  },
] as const;

/** Footer action row: app store links, LinkedIn, support email. */
export const FOOTER_ACTIONS: readonly NavItem[] = [
  {
    label: "Get On Playstore",
    href: "https://play.google.com/store",
    isExternal: true,
  },
  {
    label: "Get On Appstore",
    href: "https://www.apple.com/app-store/",
    isExternal: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/signsig",
    isExternal: true,
  },
  { label: "support@signsig.com", href: "mailto:support@signsig.com" },
] as const;

/** True for a nav item that opens a mega-menu rather than navigating directly. */
export function isNavMenuItem(
  item: NavItem | NavMenuItem,
): item is NavMenuItem {
  return "columns" in item;
}
