import { SectionHeading } from "~/components/section-heading";
import { Card } from "~/components/ui/card";
import { useContent } from "~/i18n/use-content";

export function Stack() {
  const { t } = useContent();

  return (
    <section id="stack" className="scroll-mt-8 pb-14">
      <SectionHeading title={t.headings.stack.title} meta={t.headings.stack.meta} />

      <div className="grid gap-px overflow-hidden rounded-sm border bg-border">
        {t.stack.map((row) => (
          <Card
            key={row.area}
            className="grid grid-cols-1 gap-1 rounded-none border-0 px-4 py-4 shadow-none sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
          >
            <h3 className="label pt-0.5 font-medium">{row.area}</h3>
            <p className="text-[0.95rem] leading-relaxed">
              <span className="font-display font-semibold tracking-[-0.01em]">{row.lead}</span>{" "}
              {row.detail}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
