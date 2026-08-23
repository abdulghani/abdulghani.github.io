import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { roles, type RoleMeta } from "~/data/resume";
import { useContent } from "~/i18n/use-content";
import type { Content } from "~/i18n/content/en";

type RoleCopy = Content["roles"][keyof Content["roles"]];

function Timeline({ role, copy, mode }: { role: RoleMeta; copy: RoleCopy; mode: string }) {
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
          {copy.period}
        </p>
        <Badge
          variant="outline"
          className="border-border font-mono text-[0.6rem] tracking-wide text-primary uppercase"
        >
          {mode}
        </Badge>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-balance">
        {copy.title}
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
        · {copy.location}
      </p>

      <p className="mb-4 text-[0.98rem] text-muted-foreground">{copy.brief}</p>

      <ul className="flex flex-col gap-2.5">
        {copy.highlights.map((highlight) => (
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
  const { t } = useContent();

  return (
    <section id="work" className="scroll-mt-8 pb-14">
      <SectionHeading title={t.headings.work.title} meta={t.headings.work.meta(roles.length)} />

      <div className="relative pl-7">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-1.5 left-[0.31rem] w-px bg-border"
        />
        {roles.map((role) => (
          <Timeline
            key={role.id}
            role={role}
            copy={t.roles[role.id as keyof Content["roles"]]}
            mode={t.modes[role.mode]}
          />
        ))}
      </div>
    </section>
  );
}
