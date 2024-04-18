"use client";
import { cn, createCalendar, MAX_ALLOWED_PAST } from "@/lib/consts";
import { DayDate } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

function groupBySequence(arr: number[]) {
  if (arr.length === 0) return [];

  let result = [];
  let currentGroup = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      currentGroup.push(arr[i]);
    } else {
      result.push(currentGroup);
      currentGroup = [arr[i]];
    }
  }
  result.push(currentGroup);
  return result;
}

function getPosition<T>(arr: T[], element: T): "first" | "last" | "between" {
  const index = arr.indexOf(element);
  if (index === 0) {
    return "first";
  } else if (index === arr.length - 1) {
    return "last";
  } else {
    return "between";
  }
}

export default function Client({
  signedDays,
}: {
  signedDays: { date: DayDate }[];
}) {
  const today = new Date();
  const calendar = createCalendar(today.getFullYear(), today.getMonth() + 1, 6);
  const signedDaysNumbers = signedDays.map((sd) => sd.date.day).sort((a, b) =>
    a - b
  );
  const signedGroups = groupBySequence(signedDaysNumbers).map((group) =>
    group.filter((d) => d !== today.getDate())
  );
  console.log(signedGroups, today.getDay());

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
                if (day.dayNumber !== null) {
                  const signedGroup = signedGroups.find((g) =>
                    g.includes(day.dayNumber!)
                  );
                  const isActive = day.dayNumber === today.getDate();
                  //TODO: check if the signed day is at first/last position and style as standalone

                  return (
                    <Link
                      key={wIndex * 7 + dIndex}
                      href={`app/day/${day.dayNumber}/${calendar.month}/${calendar.year}`}
                      onClick={() => console.log(day)}
                      className={`day native ${
                        (signedGroup && !isActive)
                          ? signedGroup.length > 1
                            ? "signed-" +
                              getPosition(signedGroup, day.dayNumber!)
                            : "signed"
                          : ""
                      } ${cn(isActive && "active")}${
                        (
                            day.dayNumber > today.getDate()
                          )
                          ? "disabled"
                          : ""
                      }`}
                    >
                      {day.dayNumber}
                    </Link>
                  );
                }

                return (
                  <div
                    key={wIndex * 7 + dIndex}
                    className="day disabled"
                  >
                  </div>
                );
              })
            );
          })}
        </div>
      </section>
    </motion.main>
  );
}
