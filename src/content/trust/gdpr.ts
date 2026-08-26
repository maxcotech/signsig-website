/**
 * GDPR Compliant — transcribed verbatim from the content document
 * ("MARKETING TRUST PAGES → PAGE: GDPR Compliance"), 2026-08-26.
 *
 * The page title is "GDPR Compliance" in the document but the footer link
 * reads "GDPR Compliant". The link text is left alone — it is the design's
 * and is what people will have clicked — and the page uses the document's
 * heading, so the two read as label and title rather than a contradiction.
 */

import type { TrustPage } from "@/content/blocks";

export const GDPR_PAGE: TrustPage = {
  slug: "gdpr",
  path: "/compliance/gdpr",
  title: "GDPR Compliance",
  headline: "Designed with GDPR in mind.",
  intro:
    "SignSig helps organizations comply with the General Data Protection Regulation (GDPR). Whether you're processing EU resident data or using SignSig in Europe, we've built privacy protections and contractual safeguards into the platform.",
  cta: {
    label: "Request a Data Processing Agreement",
    href: "mailto:legal@signsig.com?subject=Data%20Processing%20Agreement%20request",
  },
  sections: [
    {
      heading: "WHAT IS GDPR?",
      blocks: [
        {
          kind: "paragraph",
          text: "GDPR (General Data Protection Regulation) is EU legislation that regulates how organizations process personal data of EU residents.",
        },
        { kind: "lead", text: "Key Requirements:" },
        {
          kind: "list",
          items: [
            "Data protection by design and default",
            "Lawful basis for processing",
            "Data subject rights (access, deletion, portability)",
            "Data Protection Impact Assessments",
            "Incident notification within 72 hours",
            "Data Processing Agreements with vendors",
          ],
        },
        { kind: "lead", text: "Who Must Comply:" },
        {
          kind: "list",
          items: [
            "Organizations in the EU",
            "Organizations processing EU resident data",
            "Organizations with EU customers",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG'S GDPR COMPLIANCE",
      blocks: [
        { kind: "subheading", text: "Data Processing Agreements (DPA)" },
        {
          kind: "paragraph",
          text: "We provide Standard Data Processing Agreements that comply with GDPR Article 28:",
        },
        {
          kind: "list",
          items: [
            "Data processor contract defines roles and responsibilities",
            "Specifies lawful basis for processing",
            "Includes data protection obligations",
            "Addresses data subject rights",
            "Available for all SignSig customers",
          ],
        },
        { kind: "subheading", text: "Subprocessor Management" },
        {
          kind: "list",
          items: [
            "All subprocessors are contractually bound to GDPR requirements",
            "We maintain a subprocessor list",
            "Customers are notified of subprocessor changes",
            "Customers can object to new subprocessors",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG FEATURES THAT SUPPORT GDPR",
      blocks: [
        { kind: "subheading", text: "Privacy by Design" },
        {
          kind: "list",
          items: [
            "Collect only necessary data",
            "Encryption by default",
            "Purpose limitation",
            "Data minimization",
          ],
        },
        { kind: "subheading", text: "Data Subject Rights Support" },
        {
          kind: "list",
          items: [
            "Access: Users can download personal data",
            "Deletion: Users can request and execute deletion",
            "Portability: Users can export data in portable formats",
            "Objection: Users can object to processing",
          ],
        },
        { kind: "subheading", text: "Data Protection" },
        {
          kind: "list",
          items: [
            "Encryption of personal data",
            "Access controls and authentication",
            "Audit logging",
            "Secure deletion procedures",
          ],
        },
        { kind: "subheading", text: "Incident Response" },
        {
          kind: "list",
          items: [
            "Documented breach response procedures",
            "Notification procedures",
            "Support for breach notifications to authorities",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG'S DATA PROCESSING PRACTICES",
      blocks: [
        { kind: "subheading", text: "What We Collect" },
        {
          kind: "list",
          items: [
            "Account information (name, email, company)",
            "Document data (uploaded documents, signer names, signatures)",
            "Usage information (pages visited, features used)",
            "Cookies and tracking data",
          ],
        },
        { kind: "subheading", text: "Lawful Basis" },
        {
          kind: "paragraph",
          text: "We process data under these lawful bases:",
        },
        {
          kind: "list",
          items: [
            "Contract: To provide the Service and fulfill agreements",
            "Legal Obligation: To comply with legal requirements",
            "Legitimate Interest: To improve the Service and prevent fraud",
            "Consent: For marketing communications",
          ],
        },
        { kind: "subheading", text: "Data Retention" },
        {
          kind: "list",
          items: [
            "Active account data: Retained while account is active",
            "Deleted account data: Deleted within 90 days",
            "Usage data: Retained for up to 24 months",
            "Backups: Retained for 30 days",
          ],
        },
        { kind: "subheading", text: "International Transfers" },
        {
          kind: "paragraph",
          text: "Data is transferred to the United States for processing. We ensure adequate protection through:",
        },
        {
          kind: "list",
          items: [
            "Standard Contractual Clauses (SCCs)",
            "Encryption in transit and at rest",
            "Access controls",
            "Audit procedures",
          ],
        },
        { kind: "subheading", text: "Data Sharing" },
        { kind: "paragraph", text: "We share data with:" },
        {
          kind: "list",
          items: [
            "Service providers (cloud hosting, payment processing, analytics) under data processing agreements",
            "Regulatory authorities if legally required",
            "Your designated signers for document workflows",
          ],
        },
        { kind: "paragraph", text: "We do not sell personal data." },
      ],
    },
    {
      heading: "DATA SUBJECT RIGHTS",
      blocks: [
        {
          kind: "paragraph",
          text: "As an EU resident, you have the following rights under GDPR:",
        },
        { kind: "subheading", text: "Right to Access (Article 15)" },
        {
          kind: "list",
          items: [
            "Request a copy of personal data SignSig holds about you",
            "Download via your account settings or by contacting us",
          ],
        },
        { kind: "subheading", text: "Right to Rectification (Article 16)" },
        {
          kind: "list",
          items: [
            "Correct inaccurate personal data",
            "Update your account information",
          ],
        },
        {
          kind: "subheading",
          text: "Right to Erasure/Right to be Forgotten (Article 17)",
        },
        {
          kind: "list",
          items: [
            "Request deletion of personal data",
            "Exercised via account settings or by contacting us",
          ],
        },
        { kind: "subheading", text: "Right to Data Portability (Article 20)" },
        {
          kind: "list",
          items: [
            "Export personal data in a portable format",
            "Use data with another service",
          ],
        },
        {
          kind: "subheading",
          text: "Right to Restrict Processing (Article 18)",
        },
        {
          kind: "list",
          items: [
            "Ask SignSig to limit how we process your data",
            "Useful when contesting accuracy",
          ],
        },
        { kind: "subheading", text: "Right to Object (Article 21)" },
        {
          kind: "list",
          items: [
            "Object to processing for marketing or profiling",
            "Managed via email preferences and account settings",
          ],
        },
        {
          kind: "subheading",
          text: "Rights Related to Automated Decision Making (Article 22)",
        },
        {
          kind: "list",
          items: [
            "SignSig does not make automated decisions that significantly affect users",
          ],
        },
        {
          kind: "subheading",
          text: "Right to Lodge a Complaint (Article 77)",
        },
        {
          kind: "list",
          items: [
            "File complaints with your national data protection authority",
            "EU residents can file with any EU DPA",
          ],
        },
      ],
    },
    {
      heading: "EXERCISING YOUR RIGHTS",
      blocks: [
        { kind: "paragraph", text: "To exercise your GDPR rights:" },
        {
          kind: "labelled",
          label: "Email:",
          text: "privacy@signsig.com",
        },
        { kind: "lead", text: "Include:" },
        {
          kind: "list",
          items: [
            "Your full name and email address",
            "Specific right you're requesting",
            "Any relevant documentation",
          ],
        },
        { kind: "lead", text: "Response Time:" },
        {
          kind: "list",
          items: [
            "We'll respond within 30 days",
            "Extensions up to 60 days are allowed for complex requests",
          ],
        },
        { kind: "lead", text: "Verification:" },
        {
          kind: "list",
          items: [
            "We may request proof of identity to ensure we're communicating with the data subject",
          ],
        },
      ],
    },
    {
      heading: "PRIVACY IMPACT ASSESSMENT (DPIA)",
      blocks: [
        {
          kind: "paragraph",
          text: "SignSig conducts Data Protection Impact Assessments for:",
        },
        {
          kind: "list",
          items: [
            "New feature development involving personal data",
            "Changes to data processing practices",
            "Integration with new third-party services",
            "High-risk processing activities",
          ],
        },
        {
          kind: "paragraph",
          text: "Customers can request a DPIA for their use case.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "I'm in the EU. Do I need a Data Processing Agreement?",
      answer:
        "If you're processing personal data through SignSig, yes. We provide a DPA template.",
    },
    {
      question: "Can I delete my personal data?",
      answer:
        "Yes. Email privacy@signsig.com to request deletion. We'll delete your data within 30 days except where legally required to retain it.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes. You can export documents and personal data from your account settings anytime.",
    },
    {
      question: "Where is my data stored?",
      answer:
        "In the United States. We protect it with encryption and contractual safeguards.",
    },
    {
      question: "How long is my data kept?",
      answer:
        "While your account is active, indefinitely. After deletion, within 90 days except where retention is legally required.",
    },
    {
      question: "Can I object to marketing emails?",
      answer:
        "Yes. Unsubscribe via the link in emails or contact us to opt-out.",
    },
    {
      question: "Does SignSig use profiling or automated decision-making?",
      answer:
        "No. SignSig does not make automated decisions that significantly affect users.",
    },
    {
      question: "What if I have GDPR concerns?",
      answer:
        "Contact privacy@signsig.com. If not resolved, you can file a complaint with your data protection authority.",
    },
  ],
};
