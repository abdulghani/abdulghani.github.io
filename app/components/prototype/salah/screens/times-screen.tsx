import { Bell, BellOff, Building2, CloudDownload, Moon, Settings, Sun, Sunrise, Sunset } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, PrayerId, State } from "../salah-store";
import { findCity, formatClock, formatRemaining, prayers, updatedLabel, window_ } from "../salah-store";

const ICON: Record<PrayerId, typeof Sun> = {
  fajr: Sunrise,
  sunrise: Sunrise,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Sunset,
  isha: Moon,
};

const DATE_LABEL = "Sunday, 23 August";

export function TimesScreen({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const view = window_(state);
  const city = findCity(state);
  const CurrentIcon = ICON[view.current.id];
  const NextIcon = ICON[view.next.id];

  return (
    <div className="salah-sky flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between px-4 pt-1 pb-2">
        <span className="size-9" />
        <h3 className="text-[1.05rem] font-semibold">Salah Times</h3>
        <button
          type="button"
          aria-label="Settings"
          onClick={() => dispatch({ type: "open-settings", open: true })}
          className="flex size-9 items-center justify-center rounded-full bg-white/80 text-[var(--app-accent)] shadow-sm"
        >
          <Settings className="size-[1.15rem]" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <section className="flex items-center justify-between gap-3 rounded-3xl bg-white/55 px-4 py-3.5">
          <span>
            <span className="block text-[1.6rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">
              {formatClock(state.clock, true)}
            </span>
            <span className="mt-1 block text-[0.85rem] text-[var(--app-muted)]">{DATE_LABEL}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-[0.82rem] font-medium">
            <Building2 className="size-4" aria-hidden="true" />
            {city.name}
          </span>
        </section>

        <section className="mt-3 rounded-3xl bg-white/55 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-[0.68rem] tracking-[0.12em] text-[var(--app-muted)] uppercase">
                From
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[1.05rem] font-semibold">
                <CurrentIcon className="size-[1.1rem]" aria-hidden="true" />
                {view.current.name}
              </span>
              <span className="text-[0.85rem] text-[var(--app-muted)] tabular-nums">
                {formatClock(view.from)}
              </span>
            </span>

            <span className="text-right">
              <span className="block text-[0.68rem] tracking-[0.12em] text-[var(--app-muted)] uppercase">
                Until
              </span>
              <span className="mt-1 flex items-center justify-end gap-1.5 text-[1.05rem] font-semibold">
                <NextIcon className="size-[1.1rem]" aria-hidden="true" />
                {view.next.name}
              </span>
              <span className="text-[0.85rem] text-[var(--app-muted)] tabular-nums">
                {formatClock(view.until)}
              </span>
            </span>
          </div>

          <div
            role="progressbar"
            aria-label={`${view.current.name} to ${view.next.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(view.progress * 100)}
            className="relative mt-4 h-2.5 rounded-full bg-black/10"
          >
            <span
              style={{ width: `${view.progress * 100}%` }}
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#2f7d5d,#2f5f9e)]"
            />
            <span
              style={{ left: `calc(${view.progress * 100}% - 0.55rem)` }}
              className="absolute top-1/2 size-[1.1rem] -translate-y-1/2 rounded-full border-2 border-[#2f5f9e] bg-white"
            />
          </div>

          <p className="mt-4 text-center text-[0.68rem] tracking-[0.12em] text-[var(--app-muted)] uppercase">
            Remaining
          </p>
          <p className="text-center text-[1.9rem] leading-tight font-bold tracking-[-0.02em] tabular-nums">
            {formatRemaining(view.remaining)}
          </p>
        </section>

        <ul className="mt-3 overflow-hidden rounded-3xl bg-white/55">
          {view.times.map((prayer) => {
            const Icon = ICON[prayer.id];
            const isNow = prayer.id === view.current.id;
            const isNext = prayer.id === view.next.id;
            const notifiable = prayers.find((p) => p.id === prayer.id)?.notifiable ?? true;
            const on = state.notifications[prayer.id];

            return (
              <li
                key={prayer.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 not-last:border-b not-last:border-black/5",
                  isNow && "bg-[var(--app-accent-soft)]/70",
                )}
              >
                <Icon
                  className={cn(
                    "size-6 shrink-0",
                    isNow ? "text-[var(--app-accent)]" : "text-[var(--app-muted)]",
                  )}
                  aria-hidden="true"
                />

                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[1.05rem]",
                        isNow ? "font-semibold" : "font-medium",
                        prayer.id === "sunrise" && "text-[var(--app-muted)]",
                      )}
                    >
                      {prayer.name}
                    </span>
                    {isNow && (
                      <span className="rounded-full bg-[var(--app-accent)] px-2 py-0.5 text-[0.6rem] font-bold tracking-wide text-white uppercase">
                        Now
                      </span>
                    )}
                    {isNext && (
                      <span className="text-[0.6rem] font-bold tracking-wide text-[var(--app-gold)] uppercase">
                        Next
                      </span>
                    )}
                  </span>
                  <span className="block text-[0.78rem] text-[var(--app-muted)]" lang="ar">
                    {prayer.arabic}
                  </span>
                </span>

                <span className="ml-auto flex items-center gap-2.5">
                  {notifiable && (
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`${on ? "Mute" : "Notify"} ${prayer.name}`}
                      onClick={() => dispatch({ type: "toggle-notification", id: prayer.id })}
                      className="p-0.5"
                    >
                      {on ? (
                        <Bell className="size-4 text-[var(--app-muted)]" />
                      ) : (
                        <BellOff className="size-4 text-black/20" />
                      )}
                    </button>
                  )}
                  <span
                    className={cn(
                      "text-[1.05rem] tabular-nums",
                      isNow ? "font-bold" : "font-medium",
                      prayer.id === "sunrise" && "text-[var(--app-muted)]",
                    )}
                  >
                    {formatClock(prayer.at)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.78rem] text-[var(--app-muted)]">
          <CloudDownload className="size-4" aria-hidden="true" />
          {state.provider === "kemenag" ? "Kemenag" : "Calculated offline"} ·{" "}
          {updatedLabel(state.updatedMinutesAgo)}
        </p>
      </div>
    </div>
  );
}
