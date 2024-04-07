import { cookies, headers } from "next/headers";
import { DateTime } from "luxon";
import { MAX_ALLOWED_FUTURE, MAX_ALLOWED_PAST } from "@/lib/consts";
import Client from "./client";
import { z } from "zod";
import { log } from "console";
import { AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";
import { Tdays } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import Display from "./display";
import { getMonthAVG, isRecordedToday, submitDayData } from "@/lib/actions";
import { getSession } from "@/lib/auth";
// import { validateRequest } from "@/lib/auth";



export default async function Page(props: {
  params: {
    d: string;
    m: string;
    y: string;
  };
}) {
  const session = await getSession();
  const tz = cookies().get("tz");
  const {
    d: strDay,
    m: strMonth,
    y: strYear,
  } = props.params;
  if ([strDay, strMonth, strYear].some((x) => isNaN(Number(x)))) {
    return <InvalidDay />;
  }
  const y = Number(strYear);
  const m = Number(strMonth);
  const d = Number(strDay);
  const today = DateTime.now();  
  const thatDay = DateTime.fromObject({ year: y, month: m, day: d }, {
    zone: tz?.value,
  });    
  if (!thatDay.isValid) return <InvalidDay />;
  const diff = Math.round(thatDay.diff(today, ["days"]).days);
  if (
    //in past AND not in allowed range
    (diff < 0 && diff * -1 > MAX_ALLOWED_PAST) ||
    //in future AND not in allowed range
    (diff > 0 && diff > MAX_ALLOWED_FUTURE)
  ) {
    console.log("alot", today, thatDay, diff);

    return <UnmodDay />;
  }

  //   const isModifiable = today;
  const rows = await db.select().from(Tdays).where(
    and(
      eq(Tdays.date, { year: y, month: m, day: d }),
      eq(Tdays.owner, session!.user!.id),
    ),
  );
  if (rows.length === 0) {
    return (
      <Client
        date={{
          year: y,
          month: m,
          day: d,
        }}
        submitDayData={submitDayData}
      />
    );
  } else {
    //display day
    const data = rows[0]!;
    const avg = await getMonthAVG(session!.user!.id, m);
    const todayRecorded = await isRecordedToday(1)    
    
    return (
      <Display
        tz={tz?.value!}
        diff={diff}
        data={data}
        avg={avg}
        todayRecorded={todayRecorded}
      />
    );
  }
}

function UnmodDay() {
  return (
    <div>
      You cant edit this day
    </div>
  );
}

function InvalidDay() {
  return (
    <div>
      Seems like this is not a valid day
    </div>
  );
}
