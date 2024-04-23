"use client";

import Header from "@/lib/components/header";
import DateSelector, { DateDisplay } from "./DateSelector";
import { createCalendar } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/lib/hash";
import { ArrowLeft } from "react-feather";

export default function Client(
  { date }: { date: [number, number] },
) {
  const [[month, year], setMY] = useState(date);
  const calendar = createCalendar(year, month, 6);
  const [selecting, setSelecting] = useState(false);
  const today = new Date();

  useEffect(() => {
    if (today.getMonth() + 1 === month && today.getFullYear() === year) {
      const el = document.querySelector(
        "[data-key='" + today.getDate() + "-" + month + "-" + year + "']",
      );
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [month, year]);

  return (
    <>
      <AnimatePresence>
        {selecting && (
          <DateSelector
            date={[month, year]}
            setDate={setMY}
            setSelecting={setSelecting}
          />
        )}
      </AnimatePresence>
      <Link href={"/"} className="sticky top-3 z-50">
        <Header>
          <span className="flex items-center justify-center gap-3">
            <ArrowLeft /> Go Back
          </span>
        </Header>
      </Link>
      <AnimatePresence>
        {!selecting && (
          <DateDisplay date={[month, year]} setSelecting={setSelecting} />
        )}
      </AnimatePresence>
      <section className="col-span-2 flex-1 flex flex-col gap-3">
        {calendar.calendar.map((week, weekIndex) => {
          return week.map((day, dayIndex) => {
            if (day.dayNumber) {
              const index = weekIndex * 7 + dayIndex;
              const key = `${day.dayNumber}-${month}-${year}`;
              return (
                <Link
                  key={key}
                  data-key={key}
                  href={`/c/${day.dayNumber}-${month}-${year}`}
                >
                  <motion.div
                    className={"text-3xl flex items-center justify-between p-3 bg-yellow-100 rounded-2xl" +
                      (month === today.getMonth() + 1 &&
                          day.dayNumber === today.getDate()
                        ? " border-2 border-orange-400"
                        : "")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.025 * index }}
                  >
                    <span className="flex items-center justify-center gap-3 flex-wrap">
                      <motion.span
                        layoutId={`day_number-${key}`}
                        className="bg-gray-600 text-white px-2 py-1 rounded-2xl w-[3ch] h-[3ch] flex items-center justify-center"
                      >
                        {day.dayNumber}
                      </motion.span>
                      <span>{day.dayName}</span>
                    </span>
                    <button>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="11.5"
                          stroke="#FF8E8E"
                          strokeLinejoin="round"
                          strokeDashoffset={1}
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="7.5"
                          stroke="#FF8E8E"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3.5"
                          stroke="#FF8E8E"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </Link>
              );
            } else return null;
          });
        })}
      </section>
    </>
  );
}
