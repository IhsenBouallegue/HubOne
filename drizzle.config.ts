import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: `${process.env.POSTGRES_URL}`,
  },
} satisfies Config;
