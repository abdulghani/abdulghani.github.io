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
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
