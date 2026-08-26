import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DEPARTMENTS,
  rolesInDepartment,
  type Role,
} from "@/features/careers/careers.data";

function RoleRow({ role }: { role: Role }) {
  return (
    <Link
      href={`/resources/careers/${role.slug}`}
      className="group flex card-lift animate-in-view items-center justify-between gap-4 rounded-xl bg-card p-6 shadow-card"
    >
      <span className="flex flex-col gap-2">
        <span className="text-h5 text-foreground">{role.title}</span>
        {/* The design dot-separates these. The bullets are decorative, so they
            are aria-hidden and the values read as a plain list instead. */}
        {/* Salary is optional: only two roles carry a figure. The separator
            is rendered with the value so a missing salary cannot leave a
            dangling bullet. */}
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-muted-foreground">
          <span>{role.location}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{role.employmentType}</span>
          {role.salaryRange && (
            <>
              <span aria-hidden="true">&bull;</span>
              <span>{role.salaryRange}</span>
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
 * Departments as an accordion, each listing its open roles.
 *
 * Engineering is open by default because it is the only department with roles
 * — opening an empty section first would look broken. `type="multiple"` so a
 * visitor can compare departments without one collapsing the other.
 *
 * Departments with no openings state that plainly rather than expanding to
 * nothing. The counts come from the data, never a fixed number — see
 * careers.data.ts for why that matters on this page.
 */
export function DepartmentAccordion() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["engineering"]}
      className="mx-auto max-w-cards"
    >
      {DEPARTMENTS.map((department) => {
        const roles = rolesInDepartment(department.id);
        return (
          <AccordionItem key={department.id} value={department.id}>
            <AccordionTrigger className="text-h5 text-foreground hover:no-underline">
              {department.label}
            </AccordionTrigger>
            <AccordionContent>
              {roles.length > 0 ? (
                <ul className="flex flex-col gap-4 py-2">
                  {roles.map((role) => (
                    <li key={role.slug}>
                      <RoleRow role={role} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-2 text-body-sm text-muted-foreground">
                  No open roles in {department.label} right now.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
