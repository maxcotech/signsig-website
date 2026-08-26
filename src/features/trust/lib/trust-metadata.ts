import type { Metadata } from "next";

import type { TrustPage } from "@/features/trust/trust.data";
import { buildMetadata } from "@/lib/seo";

/**
 * Metadata for a trust page.
 *
 * The description is the document's own headline rather than a generated
 * summary: it is one sentence, written to be read cold, which is exactly what
 * a search snippet is. No `noIndex` — every one of these pages has full copy,
 * and they are the pages a security reviewer searches for by name.
 */
export function trustMetadata(page: TrustPage): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.headline,
    path: page.path,
  });
}
