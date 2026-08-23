import type { Route } from "./+types/wallet";
import { ProjectPage } from "~/components/project-page";
import { WalletApp } from "~/components/prototype/wallet/wallet-app";
import { en } from "~/i18n/content/en";

export function meta(_: Route.MetaArgs) {
  const copy = en.projects["wallet"];
  return [
    { title: `${copy.name} — ${en.portfolio.kind}` },
    { name: "description", content: copy.summary },
  ];
}

export default function WalletAppRoute() {
  return (
    <ProjectPage slug="wallet">
      <WalletApp />
    </ProjectPage>
  );
}
