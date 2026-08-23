import { BarChart3, Flame, PiggyBank, Receipt, Target } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State } from "../finance-store";
import { money, pausedTotal, targetFigures } from "../finance-store";

const QUICK_ADD = [50, 100, 200];

export function TargetScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const { left, pctLeft, pctDone, perDay } = targetFigures(state);
  const paused = pausedTotal(state);
  const goalsHit = QUICK_ADD.filter((amount) => state.savedThisMonth >= amount * 2).length;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em]">Target</h3>
        <span className="flex items-center gap-2">
          {QUICK_ADD.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => dispatch({ type: "add-savings", amount })}
              className="rounded-full bg-[var(--app-fg)] px-3 py-2 text-[0.75rem] font-medium text-white tabular-nums"
            >
              +${amount}
            </button>
          ))}
        </span>
      </div>

      <section className="mt-4 flex items-center gap-3 rounded-3xl bg-[var(--app-surface)] px-4 py-3.5">
        <span className="min-w-0">
          <span className="block text-[0.92rem] font-medium">
            <span className="tabular-nums">{pctLeft}%</span> Left of{" "}
            <span className="tabular-nums">{money(state.goal, 0)}</span> Target
          </span>
          <span className="text-[0.78rem] text-[var(--app-muted)] tabular-nums">
            {state.daysLeft} Days Left ({money(perDay, 0)}/Day)
          </span>
        </span>
        <span className="ml-auto h-2 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--app-accent-soft)]">
          <span
            style={{ width: `${pctDone}%` }}
            className="block h-full rounded-full bg-[var(--app-accent)] transition-[width] duration-300"
          />
        </span>
      </section>

      <section className="mt-3 rounded-3xl bg-[var(--app-surface)] p-4">
        <p className="text-[0.85rem] text-[var(--app-muted)]">Total savings this month</p>
        <p className="text-[2.1rem] leading-tight font-semibold tracking-[-0.03em] tabular-nums">
          {money(state.savedThisMonth)}
        </p>
        <p className="text-[0.85rem] text-[var(--app-muted)]">
          out of <span className="font-medium text-[var(--app-fg)] tabular-nums">{money(state.goal)}</span>
        </p>

        <div className="relative mt-4 h-2 rounded-full bg-[var(--app-surface-2)]">
          <span
            style={{ width: `${pctDone}%` }}
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--app-accent-soft)] transition-[width] duration-300"
          />
          {[25, 50, 75].map((mark) => (
            <span
              key={mark}
              style={{ left: `${mark}%` }}
              className={cn(
                "absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors",
                pctDone >= mark ? "bg-[var(--app-accent)]" : "bg-[var(--app-fg)]/20",
              )}
            />
          ))}
        </div>

        <p className="mt-2 flex items-center justify-between text-[0.8rem]">
          <span className="text-[var(--app-muted)]">Your Progress</span>
          <span className="font-medium tabular-nums">{money(left)} left</span>
        </p>
      </section>

      <p className="mt-3 flex items-center justify-between rounded-2xl bg-[var(--app-accent)] px-4 py-3 text-[0.85rem] font-medium text-white">
        <span>
          You saved <span className="tabular-nums">{money(state.savedAllMonth)}</span> this month
        </span>
        <span className="flex items-center gap-1">
          <Flame className="size-4" aria-hidden="true" /> x{state.streakWeeks}
        </span>
      </p>

      <h4 className="mt-5 text-[1rem] font-semibold">Your Stats</h4>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <Stat
          icon={Target}
          title="Your Daily Goals"
          detail={goalsHit >= QUICK_ADD.length ? "Achieved" : `${goalsHit} of ${QUICK_ADD.length}`}
        />
        <Stat icon={PiggyBank} title="Streaks" detail={`${state.streakWeeks} weeks`} filled />
        <Stat icon={Receipt} title="Bills" detail={`Paused ${money(paused)}`} />
        <Stat
          icon={BarChart3}
          title="Finances"
          detail={`Saved ${money(state.savedThisMonth)}`}
          filled
        />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  title,
  detail,
  filled = false,
}: {
  icon: typeof Target;
  title: string;
  detail: string;
  filled?: boolean;
}) {
  return (
    <article className="rounded-3xl bg-[var(--app-surface)] p-4">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          filled
            ? "bg-[var(--app-accent)] text-white"
            : "bg-[var(--app-accent-soft)] text-[var(--app-accent)]",
        )}
      >
        <Icon className="size-4" />
      </span>
      <p className="mt-5 text-[0.95rem] font-semibold">{title}</p>
      <p className="text-[0.8rem] text-[var(--app-muted)] tabular-nums">{detail}</p>
    </article>
  );
}
