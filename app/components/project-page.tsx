import { Link } from "react-router";
import { ArrowUpRight, ChevronLeft } from "lucide-react";

import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { findProject } from "~/data/projects";
import type { ProjectSlug } from "~/data/projects";
import { useContent } from "~/i18n/use-content";
import { useDocumentMeta } from "~/i18n/use-document-meta";

/** Case-study frame shared by every prototype page. */
export function ProjectPage({
  slug,
  children,
}: {
  slug: ProjectSlug;
  children: React.ReactNode;
}) {
  const { t } = useContent();
  const project = findProject(slug);
  const copy = t.projects[slug];
  const kind = "kind" in copy ? copy.kind : t.portfolio.kind;

  useDocumentMeta(`${copy.name} — ${kind}`, copy.summary);

  return (
    <PageShell wide>
      <section className="pb-14">
        <Link
          to="/portfolio"
          className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-3.5" />
          {t.ui.backToWork}
        </Link>

        <SectionHeading title={copy.name} meta={kind} />

        <p className="mb-4 text-xl leading-[1.55] text-balance">{copy.lede}</p>
        <p className="mb-6 text-muted-foreground">{copy.sub}</p>

        {project.storeUrl && "storeLabel" in copy && (
          <a
            href={project.storeUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-[0.9rem] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {copy.storeLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="rounded-sm bg-card font-mono text-[0.66rem] tracking-[0.05em] text-muted-foreground"
            >
              {item}
            </Badge>
          ))}
        </div>

        <div className="my-8 flex justify-center">{children}</div>

        <h3 className="label mt-12 mb-3">{t.ui.buildNotes}</h3>
        <div className="grid gap-px overflow-hidden rounded-sm border bg-border">
          {copy.notes.map((note) => (
            <article key={note.title} className="bg-card px-5 py-4">
              <h4 className="font-display text-[1.05rem] font-semibold tracking-[-0.01em]">
                {note.title}
              </h4>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {note.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">{copy.attribution}</p>
      </section>
    </PageShell>
  );
}
