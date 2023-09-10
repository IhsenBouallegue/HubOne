import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export async function getHubSpacesPaths() {
  const hubs = await db.query.hubs.findMany({ with: { hubSpace: true } });

  return hubs.map((hub) => ({
    domain: hub.hubSpace.domain,
    hubPath: [hub.hubPath],
  }));
}

const queryClient = postgres(process.env.DATABASE_URL as string);
const db = drizzle(queryClient, { schema });

export default db;
