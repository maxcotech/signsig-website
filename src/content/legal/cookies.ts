/**
 * Cookie Policy — transcribed verbatim from the content document
 * ("LEGAL PAGES → PAGE: Cookie Policy"), 2026-08-26. The design PNG had an
 * entirely empty body.
 *
 * Sections 3, 4 and 9 are real tables in the document. They are transcribed
 * as `table` blocks rather than flattened into bullets, because a cookie
 * inventory with a Name / Purpose / Duration structure is the one part of a
 * cookie policy a reader scans rather than reads.
 *
 * ⚠ Same omission as Terms §18 and Privacy §15: section 14's
 * "[Support Phone]" and "[Company Address]" placeholders are left out.
 */

import type { ContentSection } from "@/content/blocks";

export const COOKIE_SECTIONS: readonly ContentSection[] = [
  {
    heading: "1. WHAT ARE COOKIES?",
    blocks: [
      {
        kind: "paragraph",
        text: "Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. They help websites remember your preferences, track your activity, and improve your experience.",
      },
      { kind: "paragraph", text: "Types of cookies include:" },
      {
        kind: "list",
        items: [
          "Session cookies: Deleted when you close your browser",
          "Persistent cookies: Remain on your device until they expire",
          "First-party cookies: Set by SignSig",
          "Third-party cookies: Set by third-party services",
        ],
      },
    ],
  },
  {
    heading: "2. WHY WE USE COOKIES",
    blocks: [
      { kind: "paragraph", text: "SignSig uses cookies to:" },
      {
        kind: "list",
        items: [
          "Authenticate and maintain your session: Keep you logged in securely",
          "Remember preferences: Store your language, timezone, and settings",
          "Improve functionality: Optimize the user interface and performance",
          "Analyze usage: Understand which features are used and how",
          "Prevent fraud: Detect and prevent unauthorized access",
          "Deliver advertising: Show relevant content and advertisements",
          "Provide integrations: Allow third-party tools to function",
        ],
      },
    ],
  },
  {
    heading: "3. ESSENTIAL COOKIES",
    blocks: [
      {
        kind: "paragraph",
        text: "Essential cookies are required for the Service to function. They include:",
      },
      {
        kind: "table",
        caption: "Essential cookies, their purpose and duration",
        columns: ["Cookie Name", "Purpose", "Duration"],
        rows: [
          ["session_id", "Maintains your login session", "Session"],
          [
            "csrf_token",
            "Prevents cross-site request forgery attacks",
            "Session",
          ],
          ["auth_token", "Authenticates your account", "24 hours"],
          ["preferences", "Stores your account preferences", "1 year"],
          ["timezone", "Remembers your timezone", "1 year"],
        ],
      },
      {
        kind: "paragraph",
        text: "You cannot disable essential cookies without losing access to core Service features.",
      },
    ],
  },
  {
    heading: "4. FUNCTIONAL COOKIES",
    blocks: [
      {
        kind: "paragraph",
        text: "Functional cookies enhance your experience by remembering choices you make:",
      },
      {
        kind: "table",
        caption: "Functional cookies, their purpose and duration",
        columns: ["Cookie Name", "Purpose", "Duration"],
        rows: [
          ["language", "Remembers your language preference", "1 year"],
          ["ui_theme", "Remembers dark/light mode preference", "1 year"],
          ["sidebar_state", "Remembers sidebar visibility", "Session"],
          ["recent_documents", "Stores recently accessed documents", "30 days"],
        ],
      },
      {
        kind: "paragraph",
        text: "These cookies help personalize your experience but are not strictly necessary for basic functionality.",
      },
    ],
  },
  {
    heading: "5. ANALYTICS COOKIES",
    blocks: [
      {
        kind: "paragraph",
        text: "We use analytics cookies to understand how you use the Service and improve it:",
      },
      { kind: "lead", text: "Google Analytics:" },
      {
        kind: "list",
        items: [
          "Tracks pages visited, time on site, and user flow",
          "Helps identify which features are popular",
          "Duration: 2 years",
        ],
      },
      { kind: "lead", text: "Mixpanel:" },
      {
        kind: "list",
        items: [
          "Tracks feature usage and user events",
          "Helps identify bugs and opportunities for improvement",
          "Duration: 1 year",
        ],
      },
      { kind: "lead", text: "Segment:" },
      {
        kind: "list",
        items: [
          "Aggregates analytics data from multiple sources",
          "Helps us understand overall usage patterns",
          "Duration: 1 year",
        ],
      },
      {
        kind: "paragraph",
        text: "These cookies collect anonymized, aggregated data and do not personally identify you.",
      },
    ],
  },
  {
    heading: "6. MARKETING COOKIES",
    blocks: [
      {
        kind: "paragraph",
        text: "We use marketing cookies to deliver targeted advertising and content:",
      },
      { kind: "lead", text: "Facebook Pixel:" },
      {
        kind: "list",
        items: [
          "Tracks conversions and user behavior",
          "Enables targeted advertising on Facebook and Instagram",
          "Duration: 3 months",
        ],
      },
      { kind: "lead", text: "Google Ads:" },
      {
        kind: "list",
        items: [
          "Tracks ad performance and conversions",
          "Enables targeted advertising on Google properties",
          "Duration: 2 years",
        ],
      },
      { kind: "lead", text: "LinkedIn Insight Tag:" },
      {
        kind: "list",
        items: [
          "Tracks LinkedIn ad performance",
          "Enables targeted content on LinkedIn",
          "Duration: 3 months",
        ],
      },
      {
        kind: "paragraph",
        text: "You can opt-out of targeted advertising by adjusting your cookie preferences.",
      },
    ],
  },
  {
    heading: "7. HOW TO MANAGE COOKIES",
    blocks: [
      { kind: "subheading", text: "7.1 Cookie Consent Manager" },
      {
        kind: "paragraph",
        text: "When you first visit SignSig, a cookie consent banner appears. You can:",
      },
      {
        kind: "list",
        items: [
          "Accept all cookies",
          "Reject all non-essential cookies",
          "Customize which cookies to accept",
          "Change preferences anytime in your account settings",
        ],
      },
      { kind: "subheading", text: "7.2 Browser Controls" },
      {
        kind: "paragraph",
        text: "Most browsers allow you to control cookies:",
      },
      { kind: "lead", text: "Chrome:" },
      {
        kind: "list",
        items: [
          "Click Settings > Privacy and security > Cookies and other site data",
          'Choose "Block all cookies" or set exceptions',
        ],
      },
      { kind: "lead", text: "Firefox:" },
      {
        kind: "list",
        items: [
          "Click Settings > Privacy & Security > Cookies and Site Data",
          'Choose "Reject all cookies" or set exceptions',
        ],
      },
      { kind: "lead", text: "Safari:" },
      {
        kind: "list",
        items: [
          "Click Preferences > Privacy > Cookies and website data",
          "Choose settings",
        ],
      },
      { kind: "lead", text: "Edge:" },
      {
        kind: "list",
        items: [
          "Click Settings > Privacy > Clear browsing data",
          "Manage cookies",
        ],
      },
      { kind: "subheading", text: "7.3 Opt-Out Tools" },
      {
        kind: "paragraph",
        text: "You can opt-out of third-party tracking:",
      },
      {
        kind: "list",
        items: [
          "Network Advertising Initiative (NAI): optout.networkadvertising.org",
          "Digital Advertising Alliance (DAA): optout.aboutads.info",
          "Google Analytics: tools.google.com/dlpage/gaoptout",
        ],
      },
    ],
  },
  {
    heading: "8. DO NOT TRACK (DNT)",
    blocks: [
      {
        kind: "paragraph",
        text: "Some browsers support Do Not Track (DNT) signals. SignSig currently does not respond to DNT signals, but you can opt-out of tracking through our cookie preferences.",
      },
    ],
  },
  {
    heading: "9. THIRD-PARTY SERVICES",
    blocks: [
      {
        kind: "paragraph",
        text: "SignSig uses third-party services that may set their own cookies:",
      },
      {
        kind: "table",
        caption: "Third-party services and their privacy policies",
        columns: ["Service", "Purpose", "Privacy Policy"],
        rows: [
          ["Google Analytics", "Analytics", "google.com/analytics/terms"],
          [
            "Mixpanel",
            "Product analytics",
            "mixpanel.com/legal/privacy-policy",
          ],
          ["Segment", "Data integration", "segment.com/legal/privacy"],
          ["Facebook Pixel", "Advertising", "facebook.com/policies/cookies"],
          ["Google Ads", "Advertising", "policies.google.com/privacy"],
          ["Stripe", "Payment processing", "stripe.com/privacy"],
          ["Auth0", "Authentication", "auth0.com/privacy"],
        ],
      },
      {
        kind: "paragraph",
        text: "These services are responsible for their own cookie practices.",
      },
    ],
  },
  {
    heading: "10. COOKIES ACROSS SUBDOMAINS",
    blocks: [
      {
        kind: "paragraph",
        text: "SignSig may set cookies across subdomains (app.signsig.com, dashboard.signsig.com, etc.). These cookies allow:",
      },
      {
        kind: "list",
        items: [
          "Single sign-on across all subdomains",
          "Consistent settings and preferences",
          "Security and fraud prevention",
        ],
      },
    ],
  },
  {
    heading: "11. INTERNATIONAL COOKIE USAGE",
    blocks: [
      {
        kind: "labelled",
        label: "EU/UK Users (GDPR):",
        text: "We obtain your consent before setting non-essential cookies. You can withdraw consent anytime.",
      },
      {
        kind: "labelled",
        label: "California Users (CCPA):",
        text: "We obtain your consent before using cookies for targeted advertising. You can opt-out.",
      },
      {
        kind: "labelled",
        label: "Canada Users (PIPEDA):",
        text: "We comply with Canada's privacy laws regarding cookies.",
      },
    ],
  },
  {
    heading: "12. COOKIE RETENTION",
    blocks: [
      {
        kind: "list",
        items: [
          "Session cookies: Deleted when you close your browser",
          "Essential cookies: Retained for 1-2 years",
          "Analytics cookies: Retained for up to 2 years",
          "Marketing cookies: Retained for 3-12 months",
        ],
      },
      {
        kind: "paragraph",
        text: "You can manually delete cookies from your browser settings anytime.",
      },
    ],
  },
  {
    heading: "13. UPDATES TO THIS POLICY",
    blocks: [
      {
        kind: "paragraph",
        text: "We may update this Cookie Policy to reflect changes in:",
      },
      {
        kind: "list",
        items: [
          "Cookie technologies",
          "Legal requirements",
          "Service improvements",
        ],
      },
      {
        kind: "paragraph",
        text: "Material changes will be notified via email or prominent notice.",
      },
    ],
  },
  {
    heading: "14. CONTACT US",
    blocks: [
      { kind: "paragraph", text: "For questions about cookies:" },
      {
        kind: "labelled",
        label: "SignSig Privacy Team",
        text: "Email: privacy@signsig.com",
      },
    ],
  },
];
