"use client";

import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  CONSENT,
  RESUME_RULES,
} from "@/features/careers/application/application.data";
import { CoverLetterField } from "@/features/careers/application/components/cover-letter-field";
import { FileDropzone } from "@/features/careers/application/components/file-dropzone";
import type { ApplicationDraft } from "@/features/careers/application/types";

/**
 * Step 4 — Documents & Consent.
 *
 * Résumé is required, cover letter optional, exactly as the design labels
 * them — plus the content document's write-it-inline alternative to uploading
 * a cover letter. Both consent boxes are `required`: the copy promises storage
 * of personal data, so proceeding without explicit agreement would be
 * collecting PII without consent — not merely an unchecked box.
 */
export function StepDocuments({
  draft,
  update,
}: {
  draft: ApplicationDraft;
  update: (patch: Partial<ApplicationDraft>) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-body font-semibold text-foreground">Documents</h2>

        <FileDropzone
          label="Resume / CV"
          prompt={RESUME_RULES.resumePrompt}
          required
          file={draft.resume}
          onFile={(resume) => update({ resume })}
        />
        <CoverLetterField
          file={draft.coverLetter}
          onFile={(coverLetter) => update({ coverLetter })}
          text={draft.coverLetterText}
          onText={(coverLetterText) => update({ coverLetterText })}
        />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-body font-semibold text-foreground">
          Candidate Consent
        </h2>

        <p className="text-body-sm text-foreground">{CONSENT.intro}</p>

        <div className="flex items-start gap-3">
          <Checkbox
            id="consentStore"
            checked={draft.consentStore}
            onCheckedChange={(checked) =>
              update({ consentStore: checked === true })
            }
            required
            className="mt-0.5"
          />
          <Label
            htmlFor="consentStore"
            className="text-body-sm leading-relaxed text-foreground"
          >
            {CONSENT.store}
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="consentPrivacy"
            checked={draft.consentPrivacy}
            onCheckedChange={(checked) =>
              update({ consentPrivacy: checked === true })
            }
            required
            className="mt-0.5"
          />
          <Label
            htmlFor="consentPrivacy"
            className="text-body-sm leading-relaxed text-foreground"
          >
            {CONSENT.privacyBefore}
            <Link
              href="/privacy"
              className="text-primary-text underline underline-offset-4"
            >
              {CONSENT.privacyLink}
            </Link>
            {CONSENT.privacyAfter}
          </Label>
        </div>
      </div>
    </div>
  );
}
