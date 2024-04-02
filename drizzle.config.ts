import { defineConfig } from "drizzle-kit";
import { env } from "./lib/consts";
export default defineConfig({
  schema: "./lib/db/schema.ts",
  driver: "turso",
  out: "drizzle",
  dbCredentials: {
    url: env("TURSO_URL"),
    authToken: env("TURSO_TOKEN"),
  },
  verbose: true,
  strict: true,
});
