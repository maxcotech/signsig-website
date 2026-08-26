import type { Role } from "@/features/careers/careers.data";

function BulletSection({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
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
 * Skills, Nice to Have.
 *
 * Roles with no published `detail` fall back to their meta plus an honest
 * note. Extracted from the route so `[role]/page.tsx` stays a composition
 * rather than an implementation — and so it clears the 150-line ceiling.
 */
export function RoleDescription({ role }: { role: Role }) {
  const { detail } = role;

  if (!detail) {
    return (
      <p className="mt-6 text-body-sm text-muted-foreground">
        {role.location} &bull; {role.employmentType}
        {role.salaryRange ? ` • ${role.salaryRange}` : ""}. The full description
        for this role isn&rsquo;t published yet — you can still apply and
        we&rsquo;ll send you the details.
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
        <p className="mt-3 text-body-sm text-foreground">{detail.about}</p>
      </section>

      <BulletSection
        title="Key Responsibilities:"
        items={detail.responsibilities}
      />
      <BulletSection title="Required Skills:" items={detail.requiredSkills} />
      <BulletSection title="Nice to Have:" items={detail.niceToHave} />
    </>
  );
}
