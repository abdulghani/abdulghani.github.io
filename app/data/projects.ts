export type Project = {
  slug: string;
  name: string;
  kind: "Interactive prototype";
  year: string;
  summary: string;
  role: string;
  stack: string[];
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export const projects: Project[] = [
  {
    slug: "task-manager",
    name: "Task manager",
    kind: "Interactive prototype",
    year: "2026",
    summary:
      "A mobile task app built from a static design: week planner, task detail with subtasks, and a new-task sheet. Every screen is wired to real state — create a task and it shows up in the list, the boards view and the activity feed.",
    role: "Design port, front-end",
    stack: ["React", "TypeScript", "Tailwind", "useReducer"],
    href: "/portfolio/task-manager",
    thumbnail: "/task-manager.jpg",
    thumbnailAlt:
      "The prototype's home screen on a phone: a week planner with Thursday selected and a high-priority task card.",
  },
  {
    slug: "wallet",
    name: "Wallet",
    kind: "Interactive prototype",
    year: "2026",
    summary:
      "A mobile wallet rebuilt from a two-screen design: a card you can actually pay off, accounts that filter the activity feed, a portfolio-growth chart with switchable ranges, and a watch list. Balances reconcile — paying a card debits the account behind it.",
    role: "Design port, front-end",
    stack: ["React", "TypeScript", "Tailwind", "useReducer"],
    href: "/portfolio/wallet",
    thumbnail: "/wallet.jpg",
    thumbnailAlt:
      "The wallet prototype on a phone: a balance, a lime payment card and a list of accounts.",
  },
  {
    slug: "finance",
    name: "Finance",
    kind: "Interactive prototype",
    year: "2026",
    summary:
      "A personal-finance app rebuilt from a four-screen design: a spend chart you pick months on, subscriptions you can pause, transactions filtered by account, and a savings target that answers to all of it. Pausing a plan moves the numbers on three other screens.",
    role: "Design port, front-end",
    stack: ["React", "TypeScript", "Tailwind", "SVG chart"],
    href: "/portfolio/finance",
    thumbnail: "/finance.jpg",
    thumbnailAlt:
      "The finance prototype on a phone: a total-spend card with a two-line chart, and income and expense tiles.",
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
