"use client";
import { type getSession } from "@/lib/auth";
import { cn, createCalendar, MAX_ALLOWED_PAST } from "@/lib/consts";
import { DayDate } from "@/lib/db/schema";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useIsPresent,
} from "framer-motion";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";

interface Props {
  session: Awaited<ReturnType<typeof getSession>>;
  days: { day: number; average: number }[];
}

export default function AuthedHomeClient({ session, days }: Props) {
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={"welcome"}
          id="welcome"
          layout
          className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between col-span-2"
        >
          <div>
            <h1 className="text-balance font-extrabold">
              Welcome back, {session?.user?.name}
            </h1>
          </div>
          <div>
            <div className="h-[48px] bg-[coral] aspect-square rounded-full">
            </div>
          </div>
        </motion.div>

        {show && <ReminderBlock key={"reminder"} />}

        <motion.div
          key={"daily"}
          id="daily"
          layout
          className="col-span-2 row-span-3 bg-red-200 rounded-2xl p-3 grid grid-rows-4 grid-cols-3 gap-3"
        >
          <div className="flex items-center justify-center col-span-2">
            <h1 className="text-balance font-extrabold">Daily Records</h1>
          </div>
          <div className="col-span-full row-span-1 flex items-center justify-center">
            <div className="switch">
              <label>
                Week
                <input defaultChecked type="radio" name="daily_recs" id="" />
              </label>
              <label>
                Month
                <input type="radio" name="daily_recs" id="" />
              </label>
            </div>
          </div>
          <div className="col-span-3 row-span-1 flex items-center gap-1">
            {days.map((day, i) => {
              return (
                <motion.button
                  onClick={() => {
                    setSelectedDay(day.day);
                  }}
                  key={i}
                  initial={{
                    opacity: 0.25,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    filter: (selectedDay && selectedDay !== day.day)
                      ? "blur(5px)"
                      : "blur(0px)",
                    scale: (selectedDay && selectedDay === day.day) ? 2 : 1,
                    height: day.average === 0
                      ? `0.75rem`
                      : `${(day.average / 5) * 100}%`,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: selectedDay ? 0 : 0.01 * i,
                  }}
                  style={{
                    background: day.average === 0 ? "gray" : "coral",
                    height: day.average === 0
                      ? `0.75rem`
                      : `${(day.average / 5) * 100}%`,
                  }}
                  className="w-3 rounded-full"
                >
                </motion.button>
              );
            })}
          </div>
          <div className="col-span-full flex items-center justify-center">
            <button
              onClick={() => setShow(!show)}
              className="button w-full ghost"
            >
              View
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function ReminderBlock() {
  const isPresent = useIsPresent();
  const parentRef = useRef(null);
  const [[w, h], setWH] = useState(["", ""]);
  useEffect(() => {
    const computed = getComputedStyle(parentRef.current!);
    setWH([computed.width, computed.height]);
  }, []);

  return (
    <motion.div
      ref={parentRef}
      style={{
        position: isPresent ? "static" : "absolute",
        width: w,
        height: h,
      }}
      id="reminder"
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      layout
      className="bg-red-50 col-span-full rounded-2xl p-3"
    >
      XX
    </motion.div>
  );
}
