export type PrayerId = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
export type Provider = "kemenag" | "offline";
export type Madhab = "shafii" | "hanafi";
export type HighLatitude = "middle" | "seventh" | "twelfth";
export type MethodId = "kemenag" | "mwl" | "ummalqura";

export type City = { id: string; name: string; times: Record<PrayerId, number> };

const hm = (value: string) => {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
};

export const cities: City[] = [
  {
    id: "jakarta",
    name: "Kota Jakarta",
    times: {
      fajr: hm("04:41"),
      sunrise: hm("05:54"),
      dhuhr: hm("11:59"),
      asr: hm("15:18"),
      maghrib: hm("17:57"),
      isha: hm("19:07"),
    },
  },
  {
    id: "bandung",
    name: "Kota Bandung",
    times: {
      fajr: hm("04:38"),
      sunrise: hm("05:51"),
      dhuhr: hm("11:56"),
      asr: hm("15:15"),
      maghrib: hm("17:54"),
      isha: hm("19:04"),
    },
  },
  {
    id: "surabaya",
    name: "Kota Surabaya",
    times: {
      fajr: hm("04:12"),
      sunrise: hm("05:25"),
      dhuhr: hm("11:30"),
      asr: hm("14:49"),
      maghrib: hm("17:28"),
      isha: hm("18:38"),
    },
  },
];

export const methods: { id: MethodId; name: string; region: string; fajr: number; isha: number }[] = [
  { id: "kemenag", name: "Kementerian Agama RI", region: "Indonesia", fajr: 0, isha: 0 },
  { id: "mwl", name: "Muslim World League", region: "Europe, Far East", fajr: 6, isha: -5 },
  { id: "ummalqura", name: "Umm al-Qura", region: "Saudi Arabia", fajr: 4, isha: 23 },
];

export const highLatitudes: { id: HighLatitude; label: string }[] = [
  { id: "middle", label: "Middle of the night" },
  { id: "seventh", label: "One-seventh of the night" },
  { id: "twelfth", label: "Angle-based" },
];

export const prayers: { id: PrayerId; name: string; arabic: string; notifiable: boolean }[] = [
  { id: "fajr", name: "Fajr", arabic: "الفجر", notifiable: true },
  { id: "sunrise", name: "Sunrise", arabic: "الشروق", notifiable: false },
  { id: "dhuhr", name: "Dhuhr", arabic: "الظهر", notifiable: true },
  { id: "asr", name: "Asr", arabic: "العصر", notifiable: true },
  { id: "maghrib", name: "Maghrib", arabic: "المغرب", notifiable: true },
  { id: "isha", name: "Isha", arabic: "العشاء", notifiable: true },
];

/** Extra minutes Asr falls back by under the Hanafi position of the shadow. */
const HANAFI_ASR_SHIFT = 45;

export type State = {
  /** Minutes since midnight, fractional so the clock can tick by seconds. */
  clock: number;
  running: boolean;
  cityId: string;
  provider: Provider;
  method: MethodId;
  madhab: Madhab;
  highLatitude: HighLatitude;
  notifications: Record<PrayerId, boolean>;
  updatedMinutesAgo: number;
  settingsOpen: boolean;
  /** Which settings row is expanded into a picker. */
  openPicker: "provider" | "city" | "method" | "highLatitude" | null;
};

export type Action =
  | { type: "tick"; seconds: number }
  | { type: "set-clock"; minutes: number }
  | { type: "toggle-running" }
  | { type: "set-city"; id: string }
  | { type: "set-provider"; provider: Provider }
  | { type: "set-method"; method: MethodId }
  | { type: "set-madhab"; madhab: Madhab }
  | { type: "set-high-latitude"; value: HighLatitude }
  | { type: "toggle-notification"; id: PrayerId }
  | { type: "refresh" }
  | { type: "open-settings"; open: boolean }
  | { type: "open-picker"; picker: State["openPicker"] }
  | { type: "reset" };

export const initialState: State = {
  clock: 19 * 60 + 1 + 6 / 60,
  running: true,
  cityId: "jakarta",
  provider: "kemenag",
  method: "kemenag",
  madhab: "shafii",
  highLatitude: "middle",
  notifications: { fajr: true, sunrise: false, dhuhr: true, asr: true, maghrib: true, isha: true },
  updatedMinutesAgo: 180,
  settingsOpen: false,
  openPicker: null,
};

export function findCity(state: State) {
  return cities.find((city) => city.id === state.cityId) ?? cities[0];
}

export function findMethod(state: State) {
  return methods.find((method) => method.id === state.method) ?? methods[0];
}

/**
 * The downloaded Kemenag timetable wins whenever the provider is reachable.
 * Method and madhab only move the times in the offline fallback — which is
 * exactly what the settings screen says they do.
 */
export function timetable(state: State): Record<PrayerId, number> {
  const base = findCity(state).times;
  if (state.provider === "kemenag") return base;

  const method = findMethod(state);
  return {
    ...base,
    fajr: base.fajr + method.fajr,
    asr: base.asr + (state.madhab === "hanafi" ? HANAFI_ASR_SHIFT : 0),
    isha: method.id === "ummalqura" ? base.maghrib + 90 : base.isha + method.isha,
  };
}

export function formatClock(minutes: number, withSeconds = false) {
  const total = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const m = Math.floor(total % 60);
  const s = Math.floor((total * 60) % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return withSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`;
}

export function formatRemaining(minutes: number) {
  const total = Math.max(0, minutes);
  const h = Math.floor(total / 60);
  const m = Math.floor(total % 60);
  const s = Math.floor((total * 60) % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}h ${pad(m)}m` : `${pad(m)}m ${pad(s)}s`;
}

/** The window the clock currently sits in, wrapping across midnight. */
export function window_(state: State) {
  const times = timetable(state);
  const ordered = prayers.map((prayer) => ({ ...prayer, at: times[prayer.id] }));
  const now = ((state.clock % 1440) + 1440) % 1440;

  let current = ordered[ordered.length - 1];
  let next = ordered[0];
  let from = current.at - 1440;
  let until = next.at;

  for (let i = 0; i < ordered.length; i += 1) {
    const entry = ordered[i];
    const following = ordered[i + 1];
    if (now >= entry.at && (!following || now < following.at)) {
      current = entry;
      from = entry.at;
      next = following ?? { ...ordered[0], at: ordered[0].at + 1440 };
      until = next.at;
      break;
    }
  }

  const span = Math.max(1, until - from);
  return {
    current,
    next,
    from,
    until,
    remaining: until - now,
    progress: Math.min(1, Math.max(0, (now - from) / span)),
    times: ordered,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "tick":
      return { ...state, clock: (state.clock + action.seconds / 60) % 1440 };

    case "set-clock":
      return { ...state, clock: action.minutes };

    case "toggle-running":
      return { ...state, running: !state.running };

    case "set-city":
      return { ...state, cityId: action.id, openPicker: null, updatedMinutesAgo: 0 };

    case "set-provider":
      return { ...state, provider: action.provider, openPicker: null };

    case "set-method":
      return { ...state, method: action.method, openPicker: null };

    case "set-madhab":
      return { ...state, madhab: action.madhab };

    case "set-high-latitude":
      return { ...state, highLatitude: action.value, openPicker: null };

    case "toggle-notification":
      return {
        ...state,
        notifications: { ...state.notifications, [action.id]: !state.notifications[action.id] },
      };

    case "refresh":
      return { ...state, updatedMinutesAgo: 0 };

    case "open-settings":
      return { ...state, settingsOpen: action.open, openPicker: null };

    case "open-picker":
      return { ...state, openPicker: state.openPicker === action.picker ? null : action.picker };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

export function updatedLabel(minutes: number) {
  if (minutes < 1) return "updated just now";
  if (minutes < 60) return `updated ${Math.floor(minutes)} min ago`;
  const hours = Math.floor(minutes / 60);
  return `updated ${hours} hr ago`;
}
