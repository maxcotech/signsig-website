import { ROLE_DETAILS } from "@/features/careers/role-details.data";

/**
 * Careers — departments and open roles.
 *
 * Roles and descriptions come from the content document (2026-08-26), which
 * supersedes the design PNG on content. The design showed 2 roles under a
 * "149 Open roles" heading; the document lists 5 real openings. The count is
 * still DERIVED from `ROLES`, so the heading reads "Explore 5 Open roles" and
 * can never advertise openings that do not exist.
 *
 * ⚠ SALARY RANGES ARE FROM THE DESIGN, NOT THE DOCUMENT. The design showed
 * "₦1.8M - ₦2.5M" for Senior Backend Engineer and "₦800K - ₦1.2M" for Security
 * Engineer. The document gives no compensation for any role and its FAQ says
 * "Salaries are competitive and based on experience, location, and role."
 * Those two figures are kept because they were explicitly designed; the three
 * new roles have none, so their cards omit the field. Confirm before launch —
 * see docs/DECISIONS.md.
 *
 * ⚠ DEPARTMENTS ALSO DIFFER. The design's accordion lists seven departments;
 * the document assigns roles to Engineering, Product, Security and Customer
 * Success. The seven design departments are kept as the accordion structure
 * and the document's roles are mapped onto them.
 */

export type DepartmentId =
  | "engineering"
  | "design"
  | "sales"
  | "risk-compliance"
  | "legal"
  | "finance-accounting"
  | "it-security";

/** Departments in the order the design lists them. */
export const DEPARTMENTS: ReadonlyArray<{ id: DepartmentId; label: string }> = [
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "sales", label: "Sales" },
  { id: "risk-compliance", label: "Risk & Compliance" },
  { id: "legal", label: "Legal" },
  { id: "finance-accounting", label: "Finance & Accounting" },
  { id: "it-security", label: "IT & Security" },
];

export type RoleDetail = {
  about: string;
  responsibilities: readonly string[];
  requiredSkills: readonly string[];
  niceToHave: readonly string[];
};

export type Role = {
  slug: string;
  title: string;
  department: DepartmentId;
  location: string;
  employmentType: string;
  /** Undefined where the document gives no figure. */
  salaryRange?: string;
  /** Experience level, e.g. "5+ years backend development". */
  experienceLevel: string;
  detail?: RoleDetail;
};

export const ROLES: readonly Role[] = [
  {
    slug: "senior-backend-engineer",
    title: "Senior Backend Engineer",
    department: "engineering",
    location: "Remote (US-friendly time zone preferred)",
    employmentType: "Full-time",
    salaryRange: "₦1.8M - ₦2.5M",
    experienceLevel: "5+ years backend development",
    detail: ROLE_DETAILS["senior-backend-engineer"],
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    department: "it-security",
    location: "Remote (US-friendly time zone preferred)",
    employmentType: "Contract",
    salaryRange: "₦800K - ₦1.2M",
    experienceLevel: "4+ years security engineering",
    detail: ROLE_DETAILS["security-engineer"],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    department: "design",
    location: "Remote (Europe-friendly time zone preferred)",
    employmentType: "Full-time",
    experienceLevel: "3+ years product management",
    detail: ROLE_DETAILS["product-manager"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "engineering",
    location: "Remote (US-friendly time zone preferred)",
    employmentType: "Full-time",
    experienceLevel: "3+ years DevOps/infrastructure",
    detail: ROLE_DETAILS["devops-engineer"],
  },
  {
    slug: "customer-support-specialist",
    title: "Customer Support Specialist",
    department: "sales",
    location: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "2+ years customer support",
    detail: ROLE_DETAILS["customer-support-specialist"],
  },
] as const;

export function findRole(slug: string): Role | undefined {
  return ROLES.find((role) => role.slug === slug);
}

export function rolesInDepartment(id: DepartmentId): readonly Role[] {
  return ROLES.filter((role) => role.department === id);
}

/** "Explore 5 Open roles" / "Explore 1 Open role". Never a hardcoded count. */
export function openRolesLabel(): string {
  const count = ROLES.length;
  return `Explore ${count} Open ${count === 1 ? "role" : "roles"}`;
}
