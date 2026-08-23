import { Check, Snowflake } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State } from "../wallet-store";
import { money } from "../wallet-store";

export function RewardsScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const unclaimed = state.rewards.filter((reward) => !reward.claimed);

  return (
    <Body
      title="Rewards"
      subtitle={
        unclaimed.length
          ? `${money(unclaimed.reduce((sum, reward) => sum + reward.value, 0))} waiting to be claimed`
          : "Everything claimed — nice work"
      }
    >
      <ul className="flex flex-col gap-2">
        {state.rewards.map((reward) => (
          <li
            key={reward.id}
            className="flex items-center gap-3 rounded-2xl bg-[var(--app-surface)] px-4 py-3.5"
          >
            <span className="min-w-0">
              <span className="block text-[0.92rem] font-medium">{reward.title}</span>
              <span className="text-[0.75rem] text-[var(--app-muted)]">{reward.detail}</span>
            </span>
            <button
              type="button"
              disabled={reward.claimed}
              onClick={() => dispatch({ type: "claim-reward", id: reward.id })}
              className={cn(
                "ml-auto shrink-0 rounded-full px-3.5 py-2 text-[0.8rem] font-medium tabular-nums",
                reward.claimed
                  ? "bg-[var(--app-surface-2)] text-[var(--app-muted)]"
                  : "bg-[var(--app-accent)] text-[var(--app-accent-ink)]",
              )}
            >
              {reward.claimed ? (
                <span className="flex items-center gap-1">
                  <Check className="size-3.5" /> Claimed
                </span>
              ) : (
                money(reward.value)
              )}
            </button>
          </li>
        ))}
      </ul>
    </Body>
  );
}

export function CardsScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <Body title="Cards" subtitle="Freezing a card blocks its payment on the wallet screen">
      <ul className="flex flex-col gap-3">
        {state.cards.map((card) => (
          <li
            key={card.id}
            className={cn(
              "rounded-3xl p-4",
              card.frozen
                ? "bg-[var(--app-surface-2)] text-[var(--app-muted)]"
                : "bg-[linear-gradient(150deg,#c8f97a_0%,#9ef01a_55%,#7ad60c_100%)] text-[var(--app-accent-ink)]",
            )}
          >
            <p className="text-[0.75rem] opacity-70">{card.label}</p>
            <p className="text-[0.95rem] font-medium">**** **** **** {card.last4}</p>
            <div className="mt-6 flex items-end justify-between">
              <span className="text-[0.8rem]">
                <span className="block opacity-70">Total due</span>
                <span className="font-medium tabular-nums">
                  {money(card.due, state.hideBalances)}
                </span>
              </span>
              <button
                type="button"
                aria-pressed={card.frozen}
                onClick={() => dispatch({ type: "freeze-card", id: card.id })}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8rem] font-medium",
                  card.frozen
                    ? "bg-[var(--app-fg)] text-white"
                    : "bg-[var(--app-fg)]/10 text-[var(--app-accent-ink)]",
                )}
              >
                <Snowflake className="size-3.5" />
                {card.frozen ? "Unfreeze" : "Freeze"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Body>
  );
}

export function SettingsScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const toggles = [
    {
      key: "hideBalances" as const,
      title: "Hide balances",
      detail: "Masks every amount across the app",
      value: state.hideBalances,
    },
    {
      key: "notifications" as const,
      title: "Push notifications",
      detail: "Card payments and price moves",
      value: state.notifications,
    },
  ];

  return (
    <Body title="Settings" subtitle="Two switches, both wired to the same state">
      <ul className="overflow-hidden rounded-2xl bg-[var(--app-surface)]">
        {toggles.map((toggle) => (
          <li key={toggle.key} className="flex items-center gap-3 px-4 py-3.5 not-last:border-b">
            <span className="min-w-0">
              <span className="block text-[0.92rem] font-medium">{toggle.title}</span>
              <span className="text-[0.75rem] text-[var(--app-muted)]">{toggle.detail}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={toggle.value}
              aria-label={toggle.title}
              onClick={() => dispatch({ type: "toggle-setting", key: toggle.key })}
              className={cn(
                "ml-auto flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                toggle.value ? "bg-[var(--app-fg)]" : "bg-[var(--app-fg)]/20",
              )}
            >
              <span
                className={cn(
                  "size-5 rounded-full bg-white transition-transform",
                  toggle.value && "translate-x-5",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </Body>
  );
}

function Body({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
      <h3 className="pt-4 text-[1.7rem] leading-tight font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-1 mb-4 text-[0.8rem] text-[var(--app-muted)]">{subtitle}</p>
      {children}
    </div>
  );
}
