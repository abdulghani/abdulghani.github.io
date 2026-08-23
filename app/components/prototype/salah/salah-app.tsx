import { useEffect, useReducer } from "react";
import { Pause, Play } from "lucide-react";

import { PrototypeStage } from "../prototype-stage";
import { SettingsSheet } from "./screens/settings-sheet";
import { TimesScreen } from "./screens/times-screen";
import { formatClock, initialState, reducer } from "./salah-store";

export function SalahApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.running) return;
    const id = window.setInterval(() => dispatch({ type: "tick", seconds: 1 }), 1000);
    return () => window.clearInterval(id);
  }, [state.running]);

  return (
    <PrototypeStage
      palette="salah-app"
      time={formatClock(state.clock).replace(":", ".")}
      onReset={() => dispatch({ type: "reset" })}
      controls={
        <div className="flex w-full max-w-[23.5rem] flex-col gap-2 rounded-sm border bg-card px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="label">Time of day</span>
            <span className="font-mono text-xs tabular-nums">{formatClock(state.clock, true)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-pressed={state.running}
              aria-label={state.running ? "Pause the clock" : "Run the clock"}
              onClick={() => dispatch({ type: "toggle-running" })}
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {state.running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>

            <input
              type="range"
              min={0}
              max={1439}
              step={1}
              value={Math.floor(state.clock)}
              aria-label="Time of day"
              onChange={(event) =>
                dispatch({ type: "set-clock", minutes: Number(event.target.value) })
              }
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
            />
          </div>

          <p className="font-mono text-[0.66rem] text-muted-foreground">
            Prototype control — scrub the day to watch the window, countdown and NOW badge move.
          </p>
        </div>
      }
    >
      <TimesScreen state={state} dispatch={dispatch} />
      {state.settingsOpen && <SettingsSheet state={state} dispatch={dispatch} />}
    </PrototypeStage>
  );
}
