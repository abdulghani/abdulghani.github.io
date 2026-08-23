import type { Route } from "./+types/home";

import { About } from "~/components/sections/about";
import { Education } from "~/components/sections/education";
import { Experience } from "~/components/sections/experience";
import { Stack } from "~/components/sections/stack";
import { SiteRail } from "~/components/site-rail";
import { profile } from "~/data/resume";

export function meta(_: Route.MetaArgs) {
  const description = `Portfolio of ${profile.name}, ${profile.title.toLowerCase()} in ${profile.location} building REST and GraphQL services, cloud infrastructure and CI/CD.`;

  return [
    { title: `${profile.name} — Back-end Engineer` },
    { name: "description", content: description },
    { property: "og:title", content: `${profile.name} — ${profile.title}` },
    { property: "og:description", content: description },
    { property: "og:type", content: "profile" },
  ];
}

export default function Home() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-fade pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-24 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16 lg:items-start">
        <SiteRail />

        <main className="max-w-2xl pt-0 lg:pt-14">
          <About />
          <Experience />
          <Stack />
          <Education />
        </main>
      </div>
    </div>
  );
}
