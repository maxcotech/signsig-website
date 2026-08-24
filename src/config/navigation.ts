/**
 * Every navigation tree in the site.
 *
 * `<Header>`, `<MobileNav>` and `<Footer>` all read from here. That is the point:
 * the desktop nav and the mobile Sheet must never drift apart, and they cannot
 * if there is only one list. Do not hardcode a nav item in a component.
 *
 * COPY STATUS: labels below are PROVISIONAL scaffolding so the chrome renders
 * and can be tested at 360px. Replace them with the exact strings from the
 * design when the first navigation PNG arrives — nav labels are indexed content.
 */

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

export type NavGroup = {
  /** Group heading. Rendered as a real heading in the footer. */
  title: string;
  items: readonly NavItem[];
};

/**
 * Primary navigation. Rendered horizontally at `md` and above, and inside the
 * mobile Sheet below `md`. Keep this to ~5 items; more than that does not
 * survive the collapse to a drawer without becoming a scrolling list.
 */
export const MAIN_NAV: readonly NavItem[] = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

/**
 * Header call-to-action. Rendered as a button, and pinned to the bottom of the
 * mobile Sheet where it stays reachable with a thumb.
 */
export const HEADER_CTA: NavItem = {
  label: "Get started",
  href: "/#get-started",
} as const;

/**
 * Footer columns. Two columns at `md`, stacked at base — per the derivation
 * doctrine in docs/RESPONSIVE.md. If this grows past four groups, switch the
 * mobile treatment to an accordion rather than an ever-longer stack.
 */
export const FOOTER_NAV: readonly NavGroup[] = [
  {
    title: "Product",
    items: [
      { label: "Overview", href: "/#product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
] as const;

/**
 * Legal links, rendered in the footer base row.
 */
export const LEGAL_NAV: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
