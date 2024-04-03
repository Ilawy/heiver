import { drizzle } from "drizzle-orm/libsql";
import { Tdays } from "./schema";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import { env } from "../consts";
// In-memory Postgres
const client = createClient({
  url: env("TURSO_URL"),
  authToken: env("TURSO_TOKEN", true),
});
export const db = drizzle(client);
