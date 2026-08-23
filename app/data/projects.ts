export type Project = {
  slug: string;
  name: string;
  kind: "Interactive prototype" | "Case study";
  year: string;
  summary: string;
  role: string;
  stack: string[];
  /** Set when the project has a page of its own. */
  href?: string;
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
  },
  {
    slug: "bank-aggregation-api",
    name: "Bank aggregation API",
    kind: "Case study",
    year: "2022 — 2025",
    summary:
      "Corporate treasury platform aggregating several banks and eleven services behind one REST API. Request signing, encryption and certificate-based auth to meet bank security standards; sequential processing reworked to run in parallel.",
    role: "Senior back-end engineer at Necto",
    stack: ["Node.js", "REST", "Cryptography", "CI/CD"],
  },
  {
    slug: "graphql-microservices",
    name: "GraphQL microservice split",
    kind: "Case study",
    year: "2021 — 2022",
    summary:
      "Broke a monolithic API into domain-separated services on NATS, each deployed independently. Auto-scaling took server instances from thousands to hundreds while raising peak traffic capacity by 200%.",
    role: "Senior back-end engineer at Pawjourr",
    stack: ["GraphQL", "Nest.js", "NATS", "AWS", "Azure"],
  },
  {
    slug: "serverless-retail",
    name: "Serverless retail services",
    kind: "Case study",
    year: "2020 — 2021",
    summary:
      "Led a mobile retail platform's backend from a single Express service into serverless functions, with ORM tooling for consistent data access and a CircleCI pipeline covering both.",
    role: "Lead back-end engineer at Kaddra",
    stack: ["Serverless", "Express", "CircleCI", "ORM"],
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
