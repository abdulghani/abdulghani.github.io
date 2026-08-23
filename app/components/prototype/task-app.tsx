import { useReducer } from "react";
import { Folder, House, MessageCircle, Plus, User } from "lucide-react";

import { cn } from "~/lib/utils";
import { PhoneFrame } from "./phone-frame";
import { HomeScreen } from "./screens/home-screen";
import { NewTaskSheet } from "./screens/new-task-sheet";
import { ActivityScreen, BoardsScreen, ProfileScreen } from "./screens/side-screens";
import { TaskDetail } from "./screens/task-detail";
import { initialState, reducer, type Screen } from "./task-store";

const TABS: { screen: Screen; icon: typeof House; label: string }[] = [
  { screen: "home", icon: House, label: "Today" },
  { screen: "boards", icon: Folder, label: "Boards" },
  { screen: "activity", icon: MessageCircle, label: "Activity" },
  { screen: "profile", icon: User, label: "Profile" },
];

export function TaskApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openTask = state.tasks.find((task) => task.id === state.openTaskId) ?? null;

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame>
        {openTask ? (
          <TaskDetail task={openTask} activity={state.activity} dispatch={dispatch} />
        ) : state.screen === "home" ? (
          <HomeScreen state={state} dispatch={dispatch} />
        ) : state.screen === "boards" ? (
          <BoardsScreen state={state} dispatch={dispatch} />
        ) : state.screen === "activity" ? (
          <ActivityScreen state={state} />
        ) : (
          <ProfileScreen state={state} />
        )}

        {state.composing && <NewTaskSheet defaultDay={state.selectedDay} dispatch={dispatch} />}

        {!state.composing && (
          <nav
            aria-label="App sections"
            className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)] to-transparent px-8 pt-6 pb-4"
          >
            {TABS.slice(0, 2).map((tab) => (
              <TabButton key={tab.screen} tab={tab} state={state} dispatch={dispatch} />
            ))}

            <button
              type="button"
              aria-label="New task"
              onClick={() => dispatch({ type: "compose", open: true })}
              className="flex size-14 items-center justify-center rounded-full bg-[var(--app-fg)] text-[var(--app-accent-ink)] transition-transform active:scale-95"
            >
              <Plus className="size-6" strokeWidth={2.5} />
            </button>

            {TABS.slice(2).map((tab) => (
              <TabButton key={tab.screen} tab={tab} state={state} dispatch={dispatch} />
            ))}
          </nav>
        )}
      </PhoneFrame>

      <button
        type="button"
        onClick={() => dispatch({ type: "reset" })}
        className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        Reset the prototype
      </button>
    </div>
  );
}

function TabButton({
  tab,
  state,
  dispatch,
}: {
  tab: (typeof TABS)[number];
  state: { screen: Screen; openTaskId: string | null };
  dispatch: React.Dispatch<{ type: "go"; screen: Screen }>;
}) {
  const active = state.screen === tab.screen && !state.openTaskId;
  const Icon = tab.icon;

  return (
    <button
      type="button"
      aria-label={tab.label}
      aria-current={active ? "page" : undefined}
      onClick={() => dispatch({ type: "go", screen: tab.screen })}
      className={cn(
        "rounded-xl p-2 transition-colors",
        active ? "text-[var(--app-fg)]" : "text-[var(--app-muted)] hover:text-[var(--app-fg)]",
      )}
    >
      <Icon className="size-6" fill={active ? "currentColor" : "none"} strokeWidth={active ? 1 : 1.8} />
    </button>
  );
}
