import {
  Bitcoin,
  ChartNoAxesColumn,
  ChevronRight,
  CreditCard,
  PiggyBank,
  Snowflake,
  Wifi,
} from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State } from "../wallet-store";
import { money, totalBalance } from "../wallet-store";

const ACCOUNT_ICON: Record<string, typeof CreditCard> = {
  chequing: CreditCard,
  savings: PiggyBank,
  crypto: Bitcoin,
};

export function OverviewScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const card = state.cards[state.cardIndex];
  const movements = state.accountFilter
    ? state.movements.filter((movement) => movement.accountId === state.accountFilter)
    : state.movements;
  const filtered = state.accounts.find((account) => account.id === state.accountFilter);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <p className="pt-3 text-[0.9rem] text-[var(--app-muted)]">My Balance</p>
      <p className="text-[2.35rem] leading-tight font-semibold tracking-[-0.03em] tabular-nums">
        {money(totalBalance(state), state.hideBalances)}
      </p>

      <div
        role="group"
        aria-label={`Card ending ${card.last4}, ${state.cardIndex + 1} of ${state.cards.length}`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") dispatch({ type: "step-card", delta: 1 });
          if (event.key === "ArrowLeft") dispatch({ type: "step-card", delta: -1 });
        }}
        className={cn(
          "mt-4 rounded-3xl p-4 transition-colors",
          card.frozen
            ? "bg-[var(--app-surface-2)] text-[var(--app-muted)]"
            : "bg-[linear-gradient(150deg,#c8f97a_0%,#9ef01a_55%,#7ad60c_100%)] text-[var(--app-accent-ink)]",
        )}
      >
        <p className="flex items-center gap-2 text-[0.95rem] font-medium">
          {card.frozen ? <Snowflake className="size-4" /> : <Wifi className="size-4 rotate-90" />}
          **** **** **** {card.last4}
        </p>

        <div className="mt-8 flex items-end justify-between gap-3">
          <span className="text-[0.8rem]">
            <span className="block opacity-70">Total due</span>
            <span className="text-[0.95rem] font-medium tabular-nums">
              {money(card.due, state.hideBalances)}
            </span>
          </span>

          <button
            type="button"
            disabled={card.due === 0 || card.frozen}
            onClick={() => dispatch({ type: "pay-card", id: card.id })}
            className={cn(
              "rounded-full px-4 py-2.5 text-[0.85rem] font-medium transition-opacity",
              card.due === 0 || card.frozen
                ? "bg-[var(--app-fg)]/15 text-[var(--app-fg)]/50"
                : "bg-[var(--app-fg)] text-white hover:opacity-90",
            )}
          >
            {card.frozen ? "Frozen" : card.due === 0 ? "Paid" : "Pay now"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {state.cards.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show card ending ${item.last4}`}
            aria-current={index === state.cardIndex}
            onClick={() => dispatch({ type: "set-card", index })}
            className={cn(
              "size-1.5 rounded-full transition-colors",
              index === state.cardIndex ? "bg-[var(--app-fg)]" : "bg-[var(--app-fg)]/25",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "set-view", view: "growth" })}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-left"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--app-accent)] text-[var(--app-accent-ink)]">
          <ChartNoAxesColumn className="size-4" />
        </span>
        <span>
          <span className="block text-[0.95rem] font-medium">Portfolio growth</span>
          <span className="text-[0.72rem] text-[var(--app-muted)]">Chart and watch list</span>
        </span>
        <ChevronRight className="ml-auto size-4 text-[var(--app-muted)]" />
      </button>

      <h4 className="mt-5 text-[0.95rem] font-medium">Accounts</h4>

      <ul className="mt-2 flex flex-col gap-2">
        {state.accounts.map((account) => {
          const Icon = ACCOUNT_ICON[account.id] ?? CreditCard;
          const active = state.accountFilter === account.id;
          return (
            <li key={account.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() =>
                  dispatch({ type: "filter-account", id: active ? null : account.id })
                }
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl bg-[var(--app-surface)] px-4 py-3.5 text-left transition-shadow",
                  active && "ring-2 ring-[var(--app-fg)]",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-white",
                    account.tone,
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="text-[0.95rem] font-medium">{account.name}</span>
                <span className="ml-auto text-[0.95rem] font-medium tabular-nums">
                  {money(account.balance, state.hideBalances)}
                </span>
                <ChevronRight className="size-4 text-[var(--app-muted)]" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between">
        <h4 className="text-[0.95rem] font-medium">Recent activity</h4>
        {filtered && (
          <button
            type="button"
            onClick={() => dispatch({ type: "filter-account", id: null })}
            className="rounded-full bg-[var(--app-surface-2)] px-3 py-1 text-[0.72rem]"
          >
            {filtered.name} ✕
          </button>
        )}
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {movements.map((movement) => (
          <li
            key={movement.id}
            className="flex items-center gap-3 rounded-2xl bg-[var(--app-surface)] px-4 py-3"
          >
            <span>
              <span className="block text-[0.92rem] font-medium">{movement.title}</span>
              <span className="text-[0.72rem] text-[var(--app-muted)]">{movement.when}</span>
            </span>
            <span
              className={cn(
                "ml-auto text-[0.92rem] font-medium tabular-nums",
                movement.amount >= 0 ? "text-[var(--app-up)]" : "text-[var(--app-fg)]",
              )}
            >
              {state.hideBalances
                ? "••••"
                : `${movement.amount >= 0 ? "+" : "−"}${money(Math.abs(movement.amount))}`}
            </span>
          </li>
        ))}
        {movements.length === 0 && (
          <li className="rounded-2xl border border-dashed border-[var(--app-fg)]/15 px-4 py-3 text-[0.85rem] text-[var(--app-muted)]">
            No activity on this account yet.
          </li>
        )}
      </ul>
    </div>
  );
}
