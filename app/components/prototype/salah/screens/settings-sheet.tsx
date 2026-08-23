import { useEffect } from "react";
import { Building2, Check, ChevronRight, ChevronsUpDown, Heart, RefreshCw } from "lucide-react";

import { cn } from "~/lib/utils";
import type { Action, State } from "../salah-store";
import {
  cities,
  findCity,
  findMethod,
  highLatitudes,
  methods,
  updatedLabel,
} from "../salah-store";

export function SettingsSheet({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch({ type: "open-settings", open: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  const city = findCity(state);
  const method = findMethod(state);
  const offline = state.provider === "offline";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
      className="absolute inset-x-0 top-8 bottom-0 z-20 flex flex-col rounded-t-[1.6rem] bg-[var(--app-surface-2)] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300"
    >
      <div className="flex shrink-0 items-center justify-between px-4 pt-3 pb-2">
        <span className="w-16" />
        <h3 className="text-[1.05rem] font-semibold">Settings</h3>
        <button
          type="button"
          onClick={() => dispatch({ type: "open-settings", open: false })}
          className="rounded-full bg-white px-4 py-1.5 text-[0.95rem] font-semibold text-[var(--app-accent)] shadow-sm"
        >
          Done
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
        <Label>Times from</Label>
        <section className="overflow-hidden rounded-2xl bg-white">
          <p className="px-4 py-3 text-[0.82rem] leading-relaxed text-[var(--app-muted)]">
            Official Kementerian Agama RI timetable for an Indonesian city, via api.myquran.com.
            Downloaded timetables are cached so the app keeps working offline. Verify against your
            local mosque, especially at high latitudes.
          </p>

          <Row
            label="Provider"
            value={state.provider === "kemenag" ? "Kemenag (Indonesia)" : "Calculated (offline)"}
            open={state.openPicker === "provider"}
            onClick={() => dispatch({ type: "open-picker", picker: "provider" })}
          />
          {state.openPicker === "provider" && (
            <Picker
              options={[
                { id: "kemenag", label: "Kemenag (Indonesia)", detail: "Downloaded timetable" },
                { id: "offline", label: "Calculated (offline)", detail: "Uses the settings below" },
              ]}
              selected={state.provider}
              onSelect={(id) =>
                dispatch({ type: "set-provider", provider: id as State["provider"] })
              }
            />
          )}

          <Row
            icon={<Building2 className="size-[1.15rem] text-[var(--app-accent)]" />}
            label="City"
            value={city.name}
            open={state.openPicker === "city"}
            onClick={() => dispatch({ type: "open-picker", picker: "city" })}
          />
          {state.openPicker === "city" && (
            <Picker
              options={cities.map((item) => ({ id: item.id, label: item.name }))}
              selected={state.cityId}
              onSelect={(id) => dispatch({ type: "set-city", id })}
            />
          )}

          <div className="flex items-center justify-between border-t border-black/5 px-4 py-3">
            <span className="text-[0.8rem] text-[var(--app-muted)]">
              {state.provider === "kemenag" ? "Kemenag" : "Calculated offline"} ·{" "}
              {updatedLabel(state.updatedMinutesAgo)}
            </span>
            <button
              type="button"
              aria-label="Refresh timetable"
              onClick={() => dispatch({ type: "refresh" })}
              className="text-[var(--app-accent)]"
            >
              <RefreshCw className="size-[1.15rem]" />
            </button>
          </div>
        </section>

        <Label>Support</Label>
        <section className="overflow-hidden rounded-2xl bg-white">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Heart className="size-[1.15rem] text-[var(--app-accent)]" aria-hidden="true" />
            <span className="text-[1rem] font-medium">Support Salah Times</span>
            <ChevronRight className="ml-auto size-4 text-black/25" aria-hidden="true" />
          </div>
        </section>

        <Label>Calculation · offline fallback</Label>
        <section className="overflow-hidden rounded-2xl bg-white">
          <p className="px-4 py-3 text-[0.82rem] leading-relaxed text-[var(--app-muted)]">
            Controls times the app works out itself. When a timetable is downloaded, these apply
            only if the provider can't be reached and nothing is cached.
          </p>

          <Row
            label="Method"
            value={method.name}
            detail={method.region}
            open={state.openPicker === "method"}
            onClick={() => dispatch({ type: "open-picker", picker: "method" })}
          />
          {state.openPicker === "method" && (
            <Picker
              options={methods.map((item) => ({ id: item.id, label: item.name, detail: item.region }))}
              selected={state.method}
              onSelect={(id) => dispatch({ type: "set-method", method: id as State["method"] })}
            />
          )}

          <div className="flex items-center justify-between border-t border-black/5 px-4 py-3.5">
            <span className="text-[1rem]">Asr (madhab)</span>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "set-madhab", madhab: state.madhab === "shafii" ? "hanafi" : "shafii" })
              }
              className="flex items-center gap-1 text-[1rem] font-medium text-[var(--app-accent)]"
            >
              {state.madhab === "shafii" ? "Shafi'i" : "Hanafi"}
              <ChevronsUpDown className="size-4" aria-hidden="true" />
            </button>
          </div>

          <Row
            label="High latitudes"
            value={highLatitudes.find((item) => item.id === state.highLatitude)!.label}
            open={state.openPicker === "highLatitude"}
            onClick={() => dispatch({ type: "open-picker", picker: "highLatitude" })}
          />
          {state.openPicker === "highLatitude" && (
            <Picker
              options={highLatitudes.map((item) => ({ id: item.id, label: item.label }))}
              selected={state.highLatitude}
              onSelect={(id) =>
                dispatch({ type: "set-high-latitude", value: id as State["highLatitude"] })
              }
            />
          )}
        </section>

        <p
          className={cn(
            "mt-3 px-1 text-[0.78rem] leading-relaxed",
            offline ? "text-[var(--app-accent)]" : "text-[var(--app-muted)]",
          )}
        >
          {offline
            ? "Offline fallback is active — method and madhab are moving the times right now."
            : "The Kemenag timetable is cached, so these three settings are not affecting today's times."}
        </p>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="px-1 pt-5 pb-2 text-[1rem] font-semibold text-[var(--app-muted)]">{children}</h4>
  );
}

function Row({
  icon,
  label,
  value,
  detail,
  open,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className="flex w-full items-center gap-3 border-t border-black/5 px-4 py-3.5 text-left first:border-t-0"
    >
      {icon}
      <span className="text-[1rem]">{label}</span>
      <span className="ml-auto text-right">
        <span className="block text-[1rem] text-[var(--app-muted)]">{value}</span>
        {detail && <span className="block text-[0.78rem] text-[var(--app-muted)]">{detail}</span>}
      </span>
      <ChevronRight
        className={cn("size-4 shrink-0 text-black/25 transition-transform", open && "rotate-90")}
        aria-hidden="true"
      />
    </button>
  );
}

function Picker({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; detail?: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="border-t border-black/5 bg-[var(--app-surface-2)]/60">
      {options.map((option) => (
        <li key={option.id}>
          <button
            type="button"
            aria-pressed={selected === option.id}
            onClick={() => onSelect(option.id)}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
          >
            <span>
              <span className="block text-[0.95rem]">{option.label}</span>
              {option.detail && (
                <span className="block text-[0.75rem] text-[var(--app-muted)]">{option.detail}</span>
              )}
            </span>
            {selected === option.id && (
              <Check className="ml-auto size-4 text-[var(--app-accent)]" aria-hidden="true" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
