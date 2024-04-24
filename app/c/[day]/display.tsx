"use client"

import { Idays } from "@/lib/db/schema";
import { z } from "zod";



export default function Display({ day }: { day: z.infer<typeof Idays.select> }) {


    return <div>
        Hello world
    </div>

}