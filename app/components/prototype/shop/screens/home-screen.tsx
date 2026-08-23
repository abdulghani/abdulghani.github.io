import { ChevronRight, Search, Shirt, ShoppingBag, Sparkles, X } from "lucide-react";

import { cn } from "~/lib/utils";
import { ProductArt } from "../product-art";
import type { Action, Category, State } from "../shop-store";
import { categories, heroes, money, products, visibleProducts } from "../shop-store";

const CATEGORY_ART: Record<Exclude<Category, "All">, { art: Parameters<typeof ProductArt>[0]["art"]; hex: string }> = {
  Clothing: { art: "shirt", hex: "#8fb2d9" },
  Shoes: { art: "sneaker", hex: "#cdd0d2" },
  Hats: { art: "beanie", hex: "#a5522f" },
  Bags: { art: "bag", hex: "#141414" },
};

export function HomeScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const hero = heroes[state.heroIndex];
  const shown = visibleProducts(state);
  const sneakers = products.filter((product) => product.category === "Shoes");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto pb-6">
      {state.searchOpen && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 rounded-full bg-[var(--app-surface-2)] px-4 py-2.5">
            <Search className="size-4 text-[var(--app-muted)]" aria-hidden="true" />
            <input
              autoFocus
              value={state.query}
              onChange={(event) => dispatch({ type: "set-query", query: event.target.value })}
              placeholder="Search the store"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-[0.9rem] outline-none placeholder:text-[var(--app-muted)]"
            />
            {state.query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => dispatch({ type: "set-query", query: "" })}
              >
                <X className="size-4 text-[var(--app-muted)]" />
              </button>
            )}
          </div>
        </div>
      )}

      <section className="px-4">
        <div
          className="relative overflow-hidden rounded-3xl p-5 text-white"
          style={{ background: `linear-gradient(150deg, ${hero.from}, ${hero.to})` }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 -right-4 size-44 opacity-90 drop-shadow-xl"
          >
            <ProductArt art={hero.art} hex={hero.artHex} shade={false} />
          </span>

          <div className="h-24" />
          <h3 className="text-[2.2rem] leading-[0.98] font-semibold tracking-[-0.03em]">
            {hero.title.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h3>
          <p className="mt-2 max-w-[16ch] text-[0.82rem] opacity-90">{hero.copy}</p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "set-category", category: hero.cta })}
              className="flex items-center gap-2 rounded-full bg-white py-2.5 pr-2 pl-4 text-[0.9rem] font-medium text-[var(--app-fg)]"
            >
              Shop Now
              <span className="flex size-6 items-center justify-center rounded-full bg-[var(--app-fg)] text-white">
                <ChevronRight className="size-3.5" />
              </span>
            </button>
            <p className="flex max-w-[12ch] items-center gap-1.5 text-[0.72rem] leading-tight opacity-90">
              <Sparkles className="size-4 shrink-0" aria-hidden="true" />
              {hero.note}
            </p>
          </div>

          <div className="mt-4 flex gap-1.5">
            {heroes.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show ${slide.title}`}
                aria-current={index === state.heroIndex}
                onClick={() => dispatch({ type: "hero", index })}
                className={cn(
                  "h-1 rounded-full transition-all",
                  index === state.heroIndex ? "w-8 bg-white" : "w-5 bg-white/45",
                )}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((category) => {
          const active = state.category === category;
          const art = category === "All" ? null : CATEGORY_ART[category];
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => dispatch({ type: "set-category", category })}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-2xl border py-2 pr-4 pl-2 text-[0.85rem] font-medium transition-colors",
                active
                  ? "border-[var(--app-fg)] bg-[var(--app-fg)] text-white"
                  : "border-[var(--app-line)] bg-[var(--app-surface)] text-[var(--app-fg)]",
              )}
            >
              <span className="flex size-8 items-center justify-center overflow-hidden rounded-xl bg-[var(--app-surface-2)]">
                {art ? (
                  <ProductArt art={art.art} hex={art.hex} shade={false} className="p-0.5" />
                ) : (
                  <Shirt className="size-4 text-[var(--app-fg)]" />
                )}
              </span>
              {category}
            </button>
          );
        })}
      </div>

      {state.category === "All" && !state.query && (
        <section className="mt-3 px-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            <div className="flex w-36 shrink-0 flex-col justify-between rounded-3xl bg-[var(--app-surface)] p-4">
              <h4 className="text-[1.1rem] font-semibold">Sneakers</h4>
              <button
                type="button"
                onClick={() => dispatch({ type: "set-category", category: "Shoes" })}
                className="flex items-center gap-2 self-start rounded-full bg-[var(--app-fg)] py-2 pr-2 pl-4 text-[0.85rem] font-medium text-white"
              >
                View all
                <span className="flex size-5 items-center justify-center rounded-full bg-white text-[var(--app-fg)]">
                  <ChevronRight className="size-3" />
                </span>
              </button>
            </div>

            {sneakers.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => dispatch({ type: "open-product", id: product.id })}
                className="w-40 shrink-0 rounded-3xl bg-[var(--app-surface)] p-3 text-left"
              >
                <span className="block h-24 overflow-hidden rounded-2xl bg-[var(--app-surface-2)]">
                  <ProductArt art={product.art} hex={product.colors[0].hex} />
                </span>
                <span className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="truncate text-[0.85rem] font-medium">{product.name}</span>
                  <span className="shrink-0 text-[0.7rem] text-[var(--app-muted)]">
                    {product.sizes[0]}–{product.sizes.at(-1)?.replace("US ", "")}
                  </span>
                </span>
                <span className="text-[0.85rem] font-semibold tabular-nums">
                  {money(product.price)}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-4 px-4">
        <div className="flex items-baseline justify-between">
          <h4 className="text-[1.05rem] font-semibold">
            {state.query ? "Results" : state.category === "All" ? "Everything" : state.category}
          </h4>
          <span className="text-[0.75rem] text-[var(--app-muted)] tabular-nums">
            {shown.length} items
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {shown.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => dispatch({ type: "open-product", id: product.id })}
              className="flex items-center gap-3 rounded-3xl bg-[var(--app-surface)] p-3 text-left"
            >
              <span className="size-16 shrink-0 overflow-hidden rounded-2xl bg-[var(--app-surface-2)]">
                <ProductArt art={product.art} hex={product.colors[0].hex} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.95rem] font-medium">{product.name}</span>
                <span className="text-[0.75rem] text-[var(--app-muted)]">{product.label}</span>
                <span className="mt-1 block text-[0.9rem] font-semibold tabular-nums">
                  {money(product.price)}
                </span>
              </span>
              <span className="shrink-0 text-[0.7rem] text-[var(--app-muted)]">
                {product.sizes.length > 1
                  ? `${product.sizes[0]}–${product.sizes.at(-1)}`
                  : product.sizes[0]}
              </span>
            </button>
          ))}

          {shown.length === 0 && (
            <p className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-[var(--app-line)] px-4 py-8 text-center text-[0.85rem] text-[var(--app-muted)]">
              <ShoppingBag className="size-5" aria-hidden="true" />
              Nothing matches “{state.query}” in {state.category}.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
