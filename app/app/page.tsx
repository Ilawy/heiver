import { getSession } from "@/lib/auth";
import Client from "./client";
import { db } from "@/lib/db";
import { IUsers, Tdays, Tusers } from "@/lib/db/schema";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";

async function getUserDaysOfMonth(
  userId: z.infer<typeof IUsers.select>["id"],
  month: number,
) {
  const days = await db.select({
    date: Tdays.date
  }).from(Tdays).where(and(
    sql`json_extract(${Tdays.date}, '$.month') = ${month}`,
    eq(Tdays.owner, userId),
  ));
  return days
}

export default async function AppPage() {
  const session = await getSession();
  const signedDays = await getUserDaysOfMonth(session!.user!.id, 4);
  
  return (
    <>
      <Client signedDays={signedDays} />
      <span className="w-fit" style={{
        viewTransitionName: "vesta"
      }}>Vesta</span>
    </>
  );
}
