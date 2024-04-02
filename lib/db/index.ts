import { drizzle } from "drizzle-orm/libsql";
import { Tdays } from "./schema";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
// In-memory Postgres
const client = createClient({
  url: "http://127.0.0.1:8080",
});
export const db = drizzle(client);
