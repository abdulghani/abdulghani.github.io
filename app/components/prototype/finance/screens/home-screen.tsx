import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State } from "../finance-store";
import { money, monthFigures, months, pausedTotal } from "../finance-store";

export function HomeScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const { spend, income, expense } = monthFigures(state);
  const paused = pausedTotal(state);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em]">Finance</h3>
        <span className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Add savings"
            onClick={() => dispatch({ type: "set-tab", tab: "account" })}
            className="flex size-9 items-center justify-center rounded-full bg-[var(--app-fg)] text-white"
          >
            <Plus className="size-4" />
          </button>
          <button
            type="button"
            aria-label="See subscriptions"
            onClick={() => dispatch({ type: "set-tab", tab: "banking" })}
            className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface)]"
          >
            <ArrowDownRight className="size-4" />
          </button>
        </span>
      </div>

      <h4 className="mt-4 text-[1.55rem] leading-[1.15] font-semibold tracking-[-0.02em]">
        You are on Top
        <span className="block text-[var(--app-muted)]">of your Finances</span>
      </h4>

      <section className="mt-4 rounded-3xl bg-[var(--app-surface)] p-4">
        <p className="text-[0.85rem] text-[var(--app-muted)]">Total Spend</p>
        <p className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] tabular-nums">
          {money(spend)}
        </p>
        <SpendChart state={state} dispatch={dispatch} />
      </section>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Tile label="Income" value={money(income)} direction="up" />
        <Tile label="Expense" value={money(expense)} direction="down" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h4 className="text-[1rem] font-semibold">Your Activity</h4>
        <button
          type="button"
          onClick={() => dispatch({ type: "set-tab", tab: "merchants" })}
          className="text-[0.8rem] text-[var(--app-muted)]"
        >
          See all
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <article className="rounded-3xl bg-[var(--app-surface)] p-4">
          <span className="flex -space-x-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[var(--app-accent-soft)] text-[0.7rem] font-semibold text-[var(--app-accent)]">
              Ev
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-[var(--app-accent)] text-[0.7rem] font-semibold text-white ring-2 ring-[var(--app-surface)]">
              f
            </span>
          </span>
          <p className="mt-6 text-[0.8rem] text-[var(--app-muted)]">Combine Bill</p>
          <p className="text-[1.05rem] font-semibold tabular-nums">{money(17262)}</p>
        </article>

        <article className="rounded-3xl bg-[var(--app-surface)] p-4">
          <p className="text-[0.95rem] leading-snug font-medium">
            {paused > 0 ? (
              <>
                You paused {money(paused)} of{" "}
                <span className="text-[var(--app-accent)]">monthly bills</span>.
              </>
            ) : (
              <>
                Your latest bill payment is{" "}
                <span className="text-[var(--app-accent)]">higher than usual.</span>
              </>
            )}
          </p>
          <p className="mt-6 text-[0.8rem] text-[var(--app-muted)]">Upcoming bills</p>
          <p className="text-[1.05rem] font-semibold tabular-nums">{money(4262 - paused)}</p>
        </article>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  direction,
}: {
  label: string;
  value: string;
  direction: "up" | "down";
}) {
  const Icon = direction === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="rounded-3xl bg-[var(--app-surface)] px-4 py-3.5">
      <p className="flex items-center justify-between text-[0.8rem] text-[var(--app-muted)]">
        {label}
        <Icon className="size-4 text-[var(--app-fg)]" />
      </p>
      <p className="mt-1 text-[1.15rem] font-semibold tracking-[-0.01em] tabular-nums">{value}</p>
    </div>
  );
}

const W = 300;
const H = 150;
const PAD_X = 26;
const PAD_Y = 22;
const MAX = 12;

function y(value: number) {
  return H - PAD_Y - (value / MAX) * (H - PAD_Y * 2);
}

function x(index: number) {
  return PAD_X + index * ((W - PAD_X * 2) / (months.length - 1));
}

function SpendChart({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const selected = months[state.monthIndex];
  const line = (key: "thisYear" | "lastYear") =>
    months.map((month, index) => `${x(index)},${y(month[key])}`).join(" ");

  return (
    <div className="mt-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Spend by month. ${selected.key} is selected at ${selected.thisYear} thousand.`}
      >
        {[0, 4, 8, 12].map((tick) => (
          <g key={tick}>
            <line
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y(tick)}
              y2={y(tick)}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 4"
              className="text-[var(--app-fg)]/12"
            />
            <text x="2" y={y(tick) + 3} className="fill-[var(--app-muted)] text-[8px]">
              {tick}
              {tick > 0 ? "t" : ""}
            </text>
          </g>
        ))}

        <polyline
          points={line("lastYear")}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-[var(--app-accent-soft)]"
        />
        <polyline
          points={line("thisYear")}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-[var(--app-accent)]"
        />

        <line
          x1={x(state.monthIndex)}
          x2={x(state.monthIndex)}
          y1={y(selected.thisYear)}
          y2={H - PAD_Y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          className="text-[var(--app-accent)]/50"
        />
        <circle
          cx={x(state.monthIndex)}
          cy={y(selected.thisYear)}
          r="4"
          className="fill-[var(--app-surface)] stroke-[var(--app-accent)]"
          strokeWidth="2.5"
        />

        <g transform={`translate(${x(state.monthIndex)}, ${y(selected.thisYear) - 22})`}>
          <rect
            x="-19"
            y="-10"
            width="38"
            height="18"
            rx="9"
            className="fill-[var(--app-accent)]"
          />
          <path d="M-3 8 L0 12 L3 8 Z" className="fill-[var(--app-accent)]" />
          <text
            textAnchor="middle"
            y="3"
            className="fill-white text-[9px] font-medium"
          >
            {selected.thisYear.toFixed(2)}t
          </text>
        </g>

        {months.map((month, index) => (
          <rect
            key={month.key}
            x={x(index) - 16}
            y="0"
            width="32"
            height={H}
            fill="transparent"
            className="cursor-pointer"
            role="button"
            aria-label={`Show ${month.key}`}
            onClick={() => dispatch({ type: "select-month", index })}
          />
        ))}
      </svg>

      <div className="mt-1 flex justify-between px-1 text-[0.7rem]">
        {months.map((month, index) => (
          <button
            key={month.key}
            type="button"
            aria-pressed={index === state.monthIndex}
            onClick={() => dispatch({ type: "select-month", index })}
            className={cn(
              "rounded-full px-2 py-0.5 transition-colors",
              index === state.monthIndex
                ? "font-semibold text-[var(--app-fg)]"
                : "text-[var(--app-muted)]",
            )}
          >
            {month.key}
          </button>
        ))}
      </div>

    </div>
  );
}
