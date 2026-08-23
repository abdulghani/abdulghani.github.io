import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

import type { Route } from "./+types/finance";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { FinanceApp } from "~/components/prototype/finance/finance-app";
import { findProject } from "~/data/projects";

const project = findProject("finance")!;

const NOTES = [
  {
    title: "The chart is an input, not a picture",
    body: "Four months, two series, drawn as inline SVG. Tapping a month moves the marker and rewrites the Total Spend headline, the income tile and the expense tile beneath it.",
  },
  {
    title: "Pausing a plan is felt three screens away",
    body: "Subscriptions are added on top of each month's base figures, so pausing Adobe drops total spend and expense on Home, lowers upcoming bills, and turns up as paused savings in the Target stats.",
  },
  {
    title: "A goal that can actually be met",
    body: "Adding to savings moves the percentage left, the milestone dots, the per-day figure and the streak banner together, and writes the transfer into the transaction list.",
  },
];

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Finance prototype — Abdul Ghani" },
    {
      name: "description",
      content:
        "An interactive rebuild of a personal-finance app design: a selectable spend chart, subscriptions you can pause, account-filtered transactions and a savings target that responds.",
    },
  ];
}

export default function FinanceRoute() {
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
          A four-screen finance design, rebuilt so the figures answer to each other. Pick a month
          on the chart, pause a subscription, or put money against the savings target and watch the
          rest of the app move.
        </p>
        <p className="mb-6 text-muted-foreground">
          Third port on the same device shell — only the palette and the data differ. Everything
          runs in the browser, so a refresh restores the opening month.
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
          <FinanceApp />
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
          Original design: a personal-finance app concept shot. Rebuilt for practice — not
          affiliated with its author. Balances, merchants and plans are invented.
        </p>
      </section>
    </PageShell>
  );
}
