import type { SolutionCopy } from "./types";

/**
 * "By Roles" — 4 Solutions pages.
 *
 * ✅ RECONCILED WITH THE CONTENT DOCUMENT (2026-08-26), "SIGNSIG SOLUTION
 * PAGES → SOLUTIONS BY ROLE". All four match it exactly. Two corrections were
 * needed on For Sales Teams, both places where the design's text was cropped.
 *
 * Layout still comes from the design. See docs/DECISIONS.md.
 */
export const ROLE_SOLUTIONS: readonly SolutionCopy[] = [
  {
    slug: "legal-teams",
    icon: "scale",
    headingLines: [
      "Manage Documents Faster and",
      "Build Liability Protection Into Every Signature",
    ],
    description:
      "Legal teams need signatures that hold up in court and audit trails that prove it. SignSig gives you centralized document management, verification certificates, and complete signing history.",
    ctaLabel: "Start building legal protection",
    ctaHref: "/sign-up",
    benefits: [
      "Verification certificates that prove authenticity, identity, and timestamp in legal disputes",
      "Complete audit trails showing every view, edit, and signature for liability protection",
      "Centralized templates and document repository so contracts are always findable and compliant",
      "Workflow automation that enforces approval order and compliance requirements",
    ],
  },
  {
    slug: "hr-departments",
    icon: "people",
    headingLines: [
      "Replace Paperwork With",
      "Workflows That Actually Save Time",
    ],
    description:
      "HR teams drown in paper. SignSig replaces manual document collection with automated workflows, organized records, and built-in compliance proof.",
    ctaLabel: "Modernize your HR workflows",
    ctaHref: "/sign-up",
    benefits: [
      "Pre-built templates for offer letters, employment agreements, and compliance forms",
      "Automated workflows that send documents to the right people in the right order",
      "Centralized records so you can instantly find any employee document",
      "Compliance proof that shows when documents were signed and by whom",
    ],
  },
  {
    slug: "sales-teams",
    icon: "briefcase",
    headingLines: ["Stop Chasing Signatures", "and Close Deals Faster"],
    description:
      "Sales cycles stall on signature delays. SignSig shortens the path to signature with one-click requests, real-time tracking, and automatic reminders.",
    ctaLabel: "Send your first agreement",
    ctaHref: "/sign-up",
    benefits: [
      "One-click signature requests so clients sign without creating accounts or jumping through hoops",
      "Real-time notifications so you know instantly when a proposal is viewed or signed",
      "Automatic reminders that keep deals moving without you having to follow up manually",
      "Branded documents that make your agreements look polished and professional",
    ],
  },
  {
    slug: "finance-procurement",
    icon: "chart",
    headingLines: [
      "Approve Purchase Orders Faster",
      "and See Where Every PO Gets Stuck",
    ],
    description:
      "Procurement workflows have too many approvers and too much waiting. SignSig automates approval chains and shows you exactly which purchase orders are blocked.",
    ctaLabel: "Streamline your approval workflows",
    ctaHref: "/sign-up",
    benefits: [
      "Sequential and parallel approval workflows so POs move through the right hands in order",
      "Real-time dashboard showing exactly where each purchase order is in the approval chain",
      "Automatic reminders that unblock stuck approvals without manual follow-up",
      "Audit trails that prove every approval for compliance and accounting records",
    ],
  },
] as const;
