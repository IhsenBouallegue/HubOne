import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from "./schema/app";

export async function getHubSpacesPaths() {
  const hubs = await db.query.hubs.findMany({ with: { hubSpace: true } });

  return hubs.map((hub) => ({
    domain: hub.hubSpace.domain,
    hubPath: [hub.hubPath],
  }));
}

const connection = connect({
  url: process.env.DATABASE_URL,
});

const db = drizzle(connection, { schema });

export default db;
