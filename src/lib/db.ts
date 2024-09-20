import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as app from "./schema/app";
import * as auth from "./schema/auth";
import * as organizations from "./schema/orgaizations";

export async function getHubSpacesPaths() {
  const hubs = await db.query.hubs.findMany({ with: { hubSpace: true } });
  return hubs.map((hub) => ({
    domain: hub.hubSpace.domain,
    slug: [hub.slug],
  }));
}

const db = drizzle(sql, {
  schema: { ...auth, ...app, ...organizations },
});

export default db;
