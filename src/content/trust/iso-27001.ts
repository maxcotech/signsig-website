/**
 * ISO 27001 — transcribed verbatim from the content document
 * ("MARKETING TRUST PAGES → PAGE: ISO 27001"), 2026-08-26.
 *
 * ⚠ ONE DELIBERATE OMISSION. The document's "Certification Details" list
 * includes:
 *
 *     Certification Date: [Date]
 *     Expiration: [Date + 3 years]
 *
 * Both are unfilled placeholders. Printing "Certification Date: [Date]" on a
 * page whose entire purpose is to prove a certification exists would
 * undermine the claim, so the two lines are left out and the three real
 * details are kept. Add them back here once the dates are known.
 */

import type { TrustPage } from "@/content/blocks";

export const ISO_27001_PAGE: TrustPage = {
  slug: "iso-27001",
  path: "/compliance/iso-27001",
  title: "ISO 27001",
  headline: "Global standard for information security.",
  intro:
    "SignSig is ISO 27001 certified, meeting the international standard for information security management systems. ISO 27001 certification demonstrates that SignSig has implemented comprehensive controls to protect information and prevent unauthorized access.",
  cta: {
    label: "Request ISO 27001 documentation",
    href: "mailto:compliance@signsig.com?subject=ISO%2027001%20documentation%20request",
  },
  sections: [
    {
      heading: "WHAT IS ISO 27001?",
      blocks: [
        {
          kind: "paragraph",
          text: "ISO 27001 is the International Organization for Standardization (ISO) standard for Information Security Management Systems (ISMS).",
        },
        { kind: "lead", text: "What It Covers:" },
        {
          kind: "list",
          items: [
            "Information security policies and procedures",
            "Access control and authentication",
            "Cryptography and encryption",
            "Physical and environmental security",
            "Operations security",
            "Communications security",
            "System development and maintenance",
            "Incident management",
            "Business continuity",
            "Compliance and legal requirements",
          ],
        },
        { kind: "lead", text: "Global Recognition:" },
        {
          kind: "list",
          items: [
            "Recognized in over 180 countries",
            "Applicable to any organization type or size",
            "Third-party verified through independent audits",
            "Demonstrates commitment to information security",
          ],
        },
      ],
    },
    {
      heading: "ISO 27001 VS OTHER STANDARDS",
      blocks: [
        { kind: "lead", text: "ISO 27001 vs SOC 2:" },
        {
          kind: "list",
          items: [
            "ISO 27001 is a global standard; SOC 2 is US-focused",
            "ISO 27001 covers comprehensive security; SOC 2 focuses on security, availability, and confidentiality",
            "ISO 27001 applies to any organization; SOC 2 applies to service organizations",
            "SignSig holds both certifications",
          ],
        },
        { kind: "lead", text: "ISO 27001 vs GDPR:" },
        {
          kind: "list",
          items: [
            "ISO 27001 is a security standard; GDPR is a privacy/data protection regulation",
            "ISO 27001 covers technical controls; GDPR addresses rights and data handling",
            "ISO 27001 helps support GDPR compliance",
            "SignSig is both ISO 27001 certified and GDPR compliant",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG'S ISO 27001 CERTIFICATION",
      blocks: [
        { kind: "lead", text: "Certification Details:" },
        {
          kind: "list",
          items: [
            "Standard: ISO 27001:2022",
            "Scope: SignSig cloud platform and infrastructure",
            "Auditor: Independent third-party certification body",
          ],
        },
        { kind: "lead", text: "Annual Audit:" },
        {
          kind: "list",
          items: [
            "Certification is verified annually",
            "Maintains continuous compliance",
            "No gaps or lapses in certification",
            "Formal audit report available",
          ],
        },
      ],
    },
    {
      heading: "CONTROL AREAS COVERED",
      blocks: [
        { kind: "subheading", text: "A5: Organizational Controls" },
        {
          kind: "list",
          items: [
            "Information security policies",
            "Organization of information security",
            "Human resource security",
            "Asset management",
          ],
        },
        { kind: "subheading", text: "A6: People Controls" },
        {
          kind: "list",
          items: [
            "Screening and onboarding",
            "Responsibilities and accountability",
            "Awareness and training",
            "Disciplinary process",
          ],
        },
        { kind: "subheading", text: "A7: Physical Controls" },
        {
          kind: "list",
          items: [
            "Physical security perimeter",
            "Physical entry and exit",
            "Secure areas",
            "Physical and environmental threats",
          ],
        },
        { kind: "subheading", text: "A8: Technical Controls" },
        {
          kind: "list",
          items: [
            "User endpoint devices",
            "Privileged access rights",
            "Access restriction",
            "Cryptography",
            "Physical and logical separation",
          ],
        },
      ],
    },
    {
      heading: "INFORMATION SECURITY POLICIES",
      blocks: [
        {
          kind: "paragraph",
          text: "SignSig maintains documented policies covering:",
        },
        {
          kind: "list",
          items: [
            "Information security policy",
            "Access control policy",
            "Encryption policy",
            "Incident response policy",
            "Disaster recovery policy",
            "Change management policy",
            "Physical security policy",
            "Data retention policy",
            "Supplier management policy",
            "Compliance policy",
          ],
        },
        {
          kind: "paragraph",
          text: "These policies are reviewed and updated annually.",
        },
      ],
    },
    {
      heading: "CONTINUOUS COMPLIANCE",
      blocks: [
        { kind: "paragraph", text: "ISO 27001 certification requires:" },
        { kind: "lead", text: "Regular Audits:" },
        {
          kind: "list",
          items: [
            "Annual surveillance audits",
            "Three-yearly re-certification audits",
            "Management reviews",
          ],
        },
        { kind: "lead", text: "Internal Audits:" },
        {
          kind: "list",
          items: [
            "Scheduled throughout the year",
            "Test control effectiveness",
            "Identify improvement opportunities",
          ],
        },
        { kind: "lead", text: "Risk Assessment:" },
        {
          kind: "list",
          items: [
            "Annual risk assessment",
            "Identification of security risks",
            "Risk mitigation planning",
          ],
        },
        { kind: "lead", text: "Corrective Actions:" },
        {
          kind: "list",
          items: [
            "Monitoring of control effectiveness",
            "Documentation of any deficiencies",
            "Timely remediation",
          ],
        },
        { kind: "lead", text: "Management Review:" },
        {
          kind: "list",
          items: [
            "Senior management review of ISMS",
            "Assessment of policy relevance",
            "Approval of changes",
          ],
        },
      ],
    },
    {
      heading: "SUBPROCESSOR SECURITY",
      blocks: [
        {
          kind: "paragraph",
          text: "All SignSig subprocessors are required to:",
        },
        {
          kind: "list",
          items: [
            "Maintain information security controls",
            "Meet contractual security requirements",
            "Undergo security assessments",
            "Report security incidents",
          ],
        },
        { kind: "lead", text: "Key subprocessors:" },
        {
          kind: "table",
          caption: "Key subprocessors and their security standards",
          columns: ["Provider", "Function", "Security Standards"],
          rows: [
            ["Amazon Web Services", "Cloud hosting", "SOC 2, ISO 27001"],
            ["Google Cloud", "Analytics", "SOC 2, ISO 27001"],
            ["Stripe", "Payment", "PCI DSS, SOC 2"],
            ["SendGrid", "Email", "SOC 2"],
            ["Auth0", "Authentication", "SOC 2, ISO 27001"],
          ],
        },
      ],
    },
    {
      heading: "OBTAINING CERTIFICATION DOCUMENTATION",
      blocks: [
        { kind: "lead", text: "For Customers:" },
        { kind: "paragraph", text: "Email compliance@signsig.com with:" },
        {
          kind: "list",
          items: [
            "Company name",
            "Requestor name and email",
            "Reason for request",
          ],
        },
        {
          kind: "paragraph",
          text: "We'll provide ISO 27001 certification details within 1 business day.",
        },
        { kind: "lead", text: "For Auditors:" },
        {
          kind: "paragraph",
          text: "Email audit@signsig.com if auditing a SignSig customer:",
        },
        {
          kind: "list",
          items: [
            "Customer name",
            "Your firm and auditor details",
            "Engagement letter (optional)",
          ],
        },
        {
          kind: "paragraph",
          text: "We can discuss control details relevant to your audit.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is SignSig ISO 27001 certified?",
      answer:
        "Yes. SignSig holds current ISO 27001:2022 certification, verified annually.",
    },
    {
      question: "How often is SignSig audited?",
      answer:
        "ISO 27001 audits occur annually. Three-yearly re-certification audits verify continued compliance.",
    },
    {
      question: "Can I request certification documentation?",
      answer:
        "Yes. Email compliance@signsig.com with your company details and reason.",
    },
    {
      question: "How does ISO 27001 help my organization?",
      answer:
        "It provides assurance that SignSig implements comprehensive information security controls, reducing your vendor audit burden.",
    },
    {
      question:
        "Does ISO 27001 certification mean SignSig is completely secure?",
      answer:
        "ISO 27001 verifies that controls are implemented and effective. While it demonstrates strong security, no system is risk-free. It shows SignSig's commitment to security.",
    },
    {
      question: "How is ISO 27001 different from SOC 2?",
      answer:
        "ISO 27001 is a global comprehensive security standard. SOC 2 is a US standard focused on service organization controls. SignSig holds both.",
    },
    {
      question: "Does ISO 27001 support compliance with regulations?",
      answer:
        "Yes. ISO 27001 helps support compliance with GDPR, HIPAA, SOX, and other regulations.",
    },
  ],
};
