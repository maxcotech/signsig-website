/**
 * Knowledge base — eight collections and their article titles.
 *
 * ✅ TRANSCRIBED VERBATIM from the content document ("OPERATIONAL PAGES →
 * PAGE: Knowledge Base"), 2026-08-26. This is the real content the previous
 * placeholder was waiting for, and it changes the shape of the section.
 *
 * WHAT CHANGED. The design's grid showed 20 tiles that were really 4 titles
 * repeated five times, every one reading "9 Questions" — Figma duplication to
 * fill a grid. The code carried 4 collections of question-and-answer pairs,
 * one of which borrowed the home page's FAQ list, with a note saying real
 * content was coming. The document supplies **8 topic collections containing
 * 52 article titles**, not questions. So:
 *
 *   Document Signing / Self hosting / Workflow Automation / Integration
 *     → Getting Started / Common Tasks / Team & Workspaces /
 *       Templates & Automation / Security & Compliance / Integrations & APIs /
 *       Account & Billing / Troubleshooting
 *
 * ⚠ ARTICLE BODIES DO NOT EXIST. Every entry below appears in the document as
 * a bracketed link placeholder — `[Upload a Document]` — with no body text
 * anywhere in the 190 pages. The titles are real; the articles are not
 * written. They are therefore rendered as a list and NOT as links: 52 links
 * to 52 empty pages would be worse than an honest index, and a link that
 * 404s is worse than text. Add bodies here and the components can start
 * linking. Do not invent article content.
 *
 * The one exception is Getting Started, whose four entries the document gives
 * a one-line description each. Those are transcribed too.
 */

import type { KbCollection } from "@/content/knowledge-base/types";

export const KB_COLLECTIONS: readonly KbCollection[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    groups: [
      {
        articles: [
          {
            title: "Getting Started Guide",
            description: "Learn the basics of SignSig in 5 minutes.",
          },
          {
            title: "Account Setup",
            description: "Create your account and configure your workspace.",
          },
          {
            title: "First Document",
            description: "Send your first document for signature.",
          },
          {
            title: "Team Management",
            description: "Add team members and manage permissions.",
          },
        ],
      },
    ],
  },
  {
    slug: "common-tasks",
    title: "Common Tasks",
    groups: [
      {
        title: "Creating Documents",
        articles: [
          { title: "Upload a Document" },
          { title: "Create a Document from Template" },
          { title: "Add Signature Fields" },
          { title: "Add Other Field Types" },
        ],
      },
      {
        title: "Sending for Signature",
        articles: [
          { title: "Send a Single Document" },
          { title: "Bulk Send Documents" },
          { title: "Schedule Sending" },
          { title: "Send with Custom Message" },
        ],
      },
      {
        title: "Managing Workflows",
        articles: [
          { title: "Create Sequential Workflows" },
          { title: "Create Parallel Workflows" },
          { title: "Add Reminders" },
          { title: "Set Deadlines" },
        ],
      },
      {
        title: "Tracking & Managing",
        articles: [
          { title: "Track Document Status" },
          { title: "Resend Signature Requests" },
          { title: "Remind Signers" },
          { title: "Cancel Sending" },
        ],
      },
    ],
  },
  {
    slug: "team-workspaces",
    title: "Team & Workspaces",
    groups: [
      {
        articles: [
          { title: "Manage Team Members" },
          { title: "Set User Roles and Permissions" },
          { title: "Create Workspaces" },
          { title: "Manage Workspace Access" },
          { title: "Remove Team Members" },
        ],
      },
    ],
  },
  {
    slug: "templates-automation",
    title: "Templates & Automation",
    groups: [
      {
        articles: [
          { title: "Create Document Templates" },
          { title: "Use Pre-Built Templates" },
          { title: "Automate Workflows" },
          { title: "Set Conditional Logic" },
          { title: "Schedule Automations" },
        ],
      },
    ],
  },
  {
    slug: "security-compliance",
    title: "Security & Compliance",
    groups: [
      {
        articles: [
          { title: "Signature Verification" },
          { title: "Verification Certificates" },
          { title: "Audit Trails" },
          { title: "Data Security" },
          { title: "HIPAA Compliance" },
          { title: "GDPR Data Handling" },
        ],
      },
    ],
  },
  {
    slug: "integrations-apis",
    title: "Integrations & APIs",
    groups: [
      {
        articles: [
          { title: "Overview of Integrations" },
          { title: "Connect to Popular Apps" },
          { title: "API Documentation" },
          { title: "Webhook Setup" },
          { title: "SDK Installation" },
        ],
      },
    ],
  },
  {
    slug: "account-billing",
    title: "Account & Billing",
    groups: [
      {
        articles: [
          { title: "Update Account Settings" },
          { title: "Change Password" },
          { title: "Manage Billing" },
          { title: "Download Invoices" },
          { title: "Cancel Subscription" },
        ],
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    groups: [
      {
        articles: [
          { title: "Sign In Issues" },
          { title: "Upload Problems" },
          { title: "Signature Technical Issues" },
          { title: "Email Delivery Problems" },
          { title: "Workflow Errors" },
          { title: "Mobile App Issues" },
        ],
      },
    ],
  },
];

/** Page-level copy for the knowledge-base index. */
export const KB_PAGE = {
  headline: "Find answers, tutorials, and guides.",
  intro:
    "The SignSig Knowledge Base is your self-service resource for learning how to use SignSig, troubleshooting issues, and getting the most from the platform.",
  searchPlaceholder: "Search for help...",
  stillNeedHelp: {
    heading: "Still need help?",
    text: "Can't find what you're looking for?",
    /**
     * The document's second CTA is "Browse Community Forum →". There is no
     * forum URL anywhere in it and no forum in the nav, so only the support
     * link is rendered. Add the forum here when its URL exists.
     */
    contactLabel: "Contact Support",
    contactHref: "mailto:support@signsig.com",
  },
} as const;
