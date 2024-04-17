/* eslint-disable typesafe/no-await-without-trycatch */
import { cookies, headers } from "next/headers";
import { DateTime } from "luxon";
import { MAX_ALLOWED_FUTURE, MAX_ALLOWED_PAST } from "@/lib/consts";
import Edit from "./edit";
import { z } from "zod";
import { log } from "console";
import { AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";
import { IUsers, Tdays, Tusers } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import Display from "./display";
import { deleteDay, getMonthAVG, submitDayData } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { DatabaseSession, Session, User } from "lucia";
import { redirect, RedirectType } from "next/navigation";
// import { validateRequest } from "@/lib/auth";

async function getDay(
  { year, month, day }: DateTime,
  userId: z.infer<typeof IUsers.select>["id"],
) {
  const rows = await db.select().from(Tdays).where(
    and(
      eq(Tdays.date, { year, month, day }),
      eq(Tdays.owner, userId),
    ),
  );
  if (rows.length === 0) return null;
  return rows[0];
}

async function getTimeZone(user: User) {
  const c = cookies();
  if (user.timezone) return user.timezone;
  // else if (c.has("tz")) return c.get("tz")!.value as string;
  redirect("/app/settings/tz", RedirectType.replace);
  // const ipHeader = ["x-real-ip", "x-forwarded-for"].find(x => headers().has(x))
  // // const ip = ipHeader ? headers().get(ipHeader) : undefined
  // const ip = "197.133.89.241"
  // //TODO: set timezone for local developmnent
  // // if(ip === "::1") return "America/New_York"
  // if(false)void 0
  // else{
  //   const checkerURL = new URL("https://ipinfo.io/widget/demo/")
  //   checkerURL.pathname += `${ip}`
  //   console.log(
  //     (await fetch(checkerURL).then((x) => x.json())).data.timezone,
  //   );

  // }
}

export default async function Page(props: {
  params: {
    d: string;
    m: string;
    y: string;
  };
}) {
  const session = await getSession();
  if (!session) throw new Error("FATAL");
  //TODO: ensure that timezone is always present
  const tz = await getTimeZone(session!.user);
  console.log(tz);

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
  //TODO: reset time at `_today` object
  const _today = DateTime.now().setZone(tz || undefined);
  const absToday = DateTime.fromObject({
    day: _today.day,
    month: _today.month,
    year: _today.year,
  });
  const thatDay = DateTime.fromObject({ year: y, month: m, day: d }, {
    zone: tz || undefined,
  });
  if (!thatDay.isValid) return <InvalidDay />;
  const diff = Math.round(
    thatDay.diff(absToday, ["days"], {
      conversionAccuracy: "longterm",
    }).days,
  );
  const day = await getDay(thatDay, session!.user!.id);

  if (
    // //in past AND not in allowed range
    // (diff < 0 && diff * -1 > MAX_ALLOWED_PAST) ||
    // //in future AND not in allowed range AND
    // (diff > 0 && diff > MAX_ALLOWED_FUTURE)

    diff !== 0 && !day
  ) {
    return (
      <Shell date={{ year: y, month: m, day: d }} tz={tz || undefined}>
        <UnmodDay date={{ year: y, month: m, day: d }} tz={tz || undefined} />
      </Shell>
    );
  }

  //   const isModifiable = today;
  if (day === null) {
    return (
      <Shell date={{ year: y, month: m, day: d }} tz={tz || undefined}>
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
    const avg = await getMonthAVG(session!.user!.id, m);

    return (
      <Shell date={{ year: y, month: m, day: d }}>
        <Display
          tz={tz || undefined}
          diff={diff}
          data={day}
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
  //TODO: make required
  tz?: string;
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

function Shell({ date, children, tz }: {
  date: {
    year: number;
    month: number;
    day: number;
  };
  children: React.ReactNode;
  //TODO: make required
  tz?: string;
}) {
  const currentDate = DateTime.now()
    .setZone(tz)
    .set({
      hour: 0,
      minute: 0,
    });
  console.log(currentDate);

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
