import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import type { Route } from "./+types/home";

import { PageShell } from "~/components/page-shell";
import { About } from "~/components/sections/about";
import { Education } from "~/components/sections/education";
import { Experience } from "~/components/sections/experience";
import { Stack } from "~/components/sections/stack";
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
    <PageShell>
      <About />

      <Link
        to="/portfolio"
        className="group -mt-8 mb-14 flex items-center justify-between gap-4 rounded-sm border bg-card px-5 py-4 transition-colors hover:bg-accent"
      >
        <span>
          <span className="label block">Selected work</span>
          <span className="mt-1 block text-[0.98rem]">
            An interactive task-manager prototype, rebuilt from a static design
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
        />
      </Link>

      <Experience />
      <Stack />
      <Education />
    </PageShell>
  );
}
