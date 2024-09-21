import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default {
  schema: "./src/lib/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: `${process.env.POSTGRES_URL}`,
  },
} satisfies Config;
