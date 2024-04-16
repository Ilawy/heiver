/* eslint-disable typesafe/no-await-without-trycatch */
import { cookies, headers } from "next/headers";
import { DateTime } from "luxon";
import { MAX_ALLOWED_FUTURE, MAX_ALLOWED_PAST } from "@/lib/consts";
import Edit from "./edit";
import { z } from "zod";
import { log } from "console";
import { AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";
import { Tdays } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import Display from "./display";
import {
  deleteDay,
  getMonthAVG,
  submitDayData,
} from "@/lib/actions";
import { getSession } from "@/lib/auth";
// import { validateRequest } from "@/lib/auth";

export default async function Page(props: {
  params: {
    d: string;
    m: string;
    y: string;
  };
}) {
  const session = await getSession().catch(e=>{
    console.log(e);
  });
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
  const today = DateTime.now().setZone(tz?.value);
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

    return (
      <Shell date={{ year: y, month: m, day: d }}>
        <UnmodDay date={{ year: y, month: m, day: d }} tz={tz?.value!} />
      </Shell>
    );
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
      <Shell date={{ year: y, month: m, day: d }}>
        <Edit
          date={{
            year: y,
            month: m,
            day: d,
          }}
          submitDayData={submitDayData}
        />
      </Shell>
    );
  } else {
    //display day
    const data = rows[0]!;
    const avg = await getMonthAVG(session!.user!.id, m);

    return (
      <Shell date={{ year: y, month: m, day: d }}>
        <Display
          tz={tz?.value!}
          diff={diff}
          data={data}
          avg={avg}
          deleteDay={deleteDay}
        />
      </Shell>
    );
  }
}

function UnmodDay({ date, tz }: {
  date: {
    year: number;
    month: number;
    day: number;
  };
  tz: string;
}) {
  const today = DateTime.now().setZone(tz);
  const isFuture = today.diff(DateTime.fromObject(date), ["days"]).days < 0;
  console.log(isFuture);

  if (isFuture) {
    return (
      <div className="p-3">
        <h1>Why are you here?</h1>
        <p>There is no way to predict the future</p>
      </div>
    );
  }
  return (
    <div className="p-3">
      <h1>That was too late</h1>
      <p>No one can edit the past, friend</p>
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

function Shell({ date, children }: {
  date: {
    year: number;
    month: number;
    day: number;
  };
  children: React.ReactNode;
}) {
  const nextDate = DateTime.fromObject({
    year: date.year,
    month: date.month,
    day: date.day,
  }).plus({ day: 1 });
  const prevDate = DateTime.fromObject({
    year: date.year,
    month: date.month,
    day: date.day,
  }).minus({ day: 1 });
  return (
    <>
      {children}
      <div className="flex gap-2 p-3 items-center justify-between">
        <a
          className="as-button"
          href={`/app/day/${prevDate.day}/${prevDate.month}/${prevDate.year}`}
        >
          Prev
        </a>
        <a
          className="as-button"
          href={`/app/day/${nextDate.day}/${nextDate.month}/${nextDate.year}`}
        >
          Next
        </a>
      </div>
    </>
  );
}
