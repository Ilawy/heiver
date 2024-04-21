"use client";

import Header from "@/lib/components/header";
import DateSelector, { DateDisplay } from "./DateSelector";
import { createCalendar } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "next-view-transitions";

export default function Client(
  { date }: { date: [number, number] },
) {
  const [[month, year], setMY] = useState(date);
  const calendar = createCalendar(year, month, 6);
  const [selecting, setSelecting] = useState(false);
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
      <Link href={"/"} className="sticky top-3">
        <Header>
        Go Back
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
            const index = weekIndex * 7 + dayIndex;
            return day.dayNumber
              ? (
                <motion.div
                  key={`${year}-${month}-${day.dayNumber}${index}`}
                  className="text-3xl flex items-center justify-between p-3 bg-yellow-100 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.025 * index }}
                >
                  <span className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded-2xl w-[3ch] h-[3ch] flex items-center justify-center">
                      {day.dayNumber}
                    </span>
                    <span>{day.dayName}</span>
                  </span>
                  <button>ADD</button>
                </motion.div>
              )
              : null;
          });
        })}
      </section>
    </>
  );
}
