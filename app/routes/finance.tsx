import type { Route } from "./+types/finance";
import { ProjectPage } from "~/components/project-page";
import { FinanceApp } from "~/components/prototype/finance/finance-app";
import { en } from "~/i18n/content/en";

export function meta(_: Route.MetaArgs) {
  const copy = en.projects["finance"];
  return [
    { title: `${copy.name} — ${en.portfolio.kind}` },
    { name: "description", content: copy.summary },
  ];
}

export default function FinanceAppRoute() {
  return (
    <ProjectPage slug="finance">
      <FinanceApp />
    </ProjectPage>
  );
}
