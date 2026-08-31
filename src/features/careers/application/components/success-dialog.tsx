"use client";

import Link from "next/link";
import { SendIcon } from "lucide-react";

import { ActionButton } from "@/components/common/action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * "Thank you for applying!" — copy transcribed verbatim from the design.
 *
 * ⚠ `<ApplicationForm>` only sets its `submitted` flag (what opens this) after
 * `useSubmitApplication()`'s mutation genuinely resolves — see
 * careers-application.api.ts. A confirmation that appears without anything
 * having been sent would tell a candidate they had applied when they had
 * not. Do not open it optimistically or "for testing" in committed code.
 */
export function SuccessDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-2xl text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <SendIcon className="size-8 text-primary" aria-hidden="true" />
          <DialogTitle className="text-h5 text-foreground">
            Thank you for applying!
          </DialogTitle>
          <DialogDescription className="text-body text-muted-foreground">
            Your application has been received. We&rsquo;ll review it and be in
            touch within two weeks if there&rsquo;s a good fit. In the meantime,
            feel free to explore our blog or documentation.
          </DialogDescription>
          <ActionButton asChild size="lg" className="mt-2 w-full">
            <Link href="/resources/careers">Back to careers page</Link>
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
