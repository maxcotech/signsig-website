/**
 * The 8-card "Purposefully Built To Replace Manual Paperwork" grid.
 * Copy transcribed verbatim from the design.
 *
 * `image` is the card's illustration. The illustrations are product mockups
 * that restate the adjacent title and description, so they carry `alt=""` —
 * see docs/DECISIONS.md.
 *
 * ⚠ THE ILLUSTRATIONS ARE NOT ALL THE SAME SIZE. They were exported cropped
 * tight to their artwork, so their intrinsic ratios run from 1.29
 * (document-signing, 804x622) to 3.24 (workflow-automation, 880x272) — a 2.5x
 * spread. The stage below is what makes the cards line up; see FEATURE_STAGE.
 */
export type FeatureCardData = {
  id: string;
  title: string;
  description: string;
  /** Filename inside /images/home/. Sizes vary — see FEATURE_STAGE. */
  image: string;
};

/**
 * The illustration STAGE — the fixed box every card image is fitted into.
 * NOT the images' intrinsic size; they all differ.
 *
 * Measured off Home.png: the stage is 1112x454 at the design's 2560px export
 * scale (625.5x255.4 css), and 454 recurs exactly on all three grid rows. The
 * previous value here said 467 and, worse, was passed to next/image as though
 * it were each file's real size — so the rendered height came from the file's
 * own ratio instead and every card ended up a different height.
 */
export const FEATURE_STAGE = { width: 1112, height: 454 } as const;

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
