import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";

import { cn } from "~/lib/utils";
import { ProductArt } from "../product-art";
import type { Action, State } from "../shop-store";
import { findProduct, money } from "../shop-store";

export function ProductScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const product = findProduct(state.productId);
  if (!product) return null;

  const color = product.colors.find((item) => item.name === state.color) ?? product.colors[0];
  const shots = product.colors.length + 2;
  const wished = state.wishlist.includes(product.id);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto pb-6">
      <div className="relative">
        <div className="flex h-72 items-center justify-center bg-[var(--app-surface-2)]">
          <div
            className={cn(
              "transition-transform duration-300",
              state.imageIndex % shots === 1 && "scale-90 rotate-[-4deg]",
              state.imageIndex % shots === 2 && "scale-110",
            )}
          >
            <ProductArt art={product.art} hex={color.hex} className="size-56" />
          </div>
        </div>

        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Back to shop"
            onClick={() => dispatch({ type: "go", screen: "home" })}
            className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface)] shadow-sm"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="flex gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface)] shadow-sm">
              <Share2 className="size-4" aria-hidden="true" />
            </span>
            <button
              type="button"
              aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              onClick={() => dispatch({ type: "toggle-wishlist", id: product.id })}
              className="flex size-9 items-center justify-center rounded-full bg-[var(--app-surface)] shadow-sm"
            >
              <Heart className={cn("size-4", wished && "fill-[var(--app-fg)]")} />
            </button>
          </span>
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => dispatch({ type: "image", delta: -1 })}
          className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--app-surface)] shadow-sm"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => dispatch({ type: "image", delta: 1 })}
          className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--app-surface)] shadow-sm"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {Array.from({ length: shots }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1 rounded-full transition-all",
                index === state.imageIndex % shots
                  ? "w-6 bg-[var(--app-fg)]"
                  : "w-4 bg-[var(--app-fg)]/25",
              )}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {product.badge && (
          <span className="inline-flex rounded-full bg-[var(--app-surface-2)] px-3 py-1 text-[0.72rem] font-medium">
            {product.badge}
          </span>
        )}

        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-[1.35rem] leading-tight font-semibold tracking-[-0.02em] text-balance">
            {product.name}
          </h3>
          <p className="shrink-0 text-[1.2rem] font-semibold tabular-nums">{money(product.price)}</p>
        </div>

        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[var(--app-muted)]">
          {product.description}
        </p>

        <p className="mt-4 text-[0.78rem] text-[var(--app-muted)]">Colour · {color.name}</p>
        <div className="mt-1.5 flex gap-2">
          {product.colors.map((item) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={item.name === color.name}
              aria-label={item.name}
              onClick={() => dispatch({ type: "set-color", color: item.name })}
              style={{ background: item.hex }}
              className={cn(
                "size-8 rounded-full border transition-all",
                item.name === color.name
                  ? "border-[var(--app-fg)] ring-2 ring-[var(--app-fg)] ring-offset-2 ring-offset-[var(--app-bg)]"
                  : "border-[var(--app-line)]",
              )}
            />
          ))}
        </div>

        <p className="mt-4 text-[0.78rem] text-[var(--app-muted)]">Size</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={state.size === size}
              onClick={() => dispatch({ type: "set-size", size })}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[0.82rem] transition-colors",
                state.size === size
                  ? "border-[var(--app-fg)] bg-[var(--app-fg)] text-white"
                  : "border-[var(--app-line)] bg-[var(--app-surface)]",
              )}
            >
              {size}
            </button>
          ))}
        </div>

        {state.sizeError && (
          <p role="alert" className="mt-2 text-[0.78rem] text-[var(--app-down)]">
            Choose a size first.
          </p>
        )}

        <button
          type="button"
          onClick={() => dispatch({ type: "add-to-cart" })}
          className="mt-5 w-full rounded-full bg-[var(--app-fg)] py-3.5 text-[0.95rem] font-medium text-white"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
