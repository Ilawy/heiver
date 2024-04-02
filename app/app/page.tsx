"use client";

import Link from "next/link";
import { motion } from "framer-motion";
function createCalendar(year: number, month: number, firstDayOfWeek = 0) {
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

const PAST_DAYS_EDITABLE = 2;

export default function AppPage() {
  const today = new Date();
  const calendar = createCalendar(today.getFullYear(), today.getMonth() + 1, 6);

  return (
    <motion.main
      className=""
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      key={-1}
    >
      <section className="days max-w-md p-3">
        <h1>
          {today.toLocaleDateString("en-US", { weekday: "long" })},{" "}
          {today.getDate()}{" "}
          {today.toLocaleDateString("en-US", { month: "long" })}
        </h1>
        <h2>
          {today.toLocaleDateString("en-US", { year: "numeric" })}
        </h2>
        <div className="calendar">
          {calendar.weekDays.map((day, index) => {
            return (
              <div className="weekday" key={index}>
                {day}
              </div>
            );
          })}
          {calendar.calendar.map((week, wIndex) => {
            return (
              week.map((day, dIndex) => {                
                return day.dayNumber
                  ? (
                    <Link
                      key={wIndex*7+dIndex}
                      href={`app/day/${day.dayNumber}/${calendar.month}/${calendar.year}`}
                      onClick={() => console.log(day)}
                      className={`day native ${
                        day.dayNumber === today.getDate() ? "active" : ""
                      }${
                        (day.dayNumber + PAST_DAYS_EDITABLE <
                              today.getDate() ||
                            day.dayNumber > today.getDate())
                          ? "disabled"
                          : ""
                      }`}
                    >
                      {day.dayNumber}
                    </Link>
                  )
                  : <div key={wIndex*7+dIndex} className="day disabled bg-gray-50"></div>;
              })
            );
          })}
        </div>
      </section>
    </motion.main>
  );
}
