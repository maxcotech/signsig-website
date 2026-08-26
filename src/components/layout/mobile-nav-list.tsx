import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MAIN_NAV, isNavMenuItem } from "@/config/navigation";

/**
 * The primary nav list inside the mobile Sheet. Menu items ("Solutions",
 * "Developers", "Download") expand in place via `<Accordion>` — a mega-menu
 * has no mobile equivalent, so each becomes a collapsible group with its
 * columns flattened, column titles rendered as subheadings.
 */
export function MobileNavList({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {MAIN_NAV.map((item) =>
        isNavMenuItem(item) ? (
          <li key={item.label}>
            <Accordion type="single" collapsible>
              <AccordionItem value={item.label} className="border-none">
                <AccordionTrigger className="rounded-lg px-3 text-body font-medium text-foreground hover:bg-muted hover:no-underline">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent className="pl-3">
                  {item.columns.map((column, index) => (
                    <div key={column.title ?? index} className="mb-3">
                      {column.title && (
                        <p className="px-3 py-1 text-caption font-semibold text-muted-foreground uppercase">
                          {column.title}
                        </p>
                      )}
                      <ul>
                        {column.items.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onNavigate}
                              {...(link.isExternal
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                              className="flex min-h-11 items-center rounded-lg px-3 text-body-sm text-foreground hover:bg-muted"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ) : (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex h-11 items-center rounded-lg px-3 text-body font-medium text-foreground transition-colors duration-fast hover:bg-muted"
            >
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
