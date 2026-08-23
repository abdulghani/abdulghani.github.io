import type { Route } from "./+types/shop";
import { ProjectPage } from "~/components/project-page";
import { ShopApp } from "~/components/prototype/shop/shop-app";
import { en } from "~/i18n/content/en";

export function meta(_: Route.MetaArgs) {
  const copy = en.projects["shop"];
  return [
    { title: `${copy.name} — ${en.portfolio.kind}` },
    { name: "description", content: copy.summary },
  ];
}

export default function ShopAppRoute() {
  return (
    <ProjectPage slug="shop">
      <ShopApp />
    </ProjectPage>
  );
}
