"use client";
import { type getSession } from "@/lib/auth";
import { cn, createCalendar, MAX_ALLOWED_PAST } from "@/lib/consts";
import { DayDate } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

interface Props {
  session: Awaited<ReturnType<typeof getSession>>;
}

export default function AuthedHomeClient({ session }: Props) {
  return (
    <>
      <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between col-span-2">
        <div>
          <h1 className="text-balance font-extrabold">
            Welcome back, {session?.user?.name}
          </h1>
        </div>
        <div>
          <div className="h-[48px] bg-[coral] aspect-square rounded-full"></div>
        </div>
      </div>
      <div className="col-span-2 row-span-3 bg-red-200 rounded-2xl p-3 grid grid-rows-4 grid-cols-3 gap-3">
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
          <div className="bg-[coral] h-1/4 w-3 rounded-full"></div>
          <div className="bg-[gray] h-3 w-3 rounded-full"></div>
          <div className="bg-[coral] h-1/2 w-3 rounded-full"></div>
          <div className="bg-[coral] h-1/3 w-3 rounded-full"></div>
          <div className="bg-[coral] h-full w-3 rounded-full"></div>
          <div className="bg-[coral] h-2/3 w-3 rounded-full"></div>
          <div className="bg-[coral] h-1/2 w-3 rounded-full"></div>
          <div className="bg-[coral] h-full w-3 rounded-full"></div>
          <div className="bg-[black] h-3 w-3 rounded-full"></div>
        </div>
        <div className="col-span-full flex items-center justify-center">
          <button className="button w-full ghost">View</button>
        </div>
      </div>
    </>
  );
}
