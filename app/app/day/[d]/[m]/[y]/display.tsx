import { type getMonthAVG } from "@/lib/actions";
import { DayDate, Idays } from "@/lib/db/schema";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { z } from "zod";

export default async function Display({
  data,
  diff,
  avg,
  todayRecorded,
  tz
}: {
  data: z.infer<typeof Idays.select>;
  diff: number;
  avg: Awaited<ReturnType<typeof getMonthAVG>>;
  todayRecorded: boolean;
  tz: string;
}) {    
  const dateData = data.date as DayDate;
  const  date = DateTime.fromObject({
    year: dateData.year,
    month: dateData.month,
    day: dateData.day,
    second: 1,
  }, {
    zone: tz
  });  
  const jsDate = date.toJSDate()

  
    
  return (
    <main className="p-3 flex flex-col gap-3">
      {/* DAY, MONTH, YEAR */}
      <h1>
        {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(jsDate)},
        {" "}
        {jsDate.getDate()}{" "}
        {new Intl.DateTimeFormat("en-US", { month: "long" }).format(jsDate)}
        {" "}
        {jsDate.getFullYear()}
      </h1>
      <p className="text-2xl font-thin">Another wonderful day</p>
      <p className="text-lg font-thin">
        Your RLH on this day {diff === 0 ? "is" : "was"} {data.religion}
        {data.life}
        {data.health} (average {Math.round((data.religion + data.life + data.health) / 3 * 10) / 10})
      </p>
      {data.note && (
        <>
          <p className="text-lg font-thin">You wrote this about your day</p>
          <p>{data.note}</p>
        </>
      )}
       <p className="text-lg font-thin">Average this month {avg.average} of {new Intl.NumberFormat(['eg-En'], {
        style :"unit",
        unit: "day",
       }).format(avg.days)} recorded.</p>
       {todayRecorded && diff !== 0 && <button className="w-fit">
            Record today
        </button>}
    </main>
  );
}
