import { intervalToDuration } from "date-fns";

export type Tenure = { years: number; months: number };

/**
 * Whole years and months elapsed since `start`, floored to the month — the
 * shape a CV wants ("1 yr 3 mos"), not a precise interval.
 */
export function tenureSince(start: string, end: Date = new Date()): Tenure {
  const { years = 0, months = 0 } = intervalToDuration({ start: new Date(start), end });
  return { years, months };
}
