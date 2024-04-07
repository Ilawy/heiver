"use client"
import { MAX_ALLOWED_PAST, createCalendar } from "@/lib/consts";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Client() {    
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
                      key={wIndex * 7 + dIndex}
                      href={`app/day/${day.dayNumber}/${calendar.month}/${calendar.year}`}
                      onClick={() => console.log(day)}
                      className={`day native ${
                        day.dayNumber === today.getDate() ? "active" : ""
                      }${
                        (day.dayNumber + MAX_ALLOWED_PAST <
                              today.getDate() ||
                            day.dayNumber > today.getDate())
                          ? "disabled"
                          : ""
                      }`}
                    >
                      {day.dayNumber}
                    </Link>
                  )
                  : (
                    <div
                      key={wIndex * 7 + dIndex}
                      className="day disabled bg-gray-50"
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
