import { useReducer } from "react";
import { Search, ShoppingBag, User } from "lucide-react";

import { cn } from "~/lib/utils";
import { PrototypeStage } from "../prototype-stage";
import { CartScreen, DoneScreen } from "./screens/cart-screen";
import { HomeScreen } from "./screens/home-screen";
import { ProductScreen } from "./screens/product-screen";
import { cartCount, initialState, reducer } from "./shop-store";

export function ShopApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const count = cartCount(state);

  return (
    <PrototypeStage palette="shop-app" time="5:13 PM" onReset={() => dispatch({ type: "reset" })}>
      {state.screen !== "product" && (
        <header className="flex shrink-0 items-center justify-between px-4 pt-2 pb-2">
          <button
            type="button"
            aria-label="Account"
            onClick={() => dispatch({ type: "go", screen: "home" })}
            className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface-2)]"
          >
            <User className="size-4" />
          </button>

          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              aria-pressed={state.searchOpen}
              onClick={() => {
                dispatch({ type: "go", screen: "home" });
                dispatch({ type: "toggle-search" });
              }}
              className={cn(
                "flex size-9 items-center justify-center rounded-full transition-colors",
                state.searchOpen
                  ? "bg-[var(--app-fg)] text-white"
                  : "bg-[var(--app-surface-2)]",
              )}
            >
              <Search className="size-4" />
            </button>

            <button
              type="button"
              aria-label={`Bag, ${count} items`}
              onClick={() => dispatch({ type: "go", screen: "cart" })}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.85rem] font-medium transition-colors",
                state.screen === "cart"
                  ? "bg-[var(--app-fg)] text-white"
                  : "bg-[var(--app-surface-2)]",
              )}
            >
              <ShoppingBag className="size-4" />
              <span className="tabular-nums">{count}</span>
            </button>
          </span>
        </header>
      )}

      {state.screen === "home" ? (
        <HomeScreen state={state} dispatch={dispatch} />
      ) : state.screen === "product" ? (
        <ProductScreen state={state} dispatch={dispatch} />
      ) : state.screen === "cart" ? (
        <CartScreen state={state} dispatch={dispatch} />
      ) : (
        <DoneScreen state={state} dispatch={dispatch} />
      )}
    </PrototypeStage>
  );
}
