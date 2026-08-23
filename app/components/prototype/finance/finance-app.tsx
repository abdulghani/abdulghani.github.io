import { useReducer } from "react";
import { Landmark, Receipt, ShoppingBag, User } from "lucide-react";

import { cn } from "~/lib/utils";
import { PrototypeStage } from "../prototype-stage";
import { BankingScreen } from "./screens/banking-screen";
import { HomeScreen } from "./screens/home-screen";
import { MerchantsScreen } from "./screens/merchants-screen";
import { TargetScreen } from "./screens/target-screen";
import { initialState, reducer, type Tab } from "./finance-store";

const TABS: { tab: Tab; icon: typeof Receipt; label: string }[] = [
  { tab: "home", icon: Receipt, label: "Home" },
  { tab: "merchants", icon: ShoppingBag, label: "Merchants" },
  { tab: "banking", icon: Landmark, label: "Banking" },
  { tab: "account", icon: User, label: "Account" },
];

export function FinanceApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PrototypeStage
      palette="finance-app"
      time="10:40"
      onReset={() => dispatch({ type: "reset" })}
    >
      {state.tab === "home" ? (
        <HomeScreen state={state} dispatch={dispatch} />
      ) : state.tab === "merchants" ? (
        <MerchantsScreen state={state} dispatch={dispatch} />
      ) : state.tab === "banking" ? (
        <BankingScreen state={state} dispatch={dispatch} />
      ) : (
        <TargetScreen state={state} dispatch={dispatch} />
      )}

      <nav
        aria-label="App sections"
        className="absolute inset-x-0 bottom-0 flex items-start justify-around bg-[var(--app-surface)] px-4 pt-3 pb-4 shadow-[0_-8px_24px_rgba(11,11,15,0.06)]"
      >
        {TABS.map(({ tab, icon: Icon, label }) => {
          const active = state.tab === tab;
          return (
            <button
              key={tab}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => dispatch({ type: "set-tab", tab })}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-colors",
                active ? "text-[var(--app-fg)]" : "text-[var(--app-muted)]",
              )}
            >
              <Icon
                className="size-5"
                strokeWidth={active ? 2.4 : 1.8}
                fill={active ? "currentColor" : "none"}
              />
              <span className={cn("text-[0.68rem]", active && "font-semibold")}>{label}</span>
            </button>
          );
        })}
      </nav>
    </PrototypeStage>
  );
}
