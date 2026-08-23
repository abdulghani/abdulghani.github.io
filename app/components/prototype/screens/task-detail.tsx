import { useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, Pencil, Plus, Share2 } from "lucide-react";

import { cn } from "~/lib/utils";
import { Avatar } from "../avatar";
import type { Action, Priority, Task } from "../task-store";
import { personName } from "../task-store";

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export function TaskDetail({
  task,
  activity,
  dispatch,
}: {
  task: Task;
  activity: { id: string; text: string; meta: string }[];
  dispatch: React.Dispatch<Action>;
}) {
  const [tab, setTab] = useState<"overview" | "activity">("overview");
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);

  const done = task.subtasks.filter((subtask) => subtask.done).length;

  function submitSubtask(event: React.FormEvent) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    dispatch({ type: "add-subtask", taskId: task.id, title });
    setDraft("");
    setAdding(false);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--app-accent)] text-[var(--app-accent-ink)]">
      <div className="flex items-center justify-between px-5 pt-2">
        <button
          type="button"
          aria-label="Back to tasks"
          onClick={() => dispatch({ type: "close-task" })}
          className="rounded-md p-1 transition-opacity hover:opacity-70"
        >
          <ChevronLeft className="size-6" />
        </button>
        <span className="flex items-center gap-4">
          <Share2 className="size-5 opacity-80" aria-hidden="true" />
          <Pencil className="size-5 opacity-80" aria-hidden="true" />
        </span>
      </div>

      <h3 className="px-5 pt-3 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.02em]">
        {task.title}
      </h3>

      <div className="flex items-center gap-6 px-5 pt-4 pb-5">
        <span className="flex items-center gap-2">
          <Avatar personId={task.assignee} size="md" />
          <span className="text-[0.72rem] leading-tight">
            <span className="block opacity-70">Assigned to</span>
            <span className="font-medium">{personName(task.assignee)}</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full border border-dashed border-current/40">
            <CalendarDays className="size-4" />
          </span>
          <span className="text-[0.72rem] leading-tight">
            <span className="block opacity-70">Due date</span>
            <span className="font-medium">{task.day} Feb</span>
          </span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-t-[2rem] bg-[var(--app-bg)] text-[var(--app-fg)]">
        <div role="tablist" aria-label="Task sections" className="flex px-5 pt-4">
          {(["overview", "activity"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "flex-1 border-b-2 pb-3 text-[0.95rem] font-medium capitalize transition-colors",
                tab === value
                  ? "border-[var(--app-accent)] text-[var(--app-fg)]"
                  : "border-white/10 text-[var(--app-muted)]",
              )}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-28">
          {tab === "overview" ? (
            <>
              <p
                className={cn(
                  "text-[0.9rem] leading-relaxed text-[var(--app-fg)]/85",
                  !expanded && "line-clamp-3",
                )}
              >
                {task.description}
              </p>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="mx-auto mt-1 flex items-center gap-1 text-[0.82rem] text-[var(--app-muted)]"
              >
                <ChevronDown
                  className={cn("size-4 transition-transform", expanded && "rotate-180")}
                />
                {expanded ? "read less" : "read more"}
              </button>

              <div className="mt-5 flex items-center justify-between">
                <h4 className="text-[0.8rem] text-[var(--app-muted)]">Subtasks</h4>
                <span className="text-[0.72rem] text-[var(--app-muted)] tabular-nums">
                  {done}/{task.subtasks.length}
                </span>
              </div>

              <ul className="mt-2 flex flex-col gap-2">
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id}>
                    <button
                      type="button"
                      aria-pressed={subtask.done}
                      onClick={() =>
                        dispatch({ type: "toggle-subtask", taskId: task.id, subtaskId: subtask.id })
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[0.92rem] transition-colors",
                        subtask.done
                          ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
                          : "border-white/12 bg-transparent hover:bg-white/5",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full border",
                          subtask.done
                            ? "border-[var(--app-accent)] bg-[var(--app-accent)] text-[var(--app-accent-ink)]"
                            : "border-white/25",
                        )}
                      >
                        {subtask.done && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span className={cn(subtask.done && "opacity-60")}>
                        {subtask.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {adding ? (
                <form onSubmit={submitSubtask} className="mt-2 flex gap-2">
                  <input
                    autoFocus
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onBlur={() => !draft.trim() && setAdding(false)}
                    placeholder="Subtask title"
                    aria-label="Subtask title"
                    className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-transparent px-4 py-3 text-[0.92rem] placeholder:text-[var(--app-muted)]"
                  />
                  <button
                    type="submit"
                    className="rounded-2xl bg-[var(--app-accent)] px-4 text-[0.85rem] font-medium text-[var(--app-accent-ink)]"
                  >
                    Add
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setAdding(true)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 py-3.5 text-[0.92rem] transition-colors hover:bg-white/5"
                >
                  <Plus className="size-4" />
                  Add a subtask
                </button>
              )}

              <h4 className="mt-6 text-[0.8rem] text-[var(--app-muted)]">Priority</h4>
              <div className="mt-2 flex gap-1 rounded-2xl bg-[var(--app-surface)] p-1">
                {PRIORITIES.map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    aria-pressed={task.priority === priority}
                    onClick={() => dispatch({ type: "set-priority", taskId: task.id, priority })}
                    className={cn(
                      "flex-1 rounded-xl py-2.5 text-[0.85rem] transition-colors",
                      task.priority === priority
                        ? "bg-[var(--app-accent)] text-[var(--app-accent-ink)]"
                        : "text-[var(--app-muted)] hover:text-[var(--app-fg)]",
                    )}
                  >
                    {priority}
                  </button>
                ))}
              </div>

              <h4 className="mt-6 text-[0.8rem] text-[var(--app-muted)]">Attachments</h4>
              <div className="mt-2 flex gap-3">
                <span className="flex size-[4.5rem] items-center justify-center rounded-2xl border border-dashed border-white/25 text-[var(--app-muted)]">
                  <Plus className="size-5" />
                </span>
                <span className="size-[4.5rem] rounded-2xl bg-[linear-gradient(140deg,#f6c7e8,#c7b7f6)]" />
                <span className="size-[4.5rem] rounded-2xl bg-[linear-gradient(140deg,#b9ccff,#d7c4ff)]" />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-4">
              {activity.map((entry) => (
                <li key={entry.id} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--app-accent)]"
                  />
                  <span>
                    <span className="block text-[0.9rem] leading-snug">{entry.text}</span>
                    <span className="text-[0.72rem] text-[var(--app-muted)]">{entry.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
