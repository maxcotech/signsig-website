import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatSalaryRange, roleSlug } from "@/features/careers/careers.api";
import type {
  JobCategory,
  JobRoleListItem,
} from "@/features/careers/careers.types";

function RoleRow({ role }: { role: JobRoleListItem }) {
  const salary = formatSalaryRange(role);

  return (
    <Link
      href={`/resources/careers/${roleSlug(role.title)}`}
      className="group flex card-lift animate-in-view items-center justify-between gap-4 rounded-xl bg-card p-6 shadow-card"
    >
      <span className="flex flex-col gap-2">
        <span className="text-h5 text-foreground">{role.title}</span>
        {/* The design dot-separates these. The bullets are decorative, so they
            are aria-hidden and the values read as a plain list instead.
            Salary is optional — the separator renders with the value so a
            missing salary cannot leave a dangling bullet. */}
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-muted-foreground">
          <span>{role.location}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{role.employmentTypeText}</span>
          {salary && (
            <>
              <span aria-hidden="true">&bull;</span>
              <span>{salary}</span>
            </>
          )}
        </span>
      </span>
      <ChevronRightIcon
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-fast group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

/**
 * Categories as an accordion, each listing its open roles.
 *
 * Categories come from GET /Careers/Roles (`categories[]`, live) — not the
 * old fixed seven-department list. The first category with roles opens by
 * default; opening an empty section first would look broken. `type="multiple"`
 * so a visitor can compare categories without one collapsing the other.
 *
 * Categories with no openings state that plainly rather than expanding to
 * nothing. `roleCount` and the empty-state branch both come from the API's
 * own data, never a fixed number.
 */
export function DepartmentAccordion({
  categories,
}: {
  categories: readonly JobCategory[];
}) {
  const firstOpen = categories.find((c) => c.roleCount > 0)?.id;

  return (
    <Accordion
      type="multiple"
      defaultValue={firstOpen != null ? [String(firstOpen)] : []}
      className="mx-auto max-w-cards"
    >
      {categories.map((category) => {
        const roles = category.roles ?? [];
        const value = String(category.id);
        return (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-h5 text-foreground hover:no-underline">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              {roles.length > 0 ? (
                <ul className="flex flex-col gap-4 py-2">
                  {roles.map((role) => (
                    <li key={role.id}>
                      <RoleRow role={role} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-2 text-body-sm text-muted-foreground">
                  No open roles in {category.name} right now.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
