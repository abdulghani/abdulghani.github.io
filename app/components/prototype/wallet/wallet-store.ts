export type Tab = "wallet" | "rewards" | "cards" | "settings";
export type View = "overview" | "growth";
export type Range = "7D" | "30D" | "90D";

export type Account = { id: string; name: string; balance: number; tone: string };
export type Card = { id: string; last4: string; due: number; label: string; frozen: boolean };
export type Movement = { id: string; title: string; amount: number; accountId: string; when: string };
export type Coin = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  tone: string;
  watched: boolean;
};
export type Reward = { id: string; title: string; detail: string; value: number; claimed: boolean };

export const accounts: Account[] = [
  { id: "chequing", name: "Chequing", balance: 4756.67, tone: "bg-[#4f7cff]" },
  { id: "savings", name: "Savings", balance: 12300.18, tone: "bg-[#2fbf71]" },
  { id: "crypto", name: "Crypto", balance: 4756.67, tone: "bg-[#f7931a]" },
];

const cards: Card[] = [
  { id: "card-1", last4: "3090", due: 140.89, label: "Everyday", frozen: false },
  { id: "card-2", last4: "7742", due: 0, label: "Travel", frozen: false },
  { id: "card-3", last4: "1188", due: 89.2, label: "Business", frozen: false },
];

const movements: Movement[] = [
  { id: "mv-1", title: "Spotify", amount: -9.99, accountId: "chequing", when: "Today" },
  { id: "mv-2", title: "Salary", amount: 3200, accountId: "chequing", when: "Yesterday" },
  { id: "mv-3", title: "Bitcoin buy", amount: -250, accountId: "crypto", when: "Yesterday" },
  { id: "mv-4", title: "Transfer in", amount: 500, accountId: "savings", when: "2 days ago" },
  { id: "mv-5", title: "Groceries", amount: -84.2, accountId: "chequing", when: "3 days ago" },
];

const coins: Coin[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 83241, change: 1204.5, changePct: 1.47, tone: "bg-[#f7931a]", watched: true },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 1934.2, change: 84.1, changePct: 4.55, tone: "bg-[#3c3c3d]", watched: true },
  { id: "sol", name: "Solana", symbol: "SOL", price: 128.4, change: -9.32, changePct: -6.77, tone: "bg-[#1b1b3a]", watched: true },
  { id: "usdc", name: "USD Coin", symbol: "USDC", price: 1, change: 0.001, changePct: 0.1, tone: "bg-[#2775ca]", watched: true },
  { id: "vri", name: "Veritaseum", symbol: "VRI", price: 11.68, change: 0.03, changePct: 9.6, tone: "bg-[#e8642c]", watched: true },
];

const rewards: Reward[] = [
  { id: "rw-1", title: "Groceries cashback", detail: "5% back on your last grocery run", value: 12.4, claimed: false },
  { id: "rw-2", title: "Referral bonus", detail: "Your friend Dianne opened an account", value: 25, claimed: false },
  { id: "rw-3", title: "Round-up boost", detail: "Double round-ups for a week", value: 6.8, claimed: false },
];

/** Daily change in dollars; the chart and the growth figure both read this. */
export const series: Record<Range, { label: string; value: number }[]> = {
  "7D": [
    { label: "T", value: 320 },
    { label: "W", value: -140 },
    { label: "T", value: -210 },
    { label: "F", value: 480 },
    { label: "S", value: 720 },
    { label: "S", value: 960 },
    { label: "M", value: 1240 },
  ],
  "30D": [
    { label: "W1", value: 1420 },
    { label: "W2", value: -380 },
    { label: "W3", value: 2260 },
    { label: "W4", value: 1810 },
  ],
  "90D": [
    { label: "Mar", value: 2480 },
    { label: "Apr", value: -1120 },
    { label: "May", value: 3640 },
  ],
};

export type State = {
  accounts: Account[];
  cards: Card[];
  movements: Movement[];
  coins: Coin[];
  rewards: Reward[];
  tab: Tab;
  view: View;
  cardIndex: number;
  accountFilter: string | null;
  range: Range;
  selectedBar: number | null;
  hideBalances: boolean;
  notifications: boolean;
};

export type Action =
  | { type: "set-tab"; tab: Tab }
  | { type: "set-view"; view: View }
  | { type: "set-card"; index: number }
  | { type: "step-card"; delta: number }
  | { type: "pay-card"; id: string }
  | { type: "freeze-card"; id: string }
  | { type: "filter-account"; id: string | null }
  | { type: "set-range"; range: Range }
  | { type: "select-bar"; index: number | null }
  | { type: "toggle-watch"; id: string }
  | { type: "claim-reward"; id: string }
  | { type: "toggle-setting"; key: "hideBalances" | "notifications" }
  | { type: "reset" };

export const initialState: State = {
  accounts,
  cards,
  movements,
  coins,
  rewards,
  tab: "wallet",
  view: "overview",
  cardIndex: 0,
  accountFilter: null,
  range: "7D",
  selectedBar: null,
  hideBalances: false,
  notifications: true,
};

let counter = 0;

export function totalBalance(state: State) {
  return state.accounts.reduce((sum, account) => sum + account.balance, 0);
}

export function growth(state: State) {
  const points = series[state.range];
  const total = points.reduce((sum, point) => sum + point.value, 0);
  const base = totalBalance(state) - total;
  return { total, pct: base > 0 ? (total / base) * 100 : 0 };
}

export function money(value: number, hide = false, decimals = 2) {
  if (hide) return "••••••";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function signed(value: number, hide = false) {
  if (hide) return "••••";
  return `${value >= 0 ? "+" : "−"}${money(Math.abs(value))}`;
}

function credit(state: State, accountId: string, amount: number, title: string): State {
  return {
    ...state,
    accounts: state.accounts.map((account) =>
      account.id === accountId ? { ...account, balance: account.balance + amount } : account,
    ),
    movements: [
      { id: `mv-${++counter}`, title, amount, accountId, when: "Just now" },
      ...state.movements,
    ],
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set-tab":
      return { ...state, tab: action.tab, view: "overview" };

    case "set-view":
      return { ...state, view: action.view, selectedBar: null };

    case "set-card":
      return { ...state, cardIndex: action.index };

    case "step-card": {
      const next = (state.cardIndex + action.delta + state.cards.length) % state.cards.length;
      return { ...state, cardIndex: next };
    }

    case "pay-card": {
      const card = state.cards.find((item) => item.id === action.id);
      if (!card || card.due === 0 || card.frozen) return state;
      const paid = credit(state, "chequing", -card.due, `Card •••• ${card.last4} payment`);
      return {
        ...paid,
        cards: paid.cards.map((item) => (item.id === card.id ? { ...item, due: 0 } : item)),
      };
    }

    case "freeze-card":
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.id ? { ...card, frozen: !card.frozen } : card,
        ),
      };

    case "filter-account":
      return { ...state, accountFilter: action.id };

    case "set-range":
      return { ...state, range: action.range, selectedBar: null };

    case "select-bar":
      return { ...state, selectedBar: state.selectedBar === action.index ? null : action.index };

    case "toggle-watch":
      return {
        ...state,
        coins: state.coins.map((coin) =>
          coin.id === action.id ? { ...coin, watched: !coin.watched } : coin,
        ),
      };

    case "claim-reward": {
      const reward = state.rewards.find((item) => item.id === action.id);
      if (!reward || reward.claimed) return state;
      const credited = credit(state, "chequing", reward.value, `${reward.title} reward`);
      return {
        ...credited,
        rewards: credited.rewards.map((item) =>
          item.id === reward.id ? { ...item, claimed: true } : item,
        ),
      };
    }

    case "toggle-setting":
      return { ...state, [action.key]: !state[action.key] };

    case "reset":
      return { ...initialState, accounts, cards, movements, coins, rewards };

    default:
      return state;
  }
}
