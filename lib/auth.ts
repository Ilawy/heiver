import "server-only";

import { Lucia, Session, DatabaseUser } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { IUsers, Tsessions, Tusers } from "./db/schema";
import { cache } from "react";
import { User } from "lucia";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cache2 } from "./consts";
import { z } from "zod";



const adapter = new DrizzleSQLiteAdapter(db, Tsessions, Tusers);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(user) {
    
    
    return {
      name: user.name,
      username: user.username,
      timezone: user.timezone
    };
  }
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Pick<z.infer<typeof IUsers.select>, 'name' | 'username' | 'timezone'>
  }


  
}

export const getSession = cache2(async function getSession(sessionId: RequestCookie | undefined = cookies().get(lucia.sessionCookieName)) {
  if (!sessionId || !sessionId.value) return null;
  const result = await lucia.validateSession(sessionId.value);
  if(!result.session&&!result.user){
    return null
  }
  return result
  
})

// export const validateRequest = cache(
//   async (): Promise<
//     { user: User; session: Session } | { user: null; session: null }
//   > => {
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
//     if (!sessionId) {
//       return {
//         user: null,
//         session: null,
//       };
//     }

//     const result = await lucia.validateSession(sessionId);
//     // next.js throws when you attempt to set cookie when rendering page
//     try {
//       if (result.session && result.session.fresh) {
//         const sessionCookie = lucia.createSessionCookie(result.session.id);
//         cookies().set(
//           sessionCookie.name,
//           sessionCookie.value,
//           sessionCookie.attributes,
//         );
//       }
//       if (!result.session) {
//         const sessionCookie = lucia.createBlankSessionCookie();
//         cookies().set(
//           sessionCookie.name,
//           sessionCookie.value,
//           sessionCookie.attributes,
//         );
//       }
//     } catch {}
//     return result;
//   },
// );
