/**
 * The 8-card "Purposefully Built To Replace Manual Paperwork" grid.
 * Copy transcribed verbatim from the design.
 *
 * `image` is the card's illustration, extracted from the design at 1112x467
 * (see public/images/README.md). The illustrations are product mockups that
 * restate the adjacent title and description, so they carry `alt=""` — see
 * docs/DECISIONS.md.
 */
export type FeatureCardData = {
  id: string;
  title: string;
  description: string;
  /** Filename inside /images/home/. Every card image is 1112x467. */
  image: string;
};

/** Intrinsic size of every feature-card illustration, for next/image. */
export const FEATURE_IMAGE_SIZE = { width: 1112, height: 467 } as const;

export const FEATURE_CARDS: readonly FeatureCardData[] = [
  {
    id: "document-signing",
    title: "Document Signing",
    description:
      "Sign documents from any device. Each signature is timestamped, encrypted, and includes a tamper-proof audit trail.",
    image: "document-signing.png",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Set up sequential or parallel approval chains. Add reminders, and conditional logic so documents move through your team without manual follow-up.",
    image: "workflow-automation.png",
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    description:
      "Role-based access control, end-to-end encryption, and compliance with SOC 2, GDPR, and HIPAA. Every action is logged and verifiable.",
    image: "security-compliance.png",
  },
  {
    id: "audit-trails",
    title: "Audit Trails",
    description:
      "Track every view, signature, and change with immutable logs. Export timestamped records for legal disputes or compliance audits.",
    image: "audit-trails.png",
  },
  {
    id: "templates",
    title: "Templates",
    description:
      "Save NDAs, contracts, onboarding forms, and agreements as templates. Pre-fill fields, set signing order, and send in seconds.",
    image: "templates.png",
  },
  {
    id: "workspaces-collaboration",
    title: "Workspaces & Collaboration",
    description:
      "Organize documents by team, project, or client. Control permissions, track signing activity, and manage workflows from one dashboard.",
    image: "workspaces-collaboration.png",
  },
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Integrate with the apps your team already uses. Connect SignSig through REST APIs, webhooks, and pre-built SDKs for seamless document workflows.",
    image: "integrations.png",
  },
  {
    id: "personalized-deployment",
    title: "Personalized Deployment",
    description:
      "Deploy SignSig as SaaS, self-hosted on your servers, or in a hybrid setup. Keep sensitive documents on-premise while using cloud features.",
    image: "personalized-deployment.png",
  },
] as const;
