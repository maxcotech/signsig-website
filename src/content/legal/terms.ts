/**
 * Terms of Service — transcribed verbatim from the content document
 * ("LEGAL PAGES → PAGE: Terms of Service"), 2026-08-26.
 *
 * The document supersedes the design PNG per the user's direction. That also
 * settles the duplicated section 5 the PNG contained: the document has it
 * once.
 *
 * ⚠ ONE DELIBERATE OMISSION. Section 18 in the document reads:
 *
 *     "SignSig Legal Team SignSig, Inc. Address: [Company Address]
 *      Email: legal@signsig.com Phone: [Support Phone]"
 *
 * `[Company Address]` and `[Support Phone]` are unfilled placeholders. A
 * legal page that prints a bracketed placeholder as a contact address is
 * worse than one that gives only the address it actually has, so the email is
 * rendered and the two placeholders are left out. Fill them in here when the
 * real values exist.
 */

import type { ContentSection } from "@/content/blocks";

export const TERMS_SECTIONS: readonly ContentSection[] = [
  {
    heading: "1. ACCEPTANCE OF TERMS",
    blocks: [
      {
        kind: "paragraph",
        text: 'By accessing and using SignSig (the "Service"), you agree to be bound by these Terms of Service (the "Terms"). If you do not agree to any part of these Terms, you may not use the Service.',
      },
      {
        kind: "paragraph",
        text: 'SignSig, Inc. ("Company," "we," "us," or "our") reserves the right to modify these Terms at any time. Changes become effective when posted to the website. Continued use of the Service following the posting of modifications constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically to stay informed of changes.',
      },
    ],
  },
  {
    heading: "2. ACCOUNT REGISTRATION AND RESPONSIBILITIES",
    blocks: [
      {
        kind: "paragraph",
        text: "To use SignSig, you may need to create an account. You agree to:",
      },
      {
        kind: "list",
        items: [
          "Provide accurate, current, and complete information during registration",
          "Maintain the confidentiality of your password and account information",
          "Notify us immediately of any unauthorized use of your account",
          "Accept responsibility for all activities that occur under your account",
          "Comply with all applicable laws and these Terms",
        ],
      },
      {
        kind: "paragraph",
        text: "You are solely responsible for maintaining the security of your login credentials. SignSig is not responsible for unauthorized access resulting from your failure to protect your credentials.",
      },
    ],
  },
  {
    heading: "3. PERMITTED USE",
    blocks: [
      { kind: "paragraph", text: "You may use SignSig to:" },
      {
        kind: "list",
        items: [
          "Create, send, sign, and manage digital documents and agreements",
          "Set up approval workflows and automation",
          "Manage team members and control access to documents",
          "Generate and verify digital signatures",
          "Create and use document templates",
          "Export and archive completed documents",
          "Integrate SignSig with your applications via APIs and SDKs",
          "Deploy SignSig on your own infrastructure if self-hosting is enabled for your plan",
        ],
      },
      {
        kind: "paragraph",
        text: "Use of the Service is limited to lawful purposes and in compliance with all applicable laws, regulations, and these Terms.",
      },
    ],
  },
  {
    heading: "4. PROHIBITED ACTIVITIES",
    blocks: [
      { kind: "paragraph", text: "You agree not to:" },
      {
        kind: "list",
        items: [
          "Use the Service for any illegal activity or to facilitate illegal conduct",
          "Violate any applicable laws, regulations, or contractual obligations",
          "Infringe on the intellectual property rights of SignSig or any third party",
          "Attempt to gain unauthorized access to the Service or its systems",
          "Reverse engineer, decompile, or disassemble the Service",
          "Use the Service to harass, threaten, defame, or harm any person",
          "Upload or transmit malware, viruses, or harmful code",
          "Engage in fraudulent or deceptive practices",
          "Use the Service to create false or misleading signatures",
          "Circumvent security measures or access controls",
          "Resell or redistribute the Service without authorization",
          "Overwhelm or disrupt the Service through excessive requests or attacks",
        ],
      },
    ],
  },
  {
    heading: "5. USER CONTENT AND DOCUMENTS",
    blocks: [
      {
        kind: "labelled",
        label: "Ownership:",
        text: 'You retain all ownership rights to documents, agreements, and data you upload to SignSig ("User Content"). You grant SignSig a limited license to:',
      },
      {
        kind: "list",
        items: [
          "Store, process, and transmit User Content to fulfill the Service",
          "Create backup copies for security and disaster recovery",
          "Analyze aggregated, anonymized data for service improvement",
        ],
      },
      {
        kind: "labelled",
        label: "Responsibility:",
        text: "You are solely responsible for:",
      },
      {
        kind: "list",
        items: [
          "The legality and accuracy of User Content",
          "Obtaining necessary consents from signers",
          "Ensuring User Content does not violate third-party rights",
          "Compliance with applicable laws when using the Service",
        ],
      },
      {
        kind: "labelled",
        label: "Prohibited Content:",
        text: "You may not upload documents containing:",
      },
      {
        kind: "list",
        items: [
          "Illegal content or instructions for illegal activities",
          "Content that violates third-party intellectual property rights",
          "Content designed to harm or defraud others",
        ],
      },
    ],
  },
  {
    heading: "6. DIGITAL SIGNATURES AND VERIFICATION CERTIFICATES",
    blocks: [
      {
        kind: "labelled",
        label: "Legal Status:",
        text: "Signatures created using SignSig are intended to constitute legally binding electronic signatures under the ESIGN Act (15 U.S.C. § 7001 et seq.), the Uniform Electronic Transactions Act (UETA), eIDAS (EU Regulation 910/2014), and similar laws in other jurisdictions.",
      },
      {
        kind: "paragraph",
        text: "The enforceability of any particular signature depends on:",
      },
      {
        kind: "list",
        items: [
          "Applicable law in the relevant jurisdiction",
          "The nature of the document and transaction",
          "Compliance with legal requirements for electronic signatures",
          "Whether all parties accepted electronic signatures",
        ],
      },
      {
        kind: "labelled",
        label: "Verification Certificates:",
        text: "SignSig generates verification certificates that include:",
      },
      {
        kind: "list",
        items: [
          "Cryptographic proof of signature authenticity",
          "Signer identity information",
          "Timestamp and timezone",
          "Device and location information",
          "Document hash and integrity verification",
        ],
      },
      {
        kind: "paragraph",
        text: "These certificates allow third parties to independently verify signature authenticity without accessing your SignSig account.",
      },
      {
        kind: "labelled",
        label: "Disclaimer:",
        text: "SignSig does not provide legal advice on whether electronic signatures are enforceable for your particular transaction or jurisdiction. We recommend consulting legal counsel about signature requirements for high-stakes documents or regulated industries.",
      },
    ],
  },
  {
    heading: "7. INTELLECTUAL PROPERTY RIGHTS",
    blocks: [
      {
        kind: "labelled",
        label: "SignSig IP:",
        text: "All content, features, functionality, and materials in the Service (excluding User Content) are owned by SignSig or its licensors and protected by copyright, trademark, and other intellectual property laws.",
      },
      {
        kind: "paragraph",
        text: "You may not reproduce, distribute, modify, or create derivative works of SignSig's intellectual property without written permission.",
      },
      {
        kind: "labelled",
        label: "Your IP:",
        text: "You retain ownership of User Content and any custom configurations you create. However, you grant SignSig the limited license described in Section 5.",
      },
    ],
  },
  {
    heading: "8. SERVICE AVAILABILITY AND UPTIME",
    blocks: [
      {
        kind: "paragraph",
        text: 'SignSig is provided on an "as-is" basis. While we work to maintain high availability, we do not guarantee uninterrupted service.',
      },
      {
        kind: "labelled",
        label: "Scheduled Maintenance:",
        text: "We may perform maintenance on the Service at any time with or without advance notice. During maintenance, the Service may be unavailable.",
      },
      {
        kind: "labelled",
        label: "Unplanned Outages:",
        text: "In the event of unplanned outages, we will make reasonable efforts to restore service and notify users of the issue and expected resolution time.",
      },
    ],
  },
  {
    heading: "9. PAYMENTS AND BILLING",
    blocks: [
      {
        kind: "labelled",
        label: "Pricing:",
        text: "Pricing for the Service is available on our Pricing page and is subject to change with 30 days' notice.",
      },
      {
        kind: "labelled",
        label: "Billing:",
        text: "You authorize us to charge your payment method for the plan you select:",
      },
      {
        kind: "list",
        items: [
          "Monthly plans renew automatically each month on the same date your subscription started",
          "Annual plans renew automatically each year on the anniversary date",
          "You can cancel your subscription anytime before the next billing cycle",
        ],
      },
      {
        kind: "labelled",
        label: "Overages:",
        text: "If your usage exceeds plan limits, we may charge additional fees based on our overage pricing. We will notify you of overages before charging.",
      },
      {
        kind: "labelled",
        label: "Refunds:",
        text: "Refunds are not available except as required by law. If you cancel during a billing period, you will not receive a refund for that period.",
      },
    ],
  },
  {
    heading: "10. SUSPENSION AND TERMINATION",
    blocks: [
      {
        kind: "labelled",
        label: "Termination by You:",
        text: "You may cancel your account and terminate these Terms at any time by notifying us in writing. Termination does not relieve you of payment obligations for periods already invoiced.",
      },
      {
        kind: "labelled",
        label: "Termination by SignSig:",
        text: "We may suspend or terminate your account if:",
      },
      {
        kind: "list",
        items: [
          "You violate these Terms",
          "You engage in illegal activity or fraudulent conduct",
          "Your account is used to harm others",
          "You fail to pay invoiced amounts",
          "We are required to do so by law",
        ],
      },
      {
        kind: "paragraph",
        text: "Suspension may occur without notice if necessary to prevent harm or legal liability.",
      },
      {
        kind: "labelled",
        label: "Effect of Termination:",
        text: "Upon termination:",
      },
      {
        kind: "list",
        items: [
          "Your right to use the Service ends immediately",
          "You must stop all use of the Service",
          "SignSig may delete your User Content after a reasonable grace period",
          "You remain liable for all charges incurred",
        ],
      },
    ],
  },
  {
    heading: "11. WARRANTY DISCLAIMER",
    blocks: [
      {
        kind: "labelled",
        label: "AS-IS BASIS:",
        text: 'The Service is provided on an "as-is" and "as-available" basis without warranties of any kind, express or implied.',
      },
      {
        kind: "paragraph",
        text: "SignSig disclaims all warranties, including:",
      },
      {
        kind: "list",
        items: [
          "Merchantability",
          "Fitness for a particular purpose",
          "Non-infringement",
          "Accuracy, completeness, or reliability of the Service",
        ],
      },
      { kind: "paragraph", text: "SignSig does not warrant that:" },
      {
        kind: "list",
        items: [
          "The Service will be uninterrupted or error-free",
          "Defects will be corrected",
          "The Service is free of viruses or harmful components",
          "Any particular result will be achieved",
        ],
      },
    ],
  },
  {
    heading: "12. LIMITATION OF LIABILITY",
    blocks: [
      {
        kind: "labelled",
        label: "Excluded Damages:",
        text: "To the fullest extent permitted by law, SignSig is not liable for:",
      },
      {
        kind: "list",
        items: [
          "Indirect, incidental, special, consequential, or punitive damages",
          "Loss of data, profits, revenue, business opportunity, or reputation",
          "Damages arising from your use or inability to use the Service",
        ],
      },
      {
        kind: "labelled",
        label: "Liability Cap:",
        text: "SignSig's total liability for any claim arising under these Terms shall not exceed the amount you paid to SignSig in the 12 months immediately preceding the claim.",
      },
      {
        kind: "labelled",
        label: "Exceptions:",
        text: "These limitations do not apply to:",
      },
      {
        kind: "list",
        items: [
          "Either party's indemnification obligations",
          "Breach of confidentiality",
          "Infringement of intellectual property rights",
          "Fraud or willful misconduct",
          "Death or personal injury caused by negligence",
        ],
      },
    ],
  },
  {
    heading: "13. INDEMNIFICATION",
    blocks: [
      {
        kind: "paragraph",
        text: "You agree to defend, indemnify, and hold harmless SignSig from any claims, damages, losses, or expenses (including attorney fees) arising from:",
      },
      {
        kind: "list",
        items: [
          "Your use of the Service",
          "Your violation of these Terms",
          "Your infringement of third-party rights",
          "Your User Content",
          "Your digital signatures or documents",
          "Your conduct or activities on the Service",
        ],
      },
    ],
  },
  {
    heading: "14. CONFIDENTIALITY",
    blocks: [
      {
        kind: "paragraph",
        text: "Each party agrees to maintain the confidentiality of the other party's confidential information and use it only to fulfill obligations under these Terms. This obligation does not apply to information that is:",
      },
      {
        kind: "list",
        items: [
          "Publicly available",
          "Rightfully known before disclosure",
          "Independently developed",
          "Required to be disclosed by law",
        ],
      },
    ],
  },
  {
    heading: "15. DATA RETENTION AND DELETION",
    blocks: [
      {
        kind: "labelled",
        label: "Active Accounts:",
        text: "While your account is active, we retain your User Content as long as you maintain your subscription.",
      },
      {
        kind: "labelled",
        label: "Suspended Accounts:",
        text: "If your account is suspended, we retain User Content for 90 days, after which it may be deleted.",
      },
      {
        kind: "labelled",
        label: "Deleted Accounts:",
        text: "If you request account deletion, we will delete your User Content within 30 days. Some data may be retained in backups for a limited period for recovery purposes.",
      },
      {
        kind: "labelled",
        label: "Legal Holds:",
        text: "If we receive a legal request (subpoena, court order, etc.), we may retain data longer than normal deletion schedules.",
      },
    ],
  },
  {
    heading: "16. GOVERNING LAW AND JURISDICTION",
    blocks: [
      {
        kind: "paragraph",
        text: "These Terms are governed by the laws of the State of Delaware, without regard to conflict of laws principles. You agree to submit to the exclusive jurisdiction of the state and federal courts located in Delaware.",
      },
    ],
  },
  {
    heading: "17. DISPUTE RESOLUTION",
    blocks: [
      {
        kind: "paragraph",
        text: "Before filing a lawsuit, you agree to attempt to resolve disputes through good-faith negotiation. If negotiation fails, you may pursue claims in the courts specified in Section 16.",
      },
    ],
  },
  {
    heading: "18. CONTACT INFORMATION",
    blocks: [
      {
        kind: "paragraph",
        text: "For questions about these Terms, contact:",
      },
      {
        kind: "labelled",
        label: "SignSig Legal Team, SignSig, Inc.",
        text: "Email: legal@signsig.com",
      },
    ],
  },
  {
    heading: "19. ENTIRE AGREEMENT",
    blocks: [
      {
        kind: "paragraph",
        text: "These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and SignSig regarding the Service and supersede all prior agreements.",
      },
    ],
  },
];
