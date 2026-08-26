/**
 * SOC 2 Certified — transcribed verbatim from the content document
 * ("MARKETING TRUST PAGES → PAGE: SOC 2 Certified"), 2026-08-26.
 *
 * The footer has linked `/compliance/soc-2` since the nav was built; this is
 * the page it was pointing at.
 */

import type { TrustPage } from "@/content/blocks";

export const SOC_2_PAGE: TrustPage = {
  slug: "soc-2",
  path: "/compliance/soc-2",
  title: "SOC 2 Certified",
  headline: "Independently verified security controls.",
  intro:
    "SOC 2 Type II certification means a third-party auditor has independently verified that SignSig implements and maintains effective security controls. Your organization can rely on SignSig for the same level of security assurance it would conduct for any critical vendor.",
  cta: {
    label: "Request our SOC 2 report",
    href: "mailto:trust@signsig.com?subject=SOC%202%20report%20request",
  },
  sections: [
    {
      heading: "WHAT IS SOC 2?",
      blocks: [
        {
          kind: "paragraph",
          text: "SOC 2 (Service Organization Control 2) is an audit standard created by the American Institute of CPAs (AICPA). It evaluates how service organizations like SignSig protect customer data and maintain system reliability.",
        },
        { kind: "lead", text: "SOC 2 vs SOC 1:" },
        {
          kind: "list",
          items: [
            "SOC 1 focuses on financial reporting controls",
            "SOC 2 focuses on security, availability, processing integrity, confidentiality, and privacy",
          ],
        },
        { kind: "lead", text: "Type II vs Type I:" },
        {
          kind: "list",
          items: [
            "Type I is a snapshot at one point in time",
            "Type II audits controls over a 6-12 month period to verify they work consistently",
          ],
        },
        {
          kind: "paragraph",
          text: "SignSig holds a SOC 2 Type II certification, which is the higher standard.",
        },
      ],
    },
    {
      heading: "WHAT SOC 2 COVERS",
      blocks: [
        {
          kind: "paragraph",
          text: "Our SOC 2 audit covers five trust service areas:",
        },
        { kind: "subheading", text: "Security (CC)" },
        {
          kind: "paragraph",
          text: "Controls that protect against unauthorized access:",
        },
        {
          kind: "list",
          items: [
            "Physical and logical access controls",
            "Encryption and key management",
            "Network security",
            "Vulnerability management",
          ],
        },
        { kind: "subheading", text: "Availability (A)" },
        {
          kind: "paragraph",
          text: "Controls that ensure the Service is available when needed:",
        },
        {
          kind: "list",
          items: [
            "Uptime monitoring and targets",
            "Redundancy and failover",
            "Disaster recovery procedures",
            "System capacity management",
          ],
        },
        { kind: "subheading", text: "Processing Integrity (PI)" },
        {
          kind: "paragraph",
          text: "Controls that ensure data is processed accurately and completely:",
        },
        {
          kind: "list",
          items: [
            "Data validation and error detection",
            "Completeness of audit logs",
            "System monitoring",
            "Change management",
          ],
        },
        { kind: "subheading", text: "Confidentiality (C)" },
        {
          kind: "paragraph",
          text: "Controls that protect confidential information:",
        },
        {
          kind: "list",
          items: [
            "Access controls for sensitive data",
            "Encryption",
            "Data classification",
            "Secure deletion",
          ],
        },
        { kind: "subheading", text: "Privacy (P)" },
        {
          kind: "paragraph",
          text: "Controls that protect personal information:",
        },
        {
          kind: "list",
          items: [
            "Privacy policies and procedures",
            "Data retention and deletion",
            "Consent management",
            "Data subject rights",
          ],
        },
      ],
    },
    {
      heading: "WHY SOC 2 MATTERS",
      blocks: [
        { kind: "lead", text: "For Your Organization:" },
        {
          kind: "list",
          items: [
            "Reduces your vendor audit burden",
            "Provides independent verification of security",
            "Satisfies customer and regulatory requirements",
            "Demonstrates commitment to security",
          ],
        },
        { kind: "lead", text: "For Your Compliance:" },
        {
          kind: "list",
          items: [
            "Meets vendor requirements for many regulated industries",
            "Satisfies insurance and risk management requirements",
            "Provides documentation for internal audits",
            "Supports SOX compliance for publicly traded companies",
          ],
        },
        { kind: "lead", text: "For Your Customers:" },
        {
          kind: "list",
          items: [
            "You can communicate vendor security to them",
            "Reduces their need to audit you as a vendor",
            "Demonstrates you take data security seriously",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG'S SOC 2 CERTIFICATION",
      blocks: [
        {
          kind: "paragraph",
          text: "SignSig's SOC 2 Type II certification includes:",
        },
        { kind: "lead", text: "Scope:" },
        {
          kind: "list",
          items: [
            "SignSig cloud platform",
            "Multi-tenant infrastructure",
            "All user roles and permissions",
            "API and webhook functionality",
          ],
        },
        { kind: "lead", text: "Audit Frequency:" },
        {
          kind: "list",
          items: [
            "Annual third-party audit",
            "Conducted by independent auditors",
            "Tests controls over 6-12 month period",
          ],
        },
        { kind: "lead", text: "Auditor:" },
        {
          kind: "list",
          items: [
            "Independent CPA firm",
            "Follows AICPA auditing standards",
            "Verifies control design and operating effectiveness",
          ],
        },
        { kind: "lead", text: "Report Availability:" },
        {
          kind: "list",
          items: [
            "Available to customers under NDA",
            "Can be shared with your auditors",
            "Updated annually",
          ],
        },
      ],
    },
    {
      heading: "WHAT'S IN A SOC 2 REPORT?",
      blocks: [
        { kind: "paragraph", text: "A SOC 2 Type II report includes:" },
        {
          kind: "list",
          items: [
            "Management Assertion: SignSig's formal statement of controls",
            "Auditor Opinion: Independent assessment of control effectiveness",
            "Control Descriptions: Detailed description of each control",
            "Control Testing: Results of auditor testing of controls",
            "Exceptions: Any control deficiencies or exceptions",
            "Subitems: Detailed results for each trust service area",
          ],
        },
        { kind: "paragraph", text: "The report provides evidence that:" },
        {
          kind: "list",
          items: [
            "Controls are designed effectively",
            "Controls operate as designed",
            "Controls operate consistently over time",
          ],
        },
      ],
    },
    {
      heading: "HOW TO GET SIGNSIG'S SOC 2 REPORT",
      blocks: [
        { kind: "lead", text: "For Customers:" },
        { kind: "paragraph", text: "Email trust@signsig.com with:" },
        {
          kind: "list",
          items: [
            "Your company name",
            "Name and email of requestor",
            "Purpose for the request (vendor audit, compliance verification, etc.)",
          ],
        },
        {
          kind: "paragraph",
          text: "We'll provide the report under an NDA within 1 business day.",
        },
        { kind: "lead", text: "For Auditors:" },
        {
          kind: "paragraph",
          text: "If you're auditing a SignSig customer:",
        },
        { kind: "paragraph", text: "Email audit@signsig.com with:" },
        {
          kind: "list",
          items: [
            "Customer name",
            "Your firm name and auditor email",
            "Copy of engagement letter (optional but preferred)",
          ],
        },
        {
          kind: "paragraph",
          text: "We can provide the report and answer technical questions.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is SignSig SOC 2 Type II or Type I?",
      answer:
        "Type II. This is the higher standard that verifies controls operate consistently over time.",
    },
    {
      question: "How do I request the SOC 2 report?",
      answer:
        "Email trust@signsig.com. We'll send it under NDA within 1 business day.",
    },
    {
      question: "Can my auditor request the report directly?",
      answer:
        "Yes. Have your auditor email audit@signsig.com with engagement details.",
    },
    {
      question: "How often is SignSig audited?",
      answer:
        "Annually. The latest audit covers the most recent 12-month period.",
    },
    {
      question: "Does SOC 2 certification mean SignSig is 100% secure?",
      answer:
        "SOC 2 verifies controls are effective, but no system is 100% secure. It demonstrates SignSig maintains industry-standard security practices.",
    },
    {
      question: "If I'm SOX-compliant, does SOC 2 help?",
      answer:
        "Yes. SOC 2 Type II provides audit documentation and control verification that supports SOX compliance requirements.",
    },
    {
      question: "How does SOC 2 differ from ISO 27001?",
      answer:
        "SOC 2 is a US standard focused on security controls. ISO 27001 is a global standard for comprehensive information security management. SignSig holds both certifications.",
    },
  ],
};
