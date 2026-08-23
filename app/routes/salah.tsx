import type { Route } from "./+types/salah";
import { ProjectPage } from "~/components/project-page";
import { SalahApp } from "~/components/prototype/salah/salah-app";
import { en } from "~/i18n/content/en";

export function meta(_: Route.MetaArgs) {
  const copy = en.projects["salah"];
  return [
    { title: `${copy.name} — ${en.portfolio.kind}` },
    { name: "description", content: copy.summary },
  ];
}

export default function SalahRoute() {
  return (
    <ProjectPage slug="salah">
      <SalahApp />
    </ProjectPage>
  );
}
