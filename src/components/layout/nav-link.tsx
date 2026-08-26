"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * A primary-nav link that marks itself as current.
 *
 * A client component ONLY because it needs `usePathname()`. It is deliberately
 * the smallest possible leaf: `<Header>` stays a Server Component and the
 * whole nav tree does not get dragged into the client bundle. Do not lift
 * `"use client"` up to the header to "simplify" this.
 *
 * The design shows the active item in brand green — sampled off the pricing
 * page header and matching the `--primary` primitive exactly — while every
 * other item stays muted.
 *
 * `aria-current="page"` is what actually communicates this to assistive tech —
 * the colour alone would not, and colour is never the only signal we rely on.
 */
export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  // Exact match, or a section page under this path (/solutions/... is not
  // "current" for /pricing, but /pricing would be for a future /pricing/faq).
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition-colors duration-fast ease-standard",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
