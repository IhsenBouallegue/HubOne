import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  verbose: true,
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}"?ssl={"rejectUnauthorized":true}"`,
  },
} satisfies Config;
