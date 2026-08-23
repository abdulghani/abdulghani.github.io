/** Language-independent project facts; names and prose live in app/i18n/content. */
export type ProjectSlug = "task-manager" | "wallet" | "finance" | "shop";

export type Project = {
  slug: ProjectSlug;
  year: string;
  stack: string[];
  href: string;
  thumbnail: string;
};

export const projects: Project[] = [
  {
    slug: "task-manager",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "useReducer"],
    href: "/portfolio/task-manager",
    thumbnail: "/task-manager.jpg",
  },
  {
    slug: "wallet",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "useReducer"],
    href: "/portfolio/wallet",
    thumbnail: "/wallet.jpg",
  },
  {
    slug: "finance",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "SVG chart"],
    href: "/portfolio/finance",
    thumbnail: "/finance.jpg",
  },
  {
    slug: "shop",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "SVG art"],
    href: "/portfolio/shop",
    thumbnail: "/shop.jpg",
  },
];

export function findProject(slug: ProjectSlug) {
  return projects.find((project) => project.slug === slug)!;
}
