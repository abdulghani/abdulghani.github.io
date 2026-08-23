import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

import type { Route } from "./+types/task-manager";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { TaskApp } from "~/components/prototype/task-app";
import { findProject } from "~/data/projects";

const project = findProject("task-manager")!;

const NOTES = [
  {
    title: "One reducer, four screens",
    body: "Tasks, activity, the selected day and which sheet is open all live in a single reducer. Every screen reads the same state, so creating a task updates the planner, the boards view and the activity log at once.",
  },
  {
    title: "The design's flow, kept honest",
    body: "The three screens in the source design are a list, a detail view and a create sheet. The tab bar implied two more, so boards and activity are derived from the same data rather than faked with placeholder art.",
  },
  {
    title: "Interactive means operable",
    body: "Day chips, tabs, priority segments and subtask rows are real buttons with pressed state; the sheet is a labelled dialog that closes on Escape and refuses to save an untitled task.",
  },
];

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Task manager prototype — Abdul Ghani" },
    {
      name: "description",
      content:
        "An interactive rebuild of a mobile task-manager design: week planner, task detail with subtasks, and a working new-task sheet driven by a single reducer.",
    },
  ];
}

export default function TaskManager() {
  return (
    <PageShell wide>
      <section className="pb-14">
        <Link
          to="/portfolio"
          className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-3.5" />
          Work
        </Link>

        <SectionHeading title={project.name} meta={project.kind} />

        <p className="mb-4 text-xl leading-[1.55] text-balance">
          A three-screen mobile design, rebuilt as something you can actually use. Pick a day, open
          a task, tick subtasks off, or add a task and watch it appear everywhere it should.
        </p>
        <p className="mb-6 text-muted-foreground">
          Nothing here is a screenshot — the phone below is React state. It runs entirely in the
          browser, so a refresh puts it back to the seeded week.
        </p>

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

        <div className="my-8 flex justify-center">
          <TaskApp />
        </div>

        <h3 className="label mt-12 mb-3">Build notes</h3>
        <div className="grid gap-px overflow-hidden rounded-sm border bg-border">
          {NOTES.map((note) => (
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

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Original design: a task-manager concept shot. Rebuilt for practice — not affiliated with
          its author.
        </p>
      </section>
    </PageShell>
  );
}
