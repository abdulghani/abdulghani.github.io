import { SectionHeading } from "~/components/section-heading";
import { Separator } from "~/components/ui/separator";
import { contacts, education, profile } from "~/data/resume";

export function Education() {
  return (
    <section id="education" className="scroll-mt-8 pb-4">
      <SectionHeading title="Education" meta="2014 — 2019" />

      <div className="border-l-2 border-primary py-0.5 pl-4">
        <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
          {education.degree}
        </h3>
        <p className="text-[0.95rem] text-muted-foreground">
          <a
            href={education.schoolUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            {education.school}
          </a>
          , {education.place} · {education.period}
          <br />
          {education.note}
        </p>
      </div>

      <Separator className="mt-10" />
      <footer className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pt-5 font-mono text-xs text-muted-foreground">
        <span>
          {profile.location} · {profile.timezone}
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {contact.label}
            </a>
          ))}
        </span>
      </footer>
    </section>
  );
}
