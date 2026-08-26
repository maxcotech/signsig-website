import type { ReactNode } from "react";

import {
  BriefcaseIcon,
  ChartColumnIcon,
  Code2Icon,
  FileStackIcon,
  FileTextIcon,
  HandshakeIcon,
  HeartPulseIcon,
  HomeIcon,
  LandmarkIcon,
  ScaleIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

import type { SolutionIconName } from "@/features/solutions/types";

/**
 * Eyebrow glyph per Solutions page.
 *
 * ⚠ EVERY MAPPING HERE IS AN ASSUMPTION. The design was supplied as
 * low-resolution screenshots in which the eyebrow icons are ~12px tall; each
 * was matched to the nearest lucide equivalent by shape, not confirmed against
 * a source file. They are plausible, not verified. See docs/DECISIONS.md.
 */
export const SOLUTION_ICONS: Record<SolutionIconName, ReactNode> = {
  contract: <FileTextIcon className="size-full" />,
  people: <UsersIcon className="size-full" />,
  handshake: <HandshakeIcon className="size-full" />,
  scale: <ScaleIcon className="size-full" />,
  forms: <FileStackIcon className="size-full" />,
  wallet: <WalletIcon className="size-full" />,
  health: <HeartPulseIcon className="size-full" />,
  property: <HomeIcon className="size-full" />,
  landmark: <LandmarkIcon className="size-full" />,
  code: <Code2Icon className="size-full" />,
  briefcase: <BriefcaseIcon className="size-full" />,
  chart: <ChartColumnIcon className="size-full" />,
};
