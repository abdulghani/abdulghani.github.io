export type Priority = "Low" | "Medium" | "High";
export type Screen = "home" | "boards" | "activity" | "profile";

export type Person = { id: string; name: string; tone: string };
export type Subtask = { id: string; title: string; done: boolean };

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  /** Day of February in the planner week (12–18). */
  day: number;
  time?: string;
  assignee: string;
  members: string[];
  subtasks: Subtask[];
  comments: number;
  attachments: number;
};

export type ActivityEntry = { id: string; text: string; meta: string };

export const people: Person[] = [
  { id: "floyd", name: "Floyd Wilson", tone: "bg-[#b9ccff] text-[#12131a]" },
  { id: "dianne", name: "Dianne Russell", tone: "bg-[#ffd6a5] text-[#12131a]" },
  { id: "alex", name: "Alex Johnson", tone: "bg-[#c9b6ff] text-[#12131a]" },
  { id: "kristin", name: "Kristin Watson", tone: "bg-[#a8e6cf] text-[#12131a]" },
];

export const week = [
  { day: 12, label: "Sun" },
  { day: 13, label: "Mon" },
  { day: 14, label: "Tue" },
  { day: 15, label: "Wed" },
  { day: 16, label: "Thu" },
  { day: 17, label: "Fri" },
  { day: 18, label: "Sat" },
];

export function personName(id: string) {
  return people.find((person) => person.id === id)?.name ?? "Unassigned";
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

let counter = 0;
const nextId = (prefix: string) => `${prefix}-${++counter}`;

export const initialTasks: Task[] = [
  {
    id: "task-seed-1",
    title: "March Dribbble Shots Design. Plan for the month",
    description:
      "You need to choose themes for Dribbble shots for March and upload tasks. For help, you can contact @alex.johnson, he did such a task last month and can walk you through the review flow.",
    priority: "High",
    day: 16,
    assignee: "floyd",
    members: ["floyd", "alex"],
    subtasks: [
      { id: "sub-seed-1", title: "Create a content plan for March", done: true },
      { id: "sub-seed-2", title: "Collect references from last quarter", done: false },
    ],
    comments: 4,
    attachments: 16,
  },
  {
    id: "task-seed-2",
    title: 'Create the "Blog" and "Product" pages for the FortRoom website',
    description:
      "Both pages reuse the marketing layout. Blog needs a category filter; Product needs the pricing table wired to the CMS.",
    priority: "Medium",
    day: 16,
    time: "11:00 PM",
    assignee: "dianne",
    members: ["dianne"],
    subtasks: [{ id: "sub-seed-3", title: "Draft the pricing table", done: false }],
    comments: 2,
    attachments: 3,
  },
  {
    id: "task-seed-3",
    title: "Review the onboarding illustrations",
    description: "Second pass on the three onboarding screens before handoff.",
    priority: "Low",
    day: 17,
    assignee: "kristin",
    members: ["kristin", "dianne"],
    subtasks: [],
    comments: 0,
    attachments: 2,
  },
];

export const initialActivity: ActivityEntry[] = [
  { id: "act-seed-1", text: "Floyd Wilson completed “Create a content plan for March”", meta: "Yesterday" },
  { id: "act-seed-2", text: "Dianne Russell was assigned to the FortRoom pages", meta: "2 days ago" },
];

export type State = {
  tasks: Task[];
  activity: ActivityEntry[];
  selectedDay: number;
  screen: Screen;
  openTaskId: string | null;
  composing: boolean;
};

export type Action =
  | { type: "select-day"; day: number }
  | { type: "go"; screen: Screen }
  | { type: "open-task"; id: string }
  | { type: "close-task" }
  | { type: "compose"; open: boolean }
  | { type: "add-task"; draft: Omit<Task, "id" | "subtasks" | "comments" | "attachments"> }
  | { type: "toggle-subtask"; taskId: string; subtaskId: string }
  | { type: "add-subtask"; taskId: string; title: string }
  | { type: "set-priority"; taskId: string; priority: Priority }
  | { type: "reset" };

export const initialState: State = {
  tasks: initialTasks,
  activity: initialActivity,
  selectedDay: 16,
  screen: "home",
  openTaskId: null,
  composing: false,
};

function log(state: State, text: string): ActivityEntry[] {
  return [{ id: nextId("act"), text, meta: "Just now" }, ...state.activity];
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "select-day":
      return { ...state, selectedDay: action.day };

    case "go":
      return { ...state, screen: action.screen, openTaskId: null };

    case "open-task":
      return { ...state, openTaskId: action.id };

    case "close-task":
      return { ...state, openTaskId: null };

    case "compose":
      return { ...state, composing: action.open };

    case "add-task": {
      const task: Task = {
        ...action.draft,
        id: nextId("task"),
        subtasks: [],
        comments: 0,
        attachments: 0,
      };
      return {
        ...state,
        tasks: [task, ...state.tasks],
        selectedDay: task.day,
        composing: false,
        screen: "home",
        activity: log(state, `You created “${task.title}”`),
      };
    }

    case "toggle-subtask": {
      let entry = "";
      const tasks = state.tasks.map((task) => {
        if (task.id !== action.taskId) return task;
        return {
          ...task,
          subtasks: task.subtasks.map((subtask) => {
            if (subtask.id !== action.subtaskId) return subtask;
            entry = `${subtask.done ? "Reopened" : "Completed"} “${subtask.title}”`;
            return { ...subtask, done: !subtask.done };
          }),
        };
      });
      return { ...state, tasks, activity: entry ? log(state, entry) : state.activity };
    }

    case "add-subtask": {
      const tasks = state.tasks.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              subtasks: [...task.subtasks, { id: nextId("sub"), title: action.title, done: false }],
            }
          : task,
      );
      return { ...state, tasks, activity: log(state, `Added subtask “${action.title}”`) };
    }

    case "set-priority": {
      const tasks = state.tasks.map((task) =>
        task.id === action.taskId ? { ...task, priority: action.priority } : task,
      );
      const task = state.tasks.find((item) => item.id === action.taskId);
      return {
        ...state,
        tasks,
        activity: task
          ? log(state, `Set “${task.title}” to ${action.priority.toLowerCase()} priority`)
          : state.activity,
      };
    }

    case "reset":
      return { ...initialState, tasks: initialTasks, activity: initialActivity };

    default:
      return state;
  }
}
