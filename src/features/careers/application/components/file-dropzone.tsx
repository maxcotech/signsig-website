"use client";

import { useId, useRef, useState } from "react";

import { PaperclipIcon } from "lucide-react";

import { RESUME_RULES } from "@/features/careers/application/application.data";
import { cn } from "@/lib/utils";

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * A drop-or-browse file field with the design's empty and filled states.
 *
 * The visible control is a real `<input type="file">` wrapped in a `<label>`,
 * not a div with a click handler — so it is keyboard focusable, works with
 * assistive tech, and opens the picker on Enter/Space for free. Drag-and-drop
 * is added on top of that rather than replacing it.
 *
 * Size and extension are checked here because the UI promises "Max Size: 5MB"
 * and "PDF, DOCX": a field that states a limit and then accepts a 40MB .zip
 * has lied to the user. The error is rendered inline and announced.
 *
 * The `File` is held in form state until submit — see
 * careers-application.api.ts for how it's sent.
 */
export function FileDropzone({
  label,
  prompt,
  file,
  onFile,
  required,
}: {
  label: string;
  /** Dropzone copy. Differs per field in the content document. */
  prompt: string;
  file: File | null;
  onFile: (file: File | null) => void;
  required?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function accept(candidate: File | undefined) {
    if (!candidate) return;
    const name = candidate.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
      setError("That file type isn't accepted. Use a PDF or DOCX.");
      return;
    }
    if (candidate.size > RESUME_RULES.maxBytes) {
      setError(`That file is ${formatSize(candidate.size)}. The limit is 5MB.`);
      return;
    }
    setError(null);
    onFile(candidate);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-sm text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="text-muted-foreground">
            {" *"}
          </span>
        )}
      </span>

      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          accept(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition-colors duration-fast",
          isOver ? "border-primary bg-primary-subtle" : "border-border",
        )}
      >
        <PaperclipIcon
          className="size-5 text-muted-foreground"
          aria-hidden="true"
        />

        {file ? (
          <>
            <span className="text-body-sm text-foreground">{file.name}</span>
            <span className="text-body-sm text-muted-foreground">
              {formatSize(file.size)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
              className="min-h-11 rounded-lg px-3 text-body-sm font-medium text-primary-text hover:bg-primary-subtle"
            >
              Replace
              <span className="sr-only"> {label}</span>
            </button>
          </>
        ) : (
          <>
            <span className="text-body-sm text-muted-foreground">
              {RESUME_RULES.maxSizeLabel}
            </span>
            <span className="text-body-sm text-muted-foreground">{prompt}</span>
            <span className="text-body-sm text-muted-foreground">
              {RESUME_RULES.formatsLabel}
            </span>
          </>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={RESUME_RULES.accept}
          required={required && !file}
          onChange={(e) => accept(e.target.files?.[0])}
          className="sr-only"
        />
      </label>

      {error && (
        <p role="alert" className="text-body-sm text-destructive-text">
          {error}
        </p>
      )}
    </div>
  );
}
