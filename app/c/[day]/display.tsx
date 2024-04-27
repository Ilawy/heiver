"use client"

import { Idays } from "@/lib/db/schema";
import { z } from "zod";
import { motion } from "framer-motion";
import Header, { PP } from "@/lib/components/header";
import { DateTime } from "luxon";
import { parseDate } from "@/lib/types";
import { Link } from "@/lib/hash";
import { ChevronLeft } from "react-feather";


export default function Display({ day }: { day: z.infer<typeof Idays.select> }) {
    const parsedDay = parseDate(day.date);
    const dayObject = DateTime.fromObject({
        year: parsedDay.year,
        month: parsedDay.month,
        day: parsedDay.day
    })
    
    

    return <motion.main className="p-3">
        <Header>
            <Link href={"/c"} className="flex items-center gap-1 font-bold">
                <ChevronLeft />
                Back to Calendar</Link>
            <PP />
        </Header>
        <br />
        <h1>
            {dayObject.toLocaleString(DateTime.DATE_FULL)}
        </h1>
        <section className="flex flex-col gap-2">
            <div className="w-96 h-20 bg-yellow-100 rounded-2xl flex items-end justify-start p-3 relative isolate overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[var(--color-a)] -z-10 rounded-2xl"
                    style={{
                        width: day.religion / 5 * 100 + "%",
                    }}
                ></div>
                <big className="font-bold">Religion</big>
            </div>
            <div className="w-96 h-20 bg-yellow-100 rounded-2xl flex items-end justify-start p-3 relative isolate overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[var(--color-a)] -z-10 rounded-2xl"
                    style={{
                        width: day.life / 5 * 100 + "%",
                    }}
                ></div>
                <big className="font-bold">Life</big>
            </div>
            <div className="w-96 h-20 bg-yellow-100 rounded-2xl flex items-end justify-start p-3 relative isolate overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[var(--color-a)] -z-10 rounded-2xl"
                    style={{
                        width: day.health / 5 * 100 + "%",
                    }}
                ></div>
                <big className="font-bold">Health</big>
            </div>
        </section>
    </motion.main>

}