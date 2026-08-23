import { useReducer } from "react";
import { Bell, CreditCard, Gift, Settings, Wallet } from "lucide-react";

import { cn } from "~/lib/utils";
import { PrototypeStage } from "../prototype-stage";
import { GrowthScreen } from "./screens/growth-screen";
import { OverviewScreen } from "./screens/overview-screen";
import { CardsScreen, RewardsScreen, SettingsScreen } from "./screens/side-screens";
import { initialState, reducer, type Tab } from "./wallet-store";

const TABS: { tab: Tab; icon: typeof Wallet; label: string }[] = [
  { tab: "wallet", icon: Wallet, label: "Wallet" },
  { tab: "rewards", icon: Gift, label: "Rewards" },
  { tab: "cards", icon: CreditCard, label: "Cards" },
  { tab: "settings", icon: Settings, label: "Settings" },
];

const TITLES: Record<Tab, string> = {
  wallet: "Wallet",
  rewards: "Rewards",
  cards: "Cards",
  settings: "Settings",
};

export function WalletApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const unclaimed = state.rewards.filter((reward) => !reward.claimed).length;

  return (
    <PrototypeStage palette="wallet-app" onReset={() => dispatch({ type: "reset" })}>
      <header className="flex shrink-0 items-center justify-between px-5 pt-2 pb-1">
        <span className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface-2)] text-[0.7rem] font-semibold">
          AG
        </span>
        <h3 className="text-[1rem] font-medium">{TITLES[state.tab]}</h3>
        <span className="relative">
          <Bell
            className={cn(
              "size-5",
              state.notifications ? "text-[var(--app-fg)]" : "text-[var(--app-muted)]",
            )}
            aria-hidden="true"
          />
          {state.notifications && unclaimed > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[var(--app-down)]"
            />
          )}
        </span>
      </header>

      {state.tab === "wallet" ? (
        state.view === "overview" ? (
          <OverviewScreen state={state} dispatch={dispatch} />
        ) : (
          <GrowthScreen state={state} dispatch={dispatch} />
        )
      ) : state.tab === "rewards" ? (
        <RewardsScreen state={state} dispatch={dispatch} />
      ) : state.tab === "cards" ? (
        <CardsScreen state={state} dispatch={dispatch} />
      ) : (
        <SettingsScreen state={state} dispatch={dispatch} />
      )}

      <nav
        aria-label="App sections"
        className="absolute inset-x-0 bottom-0 flex items-center justify-around bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)] to-transparent px-6 pt-6 pb-4"
      >
        {TABS.map(({ tab, icon: Icon, label }) => {
          const active = state.tab === tab;
          return (
            <button
              key={tab}
              type="button"
              aria-label={label}
              aria-current={active ? "page" : undefined}
              onClick={() => dispatch({ type: "set-tab", tab })}
              className={cn(
                "relative rounded-xl p-2 transition-colors",
                active ? "text-[var(--app-fg)]" : "text-[var(--app-muted)]",
              )}
            >
              <Icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
              {tab === "rewards" && unclaimed > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-1 size-2 rounded-full bg-[var(--app-accent)] ring-2 ring-[var(--app-bg)]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </PrototypeStage>
  );
}
