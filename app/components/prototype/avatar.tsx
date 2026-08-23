import { cn } from "~/lib/utils";
import { initials, people } from "./task-store";

const SIZES = {
  sm: "size-6 text-[0.6rem]",
  md: "size-8 text-[0.7rem]",
  lg: "size-10 text-xs",
};

export function Avatar({
  personId,
  size = "md",
  className,
}: {
  personId: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const person = people.find((item) => item.id === personId);
  if (!person) return null;

  return (
    <span
      title={person.name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide",
        person.tone,
        SIZES[size],
        className,
      )}
    >
      {initials(person.name)}
    </span>
  );
}
