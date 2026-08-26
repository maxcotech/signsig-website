/**
 * Privacy Policy — transcribed verbatim from the content document
 * ("LEGAL PAGES → PAGE: Privacy Policy"), 2026-08-26. The design PNG had an
 * entirely empty body, so there is nothing here it could contradict.
 *
 * ⚠ Same omission as Terms §18: section 15 in the document reads
 * "SignSig Privacy Team Email: privacy@signsig.com Phone: [Support Phone]
 * Address: [Company Address]". The two bracketed placeholders are left out
 * rather than printed. See `terms.ts` for the reasoning.
 */

import type { ContentSection } from "@/content/blocks";

export const PRIVACY_SECTIONS: readonly ContentSection[] = [
  {
    heading: "1. INTRODUCTION",
    blocks: [
      {
        kind: "paragraph",
        text: 'SignSig, Inc. ("Company," "we," "us," "our," or "SignSig") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Service, including via our website, mobile app, and API.',
      },
      {
        kind: "paragraph",
        text: "Please read this Privacy Policy carefully. If you do not agree with our privacy practices, do not use the Service.",
      },
    ],
  },
  {
    heading: "2. INFORMATION WE COLLECT",
    blocks: [
      { kind: "subheading", text: "2.1 Account Information" },
      { kind: "paragraph", text: "When you create an account, we collect:" },
      {
        kind: "list",
        items: [
          "Full name",
          "Email address",
          "Phone number (optional)",
          "Company name (optional)",
          "Job title (optional)",
          "Password (securely hashed)",
          "Billing address",
          "Payment method information (processed securely by payment processors)",
        ],
      },
      { kind: "subheading", text: "2.2 Document Data" },
      { kind: "paragraph", text: "When you use the Service, we collect:" },
      {
        kind: "list",
        items: [
          "Documents and agreements you upload or create",
          "Signer names and email addresses",
          "Signature data and timestamp information",
          "Document metadata (creation date, modification date, file type)",
          "Approval and workflow information",
          "Comments and notes you add to documents",
          "Custom field data you create",
        ],
      },
      { kind: "subheading", text: "2.3 Usage Information" },
      { kind: "paragraph", text: "We automatically collect:" },
      {
        kind: "list",
        items: [
          "IP address",
          "Device type and operating system",
          "Browser type",
          "Pages and features accessed",
          "Time and duration of activities",
          "Links clicked",
          "Search queries",
          "Referral source",
          "Approximate geographic location (city/country level)",
        ],
      },
      { kind: "subheading", text: "2.4 Cookies and Tracking Technologies" },
      {
        kind: "paragraph",
        text: "We use cookies, pixels, and similar technologies to:",
      },
      {
        kind: "list",
        items: [
          "Remember login information and preferences",
          "Track how you use the Service",
          "Understand user trends and patterns",
          "Deliver targeted content and advertising",
          "Prevent fraud",
        ],
      },
      {
        kind: "paragraph",
        text: "See our Cookie Policy for more details.",
      },
      { kind: "subheading", text: "2.5 Communications" },
      { kind: "paragraph", text: "When you contact us, we collect:" },
      {
        kind: "list",
        items: [
          "Your message content",
          "Attachments you send",
          "Your communication preferences",
          "Support conversation history",
        ],
      },
      { kind: "subheading", text: "2.6 Information from Third Parties" },
      {
        kind: "paragraph",
        text: "We may receive information about you from:",
      },
      {
        kind: "list",
        items: [
          "Verification services (for identity verification features)",
          "Payment processors (for transaction records)",
          "Analytics providers",
          "Advertising networks",
          "Social media platforms (if you use social login)",
        ],
      },
    ],
  },
  {
    heading: "3. HOW WE USE INFORMATION",
    blocks: [
      {
        kind: "paragraph",
        text: "We use the information we collect to:",
      },
      { kind: "lead", text: "Service Delivery:" },
      {
        kind: "list",
        items: [
          "Create and manage your account",
          "Store and process your documents",
          "Generate signatures and verification certificates",
          "Manage workflows and approvals",
          "Send you signed documents",
          "Create audit trails and logs",
          "Provide customer support",
        ],
      },
      { kind: "lead", text: "Service Improvement:" },
      {
        kind: "list",
        items: [
          "Analyze usage patterns and feature adoption",
          "Identify bugs and technical issues",
          "Develop new features",
          "Optimize user experience",
          "Conduct aggregate analytics",
        ],
      },
      { kind: "lead", text: "Communications:" },
      {
        kind: "list",
        items: [
          "Send service-related notifications (account confirmations, password resets, billing notices)",
          "Respond to your inquiries",
          "Send product updates and feature announcements",
          "Send marketing communications (with your consent)",
          "Send compliance-related notices",
        ],
      },
      { kind: "lead", text: "Legal and Safety:" },
      {
        kind: "list",
        items: [
          "Comply with legal obligations",
          "Enforce our Terms of Service",
          "Investigate fraud or abuse",
          "Protect the rights, property, and safety of SignSig, users, and the public",
        ],
      },
      { kind: "lead", text: "Personalization:" },
      {
        kind: "list",
        items: [
          "Tailor the Service to your preferences",
          "Remember your settings",
          "Suggest relevant features",
        ],
      },
    ],
  },
  {
    heading: "4. DATA RETENTION",
    blocks: [
      {
        kind: "paragraph",
        text: "We retain personal information for as long as necessary to:",
      },
      {
        kind: "list",
        items: [
          "Maintain your account and provide the Service",
          "Fulfill legal and contractual obligations",
          "Resolve disputes",
          "Enforce agreements",
        ],
      },
      { kind: "lead", text: "Retention Periods:" },
      {
        kind: "list",
        items: [
          "Account data: Retained while your account is active. Deleted 90 days after account termination.",
          "Document data: Retained while your account is active. Deleted 90 days after account termination, unless your plan includes long-term retention.",
          "Usage data: Retained for up to 24 months for analytics purposes.",
          "Backups: Retained for 30 days after deletion for recovery purposes.",
        ],
      },
      {
        kind: "paragraph",
        text: "If you request deletion, we will delete personal information within 30 days, except where retention is required by law.",
      },
    ],
  },
  {
    heading: "5. DATA SHARING AND DISCLOSURE",
    blocks: [
      { kind: "subheading", text: "5.1 Who We Share Data With" },
      {
        kind: "paragraph",
        text: "We do not sell personal information. We may share information with:",
      },
      { kind: "lead", text: "Service Providers:" },
      {
        kind: "list",
        items: [
          "Cloud hosting providers (Amazon Web Services, Google Cloud)",
          "Payment processors (Stripe, PayPal)",
          "Email delivery providers",
          "Analytics providers",
          "Customer support platforms",
          "Verification services",
        ],
      },
      { kind: "lead", text: "Legal Requirements:" },
      {
        kind: "list",
        items: [
          "Law enforcement (in response to valid legal process)",
          "Government agencies (if required by law)",
          "Courts and regulatory bodies",
        ],
      },
      { kind: "lead", text: "Business Transfers:" },
      {
        kind: "list",
        items: [
          "If SignSig is acquired, merged, or sold, personal information may be transferred as part of that transaction",
        ],
      },
      { kind: "lead", text: "Consent:" },
      {
        kind: "list",
        items: ["With your explicit consent for other purposes"],
      },
      { kind: "subheading", text: "5.2 Signers and Recipients" },
      {
        kind: "paragraph",
        text: "When you send a document for signature, the recipient (signer) receives:",
      },
      {
        kind: "list",
        items: [
          "Your name and email",
          "The document content",
          "Instructions and messages you include",
          "Verification certificates (if included)",
        ],
      },
      {
        kind: "paragraph",
        text: "You are responsible for obtaining necessary consents from signers before sending documents.",
      },
      { kind: "subheading", text: "5.3 Limited Disclosure to Signers" },
      {
        kind: "paragraph",
        text: "For verification purposes, third parties may see:",
      },
      {
        kind: "list",
        items: [
          "Signer name and email (from verification certificate)",
          "Signature timestamp",
          "Document hash and integrity information",
          "IP address and device information from the signature",
        ],
      },
      {
        kind: "paragraph",
        text: "This information is accessible only through the verification certificate without accessing your SignSig account.",
      },
    ],
  },
  {
    heading: "6. SECURITY MEASURES",
    blocks: [
      {
        kind: "paragraph",
        text: "SignSig employs industry-standard security measures:",
      },
      { kind: "lead", text: "Data Protection:" },
      {
        kind: "list",
        items: [
          "End-to-end encryption for data in transit (TLS/SSL)",
          "Encryption at rest using AES-256",
          "Secure key management",
        ],
      },
      { kind: "lead", text: "Access Controls:" },
      {
        kind: "list",
        items: [
          "Role-based access controls (RBAC)",
          "Multi-factor authentication (MFA)",
          "Activity logging and monitoring",
          "Regular security audits",
        ],
      },
      { kind: "lead", text: "Compliance:" },
      {
        kind: "list",
        items: [
          "SOC 2 Type II certified",
          "GDPR compliant",
          "HIPAA ready",
          "ISO 27001 certified",
        ],
      },
      { kind: "lead", text: "Incident Response:" },
      {
        kind: "list",
        items: [
          "Security incident response procedures",
          "Notification protocols for data breaches",
          "Regular security updates and patches",
        ],
      },
      {
        kind: "paragraph",
        text: "While we implement robust security measures, no system is completely secure. You acknowledge the inherent risks of transmitting information over the internet.",
      },
    ],
  },
  {
    heading: "7. INTERNATIONAL DATA TRANSFERS",
    blocks: [
      {
        kind: "paragraph",
        text: "SignSig operates in the United States. If you are located outside the US, we transfer your personal information to the US for processing and storage.",
      },
      {
        kind: "labelled",
        label: "EU/UK Users:",
        text: "For users in the EU, UK, or other jurisdictions with data protection laws:",
      },
      {
        kind: "list",
        items: [
          "We rely on Standard Contractual Clauses (SCCs) or other lawful mechanisms to transfer data",
          "We provide the same level of data protection as required by GDPR",
          "You have the right to lodge complaints with your data protection authority",
        ],
      },
      {
        kind: "paragraph",
        text: "We will not transfer data to jurisdictions without adequate protections unless you consent or we have a lawful basis.",
      },
    ],
  },
  {
    heading: "8. USER RIGHTS AND CHOICES",
    blocks: [
      {
        kind: "paragraph",
        text: "Depending on your location, you may have the following rights:",
      },
      { kind: "lead", text: "Access (GDPR, CCPA):" },
      {
        kind: "list",
        items: [
          "You can request a copy of personal information we hold about you",
        ],
      },
      { kind: "lead", text: "Correction (GDPR, CCPA):" },
      {
        kind: "list",
        items: ["You can request correction of inaccurate information"],
      },
      { kind: "lead", text: "Deletion (GDPR, CCPA, PIPEDA):" },
      {
        kind: "list",
        items: [
          "You can request deletion of personal information (right to be forgotten)",
          "We will delete information within 30 days except where required by law",
        ],
      },
      { kind: "lead", text: "Portability (GDPR, CCPA):" },
      {
        kind: "list",
        items: [
          "You can request your personal information in a portable format",
        ],
      },
      { kind: "lead", text: "Opt-Out of Marketing (CAN-SPAM, GDPR):" },
      {
        kind: "list",
        items: [
          "You can unsubscribe from marketing emails by clicking the unsubscribe link or contacting us",
        ],
      },
      { kind: "lead", text: "Object to Processing (GDPR):" },
      {
        kind: "list",
        items: [
          "You can object to processing of personal information for marketing or profiling",
        ],
      },
      {
        kind: "lead",
        text: "Data Processing Instructions (GDPR Business Users):",
      },
      {
        kind: "list",
        items: [
          "If you are a business user, you can provide data processing instructions",
        ],
      },
      {
        kind: "paragraph",
        text: "To exercise these rights, contact: privacy@signsig.com",
      },
    ],
  },
  {
    heading: "9. COOKIES AND TRACKING TECHNOLOGIES",
    blocks: [
      {
        kind: "paragraph",
        text: "We use cookies and similar technologies for:",
      },
      {
        kind: "list",
        items: [
          "Essential cookies: Required for website functionality",
          "Functional cookies: Remember preferences and login",
          "Analytics cookies: Understand usage patterns",
          "Marketing cookies: Deliver targeted advertising",
        ],
      },
      {
        kind: "paragraph",
        text: "You can control cookie preferences through your browser settings or our cookie consent manager on the website.",
      },
      {
        kind: "paragraph",
        text: "See our Cookie Policy for detailed information.",
      },
    ],
  },
  {
    heading: "10. CHILDREN'S PRIVACY",
    blocks: [
      {
        kind: "paragraph",
        text: "The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided personal information, we will delete it promptly.",
      },
      {
        kind: "paragraph",
        text: "For users between 13 and 18, parental consent may be required under certain jurisdictions.",
      },
    ],
  },
  {
    heading: "11. THIRD-PARTY LINKS",
    blocks: [
      {
        kind: "paragraph",
        text: "The Service may contain links to third-party websites and services. This Privacy Policy applies only to SignSig. We are not responsible for the privacy practices of third-party services.",
      },
      {
        kind: "paragraph",
        text: "We recommend reviewing the privacy policies of any third-party services before providing personal information.",
      },
    ],
  },
  {
    heading: "12. BUSINESS USERS AND DATA PROCESSING",
    blocks: [
      {
        kind: "paragraph",
        text: "For business users processing personal information as data controllers, SignSig acts as a data processor.",
      },
      {
        kind: "labelled",
        label: "Data Processing Agreement:",
        text: "We provide a Data Processing Agreement (DPA) that complies with GDPR. This can be requested from legal@signsig.com.",
      },
      {
        kind: "labelled",
        label: "Your Obligations:",
        text: "As the data controller, you must:",
      },
      {
        kind: "list",
        items: [
          "Obtain necessary consents from individuals",
          "Ensure lawful basis for processing",
          "Provide privacy notices to individuals",
          "Respond to data subject rights requests",
        ],
      },
    ],
  },
  {
    heading: "13. CALIFORNIA PRIVACY RIGHTS (CCPA/CPRA)",
    blocks: [
      {
        kind: "paragraph",
        text: "If you are a California resident, you have the following rights under CCPA:",
      },
      {
        kind: "list",
        items: [
          "Right to Know: What personal information is collected and how it's used",
          "Right to Delete: Request deletion of personal information",
          'Right to Opt-Out: Opt-out of the "sale" or "sharing" of personal information',
          "Right to Correct: Request correction of inaccurate information",
          "Right to Limit Use: Limit use of sensitive personal information",
          "Right to Non-Discrimination: Not be discriminated against for exercising CCPA rights",
        ],
      },
      {
        kind: "paragraph",
        text: "To exercise these rights: privacy@signsig.com",
      },
      {
        kind: "paragraph",
        text: 'We do not sell personal information. We may "share" information for targeted advertising, which you can opt out of.',
      },
    ],
  },
  {
    heading: "14. CHANGES TO THIS PRIVACY POLICY",
    blocks: [
      {
        kind: "paragraph",
        text: "We may update this Privacy Policy at any time. Changes become effective when posted. For material changes, we will notify you by email or prominent notice on the website.",
      },
      {
        kind: "paragraph",
        text: "Your continued use of the Service following notice of changes constitutes your acceptance of the updated Privacy Policy.",
      },
    ],
  },
  {
    heading: "15. CONTACT US",
    blocks: [
      {
        kind: "paragraph",
        text: "For privacy questions or to exercise your rights:",
      },
      {
        kind: "labelled",
        label: "SignSig Privacy Team",
        text: "Email: privacy@signsig.com",
      },
    ],
  },
];
