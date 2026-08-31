import { formatSalaryRange } from "@/features/careers/careers.api";
import type { JobRoleDetail } from "@/features/careers/careers.types";

function BulletSection({
  title,
  items,
}: {
  title: string;
  items: readonly string[] | null;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section aria-labelledby={title} className="mt-8">
      <h2 id={title} className="text-body font-semibold text-foreground">
        {title}
      </h2>
      <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-body-sm text-foreground marker:text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A job posting's body: About the Role, Key Responsibilities, Required
 * Skills, Nice to Have — all from GET /Careers/Roles/{id}.
 *
 * Every field the API gives beyond the summary (location, employment type,
 * salary) is nullable, so a posting can genuinely have none of them filled
 * in yet. When `aboutTheRole` is missing, this falls back to the same meta +
 * honest-note treatment the old static data used for its undescribed roles —
 * a candidate can still apply either way.
 */
export function RoleDescription({ role }: { role: JobRoleDetail }) {
  const salary = formatSalaryRange(role);

  if (!role.aboutTheRole) {
    return (
      <p className="mt-6 text-body-sm text-muted-foreground">
        {role.location} &bull; {role.employmentTypeText}
        {salary ? ` • ${salary}` : ""}. The full description for this role
        isn&rsquo;t published yet — you can still apply and we&rsquo;ll send you
        the details.
      </p>
    );
  }

  return (
    <>
      <section aria-labelledby="about-the-role" className="mt-6">
        <h2
          id="about-the-role"
          className="text-body font-semibold text-foreground"
        >
          About the Role
        </h2>
        <p className="mt-3 text-body-sm text-foreground">{role.aboutTheRole}</p>
      </section>

      <BulletSection
        title="Key Responsibilities:"
        items={role.keyResponsibilities}
      />
      <BulletSection title="Required Skills:" items={role.requiredSkills} />
      <BulletSection title="Nice to Have:" items={role.niceToHave} />
    </>
  );
}
