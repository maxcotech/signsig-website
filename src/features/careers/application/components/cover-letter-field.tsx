"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  RESUME_RULES,
  countWords,
} from "@/features/careers/application/application.data";
import { FileDropzone } from "@/features/careers/application/components/file-dropzone";
import { cn } from "@/lib/utils";

/**
 * Cover letter — upload a file *or* write one inline.
 *
 * The content document adds the textarea as an alternative to the design's
 * upload-only control. Both are optional, so neither is disabled when the
 * other is used: forcing a choice would mean a candidate who typed a draft
 * and then decided to attach a polished PDF has to clear the box first.
 * The endpoint takes whichever is filled — typed text is packaged into a
 * plain-text file before sending, since the real API has one binary
 * CoverLetter field and no separate text slot. See
 * careers-application.api.ts.
 */
export function CoverLetterField({
  file,
  onFile,
  text,
  onText,
}: {
  file: File | null;
  onFile: (file: File | null) => void;
  text: string;
  onText: (text: string) => void;
}) {
  const words = countWords(text);
  const limit = RESUME_RULES.coverLetterTextLimit;
  const over = words > limit;

  return (
    <div className="flex flex-col gap-3">
      <FileDropzone
        label="Cover Letter (Optional)"
        prompt={RESUME_RULES.coverLetterPrompt}
        file={file}
        onFile={onFile}
      />

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="coverLetterText"
          className="text-body-sm text-muted-foreground"
        >
          {RESUME_RULES.coverLetterTextHelp}
        </Label>
        <div className="relative">
          <Textarea
            id="coverLetterText"
            value={text}
            onChange={(event) => onText(event.target.value)}
            placeholder={RESUME_RULES.coverLetterTextPlaceholder}
            aria-describedby="coverLetterText-count"
            aria-invalid={over || undefined}
            className="min-h-32 rounded-lg pr-28 text-body-sm"
          />
          <span
            id="coverLetterText-count"
            aria-live="polite"
            className={cn(
              "pointer-events-none absolute top-3 right-4 text-body-sm",
              over ? "text-destructive-text" : "text-muted-foreground",
            )}
          >
            {words}/{limit} words
          </span>
        </div>
      </div>
    </div>
  );
}
