import type { SolutionCopy } from "./types";

/**
 * "By Industry" — 5 Solutions pages.
 *
 * ✅ RECONCILED WITH THE CONTENT DOCUMENT (2026-08-26), "SIGNSIG SOLUTION
 * PAGES → SOLUTIONS BY INDUSTRY". All five match it exactly. The only change
 * needed was the Government & Public Sector CTA ("Access" → "View").
 *
 * Layout still comes from the design. See docs/DECISIONS.md.
 */
export const INDUSTRY_SOLUTIONS: readonly SolutionCopy[] = [
  {
    slug: "financial-services",
    icon: "wallet",
    headingLines: [
      "Speed Up Account Opening, Lending,",
      "and Compliance Without Cutting Corners",
    ],
    description:
      "Financial institutions need signatures they can trust. SignSig provides government-grade verification, identity checks, and audit trails that satisfy regulators and protect your institution.",
    ctaLabel: "Learn about compliance features",
    ctaHref: "/legal/security-compliance",
    benefits: [
      "Identity verification (email, phone, government ID, biometric) so you know who is signing",
      "Audit trails that prove compliance with KYC/AML requirements",
      "Verification certificates that prove signer identity and timestamp to auditors",
      "Self-hosting options to keep customer data on your infrastructure",
    ],
  },
  {
    slug: "healthcare",
    icon: "health",
    headingLines: [
      "Collect Patient Consent Securely",
      "and Stay HIPAA-Compliant",
    ],
    description:
      "Healthcare workflows demand privacy and precision. SignSig keeps patient data secure with role-based access, encrypted storage, and audit trails that prove HIPAA compliance.",
    ctaLabel: "Explore HIPAA-compliant signing",
    ctaHref: "/compliance/hipaa",
    benefits: [
      "Encryption and access controls so only authorized staff see patient documents",
      "Audit trails that track every document view and signature for compliance audits",
      "Workflow templates for consent forms, treatment authorization, and privacy notices",
      "Self-hosting option to keep all patient data on your secure infrastructure",
    ],
  },
  {
    slug: "real-estate",
    icon: "property",
    headingLines: [
      "Close Transactions Faster",
      "With Signatures That Hold Up in Court",
    ],
    description:
      "Real estate deals involve multiple parties, complex documents, and high stakes. SignSig manages parallel signing workflows and includes verification certificates that prove execution if disputes arise.",
    ctaLabel: "Streamline real estate closings",
    ctaHref: "/sign-up",
    benefits: [
      "Parallel signing so buyers, sellers, and agents can sign simultaneously without waiting",
      "Templates for purchase agreements, disclosure forms, and lease documents",
      "Verification certificates that prove signatures are authentic and timestamped",
      "Complete audit trails showing every change and signature in the transaction",
    ],
  },
  {
    slug: "government-public-sector",
    icon: "landmark",
    headingLines: [
      "Digitize Procurement and Permits",
      "Without Sacrificing Accountability",
    ],
    description:
      "Government agencies operate under the highest scrutiny. SignSig provides the verification standards, audit trails, and transparency that public sector workflows demand.",
    ctaLabel: "View government-grade verification",
    ctaHref: "/legal/security-compliance",
    benefits: [
      "Verification certificates that prove document authenticity to oversight bodies",
      "Complete audit trails showing every action for full transparency and accountability",
      "Identity verification options that meet government standards for proof of execution",
      "Self-hosting and on-premise deployment for maximum control",
    ],
  },
  {
    slug: "technology-saas",
    icon: "code",
    headingLines: [
      "Embed Signing Into Your Product",
      "and Automate Your Entire Workflow",
    ],
    description:
      "SaaS companies move fast. SignSig provides APIs, webhooks, and SDKs so you can embed signing directly into your product. Our open-source core lets you customize or self-host.",
    ctaLabel: "Explore the API documentation",
    ctaHref: "/developers/api-documentation",
    benefits: [
      "REST APIs and SDKs (JavaScript, Python, Ruby, PHP) for seamless integration",
      "Webhooks that trigger actions in your app when documents are signed",
      "Open-source core so you can audit, extend, or deploy on your own servers",
      "Workflow automation that connects signing to your existing tools and processes",
    ],
  },
] as const;
