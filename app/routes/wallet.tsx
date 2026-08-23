import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

import type { Route } from "./+types/wallet";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { WalletApp } from "~/components/prototype/wallet/wallet-app";
import { findProject } from "~/data/projects";

const project = findProject("wallet")!;

const NOTES = [
  {
    title: "Money that actually moves",
    body: "Paying a card debits chequing, writes an entry into recent activity and flips the button to Paid. The balance at the top is the sum of the accounts, so every action reconciles instead of being decoration.",
  },
  {
    title: "One switch, felt everywhere",
    body: "Hide balances in Settings and every amount in the app masks — balance, cards, accounts, activity, prices. It is the cheapest way to show that these screens read from one store rather than their own copies.",
  },
  {
    title: "A chart you can question",
    body: "The range chips rebuild the series, the growth percentage is derived from the balance behind it, and tapping a bar swaps the headline figure for that day's change.",
  },
];

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Wallet prototype — Abdul Ghani" },
    {
      name: "description",
      content:
        "An interactive rebuild of a mobile wallet design: card payments, account filtering, a portfolio-growth chart and a watch list, all driven by one reducer.",
    },
  ];
}

export default function WalletRoute() {
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
          A two-screen wallet design, rebuilt so the numbers hold together. Pay a card and the
          money leaves an account; freeze it and the payment is refused; hide balances and the
          whole app goes quiet.
        </p>
        <p className="mb-6 text-muted-foreground">
          Same device shell as the task manager — the difference is the palette and the data. It
          runs entirely in the browser, so a refresh restores the opening balances.
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
          <WalletApp />
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
          Original design: a wallet app concept shot. Rebuilt for practice — not affiliated with
          its author. Balances, prices and holdings are invented.
        </p>
      </section>
    </PageShell>
  );
}
