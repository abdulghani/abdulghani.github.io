import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

import type { Route } from "./+types/shop";
import { PageShell } from "~/components/page-shell";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { ShopApp } from "~/components/prototype/shop/shop-app";
import { findProject } from "~/data/projects";

const project = findProject("shop")!;

const NOTES = [
  {
    title: "A bag that can be wrong",
    body: "Adding to cart refuses an unsized product and says so; a line at quantity one turns its minus into a delete; checkout empties the bag and reports what it charged. The badge in the header counts units, not lines.",
  },
  {
    title: "Search and categories compose",
    body: "The category chips and the search field filter the same list rather than owning separate ones, so searching inside Shoes narrows within Shoes and the empty state names both.",
  },
  {
    title: "Drawn, not borrowed",
    body: "The source design leans on product photography I have no licence to. Every garment here is flat SVG art tinted by the selected colourway, so choosing a colour restyles the product, the cart thumbnail and the category chip from one value.",
  },
];

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Shop prototype — Abdul Ghani" },
    {
      name: "description",
      content:
        "An interactive rebuild of a fashion e-commerce design: hero carousel, filterable catalogue, product page with size and colour selection, and a working cart with checkout.",
    },
  ];
}

export default function ShopRoute() {
  return (
    <PageShell wide>
      <section className="pb-14">
        <Link
          to="/portfolio"
          className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-3.5" />
          Work
        </Link>

        <SectionHeading title={project.name} meta={project.kind} />

        <p className="mb-4 text-xl leading-[1.55] text-balance">
          A three-screen storefront, rebuilt as a shop you can actually run through: browse or
          search, pick a size and colour, add to the bag, change your mind, and check out.
        </p>
        <p className="mb-6 text-muted-foreground">
          Fourth port on the same device shell. Product photography is replaced with drawn SVG
          garments — see the last build note.
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="rounded-sm bg-card font-mono text-[0.66rem] tracking-[0.05em] text-muted-foreground"
            >
              {item}
            </Badge>
          ))}
        </div>

        <div className="my-8 flex justify-center">
          <ShopApp />
        </div>

        <h3 className="label mt-12 mb-3">Build notes</h3>
        <div className="grid gap-px overflow-hidden rounded-sm border bg-border">
          {NOTES.map((note) => (
            <article key={note.title} className="bg-card px-5 py-4">
              <h4 className="font-display text-[1.05rem] font-semibold tracking-[-0.01em]">
                {note.title}
              </h4>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {note.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Original design: a fashion commerce concept shot. Rebuilt for practice — not affiliated
          with its author. Brands, products and prices are invented.
        </p>
      </section>
    </PageShell>
  );
}
