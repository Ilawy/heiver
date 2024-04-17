import { cache } from "react";

export const MAX_ALLOWED_PAST = 0;
export const MAX_ALLOWED_FUTURE = 0;


export function env(key: string, relax = false) {
  if (process.env[key] === undefined && !relax) {
    throw new Error(`Missing env ${key}`);
  }
  return process.env[key]!;
}



export const cn = (...cnames: (string | null | boolean | undefined)[]) => cnames.filter(Boolean).join(" ");

export function createCalendar(year: number, month: number, firstDayOfWeek = 0) {
  const calendar = [];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  let currentWeek: { dayName: string | null; dayNumber: number | null }[] = [];

  // Adjust first day of the week based on the parameter
  weekDays.push(...weekDays.splice(0, firstDayOfWeek));

  // Add empty days before the first day of the month
  for (let i = 0; i < (firstDayOfMonth + 7 - firstDayOfWeek) % 7; i++) {
    currentWeek.push({ dayName: "", dayNumber: null });
  }

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = new Date(year, month - 1, day);
    currentWeek.push({
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      dayNumber: day,
    });

    if (currentWeek.length === 7) {
      calendar.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add empty days after the last day of the month
  while (currentWeek.length < 7) {
    currentWeek.push({ dayName: "", dayNumber: null });
  }

  // Add remaining days to the last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ dayName: "", dayNumber: null });
    }
    calendar.push(currentWeek);
  }

  return { weekDays, calendar, year, month };
}


//@ts-ignore
export const cache2 = cache ? cache : ((f: any) => f) as typeof cache;
