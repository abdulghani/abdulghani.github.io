import { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";

import { cn } from "~/lib/utils";
import { Avatar } from "../avatar";
import type { Action, Priority } from "../task-store";
import { people, week } from "../task-store";

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export function NewTaskSheet({
  defaultDay,
  dispatch,
}: {
  defaultDay: number;
  dispatch: React.Dispatch<Action>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState(defaultDay);
  const [estimate, setEstimate] = useState("3h");
  const [priority, setPriority] = useState<Priority>("Low");
  const [members, setMembers] = useState<string[]>(["dianne"]);
  const [pickingMembers, setPickingMembers] = useState(false);
  const [touched, setTouched] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") dispatch({ type: "compose", open: false });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  function submit() {
    if (!title.trim()) {
      setTouched(true);
      titleRef.current?.focus();
      return;
    }
    dispatch({
      type: "add-task",
      draft: {
        title: title.trim(),
        description: description.trim() || "No description yet.",
        priority,
        day,
        assignee: members[0] ?? "floyd",
        members: members.length > 0 ? members : ["floyd"],
      },
    });
  }

  const invalid = touched && !title.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="New task"
      className="absolute inset-0 z-20 flex flex-col bg-[var(--app-bg)] motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300"
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3 text-[0.95rem]">
        <button
          type="button"
          onClick={() => dispatch({ type: "compose", open: false })}
          className="text-[var(--app-accent)]"
        >
          Cancel
        </button>
        <h3 className="font-medium">New Task</h3>
        <button type="button" onClick={submit} className="font-medium text-[var(--app-accent)]">
          Done
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pb-8">
        <Field label="Title" htmlFor="task-title">
          <input
            id="task-title"
            ref={titleRef}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Website cover"
            aria-invalid={invalid}
            aria-describedby={invalid ? "task-title-error" : undefined}
            className={cn(
              "w-full rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-[0.95rem] placeholder:text-[var(--app-muted)]",
              invalid && "outline outline-2 outline-[#ff8a7a]",
            )}
          />
          {invalid && (
            <p id="task-title-error" className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
              Give the task a title before saving it.
            </p>
          )}
        </Field>

        <Field label="Description" htmlFor="task-description">
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter task description"
            rows={4}
            className="w-full resize-none rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-[0.95rem] placeholder:text-[var(--app-muted)]"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Due date" htmlFor="task-day">
            <div className="relative">
              <select
                id="task-day"
                value={day}
                onChange={(event) => setDay(Number(event.target.value))}
                className="w-full appearance-none rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-[0.95rem]"
              >
                {week.map((entry) => (
                  <option key={entry.day} value={entry.day}>
                    {entry.day} Feb
                  </option>
                ))}
              </select>
              <CalendarDays
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[var(--app-muted)]"
              />
            </div>
          </Field>

          <Field label="Estimate task" htmlFor="task-estimate">
            <div className="relative">
              <select
                id="task-estimate"
                value={estimate}
                onChange={(event) => setEstimate(event.target.value)}
                className="w-full appearance-none rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-[0.95rem]"
              >
                {["1h", "3h", "1d", "3d"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <Clock
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[var(--app-muted)]"
              />
            </div>
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-[0.78rem] text-[var(--app-muted)]">Priority</legend>
          <div className="flex gap-1 rounded-2xl bg-[var(--app-surface)] p-1">
            {PRIORITIES.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={priority === value}
                onClick={() => setPriority(value)}
                className={cn(
                  "flex-1 rounded-xl py-3 text-[0.9rem] transition-colors",
                  priority === value
                    ? "bg-[var(--app-accent)] text-[var(--app-accent-ink)]"
                    : "text-[var(--app-muted)] hover:text-[var(--app-fg)]",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <p className="mb-2 text-[0.78rem] text-[var(--app-muted)]">Members</p>
          <button
            type="button"
            aria-expanded={pickingMembers}
            onClick={() => setPickingMembers((value) => !value)}
            className="flex w-full items-center justify-between rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-[0.95rem]"
          >
            <span className={members.length ? "" : "text-[var(--app-muted)]"}>
              {members.length ? `${members.length} selected` : "Select members"}
            </span>
            <span aria-hidden="true" className="text-[var(--app-muted)]">
              {pickingMembers ? "▲" : "▼"}
            </span>
          </button>

          {pickingMembers && (
            <ul className="mt-2 overflow-hidden rounded-2xl bg-[var(--app-surface)]">
              {people.map((person) => {
                const checked = members.includes(person.id);
                return (
                  <li key={person.id}>
                    <button
                      type="button"
                      aria-pressed={checked}
                      onClick={() =>
                        setMembers((current) =>
                          checked
                            ? current.filter((id) => id !== person.id)
                            : [...current, person.id],
                        )
                      }
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-[0.9rem] hover:bg-white/5"
                    >
                      <Avatar personId={person.id} size="sm" />
                      {person.name}
                      <span className="ml-auto text-[var(--app-accent)]">{checked ? "✓" : ""}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {members.map((id) => {
              const person = people.find((item) => item.id === id);
              if (!person) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-2 rounded-full bg-[var(--app-surface-2)] py-1.5 pr-2 pl-1.5 text-[0.8rem]"
                >
                  <Avatar personId={id} size="sm" />
                  {person.name}
                  <button
                    type="button"
                    aria-label={`Remove ${person.name}`}
                    onClick={() => setMembers((current) => current.filter((item) => item !== id))}
                    className="rounded-full p-0.5 text-[var(--app-muted)] hover:text-[var(--app-fg)]"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[0.78rem] text-[var(--app-muted)]">
        {label}
      </label>
      {children}
    </div>
  );
}
