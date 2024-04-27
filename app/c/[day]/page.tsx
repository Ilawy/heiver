import Header from "@/lib/components/header";
import Client from "./client";
import { Link } from "@/lib/hash";
import { cache2 } from "@/lib/utils";
import { db } from "@/lib/db";
import { Tdays } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import Display from "./display";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { getTimeZone } from "@/app/utils";
import Create from "./create";
import { createDay } from "@/lib/actions";

const getDay = cache2(async (date: string, owner: string) => {
  const result = await db.select().from(Tdays).where(and(
    eq(Tdays.date, date),
    eq(Tdays.owner, owner),
  )).limit(1);
  if (result.length === 0) return null;
  return result[0];
});

export default async function cDayPage({ params: { day: dayKey } }: any) {
  const result = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(dayKey);
  if (result === null) return <NotValid />;
  const [day, month, year] = result.slice(1).map(Number);
  if ([day, month, year].some((x) => isNaN(x))) return <NotValid />;
  const session = await getSession();
  const tz = await getTimeZone(session!.user!, redirect);
  const dayData = await getDay(dayKey, session!.user!.id);
  if (dayData) return <Display day={dayData} />;
  const today = DateTime.now().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  }).setZone(tz);
  const thatDay = DateTime.fromObject({
    year,
    month,
    day
  }).setZone(tz);
  const diff = thatDay.diff(today, ["days"]).days
  if(diff === 0 || diff === -1){
    return <Create createDay={createDay} dayKey={dayKey} />
  }
  

  return (
    <>
      <Header>
        <Link href={"/c"}>Go Back</Link>
      </Header>
      YOU CANT EDIT THIS DAY BTW
    </>
  );
}

function NotValid() {
  return (
    <>
      <h1>Not Valid</h1>
      <Link href={"/"}>
        HOME
      </Link>
    </>
  );
}
