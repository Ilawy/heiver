import { and, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { Tdays, Tusers } from "./db/schema";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { formData, json, numeric, text } from "zod-form-data";
import { z } from "zod";

export async function getMonthAVG(userId: number, month: number): Promise<{
  days: number;
  average: number;
}> {
  const result = await db.select({
    religion: Tdays.religion,
    life: Tdays.life,
    health: Tdays.health,
    date: Tdays.date,
  }).from(Tdays).where(
    and(
      eq(Tdays.owner, userId),
      eq(sql`json_extract(${Tdays.date}, '$.month')`, month),
    ),
  );
  const avg = result.map((row) => (row.health + row.life + row.religion) / 3);

  return {
    days: result.length,
    average: Math.round(avg.reduce((a, b) => a + b, 0) / avg.length * 10) / 10,
  };
}

export async function isRecordedToday(
  userId: number,
): Promise<boolean> {
  const tz = cookies().get("tz");
  if (!tz) throw new Error("no timezone found");
  const date = DateTime.now().setZone(tz.value);
  const result = await db
    .select({ id: Tdays.id })
    .from(Tdays)
    .where(
      and(
        eq(Tdays.id, userId),
        eq(Tdays.date, {
          year: date.month,
          month: date.year,
          day: date.day,
        }),
      ),
    );
  console.log(result, date.day, date.month, date.year);

  return result.length > 0;
}



type SubmitDayDataResult = {
    ok: false;
    error: string;
  } | {
    ok: true;
    data: any;
  };
  
export async function submitDayData(
  _: unknown,
  fd: FormData,
): Promise<SubmitDayDataResult> {
  "use server";
  if (fd.get("note") === "") fd.delete("note");
  const schema = formData({
    religion: numeric(),
    life: numeric(),
    health: numeric(),
    date: json(z.object({ year: numeric(), month: numeric(), day: numeric() })),
    note: text().optional(),
  });
  const output = schema.safeParse(fd);
  if (!output.success) {
    console.log(output.error);

    return {
      ok: false,
      error: structuredClone(output.error.message),
    };
  } else {
    const result = await db.insert(Tdays).values({
      date: output.data.date,
      owner: 1,
      religion: output.data.religion,
      life: output.data.life,
      health: output.data.health,
      note: output.data.note,
    });
    console.log(result);

    return {
      ok: true,
      data: null,
    };
  }
}
