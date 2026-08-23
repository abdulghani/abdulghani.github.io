import { cn } from "~/lib/utils";

/**
 * Device bezel, status bar and home indicator around the prototype screens.
 * Colours come from --app-* tokens, so each prototype sets its own palette
 * through the class it passes in.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[23.5rem] max-w-full shrink-0 rounded-[2.75rem] border border-[var(--app-bezel)] bg-[var(--app-bezel)] p-2.5 shadow-2xl",
        className,
      )}
    >
      <div className="relative flex h-[46.5rem] max-h-[80dvh] flex-col overflow-hidden rounded-[2.25rem] bg-[var(--app-bg)] text-[var(--app-fg)]">
        <StatusBar />
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
        <div className="flex justify-center pt-1 pb-2">
          <span aria-hidden="true" className="h-1 w-32 rounded-full bg-[var(--app-fg)]/25" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-7 pt-3 pb-1 text-[0.8rem] font-semibold">
      <span>9:41</span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-7 w-24 -translate-x-1/2 rounded-full bg-black"
      />
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <Signal />
        <Wifi />
        <Battery />
      </span>
    </div>
  );
}

function Signal() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="1" />
      <rect x="4.5" y="5" width="3" height="6" rx="1" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
      <rect x="13.5" y="0" width="3" height="11" rx="1" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
      <path
        d="M1 3.5a10 10 0 0 1 14 0M3.5 6.2a6.5 6.5 0 0 1 9 0M6 8.8a3 3 0 0 1 4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Battery() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor" />
      <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
