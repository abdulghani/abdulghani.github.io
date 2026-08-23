import { Link, useLocation } from "react-router";

import { ThemeToggle } from "~/components/theme-toggle";
import { cn } from "~/lib/utils";
import { contacts, profile, sections } from "~/data/resume";
import { useActiveSection } from "~/hooks/use-active-section";

export function SiteRail() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(sections.map((s) => s.id));

  // Section links are in-page anchors on the home page and cross-page links
  // everywhere else.
  const items = [
    ...sections.map((section) => ({
      key: section.id,
      label: section.label,
      to: onHome ? `#${section.id}` : `/#${section.id}`,
      active: onHome && activeSection === section.id,
    })),
    {
      key: "work",
      label: "Work",
      to: "/portfolio",
      active: pathname.startsWith("/portfolio"),
    },
  ];

  return (
    <header className="flex flex-col gap-7 py-11 lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto lg:py-14">
      <div className="flex items-center gap-3">
        <p className="label">Portfolio</p>
        <span className="h-px flex-1 bg-border" />
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.1rem)] leading-[0.94] font-extrabold tracking-[-0.03em] text-balance">
          <Link to="/" className="hover:opacity-90">
            {profile.firstName}
            <span className="block text-primary">{profile.lastName}</span>
          </Link>
        </h1>
        <p className="font-mono text-[0.78rem] leading-7 text-muted-foreground">
          {profile.title}
          <br />
          {profile.location} · {profile.timezone}
          <br />
          {profile.availability}
        </p>
      </div>

      <nav aria-label="Sections">
        <ol className="flex flex-row flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-0.5">
          {items.map((item) => {
            const className = cn(
              "flex items-baseline gap-2.5 py-1 font-mono text-xs tracking-[0.04em] transition-colors lg:border-b lg:border-transparent",
              item.active
                ? "text-foreground lg:border-border"
                : "text-muted-foreground hover:text-foreground lg:hover:border-border",
            );
            const marker = (
              <span
                className={cn("text-primary transition-opacity", item.active ? "opacity-100" : "opacity-60")}
                aria-hidden="true"
              >
                {item.active ? "→" : "/"}
              </span>
            );

            return (
              <li key={item.key}>
                {item.to.startsWith("#") ? (
                  <a href={item.to} aria-current={item.active ? "true" : undefined} className={className}>
                    {marker}
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    aria-current={item.active ? "page" : undefined}
                    className={className}
                  >
                    {marker}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <ul className="flex flex-col gap-1.5 font-mono text-xs">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {contact.value}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
