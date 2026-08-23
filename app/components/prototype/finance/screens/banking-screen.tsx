import { Info, Pause, Play, Plus } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State, Subscription } from "../finance-store";
import { money, subscriptionTotal } from "../finance-store";

export function BankingScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <span className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-[var(--app-accent-soft)] text-[1rem] font-semibold text-[var(--app-accent)]">
            S
          </span>
          <span>
            <span className="block text-[1.05rem] font-semibold">Samurai App</span>
            <span className="text-[0.85rem] text-[var(--app-muted)]">Wallet</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-[var(--app-fg)] text-white">
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </span>
      </div>

      <p className="mt-5 text-[0.85rem] text-[var(--app-muted)]">
        {money(subscriptionTotal(state))} due this month across{" "}
        {state.subscriptions.filter((item) => !item.paused).length} active plans
      </p>

      <div className="mt-2 flex flex-col gap-2">
        {state.subscriptions.map((item) => (
          <SubscriptionCard
            key={item.id}
            item={item}
            open={state.openSubscription === item.id}
            dispatch={dispatch}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-3xl bg-[var(--app-surface)] px-4 py-3.5">
        <span className="text-[0.95rem] font-semibold">Digital Card</span>
        <span className="flex items-center gap-2 text-[0.95rem] tracking-widest tabular-nums">
          <span aria-hidden="true">••••••••</span> 2341
        </span>
      </div>
    </div>
  );
}

function SubscriptionCard({
  item,
  open,
  dispatch,
}: {
  item: Subscription;
  open: boolean;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl transition-colors",
        item.paused
          ? "bg-[var(--app-surface-2)] text-[var(--app-muted)]"
          : open
            ? "bg-[var(--app-accent)] text-white"
            : "bg-[var(--app-surface)] text-[var(--app-fg)]",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => dispatch({ type: "open-subscription", id: item.id })}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className={cn("text-[1rem] font-semibold", !open && !item.paused && "text-[var(--app-accent)]")}>
          {item.name}
        </span>
        <span className="text-[0.85rem] font-medium">{item.paused ? "Paused" : item.plan}</span>
      </button>

      {open && (
        <div className="px-4 pb-4">
          <p className="text-center text-[2.6rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">
            {money(item.amount)}
          </p>

          {item.pending !== undefined && !item.paused && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.8rem] opacity-80">
              Pending {money(item.pending)}
              <Info className="size-3.5" aria-hidden="true" />
            </p>
          )}

          <button
            type="button"
            onClick={() => dispatch({ type: "toggle-subscription", id: item.id })}
            className={cn(
              "mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[0.85rem] font-medium",
              item.paused
                ? "bg-[var(--app-fg)] text-white"
                : "bg-white/15 text-current ring-1 ring-white/30",
            )}
          >
            {item.paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {item.paused ? "Resume plan" : "Pause plan"}
          </button>
        </div>
      )}
    </article>
  );
}
