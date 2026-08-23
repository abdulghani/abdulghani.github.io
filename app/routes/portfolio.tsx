import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

import type { Route } from "./+types/portfolio";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { projects } from "~/data/projects";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Work — Abdul Ghani" },
    {
      name: "description",
      content:
        "Selected work by Abdul Ghani: an interactive task-manager prototype plus case studies from bank API aggregation, GraphQL microservices and serverless retail platforms.",
    },
  ];
}

export default function Portfolio() {
  return (
    <PageShell>
      <section className="pb-14">
        <SectionHeading title="Work" meta={`${projects.length} projects`} />

        <p className="mb-8 text-xl leading-[1.55] text-balance">
          Backend systems I owned, and one front-end piece built to show what a static design looks
          like once every screen is wired to real state.
        </p>

        <ul className="flex flex-col gap-px overflow-hidden rounded-sm border bg-border">
          {projects.map((project) => {
            const body = (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                    {project.name}
                    {project.href && (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-1 inline size-4 -translate-y-0.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1"
                      />
                    )}
                  </h3>
                  <p className="font-mono text-[0.68rem] tracking-[0.09em] text-muted-foreground uppercase">
                    {project.year}
                  </p>
                </div>

                <p className="mt-0.5 font-mono text-sm text-muted-foreground">{project.role}</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed">{project.summary}</p>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <Badge
                    variant={project.href ? "default" : "outline"}
                    className="rounded-sm font-mono text-[0.66rem] tracking-[0.05em]"
                  >
                    {project.kind}
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
              </>
            );

            return (
              <li key={project.slug} className="bg-card">
                {project.href ? (
                  <Link
                    to={project.href}
                    className="group block px-5 py-5 transition-colors hover:bg-accent"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="px-5 py-5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Case studies describe production work under NDA — no public demo, happy to walk through
          the architecture.
        </p>
      </section>
    </PageShell>
  );
}
