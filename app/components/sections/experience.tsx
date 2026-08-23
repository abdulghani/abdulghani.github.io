import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { roles, type Role } from "~/data/resume";

function Timeline({ role }: { role: Role }) {
  return (
    <article className="relative pb-10 last:pb-0">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-2 -left-[1.6rem] size-2.5 rounded-full border",
          role.current
            ? "border-ember bg-ember ring-4 ring-accent"
            : "border-primary bg-background",
        )}
      />

      <div className="mb-1 flex flex-wrap items-center gap-2">
        <p className="font-mono text-[0.68rem] tracking-[0.09em] uppercase text-muted-foreground">
          {role.period}
        </p>
        <Badge
          variant="outline"
          className="border-border font-mono text-[0.6rem] tracking-wide text-primary uppercase"
        >
          {role.mode}
        </Badge>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-balance">
        {role.title}
      </h3>
      <p className="mb-3 font-mono text-sm text-muted-foreground">
        <a
          href={role.companyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {role.company}
        </a>{" "}
        · {role.location}
      </p>

      <p className="mb-4 text-[0.98rem] text-muted-foreground">{role.brief}</p>

      <ul className="flex flex-col gap-2.5">
        {role.highlights.map((highlight) => (
          <li key={highlight.lead} className="relative pl-4.5 text-[0.98rem] leading-relaxed">
            <span
              aria-hidden="true"
              className="absolute top-[0.62em] left-0 h-px w-[0.42rem] bg-primary"
            />
            <b className="font-display text-[0.95rem] font-semibold tracking-[-0.01em]">
              {highlight.lead}
            </b>{" "}
            {highlight.detail}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {role.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-sm bg-card font-mono text-[0.66rem] tracking-[0.05em] text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="work" className="scroll-mt-8 pb-14">
      <SectionHeading title="Experience" meta={`${roles.length} roles`} />

      <div className="relative pl-7">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-1.5 left-[0.31rem] w-px bg-border"
        />
        {roles.map((role) => (
          <Timeline key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
