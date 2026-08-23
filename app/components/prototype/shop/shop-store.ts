export type Screen = "home" | "product" | "cart" | "done";
export type ArtKind = "sweater" | "hoodie" | "shirt" | "jacket" | "sneaker" | "beanie" | "bag";
export type Category = "All" | "Clothing" | "Shoes" | "Hats" | "Bags";

export type Colorway = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  label: string;
  category: Exclude<Category, "All">;
  price: number;
  sizes: string[];
  colors: Colorway[];
  art: ArtKind;
  badge?: string;
  description: string;
};

export type CartLine = {
  id: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type HeroSlide = {
  id: string;
  title: string;
  copy: string;
  note: string;
  cta: Category;
  from: string;
  to: string;
  art: ArtKind;
  artHex: string;
};

export const heroes: HeroSlide[] = [
  {
    id: "winter",
    title: "Winter Deal",
    copy: "Warm gear. Cool prices. Limited time only.",
    note: "15% off new collection",
    cta: "Clothing",
    from: "#4b5340",
    to: "#8d7d6b",
    art: "beanie",
    artHex: "#a5522f",
  },
  {
    id: "arrivals",
    title: "New Arrivals",
    copy: "Heavyweight knits and washed denim, just landed.",
    note: "42 pieces added this week",
    cta: "Clothing",
    from: "#2f3a44",
    to: "#7f8b93",
    art: "jacket",
    artHex: "#b3ba9f",
  },
  {
    id: "kicks",
    title: "Court Classics",
    copy: "Low profiles in muted colourways.",
    note: "Free returns on shoes",
    cta: "Shoes",
    from: "#3d3a34",
    to: "#a39c8e",
    art: "sneaker",
    artHex: "#cdd0d2",
  },
];

export const products: Product[] = [
  {
    id: "sweater",
    name: "Sweater Heavyweight",
    label: "Loomstate",
    category: "Clothing",
    price: 164,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Bone", hex: "#e7e3da" },
      { name: "Fog", hex: "#ccd1d3" },
    ],
    art: "sweater",
    badge: "New Arrival",
    description:
      "Soft heavyweight knit with a relaxed oversized fit. Designed for everyday comfort and minimal styling.",
  },
  {
    id: "hoodie",
    name: "Hoodie Chernim Cherno",
    label: "Nocturne",
    category: "Clothing",
    price: 164,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#17181a" },
      { name: "Ash", hex: "#6f7275" },
    ],
    art: "hoodie",
    description:
      "Brushed-back fleece with a lined hood and piped seams. Cut long through the body.",
  },
  {
    id: "shirt-harbor",
    name: "Shirt Harbor striped",
    label: "Coastline",
    category: "Clothing",
    price: 154.22,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#f1efe9" },
      { name: "Blue", hex: "#8fb2d9" },
    ],
    art: "shirt",
    description:
      "Camp-collar shirt in a light striped weave. Boxy through the shoulder, straight hem.",
  },
  {
    id: "jacket",
    name: "Jacket Ashwave Denim",
    label: "Ashwave",
    category: "Clothing",
    price: 340,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Sage", hex: "#b3ba9f" },
      { name: "Indigo", hex: "#4a5b7a" },
    ],
    art: "jacket",
    description:
      "Washed denim trucker with a broken-in hand feel. Cropped, with pleated front panels.",
  },
  {
    id: "dune",
    name: "Dune Low",
    label: "Court",
    category: "Shoes",
    price: 164,
    sizes: ["US 7", "US 7.5", "US 8", "US 9", "US 10", "US 11"],
    colors: [
      { name: "Grey", hex: "#cdd0d2" },
      { name: "Green", hex: "#b6c4a2" },
    ],
    art: "sneaker",
    description: "Low-top leather trainer on a gum-free cupsole. Panelled in two tones.",
  },
  {
    id: "court",
    name: "Court 7900",
    label: "Court",
    category: "Shoes",
    price: 120,
    sizes: ["US 7", "US 7.5", "US 8", "US 9", "US 10"],
    colors: [
      { name: "White", hex: "#efeeea" },
      { name: "Black", hex: "#1b1b1b" },
    ],
    art: "sneaker",
    description: "Chunky trainer with a stacked midsole and mesh underlays.",
  },
  {
    id: "beanie",
    name: "Beanie Ridge",
    label: "Northline",
    category: "Hats",
    price: 48,
    sizes: ["One size"],
    colors: [
      { name: "Rust", hex: "#a5522f" },
      { name: "Slate", hex: "#5d6b74" },
    ],
    art: "beanie",
    description: "Marled lambswool beanie with a deep turn-up.",
  },
  {
    id: "duffle",
    name: "Duffle Ninety",
    label: "Carryall",
    category: "Bags",
    price: 210,
    sizes: ["One size"],
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Olive", hex: "#5a5f45" },
    ],
    art: "bag",
    description: "Coated canvas weekender with a detachable strap and boot compartment.",
  },
];

export const categories: Category[] = ["All", "Clothing", "Shoes", "Hats", "Bags"];

const seedCart: CartLine[] = [
  { id: "line-1", productId: "shirt-harbor", size: "S", color: "White", qty: 1 },
  { id: "line-2", productId: "jacket", size: "M", color: "Washed Sage", qty: 2 },
  { id: "line-3", productId: "dune", size: "US 7.5", color: "Green", qty: 1 },
];

export type State = {
  screen: Screen;
  productId: string | null;
  heroIndex: number;
  imageIndex: number;
  category: Category;
  query: string;
  searchOpen: boolean;
  size: string | null;
  color: string | null;
  sizeError: boolean;
  cart: CartLine[];
  wishlist: string[];
  lastOrderTotal: number;
};

export type Action =
  | { type: "go"; screen: Screen }
  | { type: "open-product"; id: string }
  | { type: "hero"; index: number }
  | { type: "image"; delta: number }
  | { type: "set-category"; category: Category }
  | { type: "set-query"; query: string }
  | { type: "toggle-search" }
  | { type: "set-size"; size: string }
  | { type: "set-color"; color: string }
  | { type: "add-to-cart" }
  | { type: "set-qty"; id: string; delta: number }
  | { type: "remove-line"; id: string }
  | { type: "toggle-wishlist"; id: string }
  | { type: "checkout" }
  | { type: "reset" };

export const initialState: State = {
  screen: "home",
  productId: null,
  heroIndex: 0,
  imageIndex: 0,
  category: "All",
  query: "",
  searchOpen: false,
  size: null,
  color: null,
  sizeError: false,
  cart: seedCart,
  wishlist: ["sweater"],
  lastOrderTotal: 0,
};

let counter = 0;

const TYPE_LABEL: Record<ArtKind, string> = {
  sweater: "Sweater",
  hoodie: "Hoodie",
  shirt: "Shirt",
  jacket: "Jacket",
  sneaker: "Sneakers",
  beanie: "Beanie",
  bag: "Duffle",
};

export function typeLabel(art: ArtKind) {
  return TYPE_LABEL[art];
}

export function findProduct(id: string | null) {
  return products.find((product) => product.id === id) ?? null;
}

export function cartCount(state: State) {
  return state.cart.reduce((sum, line) => sum + line.qty, 0);
}

export function subtotal(state: State) {
  return state.cart.reduce((sum, line) => {
    const product = findProduct(line.productId);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);
}

export function visibleProducts(state: State) {
  const query = state.query.trim().toLowerCase();
  return products.filter((product) => {
    const inCategory = state.category === "All" || product.category === state.category;
    const matches =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.label.toLowerCase().includes(query);
    return inCategory && matches;
  });
}

export function money(value: number) {
  const decimals = Number.isInteger(value) ? 0 : 2;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "go":
      return { ...state, screen: action.screen, sizeError: false };

    case "open-product": {
      const product = findProduct(action.id);
      return {
        ...state,
        screen: "product",
        productId: action.id,
        imageIndex: 0,
        size: product?.sizes.length === 1 ? product.sizes[0] : null,
        color: product?.colors[0]?.name ?? null,
        sizeError: false,
      };
    }

    case "hero":
      return { ...state, heroIndex: action.index };

    case "image": {
      const product = findProduct(state.productId);
      const count = product ? product.colors.length + 2 : 1;
      return { ...state, imageIndex: (state.imageIndex + action.delta + count) % count };
    }

    case "set-category":
      return { ...state, category: action.category };

    case "set-query":
      return { ...state, query: action.query };

    case "toggle-search":
      return { ...state, searchOpen: !state.searchOpen, query: state.searchOpen ? "" : state.query };

    case "set-size":
      return { ...state, size: action.size, sizeError: false };

    case "set-color":
      return { ...state, color: action.color };

    case "add-to-cart": {
      const product = findProduct(state.productId);
      if (!product) return state;
      if (!state.size) return { ...state, sizeError: true };

      const color = state.color ?? product.colors[0].name;
      const existing = state.cart.find(
        (line) => line.productId === product.id && line.size === state.size && line.color === color,
      );

      const cart = existing
        ? state.cart.map((line) =>
            line.id === existing.id ? { ...line, qty: line.qty + 1 } : line,
          )
        : [
            ...state.cart,
            { id: `line-add-${++counter}`, productId: product.id, size: state.size, color, qty: 1 },
          ];

      return { ...state, cart, screen: "cart", sizeError: false };
    }

    case "set-qty": {
      const cart = state.cart
        .map((line) =>
          line.id === action.id ? { ...line, qty: Math.max(0, line.qty + action.delta) } : line,
        )
        .filter((line) => line.qty > 0);
      return { ...state, cart };
    }

    case "remove-line":
      return { ...state, cart: state.cart.filter((line) => line.id !== action.id) };

    case "toggle-wishlist":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      };

    case "checkout": {
      if (state.cart.length === 0) return state;
      return { ...state, lastOrderTotal: subtotal(state), cart: [], screen: "done" };
    }

    case "reset":
      return { ...initialState, cart: seedCart };

    default:
      return state;
  }
}
