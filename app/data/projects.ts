import financeThumb from "~/assets/finance.jpg";
import shopThumb from "~/assets/shop.jpg";
import taskManagerThumb from "~/assets/task-manager.jpg";
import walletThumb from "~/assets/wallet.jpg";

/**
 * Language-independent project facts; names and prose live in app/i18n/content.
 * Thumbnails are imported rather than served from /public so Vite fingerprints
 * them — a reshot image gets a new URL instead of sitting in a stale cache.
 */
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
    thumbnail: taskManagerThumb,
  },
  {
    slug: "wallet",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "useReducer"],
    href: "/portfolio/wallet",
    thumbnail: walletThumb,
  },
  {
    slug: "finance",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "SVG chart"],
    href: "/portfolio/finance",
    thumbnail: financeThumb,
  },
  {
    slug: "shop",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "SVG art"],
    href: "/portfolio/shop",
    thumbnail: shopThumb,
  },
];

export function findProject(slug: ProjectSlug) {
  return projects.find((project) => project.slug === slug)!;
}
