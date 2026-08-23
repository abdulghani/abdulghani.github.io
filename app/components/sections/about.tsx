import { SectionHeading } from "~/components/section-heading";
import { Card } from "~/components/ui/card";
import { profile, stats } from "~/data/resume";

export function About() {
  return (
    <section id="about" className="scroll-mt-8 pb-14">
      <SectionHeading title="About" meta="2019 — present" />

      <p className="mb-5 text-xl leading-[1.55] text-balance">{profile.lede}</p>
      <div className="flex flex-col gap-4">
        {profile.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border bg-border md:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="gap-1.5 rounded-none border-0 px-4 py-3.5 shadow-none"
          >
            <dt className="label">{stat.label}</dt>
            <dd className="font-display text-2xl font-semibold tracking-[-0.02em] tabular-nums">
              {stat.value}
              <small className="font-mono text-xs font-normal tracking-normal text-muted-foreground">
                {stat.unit}
              </small>
            </dd>
          </Card>
        ))}
      </dl>
    </section>
  );
}
