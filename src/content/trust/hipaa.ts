/**
 * HIPAA Ready — transcribed verbatim from the content document
 * ("MARKETING TRUST PAGES → PAGE: HIPAA Readiness"), 2026-08-26.
 *
 * Note the document is careful to say "HIPAA-ready", never "HIPAA
 * certified" — there is no such certification. That wording is preserved
 * exactly; it is a compliance claim, not marketing polish to tighten.
 */

import type { TrustPage } from "@/content/blocks";

export const HIPAA_PAGE: TrustPage = {
  slug: "hipaa",
  path: "/compliance/hipaa",
  title: "HIPAA Readiness",
  headline: "Healthcare data protection built in.",
  intro:
    "SignSig is HIPAA-ready, enabling healthcare organizations to use our platform for workflows involving Protected Health Information (PHI). We provide the controls, agreements, and documentation required by the Health Insurance Portability and Accountability Act (HIPAA).",
  cta: {
    label: "Request a Business Associate Agreement",
    href: "mailto:compliance@signsig.com?subject=Business%20Associate%20Agreement%20request",
  },
  sections: [
    {
      heading: "WHAT IS HIPAA?",
      blocks: [
        {
          kind: "paragraph",
          text: "HIPAA (Health Insurance Portability and Accountability Act) is US legislation regulating how healthcare providers, health plans, and healthcare clearinghouses handle patient medical information.",
        },
        { kind: "lead", text: "Key Requirements:" },
        {
          kind: "list",
          items: [
            "Authorization for use and disclosure of PHI",
            "Administrative, physical, and technical safeguards",
            "Audit controls and logging",
            "Incident response and breach notification",
            "Data Security Rule requirements",
            "Business Associate Agreements (BAAs)",
          ],
        },
        { kind: "lead", text: "Who Must Comply:" },
        {
          kind: "list",
          items: [
            "Healthcare providers (doctors, hospitals, clinics)",
            "Health plans (insurance, HMOs)",
            "Healthcare clearinghouses",
            "Business associates (vendors handling PHI)",
          ],
        },
      ],
    },
    {
      heading: "SIGNSIG'S HIPAA READINESS",
      blocks: [
        { kind: "subheading", text: "Business Associate Agreements (BAA)" },
        {
          kind: "paragraph",
          text: "SignSig provides standard Business Associate Agreements that satisfy HIPAA requirements:",
        },
        {
          kind: "list",
          items: [
            "Defines roles and responsibilities",
            "Specifies permitted uses of PHI",
            "Requires appropriate safeguards",
            "Addresses breach notification",
            "Available for all healthcare customers",
          ],
        },
        {
          kind: "paragraph",
          text: "To sign a BAA, contact: compliance@signsig.com",
        },
        { kind: "subheading", text: "HIPAA Security Rule Compliance" },
        {
          kind: "paragraph",
          text: "We implement safeguards across three categories:",
        },
      ],
    },
    {
      heading: "ADMINISTRATIVE SAFEGUARDS",
      blocks: [
        { kind: "subheading", text: "Access Controls" },
        {
          kind: "list",
          items: [
            "Unique user IDs for all users",
            "Emergency access procedures",
            "Role-based access control (RBAC)",
            "User activity monitoring",
          ],
        },
        { kind: "subheading", text: "Workforce Security" },
        {
          kind: "list",
          items: [
            "Workforce clearance procedures",
            "Authorization and supervision",
            "Termination procedures",
            "Periodic access reviews",
          ],
        },
        { kind: "subheading", text: "Information Access Management" },
        {
          kind: "list",
          items: [
            "Access granted based on role and need-to-know",
            "Documentation of access",
            "Removal of access upon termination",
          ],
        },
        { kind: "subheading", text: "Security Awareness Training" },
        {
          kind: "list",
          items: [
            "HIPAA training for all employees",
            "Annual update training",
            "Periodic reminders",
          ],
        },
        { kind: "subheading", text: "Security Incident Procedures" },
        {
          kind: "list",
          items: [
            "Documented incident response plan",
            "Investigation procedures",
            "Corrective action procedures",
            "Breach notification procedures",
          ],
        },
        { kind: "subheading", text: "Contingency Planning" },
        {
          kind: "list",
          items: [
            "Disaster recovery procedures",
            "Backup procedures",
            "Testing of contingency plans",
            "Emergency access procedures",
          ],
        },
        { kind: "subheading", text: "Business Associate Contracts" },
        {
          kind: "list",
          items: [
            "BAAs with all subprocessors",
            "Contractual safeguard requirements",
            "Breach notification obligations",
          ],
        },
      ],
    },
    {
      heading: "PHYSICAL SAFEGUARDS",
      blocks: [
        { kind: "subheading", text: "Facility Access Controls" },
        {
          kind: "list",
          items: [
            "Data center physical security",
            "Biometric access controls",
            "Surveillance systems",
            "Environmental controls",
          ],
        },
        { kind: "subheading", text: "Workstation Security" },
        {
          kind: "list",
          items: [
            "Secure device configuration",
            "Screen locks and timeouts",
            "Device encryption",
            "Secure deletion procedures",
          ],
        },
        { kind: "subheading", text: "Workstation Use Policy" },
        {
          kind: "list",
          items: [
            "Proper use guidelines",
            "Monitoring of use",
            "Incident reporting",
          ],
        },
        { kind: "subheading", text: "Device and Media Controls" },
        {
          kind: "list",
          items: [
            "Inventory of devices",
            "Secure disposal procedures",
            "Asset tracking",
            "Encryption of mobile devices",
          ],
        },
      ],
    },
    {
      heading: "TECHNICAL SAFEGUARDS",
      blocks: [
        { kind: "subheading", text: "Access Controls" },
        {
          kind: "list",
          items: [
            "Multi-factor authentication",
            "Unique user IDs",
            "Automatic logoff",
            "Encryption and decryption",
          ],
        },
        { kind: "subheading", text: "Audit Controls" },
        {
          kind: "list",
          items: [
            "Logging of all PHI access",
            "Audit log preservation",
            "Monitoring of activity",
            "Alerting on suspicious activity",
          ],
        },
        { kind: "subheading", text: "Integrity Controls" },
        {
          kind: "list",
          items: [
            "Mechanisms to verify PHI hasn't been altered",
            "Secure signing of documents",
            "Checksum verification",
          ],
        },
        { kind: "subheading", text: "Transmission Security" },
        {
          kind: "list",
          items: [
            "Encryption of data in transit (TLS 1.3)",
            "Secure communication channels",
            "Authentication and integrity controls",
          ],
        },
      ],
    },
    {
      heading: "PHI ON SIGNSIG",
      blocks: [
        { kind: "subheading", text: "What Can Be Processed" },
        { kind: "paragraph", text: "You can use SignSig to:" },
        {
          kind: "list",
          items: [
            "Send patient consent forms for signature",
            "Route treatment authorization documents",
            "Collect medical history information",
            "Share discharge instructions",
            "Manage authorization workflows",
          ],
        },
        { kind: "subheading", text: "What Should Not Be Processed" },
        { kind: "paragraph", text: "Minimize PHI exposure by:" },
        {
          kind: "list",
          items: [
            "Not including full medical records in documents",
            "Using de-identified forms when possible",
            "Limiting to necessary information",
            "Encrypting particularly sensitive data",
          ],
        },
        { kind: "subheading", text: "Data Retention" },
        {
          kind: "list",
          items: [
            "Retain PHI consistent with your record retention policies",
            "SignSig retains data per your plan and deletion requests",
            "Backup data is deleted within 30 days of your deletion",
          ],
        },
      ],
    },
    {
      heading: "BREACH NOTIFICATION",
      blocks: [
        {
          kind: "paragraph",
          text: "If a breach of unsecured PHI occurs:",
        },
        {
          kind: "list",
          items: [
            "Detection: SignSig detects and investigates",
            "Notification: SignSig notifies you immediately",
            "Assessment: You assess breach impact",
            "Notification: You notify affected individuals",
            "Reporting: You report to HHS if 500+ residents affected",
          ],
        },
        { kind: "paragraph", text: "SignSig provides:" },
        {
          kind: "list",
          items: [
            "Incident details and timeline",
            "Affected data categories",
            "Investigation findings",
            "Corrective actions",
          ],
        },
      ],
    },
    {
      heading: "BUSINESS ASSOCIATE AGREEMENT PROCESS",
      blocks: [
        {
          kind: "paragraph",
          text: "To enable HIPAA compliance on your account:",
        },
        {
          kind: "list",
          items: [
            "Request: Email compliance@signsig.com to request BAA",
            "Review: Review the standard BAA terms",
            "Execute: Sign the BAA electronically",
            "Enable: We enable HIPAA compliance features",
            "Audit: Conduct annual audit of BAA compliance",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I use SignSig with patient data?",
      answer:
        "Yes, with a signed Business Associate Agreement (BAA). Email compliance@signsig.com.",
    },
    {
      question: "Does SignSig encrypt PHI?",
      answer:
        "Yes. All PHI is encrypted in transit (TLS 1.3) and at rest (AES-256).",
    },
    {
      question: "Can SignSig employees see patient data?",
      answer:
        "No. Employees cannot access customer accounts or data. Access is logged and audited.",
    },
    {
      question: "How does SignSig handle a data breach?",
      answer:
        "We immediately investigate, notify you, and work with you on breach assessment and notification.",
    },
    {
      question: "Can I enable HIPAA on my existing account?",
      answer:
        "Yes. Sign a BAA with us and we'll enable HIPAA compliance features.",
    },
    {
      question: "How long is PHI retained?",
      answer:
        "While your account is active. After deletion, PHI is deleted within 90 days per your data deletion request.",
    },
    {
      question: "Does SignSig conduct security audits?",
      answer: "Yes. Annual SOC 2 audits include HIPAA control testing.",
    },
    {
      question: "What if I have HIPAA compliance questions?",
      answer:
        "Contact compliance@signsig.com. We can discuss your specific use case.",
    },
  ],
};
