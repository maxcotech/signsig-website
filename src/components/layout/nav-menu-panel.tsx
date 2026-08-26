import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { NavColumn } from "@/config/navigation";

/**
 * The column grid inside a header mega-menu ("Solutions", "Developers",
 * "Download"). Columns without a `title` render as a plain list — the
 * "Developers" dropdown has no column headings in the design.
 */
export function NavMenuPanel({ columns }: { columns: readonly NavColumn[] }) {
  return (
    // `w-max` sizes the panel to its widest row so columns never squeeze into
    // each other; `max-w-menu` is viewport-aware (see --container-menu), so on
    // a narrow desktop the columns wrap instead of running off-screen.
    <div className="flex w-max max-w-menu flex-wrap gap-x-10 gap-y-6 p-6">
      {columns.map((column, index) => (
        <div key={column.title ?? index} className="flex flex-col">
          {column.title && (
            <span className="px-2 pb-2 text-body-sm font-semibold text-foreground">
              {column.title}
            </span>
          )}
          {column.items.map((item) => (
            <NavigationMenuLink key={item.href} asChild>
              <Link
                href={item.href}
                {...(item.isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="min-h-11 px-2 text-body-sm whitespace-nowrap text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      ))}
    </div>
  );
}
