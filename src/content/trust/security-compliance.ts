/**
 * Security & Compliance — transcribed verbatim from the content document
 * ("MARKETING TRUST PAGES → PAGE: Security & Compliance"), 2026-08-26.
 *
 * This page moved out of `features/policies`. The design PNG had an empty
 * body and a "Last Updated" line, so it was modelled as a legal document;
 * the content document gives it a headline, an intro, subsectioned feature
 * groups, an FAQ and a CTA — the same shape as the four compliance pages. It
 * keeps its published `/legal/security-compliance` path so the footer link
 * and any existing inbound links still resolve.
 */

import type { TrustPage } from "@/content/blocks";

export const SECURITY_COMPLIANCE_PAGE: TrustPage = {
  slug: "security-compliance",
  path: "/legal/security-compliance",
  title: "Security & Compliance",
  headline: "Built for the most demanding security and compliance standards.",
  intro:
    "SignSig meets the security and compliance requirements of regulated industries, government institutions, and enterprises. Every aspect of the platform is designed to protect data, maintain privacy, and provide audit trails for compliance verification.",
  cta: {
    label: "Request compliance documentation",
    href: "mailto:compliance@signsig.com?subject=Compliance%20documentation%20request",
  },
  sections: [
    {
      heading: "SECURITY CERTIFICATIONS",
      blocks: [
        { kind: "subheading", text: "SOC 2 Type II Certified" },
        {
          kind: "paragraph",
          text: "SOC 2 is an independent audit of security controls for service organizations. Our SOC 2 Type II certification covers:",
        },
        {
          kind: "list",
          items: [
            "Security controls and monitoring",
            "System availability and reliability",
            "Data processing integrity",
            "Confidentiality and privacy",
          ],
        },
        {
          kind: "paragraph",
          text: "An independent auditor verifies these controls work as designed and are maintained continuously.",
        },
        {
          kind: "labelled",
          label: "Why it matters:",
          text: "If your organization requires vendors to be SOC 2 certified, SignSig meets that requirement.",
        },
        { kind: "subheading", text: "ISO 27001 Certified" },
        {
          kind: "paragraph",
          text: "ISO 27001 is the international standard for information security management. Our certification covers:",
        },
        {
          kind: "list",
          items: [
            "Information security policies and procedures",
            "Access control and authentication",
            "Encryption and key management",
            "Incident response and business continuity",
            "Employee security and training",
          ],
        },
        {
          kind: "paragraph",
          text: "Certification is verified annually through third-party audits.",
        },
        {
          kind: "labelled",
          label: "Why it matters:",
          text: "ISO 27001 certification is recognized globally as a mark of information security excellence.",
        },
      ],
    },
    {
      heading: "COMPLIANCE STANDARDS",
      blocks: [
        { kind: "subheading", text: "GDPR (EU Data Protection)" },
        {
          kind: "paragraph",
          text: "SignSig complies with the General Data Protection Regulation (GDPR):",
        },
        {
          kind: "list",
          items: [
            "We provide Data Processing Agreements to business users",
            "We support data subject rights (access, deletion, portability)",
            "We conduct privacy impact assessments",
            "We implement privacy by design",
            "We notify users of data breaches within 72 hours",
          ],
        },
        {
          kind: "labelled",
          label: "What this means:",
          text: "If you process EU resident data, SignSig provides the legal and technical safeguards GDPR requires.",
        },
        { kind: "subheading", text: "HIPAA (Healthcare Privacy)" },
        {
          kind: "paragraph",
          text: "SignSig is HIPAA-ready for healthcare organizations:",
        },
        {
          kind: "list",
          items: [
            "We provide Business Associate Agreements (BAAs)",
            "We implement administrative, physical, and technical safeguards for Protected Health Information (PHI)",
            "We maintain audit logs of PHI access",
            "We support HIPAA-required encryption and access controls",
          ],
        },
        {
          kind: "labelled",
          label: "What this means:",
          text: "Healthcare organizations can use SignSig for patient consent forms, treatment authorizations, and other workflows involving PHI.",
        },
        { kind: "subheading", text: "CCPA/CPRA (California Privacy)" },
        {
          kind: "paragraph",
          text: "SignSig complies with California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):",
        },
        {
          kind: "list",
          items: [
            "We honor right to access personal information",
            "We honor right to delete personal information",
            "We support opt-out of data sharing for targeted advertising",
            "We do not discriminate against users exercising privacy rights",
          ],
        },
        {
          kind: "labelled",
          label: "What this means:",
          text: "California residents have full control over their personal information on SignSig.",
        },
        { kind: "subheading", text: "SOX (Sarbanes-Oxley) Ready" },
        {
          kind: "paragraph",
          text: "SignSig supports SOX compliance for publicly traded companies:",
        },
        {
          kind: "list",
          items: [
            "Complete audit trails of document signing and approval",
            "Access controls and separation of duties",
            "Secure document retention and archival",
            "Multi-factor authentication for sensitive documents",
          ],
        },
        {
          kind: "labelled",
          label: "What this means:",
          text: "Publicly traded companies can use SignSig for financial documents, contracts, and other documents requiring audit trails.",
        },
      ],
    },
    {
      heading: "SECURITY FEATURES",
      blocks: [
        { kind: "subheading", text: "Encryption" },
        {
          kind: "list",
          items: [
            "TLS 1.3 for data in transit",
            "AES-256 for data at rest",
            "Optional client-side encryption",
            "Secure key management",
          ],
        },
        { kind: "subheading", text: "Access Controls" },
        {
          kind: "list",
          items: [
            "Multi-factor authentication (MFA)",
            "Role-based access control (RBAC)",
            "Workspace isolation",
            "Audit logging",
          ],
        },
        { kind: "subheading", text: "Verification" },
        {
          kind: "list",
          items: [
            "Cryptographic signatures with verification certificates",
            "Timestamp proof",
            "Signer identity verification",
            "Document integrity verification",
          ],
        },
        { kind: "subheading", text: "Monitoring" },
        {
          kind: "list",
          items: [
            "24/7 security monitoring",
            "Intrusion detection",
            "Vulnerability scanning",
            "Threat response",
          ],
        },
      ],
    },
    {
      heading: "COMPLIANCE FEATURES",
      blocks: [
        { kind: "subheading", text: "Audit Trails" },
        {
          kind: "list",
          items: [
            "Complete log of all document activities",
            "User attribution for every action",
            "Timestamps for all events",
            "Exportable audit reports",
          ],
        },
        { kind: "subheading", text: "Data Retention" },
        {
          kind: "list",
          items: [
            "Flexible retention policies",
            "Secure archival",
            "Compliance-ready deletion",
            "Legal hold support",
          ],
        },
        { kind: "subheading", text: "Reporting" },
        {
          kind: "list",
          items: [
            "Compliance reports and certifications",
            "Security assessments",
            "Third-party audit reports",
            "SOC 2 reports available for customers",
          ],
        },
      ],
    },
    {
      heading: "DEPLOYMENT OPTIONS",
      blocks: [
        { kind: "subheading", text: "Cloud (SaaS)" },
        {
          kind: "paragraph",
          text: "Multi-tenant cloud platform hosted in secure AWS data centers with redundancy and disaster recovery.",
        },
        { kind: "subheading", text: "Self-Hosted" },
        {
          kind: "paragraph",
          text: "Deploy SignSig on your own infrastructure for maximum data sovereignty and control.",
        },
        { kind: "subheading", text: "Hybrid" },
        {
          kind: "paragraph",
          text: "Combine cloud and self-hosted deployment to meet your specific requirements.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Does SignSig have SOC 2 certification?",
      answer:
        "Yes. SignSig is SOC 2 Type II certified. Customers can request our SOC 2 report.",
    },
    {
      question: "Is SignSig HIPAA compliant?",
      answer:
        "SignSig is HIPAA-ready. Healthcare organizations can use it with a Business Associate Agreement (BAA). Contact us for a BAA template.",
    },
    {
      question: "Does SignSig support GDPR?",
      answer:
        "Yes. We comply with GDPR and provide Data Processing Agreements (DPA) to EU customers.",
    },
    {
      question: "Can I audit SignSig's security?",
      answer:
        "Yes. We provide SOC 2 reports, ISO 27001 certification, and security documentation to customers.",
    },
    {
      question: "Can I deploy SignSig on my servers?",
      answer: "Yes. Enterprise plans include self-hosted deployment options.",
    },
    {
      question: "Does SignSig meet SOX requirements?",
      answer:
        "SignSig provides audit trails and access controls suitable for SOX-compliant workflows. Contact us for details.",
    },
    {
      question: "How often is SignSig audited?",
      answer:
        "SOC 2 audits are conducted annually. ISO 27001 certification is validated annually. Security assessments are conducted regularly.",
    },
  ],
};
