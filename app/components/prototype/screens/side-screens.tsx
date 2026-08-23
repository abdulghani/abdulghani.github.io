import { cn } from "~/lib/utils";
import { Avatar } from "../avatar";
import type { Action, Priority, State } from "../task-store";
import { personName } from "../task-store";

const ORDER: Priority[] = ["High", "Medium", "Low"];

/** Folder tab: every task grouped by priority rather than by day. */
export function BoardsScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <ScreenBody title="Boards" subtitle={`${state.tasks.length} tasks across the week`}>
      {ORDER.map((priority) => {
        const tasks = state.tasks.filter((task) => task.priority === priority);
        return (
          <section key={priority} className="mb-6">
            <h4 className="mb-2 flex items-center gap-2 text-[0.8rem] text-[var(--app-muted)]">
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 rounded-full",
                  priority === "High"
                    ? "bg-[var(--app-accent)]"
                    : priority === "Medium"
                      ? "bg-white/40"
                      : "bg-white/20",
                )}
              />
              {priority}
              <span className="tabular-nums">({tasks.length})</span>
            </h4>
            <ul className="flex flex-col gap-2">
              {tasks.map((task) => (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "open-task", id: task.id })}
                    className="w-full rounded-2xl bg-[var(--app-surface)] px-4 py-3 text-left"
                  >
                    <span className="block text-[0.92rem] leading-snug">{task.title}</span>
                    <span className="mt-1 block text-[0.72rem] text-[var(--app-muted)]">
                      {task.day} Feb · {personName(task.assignee)}
                    </span>
                  </button>
                </li>
              ))}
              {tasks.length === 0 && (
                <li className="rounded-2xl border border-dashed border-white/12 px-4 py-3 text-[0.82rem] text-[var(--app-muted)]">
                  Nothing here yet.
                </li>
              )}
            </ul>
          </section>
        );
      })}
    </ScreenBody>
  );
}

/** Chat tab: the running log the reducer writes on every state change. */
export function ActivityScreen({ state }: { state: State }) {
  return (
    <ScreenBody title="Activity" subtitle="Everything that happened in this session">
      <ul className="flex flex-col gap-4">
        {state.activity.map((entry) => (
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
    </ScreenBody>
  );
}

export function ProfileScreen({ state }: { state: State }) {
  const subtasks = state.tasks.flatMap((task) => task.subtasks);
  const completed = subtasks.filter((subtask) => subtask.done).length;

  const stats = [
    { label: "Tasks", value: state.tasks.length },
    { label: "Subtasks done", value: `${completed}/${subtasks.length}` },
    { label: "High priority", value: state.tasks.filter((t) => t.priority === "High").length },
  ];

  return (
    <ScreenBody title="Profile" subtitle="Signed in as the demo account">
      <div className="flex items-center gap-3 rounded-3xl bg-[var(--app-surface)] p-4">
        <Avatar personId="floyd" size="lg" />
        <span>
          <span className="block text-[1rem] font-medium">Floyd Wilson</span>
          <span className="text-[0.78rem] text-[var(--app-muted)]">Product designer</span>
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-[var(--app-surface)] px-3 py-3">
            <dt className="text-[0.68rem] text-[var(--app-muted)]">{stat.label}</dt>
            <dd className="mt-1 text-[1.1rem] font-semibold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </ScreenBody>
  );
}

function ScreenBody({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-5 pt-6">
        <h3 className="text-[1.9rem] leading-tight font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-1 text-[0.8rem] text-[var(--app-muted)]">{subtitle}</p>
      </div>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-5 pb-28">{children}</div>
    </div>
  );
}
