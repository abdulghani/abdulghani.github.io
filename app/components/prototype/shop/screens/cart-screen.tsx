import { Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { cn } from "~/lib/utils";
import { ProductArt } from "../product-art";
import type { Action, State } from "../shop-store";
import { findProduct, money, subtotal, typeLabel } from "../shop-store";

export function CartScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const total = subtotal(state);

  if (state.cart.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <ShoppingBag className="size-7 text-[var(--app-muted)]" aria-hidden="true" />
        <p className="text-[1.05rem] font-semibold">Your bag is empty</p>
        <p className="text-[0.85rem] text-[var(--app-muted)]">
          Anything you add from a product page lands here.
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "go", screen: "home" })}
          className="mt-2 rounded-full bg-[var(--app-fg)] px-5 py-2.5 text-[0.9rem] font-medium text-white"
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        {state.cart.map((line) => {
          const product = findProduct(line.productId);
          if (!product) return null;
          const color = product.colors.find((item) => item.name === line.color) ?? product.colors[0];

          return (
            <li
              key={line.id}
              className="flex items-center gap-3 border-b border-[var(--app-line)] py-3 last:border-0"
            >
              <span className="size-16 shrink-0 overflow-hidden rounded-2xl bg-[var(--app-surface-2)]">
                <ProductArt art={product.art} hex={color.hex} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block text-[0.9rem] font-medium">
                      {typeLabel(product.art)}
                    </span>
                    <span className="block truncate text-[0.85rem] text-[var(--app-muted)]">
                      {product.name}
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-[0.75rem] text-[var(--app-muted)]">
                    <span className="block text-[var(--app-fg)]">{line.size}</span>
                    {line.color}
                  </span>
                </span>

                <span className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[1rem] font-semibold tabular-nums">
                    {money(product.price * line.qty)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Stepper
                      label={line.qty === 1 ? `Remove ${product.name}` : `One fewer ${product.name}`}
                      onClick={() => dispatch({ type: "set-qty", id: line.id, delta: -1 })}
                    >
                      {line.qty === 1 ? (
                        <Trash2 className="size-3.5 text-[var(--app-down)]" />
                      ) : (
                        <Minus className="size-3.5" />
                      )}
                    </Stepper>
                    <span className="w-5 text-center text-[0.9rem] tabular-nums">{line.qty}</span>
                    <Stepper
                      label={`One more ${product.name}`}
                      onClick={() => dispatch({ type: "set-qty", id: line.id, delta: 1 })}
                    >
                      <Plus className="size-3.5" />
                    </Stepper>
                  </span>
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--app-line)] bg-[var(--app-surface)] px-5 pt-4 pb-6">
        <span>
          <span className="block text-[0.8rem] text-[var(--app-muted)]">Subtotal</span>
          <span className="text-[1.5rem] font-semibold tracking-[-0.02em] tabular-nums">
            {money(total)}
          </span>
        </span>
        <button
          type="button"
          onClick={() => dispatch({ type: "checkout" })}
          className="rounded-full bg-[var(--app-fg)] px-6 py-3.5 text-[0.95rem] font-medium text-white"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export function DoneScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-[var(--app-fg)] text-white">
        <Check className="size-6" aria-hidden="true" />
      </span>
      <p className="text-[1.15rem] font-semibold">Order placed</p>
      <p className="text-[0.9rem] text-[var(--app-muted)]">
        <span className="font-medium text-[var(--app-fg)] tabular-nums">
          {money(state.lastOrderTotal)}
        </span>{" "}
        charged. Delivery in 3–5 days.
      </p>
      <button
        type="button"
        onClick={() => dispatch({ type: "go", screen: "home" })}
        className="mt-2 rounded-full bg-[var(--app-fg)] px-5 py-2.5 text-[0.9rem] font-medium text-white"
      >
        Keep shopping
      </button>
    </div>
  );
}

function Stepper({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-lg bg-[var(--app-surface-2)] transition-colors",
      )}
    >
      {children}
    </button>
  );
}
