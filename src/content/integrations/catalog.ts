/**
 * The integration catalog — twelve entries, five categories, and the custom
 * integrations block.
 *
 * ✅ TRANSCRIBED VERBATIM from the content document ("SECTION 2: INTEGRATIONS
 * HUB"), 2026-08-26. Per the user's direction the document overrides the
 * design PNG. What it settled:
 *
 *   - **Three integrations were missing.** The design showed 9 cards; the
 *     document specifies 12. Workday (HR), QuickBooks Online and Xero
 *     (Finance) are added.
 *   - **"Finance & Accounting" is no longer empty.** The old note in the
 *     feature said the category had no members and asked for confirmation
 *     before launch. QuickBooks and Xero are its members. Resolved.
 *   - **The inferred category mapping was right.** All nine existing
 *     assignments match the document exactly. The inference had been read off
 *     the grid ordering; the document confirms it.
 *   - **Every entry gains a `useCase`** and every category a `description`.
 *   - Two descriptions were missing their closing full stop (Google Drive,
 *     HubSpot) because the design's text was cropped. Restored.
 *
 * Guides are attached in `features/integrations/integrations.data.ts`; the
 * guide bodies are siblings of this file, in `guides/`.
 */

import type {
  IntegrationCategory,
  IntegrationEntry,
} from "@/content/integrations/types";

/** Sidebar filters, in render order. "All" is added by the browser component. */
export const INTEGRATION_CATEGORIES: ReadonlyArray<{
  id: IntegrationCategory;
  label: string;
  /** The document's "Category Description". New; the design had none. */
  description: string;
}> = [
  {
    id: "productivity",
    label: "Productivity & Collaboration",
    description:
      "Integrate SignSig with tools your team already uses for communication and document management.",
  },
  {
    id: "storage",
    label: "Storage & File Management",
    description:
      "Store signed documents where you keep everything else. Automate file organization and backup.",
  },
  {
    id: "crm",
    label: "CRM & Sales",
    description:
      "Embed document signing into your sales pipeline to close deals faster.",
  },
  {
    id: "hr",
    label: "HR & Onboarding",
    description: "Automate employment paperwork and new hire workflows.",
  },
  {
    id: "finance",
    label: "Finance & Accounting",
    description:
      "Automate approval of purchase orders, invoices, and financial documents.",
  },
];

export const INTEGRATION_CATALOG: readonly IntegrationEntry[] = [
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    description:
      "Sign Office documents directly in Word, Excel, and Outlook. Documents stay in your OneDrive and SharePoint.",
    useCase:
      "Sales teams send proposals from Word and route them for signature without leaving the application.",
    category: "productivity",
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    description:
      "Integrate with Google Docs, Drive, and Gmail. Sign documents and save completed files to Drive automatically.",
    useCase:
      "HR teams send employment agreements from Google Docs, collect signatures, and store signed copies in Drive.",
    category: "productivity",
  },
  {
    slug: "slack",
    name: "Slack",
    description:
      "Receive notifications in Slack when documents are signed, rejected, or need attention. Send documents for signature from Slack.",
    useCase:
      "Contract managers get alerts in Slack when documents are signed, keeping the team informed without email.",
    category: "productivity",
  },
  {
    slug: "google-drive",
    name: "Google Drive",
    description:
      "Upload documents from Drive, save signed copies back to Drive automatically. Works with shared drives and team folders.",
    useCase:
      "Legal teams upload contracts from Drive, collect signatures, and automatically save signed documents to a contract archive folder.",
    category: "storage",
  },
  {
    slug: "microsoft-onedrive",
    name: "Microsoft OneDrive",
    description:
      "Seamless integration with OneDrive and SharePoint. Signed documents are automatically saved to your file structure.",
    useCase:
      "Finance teams upload purchase orders from SharePoint, collect approvals, and save signed documents to a compliance folder.",
    category: "storage",
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    description:
      "Upload and save documents in Dropbox. Signed files are organized in folders you define.",
    useCase:
      "Real estate agents upload purchase agreements from Dropbox, collect signatures, and store signed contracts automatically.",
    category: "storage",
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    description:
      "Send quotes and agreements from Salesforce, track signing status in Salesforce, and update records automatically when documents are signed.",
    useCase:
      "Sales teams send proposals from Salesforce opportunities, track progress, and automatically close deals when contracts are signed.",
    category: "crm",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    description:
      "Send agreements from HubSpot deals, log activities, and update deal status when documents are signed.",
    useCase:
      "Sales managers send service agreements from HubSpot, log all signing activity, and automatically move deals to the next stage.",
    category: "crm",
  },
  {
    slug: "bamboohr",
    name: "BambooHR",
    description:
      "Send employment agreements and onboarding documents from BambooHR, collect signatures, and update employee records.",
    useCase:
      "HR teams send offer letters from BambooHR, collect signatures, and automatically update the HRIS when documents are signed.",
    category: "hr",
  },
  {
    slug: "workday",
    name: "Workday",
    description:
      "Embed SignSig into Workday for employment agreements, offer letters, and benefits documents.",
    useCase:
      "Enterprise HR teams collect signatures on employment agreements and benefits elections directly from Workday.",
    category: "hr",
  },
  {
    slug: "quickbooks",
    name: "QuickBooks Online",
    description:
      "Send purchase orders and agreements from QuickBooks, collect approvals, and update transaction records.",
    useCase:
      "Finance teams send vendor agreements from QuickBooks, collect signatures, and automatically link signed documents to transactions.",
    category: "finance",
  },
  {
    slug: "xero",
    name: "Xero",
    description:
      "Automate approval of purchase orders in Xero. Signed documents are linked to transaction records automatically.",
    useCase:
      "Procurement teams send approval requests from Xero, collect signatures, and automatically approve POs when documents are signed.",
    category: "finance",
  },
];

/** The document's "CUSTOM INTEGRATIONS" block. New; the design had a bare link. */
export const CUSTOM_INTEGRATIONS = {
  headline: "Build Your Own Integration",
  description:
    "Can't find your tool? Use our API and webhooks to build a custom integration. It's simple and well-documented.",
  cta: "View API Documentation",
  ctaHref: "/developers/api-documentation",
} as const;
