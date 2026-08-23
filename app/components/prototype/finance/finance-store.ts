export type Tab = "home" | "merchants" | "banking" | "account";

export type Month = {
  key: string;
  /** Base figures, before subscriptions are added on top. */
  spend: number;
  income: number;
  expense: number;
  /** Chart series, in thousands. */
  thisYear: number;
  lastYear: number;
};

export type Subscription = {
  id: string;
  name: string;
  plan: string;
  amount: number;
  pending?: number;
  paused: boolean;
};

export type Account = { id: string; name: string; balance: number; tone: string };
export type Transaction = {
  id: string;
  name: string;
  accountId: string;
  masked: string;
  amount: number;
  when: string;
};

export const months: Month[] = [
  { key: "Jan", spend: 1101.47, income: 1402.1, expense: 741.62, thisYear: 5.2, lastYear: 6.1 },
  { key: "Feb", spend: 1263.82, income: 1488.3, expense: 826.27, thisYear: 7.9, lastYear: 4.6 },
  { key: "Mar", spend: 1379.97, income: 1537.86, expense: 858.93, thisYear: 6.85, lastYear: 6.2 },
  { key: "Apr", spend: 1196.67, income: 1610.44, expense: 793.4, thisYear: 9.1, lastYear: 5.4 },
];

const subscriptions: Subscription[] = [
  { id: "adobe", name: "Adobe", plan: "Monthly Bill", amount: 52.99, paused: false },
  { id: "spotify", name: "Spotify", plan: "Subscription", amount: 10.99, paused: false },
  { id: "netflix", name: "Netflix", plan: "Monthly Plan", amount: 14.95, pending: -3, paused: false },
];

const accounts: Account[] = [
  { id: "ab", name: "AB Bank", balance: 7262, tone: "bg-[var(--app-accent-soft)] text-[var(--app-accent)]" },
  { id: "fillo", name: "Fillo", balance: 7262, tone: "bg-[var(--app-accent)] text-white" },
];

const transactions: Transaction[] = [
  { id: "tx-1", name: "William Jane", accountId: "ab", masked: "***456", amount: 120, when: "Today, 20 Jan" },
  { id: "tx-2", name: "Grocer & Co", accountId: "ab", masked: "***456", amount: -64.2, when: "Today, 20 Jan" },
  { id: "tx-3", name: "Dianne Russell", accountId: "fillo", masked: "***118", amount: -240, when: "Yesterday" },
  { id: "tx-4", name: "Payroll", accountId: "fillo", masked: "***118", amount: 3200, when: "19 Jan" },
  { id: "tx-5", name: "City Power", accountId: "ab", masked: "***456", amount: -88.4, when: "18 Jan" },
];

export type State = {
  tab: Tab;
  monthIndex: number;
  subscriptions: Subscription[];
  openSubscription: string | null;
  accounts: Account[];
  transactions: Transaction[];
  accountFilter: string | null;
  showAllTransactions: boolean;
  goal: number;
  savedThisMonth: number;
  savedAllMonth: number;
  streakWeeks: number;
  daysLeft: number;
};

export type Action =
  | { type: "set-tab"; tab: Tab }
  | { type: "select-month"; index: number }
  | { type: "toggle-subscription"; id: string }
  | { type: "open-subscription"; id: string }
  | { type: "filter-account"; id: string | null }
  | { type: "toggle-all-transactions" }
  | { type: "add-savings"; amount: number }
  | { type: "reset" };

export const initialState: State = {
  tab: "home",
  monthIndex: 2,
  subscriptions,
  openSubscription: "netflix",
  accounts,
  transactions,
  accountFilter: null,
  showAllTransactions: false,
  goal: 4560,
  savedThisMonth: 178,
  savedAllMonth: 1200,
  streakWeeks: 3,
  daysLeft: 5,
};

let counter = 0;

export function subscriptionTotal(state: State) {
  return state.subscriptions
    .filter((item) => !item.paused)
    .reduce((sum, item) => sum + item.amount, 0);
}

export function pausedTotal(state: State) {
  return state.subscriptions
    .filter((item) => item.paused)
    .reduce((sum, item) => sum + item.amount, 0);
}

/** Spend and expense both carry the active subscriptions, so pausing one shows up on the home screen. */
export function monthFigures(state: State) {
  const month = months[state.monthIndex];
  const subs = subscriptionTotal(state);
  return {
    month,
    spend: month.spend + subs,
    income: month.income,
    expense: month.expense + subs,
  };
}

export function targetFigures(state: State) {
  const left = Math.max(0, state.goal - state.savedThisMonth);
  return {
    left,
    pctLeft: Math.round((left / state.goal) * 100),
    pctDone: Math.min(100, Math.round((state.savedThisMonth / state.goal) * 100)),
    perDay: state.daysLeft > 0 ? left / state.daysLeft : 0,
  };
}

export function money(value: number, decimals = 2) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set-tab":
      return { ...state, tab: action.tab };

    case "select-month":
      return { ...state, monthIndex: action.index };

    case "toggle-subscription":
      return {
        ...state,
        subscriptions: state.subscriptions.map((item) =>
          item.id === action.id ? { ...item, paused: !item.paused } : item,
        ),
      };

    case "open-subscription":
      return {
        ...state,
        openSubscription: state.openSubscription === action.id ? null : action.id,
      };

    case "filter-account":
      return { ...state, accountFilter: action.id };

    case "toggle-all-transactions":
      return { ...state, showAllTransactions: !state.showAllTransactions };

    case "add-savings":
      return {
        ...state,
        savedThisMonth: state.savedThisMonth + action.amount,
        savedAllMonth: state.savedAllMonth + action.amount,
        transactions: [
          {
            id: `tx-${++counter}`,
            name: "Transfer to savings",
            accountId: "ab",
            masked: "***456",
            amount: -action.amount,
            when: "Just now",
          },
          ...state.transactions,
        ],
      };

    case "reset":
      return { ...initialState, subscriptions, accounts, transactions };

    default:
      return state;
  }
}
