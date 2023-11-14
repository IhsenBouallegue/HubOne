import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./src/lib/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  verbose: true,
  dbCredentials: {
    uri: `${process.env.DATABASE_URL}`,
  },
} satisfies Config;
