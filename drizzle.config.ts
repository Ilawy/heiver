import { defineConfig } from "drizzle-kit";
import { env } from "./lib/consts";

const isProd = env("NODE_ENV") === "production";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  driver: isProd ? "turso" : "libsql",
  out: "drizzle",
  dbCredentials: {
    url: env("TURSO_URL"),
    authToken: env("TURSO_TOKEN", !isProd),
  },
  verbose: true,
  strict: true,
});
