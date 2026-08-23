import { cn } from "~/lib/utils";
import type { Action, State } from "../finance-store";
import { money } from "../finance-store";

export function MerchantsScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const filtered = state.accountFilter
    ? state.transactions.filter((tx) => tx.accountId === state.accountFilter)
    : state.transactions;
  const shown = state.showAllTransactions ? filtered : filtered.slice(0, 3);
  const account = state.accounts.find((item) => item.id === state.accountFilter);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-[1.1rem] font-semibold">Accounts</h3>
        {account && (
          <button
            type="button"
            onClick={() => dispatch({ type: "filter-account", id: null })}
            className="rounded-full bg-[var(--app-surface-2)] px-3 py-1 text-[0.72rem]"
          >
            {account.name} ✕
          </button>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        {state.accounts.map((item) => {
          const active = state.accountFilter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() =>
                dispatch({ type: "filter-account", id: active ? null : item.id })
              }
              className={cn(
                "rounded-3xl bg-[var(--app-surface)] p-4 text-left transition-shadow",
                active && "ring-2 ring-[var(--app-accent)]",
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-2xl text-[0.85rem] font-semibold",
                  item.tone,
                )}
              >
                {item.name.slice(0, 1)}
              </span>
              <span className="mt-6 block text-[0.95rem] font-semibold">{item.name}</span>
              <span className="text-[0.9rem] text-[var(--app-muted)] tabular-nums">
                {money(item.balance)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-[1.1rem] font-semibold">Recent Transaction</h3>
        <button
          type="button"
          onClick={() => dispatch({ type: "toggle-all-transactions" })}
          className="text-[0.8rem] text-[var(--app-muted)]"
        >
          {state.showAllTransactions ? "Show less" : "See all"}
        </button>
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {shown.map((tx) => (
          <li key={tx.id} className="rounded-3xl bg-[var(--app-surface)] px-4 py-3">
            <p className="text-[0.72rem] text-[var(--app-muted)]">{tx.when}</p>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--app-surface-2)] text-[0.7rem] font-semibold">
                {tx.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.92rem] font-medium">{tx.name}</span>
                <span className="text-[0.72rem] text-[var(--app-muted)]">
                  {state.accounts.find((a) => a.id === tx.accountId)?.name}, {tx.masked}
                </span>
              </span>
              <span className="ml-auto text-right">
                <span
                  className={cn(
                    "block text-[0.92rem] font-semibold tabular-nums",
                    tx.amount >= 0 ? "text-[var(--app-up)]" : "text-[var(--app-fg)]",
                  )}
                >
                  {tx.amount >= 0 ? "+" : "−"}
                  {money(Math.abs(tx.amount))}
                </span>
                <span className="text-[0.72rem] text-[var(--app-muted)]">
                  {tx.amount >= 0 ? "Recieve" : "Send"}
                </span>
              </span>
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="rounded-3xl border border-dashed border-[var(--app-fg)]/15 px-4 py-3 text-[0.85rem] text-[var(--app-muted)]">
            Nothing on this account yet.
          </li>
        )}
      </ul>

      {filtered.length > 3 && (
        <p className="mt-2 text-center text-[0.72rem] text-[var(--app-muted)] tabular-nums">
          {shown.length} of {filtered.length}
        </p>
      )}
    </div>
  );
}
