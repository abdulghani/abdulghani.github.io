import { Separator } from "~/components/ui/separator";

export function SectionHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="label">{title}</h2>
        <p className="label text-primary">{meta}</p>
      </div>
      <Separator />
    </div>
  );
}
