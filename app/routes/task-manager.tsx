import type { Route } from "./+types/task-manager";
import { ProjectPage } from "~/components/project-page";
import { TaskApp } from "~/components/prototype/task-app";
import { en } from "~/i18n/content/en";

export function meta(_: Route.MetaArgs) {
  const copy = en.projects["task-manager"];
  return [
    { title: `${copy.name} — ${en.portfolio.kind}` },
    { name: "description", content: copy.summary },
  ];
}

export default function TaskAppRoute() {
  return (
    <ProjectPage slug="task-manager">
      <TaskApp />
    </ProjectPage>
  );
}
