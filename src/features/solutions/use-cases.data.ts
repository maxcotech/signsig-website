import type { SolutionCopy } from "./types";

/**
 * "By Use Cases" — 5 Solutions pages.
 *
 * ✅ RECONCILED WITH THE CONTENT DOCUMENT (2026-08-26), "SIGNSIG SOLUTION
 * PAGES". All five now match it exactly: headline, description, four
 * benefits, CTA. Contract Management was a full rewrite; see the note on it
 * and docs/DECISIONS.md for why that section beats the document's earlier
 * "SOLUTION PAGES (REFINED)" pass.
 *
 * Layout still comes from the design — the two-line `headingLines` split, the
 * 2x2 benefit grid, the eyebrow glyph.
 */
export const USE_CASE_SOLUTIONS: readonly SolutionCopy[] = [
  {
    slug: "contract-management",
    icon: "contract",
    // ⚠ REWRITTEN 2026-08-26. The design used the document's earlier
    // "SOLUTION PAGES (REFINED)" pass ("Move contracts faster without email
    // chains"); this is the later, complete "SIGNSIG SOLUTION PAGES" spec,
    // which is the one that covers all 14 pages in this exact order and
    // grouping. See docs/DECISIONS.md.
    headingLines: [
      "Move Contracts Through Approvals",
      "Without the Back-and-Forth",
    ],
    description:
      "Stop chasing signatures. Route contracts through your team with automated workflows, track every change, and sign documents without leaving email.",
    ctaLabel: "Start managing contracts smarter",
    ctaHref: "/sign-up",
    benefits: [
      "Sequential approval chains so contracts move through the right hands in order",
      "Automatic reminders so nothing gets stuck waiting for a signature",
      "Centralized repository of all signed contracts with searchable records",
      "Audit trails that show every view, edit, and signature for legal protection",
    ],
  },
  {
    slug: "hr-onboarding",
    icon: "people",
    headingLines: ["Onboard New Hires in Days,", "Not Weeks"],
    description:
      "Replace stacks of paper with digital workflows. New hires sign offer letters, employment agreements, and compliance documents from day one. No printing, no scanning.",
    ctaLabel: "Digitize your onboarding",
    ctaHref: "/sign-up",
    benefits: [
      "Pre-built templates for offer letters, NDAs, and employment agreements",
      "Parallel signing so multiple documents can be signed at the same time",
      "Organized records so you can instantly find any employee agreement",
      "Compliance proof that documents were signed and when",
    ],
  },
  {
    slug: "sales-agreements",
    icon: "handshake",
    headingLines: [
      "Close Deals Faster by Removing",
      "the Signature Bottleneck",
    ],
    description:
      "Stop losing deals to signature delays. Send proposals, quotes, and agreements with SignSig and track signing status in real time.",
    ctaLabel: "Send your first agreement today",
    ctaHref: "/sign-up",
    benefits: [
      "One-click signature requests embedded in your workflow so clients sign without creating accounts",
      "Instant notifications when documents are viewed or signed so you know where deals stand",
      "Automatic reminders that nudge clients to sign without you having to follow up",
      "Branded documents that keep your sales agreements looking professional",
    ],
  },
  {
    slug: "legal-documents",
    icon: "scale",
    headingLines: ["Sign Agreements With Proof", "You Can Defend in Court"],
    description:
      "Every signature includes a verification certificate that proves authenticity, identity, and timestamp. Perfect for contracts that need legal weight.",
    ctaLabel: "Learn about verification certificates",
    ctaHref: "/developers/api-documentation",
    benefits: [
      "Legally binding signatures compliant with ESIGN, eIDAS, and global regulations",
      "Verification certificates that third parties can validate without accessing your account",
      "Complete audit trails showing who signed what, when, and from where",
      "Identity verification options that add notarization-level proof to signatures",
    ],
  },
  {
    slug: "government-forms",
    icon: "forms",
    headingLines: ["Submit Compliance Filings With", "Built-in Audit Trails"],
    description:
      "Government agencies and regulators demand transparency. SignSig documents include immutable proof of execution that satisfies even the strictest compliance requirements.",
    ctaLabel: "Explore compliance features",
    ctaHref: "/legal/security-compliance",
    benefits: [
      "Every action is logged and timestamped so you have proof of compliance",
      "Verification certificates that prove document authenticity to regulatory bodies",
      "Self-hosting options to keep sensitive documents on your infrastructure",
      "Export-ready audit trails formatted for government submissions",
    ],
  },
] as const;
