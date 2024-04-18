import { getSession } from "@/lib/auth";
import Client from "./authedHomeClient";
import { db } from "@/lib/db";
import { IUsers, Tdays, Tusers } from "@/lib/db/schema";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { cache2 } from "@/lib/consts";
import { DateTime } from "luxon";
import { getTimeZone } from "./utils";
import { redirect } from "next/navigation";

const getUserDaysOfMonth = cache2(async function getUserDaysOfMonth(
  userId: z.infer<typeof IUsers.select>["id"],
  month: number,
) {
  const days = await db.select({
    date: Tdays.date,
  }).from(Tdays).where(and(
    sql`json_extract(${Tdays.date}, '$.month') = ${month}`,
    eq(Tdays.owner, userId),
  ));
  return days;
});

export default async function AuthedHome() {
  const session = await getSession();
  const tz = await getTimeZone(session!.user!, redirect);
  const signedDays = await getUserDaysOfMonth(session!.user!.id, 4);
  const today = DateTime.now().setZone(tz)
  console.log(today);
  

  return (
    <main className="min-h-screen p-3 grid grid-rows-9 grid-cols-2 gap-3">
      <Client session={session} />
    </main>
  );
}
