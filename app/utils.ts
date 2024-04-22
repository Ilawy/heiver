import { User } from "lucia";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { RedirectType, type redirect as _redirect } from "next/navigation";



export async function getTimeZone(user: User, redirect: typeof _redirect) {
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
  


  