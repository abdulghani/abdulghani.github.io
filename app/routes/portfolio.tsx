import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

import type { Route } from "./+types/portfolio";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { projects } from "~/data/projects";
import { en } from "~/i18n/content/en";
import { useContent } from "~/i18n/use-content";
import { useDocumentMeta } from "~/i18n/use-document-meta";

export function meta(_: Route.MetaArgs) {
  return [
    { title: en.meta.portfolio.title },
    { name: "description", content: en.meta.portfolio.description },
  ];
}

export default function Portfolio() {
  const { t } = useContent();
  useDocumentMeta(t.meta.portfolio.title, t.meta.portfolio.description);

  return (
    <PageShell>
      <section className="pb-14">
        <SectionHeading title={t.portfolio.title} meta={t.portfolio.meta(projects.length)} />

        <p className="mb-8 text-xl leading-[1.55] text-balance">
          {t.portfolio.intro.before}
          <Link to="/#work" className="text-primary underline-offset-4 hover:underline">
            {t.portfolio.intro.link}
          </Link>
          {t.portfolio.intro.after}
        </p>

        <ul className="flex flex-col gap-4">
          {projects.map((project) => {
            const copy = t.projects[project.slug];
            return (
              <li key={project.slug}>
                <Link
                  to={project.href}
                  className="group block overflow-hidden rounded-sm border bg-card transition-colors hover:bg-accent"
                >
                  <img
                    src={project.thumbnail}
                    alt={copy.thumbnailAlt}
                    width={960}
                    height={720}
                    loading="lazy"
                    className="aspect-[4/3] w-full border-b object-cover sm:aspect-[16/9] sm:object-top"
                  />

                  <div className="px-5 py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                        {copy.name}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="ml-1 inline size-4 -translate-y-0.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1"
                        />
                      </h3>
                      <p className="font-mono text-[0.68rem] tracking-[0.09em] text-muted-foreground uppercase">
                        {project.year}
                      </p>
                    </div>

                    <p className="mt-0.5 font-mono text-sm text-muted-foreground">
                      {t.portfolio.role}
                    </p>
                    <p className="mt-3 text-[0.98rem] leading-relaxed">{copy.summary}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      <Badge className="rounded-sm font-mono text-[0.66rem] tracking-[0.05em]">
                        {t.portfolio.kind}
                      </Badge>
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
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </PageShell>
  );
}
