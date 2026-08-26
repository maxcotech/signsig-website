import type { ReactNode } from "react";

import { ChevronDownIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Label + control wrapper for the application form.
 *
 * The design prints a literal `*` after required labels. That asterisk is
 * decorative — `required` on the control is what actually conveys the
 * requirement — so it is `aria-hidden` and the field gets a real `required`
 * attribute instead of relying on punctuation.
 */
export function Field({
  label,
  htmlFor,
  required,
  help,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  /**
   * Hint below the control. Gets `id="<htmlFor>-help"` so the control can
   * reference it with `aria-describedby` — pass that at the call site, or the
   * hint is visible but unannounced.
   */
  help?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="text-body-sm text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="text-muted-foreground">
            {" *"}
          </span>
        )}
      </Label>
      {children}
      {help && (
        <p
          id={`${htmlFor}-help`}
          className="text-caption text-muted-foreground"
        >
          {help}
        </p>
      )}
    </div>
  );
}

/** A text input sized for this form. */
export function TextField({
  id,
  value,
  onChange,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "id">) {
  return (
    <Input
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-13 rounded-lg text-body-sm"
      {...rest}
    />
  );
}

/**
 * A native `<select>`, styled to match the design.
 *
 * Native rather than a Radix combobox on purpose: it is fully accessible with
 * no extra client JS, uses the platform picker on mobile (much better for a
 * 200-entry country list), and degrades gracefully. `appearance-none` plus an
 * overlaid chevron gives the design's look.
 *
 * The design omits the chevron on "Notice Period" while every other select has
 * one — read as an oversight, so all selects get one. A dropdown with no
 * affordance does not read as a dropdown.
 */
export function SelectField({
  id,
  value,
  onChange,
  placeholder,
  options,
  required,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-13 w-full appearance-none rounded-lg border border-input bg-background pr-10 pl-4 text-body-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          value === "" ? "text-muted-foreground" : "text-foreground",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-foreground"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
