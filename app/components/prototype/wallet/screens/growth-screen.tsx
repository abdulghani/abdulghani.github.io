import { ChartNoAxesColumn, ChevronLeft, Star } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, Coin, Range, State } from "../wallet-store";
import { growth, money, series } from "../wallet-store";

const RANGES: Range[] = ["7D", "30D", "90D"];

export function GrowthScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const points = series[state.range];
  const peak = Math.max(...points.map((point) => Math.abs(point.value)));
  const { total, pct } = growth(state);
  const selected = state.selectedBar === null ? null : points[state.selectedBar];
  const watched = state.coins.filter((coin) => coin.watched);
  const unwatched = state.coins.filter((coin) => !coin.watched);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <button
        type="button"
        onClick={() => dispatch({ type: "set-view", view: "overview" })}
        className="mt-2 -ml-1 flex items-center gap-1 text-[0.85rem] text-[var(--app-muted)]"
      >
        <ChevronLeft className="size-4" />
        Wallet
      </button>

      <section className="mt-3 rounded-3xl bg-[var(--app-surface)] p-4">
        <div className="flex items-center justify-between gap-3">
          <h4 className="flex items-center gap-2 text-[0.95rem] font-medium">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--app-accent)] text-[var(--app-accent-ink)]">
              <ChartNoAxesColumn className="size-4" />
            </span>
            Portfolio growth
          </h4>
          <div className="flex gap-1 rounded-full bg-[var(--app-surface-2)] p-0.5">
            {RANGES.map((range) => (
              <button
                key={range}
                type="button"
                aria-pressed={state.range === range}
                onClick={() => dispatch({ type: "set-range", range })}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.7rem] transition-colors",
                  state.range === range
                    ? "bg-[var(--app-fg)] text-white"
                    : "text-[var(--app-muted)]",
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[0.8rem] text-[var(--app-muted)]">
          {selected ? `${selected.label} · daily change` : "Total growth"}
        </p>
        <p className="text-[1.6rem] leading-tight font-semibold tracking-[-0.02em] tabular-nums">
          {money(selected ? selected.value : total, state.hideBalances)}
          {!selected && (
            <span className="ml-1.5 align-middle text-[0.85rem] font-medium text-[var(--app-up)]">
              ({pct >= 0 ? "+" : "−"}
              {Math.abs(pct).toFixed(1)}%)
            </span>
          )}
        </p>

        <div className="mt-3 flex h-28 items-stretch gap-1.5">
          {points.map((point, index) => {
            const height = `${Math.max(6, (Math.abs(point.value) / peak) * 100)}%`;
            const up = point.value >= 0;
            const active = state.selectedBar === index;
            return (
              <button
                key={`${point.label}-${index}`}
                type="button"
                aria-pressed={active}
                aria-label={`${point.label}: ${money(point.value)}`}
                onClick={() => dispatch({ type: "select-bar", index })}
                className="flex flex-1 flex-col"
              >
                <span className="flex flex-1 items-end justify-center">
                  {up && (
                    <span
                      style={{ height }}
                      className={cn(
                        "w-full rounded-t-md transition-opacity",
                        active ? "bg-[var(--app-up)]" : "bg-[var(--app-up)]/70",
                      )}
                    />
                  )}
                </span>
                <span className="h-px w-full bg-[var(--app-fg)]/10" />
                <span className="flex flex-1 flex-col items-center justify-start">
                  {!up && (
                    <span
                      style={{ height }}
                      className={cn(
                        "w-full rounded-b-md transition-opacity",
                        active ? "bg-[var(--app-down)]" : "bg-[var(--app-down)]/70",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "mt-auto text-[0.68rem]",
                      active ? "text-[var(--app-fg)]" : "text-[var(--app-muted)]",
                    )}
                  >
                    {point.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <h4 className="mt-5 flex items-center gap-1 text-[0.95rem] font-medium">
        Watch list
        <span className="text-[0.75rem] text-[var(--app-muted)] tabular-nums">
          ({watched.length})
        </span>
      </h4>

      <CoinList coins={watched} dispatch={dispatch} state={state} />

      {unwatched.length > 0 && (
        <>
          <h4 className="mt-5 text-[0.95rem] font-medium">Not watching</h4>
          <CoinList coins={unwatched} dispatch={dispatch} state={state} />
        </>
      )}

    </div>
  );
}

function CoinList({
  coins,
  state,
  dispatch,
}: {
  coins: Coin[];
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <ul className="mt-2 overflow-hidden rounded-2xl bg-[var(--app-surface)]">
      {coins.map((coin) => (
          <li key={coin.id} className="flex items-center gap-3 px-4 py-3 not-last:border-b">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-[0.85rem] font-semibold text-white",
                coin.tone,
              )}
            >
              {coin.symbol.slice(0, 1)}
            </span>

            <span className="min-w-0">
              <span className="block truncate text-[0.9rem] font-medium">{coin.name}</span>
              <span className="text-[0.72rem] text-[var(--app-muted)]">{coin.symbol}</span>
            </span>

            <span className="ml-auto text-right">
              <span className="block text-[0.9rem] font-medium tabular-nums">
                {money(coin.price, state.hideBalances, coin.price < 10 ? 2 : 0)} USD
              </span>
              <span
                className={cn(
                  "text-[0.72rem] tabular-nums",
                  coin.change >= 0 ? "text-[var(--app-up)]" : "text-[var(--app-down)]",
                )}
              >
                {coin.change >= 0 ? "+" : "−"}
                {money(Math.abs(coin.change), state.hideBalances)} ({coin.changePct >= 0 ? "+" : ""}
                {coin.changePct}%)
              </span>
            </span>

            <button
              type="button"
              aria-pressed={coin.watched}
              aria-label={`${coin.watched ? "Remove" : "Add"} ${coin.name} ${coin.watched ? "from" : "to"} watch list`}
              onClick={() => dispatch({ type: "toggle-watch", id: coin.id })}
              className="ml-1 shrink-0 rounded-full p-1"
            >
              <Star
                className={cn(
                  "size-4",
                  coin.watched ? "fill-[var(--app-fg)] text-[var(--app-fg)]" : "text-[var(--app-muted)]",
                )}
              />
            </button>
          </li>
      ))}
    </ul>
  );
}
