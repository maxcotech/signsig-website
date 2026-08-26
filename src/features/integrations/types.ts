/**
 * Integration Hub types.
 *
 * All of these are declared in `src/content/integrations/types.ts` and
 * re-exported here. The content files must be typed without importing from
 * the feature that renders them (STRUCTURE.md §1.1), but consumers inside the
 * feature should not have to know that — so this stays the import path they
 * use.
 */

export type {
  GuideSample,
  GuideStep,
  Integration,
  IntegrationCategory,
  IntegrationEntry,
  IntegrationGuide,
} from "@/content/integrations/types";
