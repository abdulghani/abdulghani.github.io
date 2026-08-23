import { CalendarDays, Menu, MessageSquare, Paperclip, Share2 } from "lucide-react";

import { cn } from "~/lib/utils";
import { Avatar } from "../avatar";
import type { Action, State, Task } from "../task-store";
import { week } from "../task-store";

export function HomeScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const tasks = state.tasks.filter((task) => task.day === state.selectedDay);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between px-6 pt-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => dispatch({ type: "go", screen: "boards" })}
          className="rounded-md p-1 text-[var(--app-fg)] transition-opacity hover:opacity-70"
        >
          <Menu className="size-6" />
        </button>
        <button
          type="button"
          aria-label="Open profile"
          onClick={() => dispatch({ type: "go", screen: "profile" })}
          className="rounded-full transition-opacity hover:opacity-80"
        >
          <Avatar personId="floyd" size="lg" />
        </button>
      </div>

      <h3 className="px-6 pt-4 text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.03em]">
        Manage
        <br />
        your tasks ✏️
      </h3>

      <div className="mt-5 flex justify-between gap-1 px-4">
        {week.map((entry) => {
          const selected = entry.day === state.selectedDay;
          const count = state.tasks.filter((task) => task.day === entry.day).length;
          return (
            <button
              key={entry.day}
              type="button"
              aria-pressed={selected}
              aria-label={`${entry.label} ${entry.day} February, ${count} ${count === 1 ? "task" : "tasks"}`}
              onClick={() => dispatch({ type: "select-day", day: entry.day })}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2.5 transition-colors",
                selected
                  ? "bg-[var(--app-fg)] text-[var(--app-accent-ink)]"
                  : "text-[var(--app-muted)] hover:bg-white/5",
              )}
            >
              <span className="text-[0.68rem] font-medium">{entry.label}</span>
              <span className="text-[0.95rem] font-semibold">{entry.day}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 rounded-full",
                  count > 0
                    ? selected
                      ? "bg-[var(--app-accent-ink)]"
                      : "bg-[var(--app-accent)]"
                    : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-28">
        {tasks.length === 0 ? (
          <p className="mt-10 text-center text-sm text-[var(--app-muted)]">
            Nothing scheduled for {state.selectedDay} Feb.
            <br />
            Tap + to add a task.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onOpen={() => dispatch({ type: "open-task", id: task.id })} />
          ))
        )}
      </div>
    </div>
  );
}

function TaskCard({ task, onOpen }: { task: Task; onOpen: () => void }) {
  const accent = task.priority === "High";

  return (
    <article
      className={cn(
        "rounded-3xl p-4 transition-transform active:scale-[0.99]",
        accent
          ? "bg-[var(--app-accent)] text-[var(--app-accent-ink)]"
          : "bg-[var(--app-surface)] text-[var(--app-fg)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[0.7rem] font-medium",
            accent ? "bg-white/70" : "bg-white/10",
          )}
        >
          {task.priority}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            accent ? "bg-white/70" : "bg-white/10",
          )}
        >
          <Share2 className="size-3.5" />
        </span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-3 block w-full text-left text-[1.05rem] leading-snug font-medium"
      >
        {task.title}
      </button>

      <p
        className={cn(
          "mt-3 flex items-center gap-1.5 text-[0.78rem]",
          accent ? "text-[var(--app-accent-ink)]/70" : "text-[var(--app-muted)]",
        )}
      >
        <CalendarDays className="size-3.5" />
        {task.day} Feb
        {task.time ? ` - ${task.time}` : ""}
      </p>

      <div
        className={cn(
          "mt-4 flex items-center justify-between border-t pt-3",
          accent ? "border-[var(--app-accent-ink)]/15" : "border-white/8",
        )}
      >
        <span className="flex -space-x-2">
          {task.members.map((member) => (
            <Avatar key={member} personId={member} size="sm" className="ring-2 ring-black/10" />
          ))}
        </span>
        <span
          className={cn(
            "flex items-center gap-3 text-[0.72rem]",
            accent ? "text-[var(--app-accent-ink)]/70" : "text-[var(--app-muted)]",
          )}
        >
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3.5" />
            {task.comments}
          </span>
          <span className="flex items-center gap-1">
            <Paperclip className="size-3.5" />
            {task.attachments}
          </span>
        </span>
      </div>
    </article>
  );
}
