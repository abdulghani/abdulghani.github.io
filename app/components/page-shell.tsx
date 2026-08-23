import { SiteRail } from "~/components/site-rail";
import { cn } from "~/lib/utils";

/**
 * Two-column shell shared by every page: sticky rail on the left, content on
 * the right, blueprint grid fading behind both.
 */
export function PageShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-fade pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 pb-24 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
        <SiteRail />
        <main className={cn("pt-0 lg:pt-14", wide ? "max-w-3xl" : "max-w-2xl")}>{children}</main>
      </div>
    </div>
  );
}
