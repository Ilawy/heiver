import { and, eq, or, sql } from "drizzle-orm";
import { db } from "./db";
import { Tdays, Tusers } from "./db/schema";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { formData, json, numeric, text } from "zod-form-data";
import { z } from "zod";
import "server-only";
import { generateId, Scrypt } from "lucia";
import { LibsqlError } from "@libsql/client";
import { getSession, lucia } from "./auth";
import { redirect, RedirectType } from "next/navigation";
import { match, P } from "ts-pattern";
import { RedisKV } from "./kv";
import { env } from "./consts";
import { createClient } from "redis";
import { revalidatePath } from "next/cache";

export type Result<T = any> = { ok: true; data: T } | { ok: false; error: string };

export async function getMonthAVG(
  userId: string,
  month: number,
): Promise<
  Result<{
    days: number;
    average: number;
  }>
> {
  try {
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
      ok: true,
      data: {
        days: result.length,
        average: Math.round(avg.reduce((a, b) => a + b, 0) / avg.length * 10) /
          10,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: `${e}`,
    };
  }
}

export async function submitDayData(
  _: unknown,
  fd: FormData,
): Promise<Result> {
  "use server";
  try {
    const session = await getSession();
    //TODO: check if this is necessary
    if (!session) throw new Error("no session found");
    if (fd.get("note") === "") fd.delete("note");
    const schema = formData({
      religion: numeric(),
      life: numeric(),
      health: numeric(),
      date: json(
        z.object({ year: numeric(), month: numeric(), day: numeric() }),
      ),
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
        owner: session.user.id,
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
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: `${e}`,
    };
  }
}

export async function signup(_: unknown, fd: FormData): Promise<Result> {
  "use server";
  const schema = formData({
    username: z.string().min(3).max(32),
    password: z.string().min(8).max(255),
    email: z.string().email(),
  });
  try {
    const output = schema.safeParse(fd);
    if (!output.success) {
      throw new Error(`malformed payload ${output.error.message}`);
    }
    const data = output.data;
    const hashedPass = await new Scrypt().hash(data.password);
    const id = generateId(16);

    await db.insert(Tusers).values({
      email: data.email,
      username: data.username,
      id,
      name: "Cat6",
      password: hashedPass,
    });

    throw new Error("not implemented");
  } catch (e) {
    if (e instanceof LibsqlError && e.code === "SQLITE_CONSTRAINT") {
      return {
        ok: false,
        error: `${/(.*?)\.(.*?)$/.exec(e.message)?.at(-1)} already taken`,
      };
    }

    return {
      ok: false,
      //@ts-ignore
      error: e.message,
    };
  }
}

export async function login(
  // prev: unknown,
  fd: FormData,
): Promise<Result> {
  "use server";
  try {
    const schema = formData({
      usernameOrEmail: z.string().min(3).max(32),
      password: z.string().min(8).max(255),
    });

    const output = schema.safeParse(fd);
    if (!output.success) {
      return {
        ok: false,
        error: `malformed payload ${output.error.message}`,
      };
    } else {
      const isEmail =
        z.string().email().safeParse(output.data.usernameOrEmail).success;
      const data = output.data;
      const user = await db
        .select({
          id: Tusers.id,
          name: Tusers.name,
          username: Tusers.username,
          email: Tusers.email,
          password: Tusers.password,
        })
        .from(Tusers)
        .where(
          and(
            or(
              eq(Tusers.username, data.usernameOrEmail),
              eq(Tusers.email, data.usernameOrEmail),
            ),
          ),
        );
      if (user.length === 0) {
        return {
          ok: false,
          error: "user not found",
        };
      }
      const validPass = await new Scrypt().verify(
        user[0].password,
        data.password,
      );
      if (!validPass) {
        return {
          ok: false,
          error: "incorrect password",
        };
      }
      const session = await lucia.createSession(user[0].id, {});
      const cookie = lucia.createSessionCookie(session.id);
      cookies().set(cookie.name, cookie.value, cookie.attributes);
      return redirect("/app");
    }
  } catch (e) {
    return {
      ok: false,
      //@ts-ignore
      error: e.message,
    };
  }
}


export async function updateName(fd: FormData) {
  "use server";
  try {
    const schema = z.string().min(3).max(255);
    const output = schema.safeParse(fd.get("name"));
    if (!output.success) {
      return {
        ok: false,
        error: `malformed payload ${output.error.message}`,
      };
    }
    const newName = output.data;
    const session = await getSession();
    await db
      .update(Tusers)
      .set({ name: newName })
      .where(eq(Tusers.id, session!.user!.id));
    revalidatePath("/app/settings", "page");
  } catch (e) {
    return {
      ok: false,
      error: `${e}`,
    };
  }
}

export async function updateTimeZone(
  _: unknown,
  fd: FormData,
): Promise<Result> {
  "use server";
  try {
    const schema = z.string().min(3).max(255);
    const output = schema.safeParse(fd.get("timezone"));
    if (!output.success) {
      return {
        ok: false,
        error: `malformed payload ${output.error.message}`,
      };
    }
    const newTimeZone = output.data;
    const session = await getSession();
    await db
      .update(Tusers)
      .set({ timezone: newTimeZone })
      .where(eq(Tusers.id, session!.user!.id));
    revalidatePath("/app/settings", "page");
    return {
      ok: true,
      data: newTimeZone,
    };
  } catch (e) {
    return {
      ok: false,
      error: `${e}`,
    };
  }
}

export async function deleteDay(fd: FormData) {
  "use server";
  try {
    const schema = formData({
      id: z.any(),
    });
    const output = schema.safeParse(fd);
    if (!output.success) {
      return {
        ok: false,
        error: `malformed payload ${output.error.message}`,
      };
    }
    const session = await getSession();
    const result = await db
      .delete(Tdays)
      .where(and(
        eq(Tusers.id, session!.user!.id),
        eq(Tdays.id, output.data.id),
      ));
    return {
      ok: true,
      data: true,
    };
  } catch (e) {
    return {
      ok: false,
      error: `${e}`,
    };
  }
}
