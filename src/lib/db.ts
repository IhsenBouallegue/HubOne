import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

import { hubSpaces } from "./schema";

export async function getHubSpaces() {
  return db
    .select()
    .from(schema.hubSpaces)
    .orderBy(hubSpaces.id)
    .then((_hubSpaces) => _hubSpaces);
}

// export async function getHubsByHubSpaceId(hubSpaceId: number) {
//   const hubSpaces = await prisma.hub.findMany({
//     where: { hubSpaceId },
//     orderBy: {
//       id: "asc",
//     },
//   });
//   return hubSpaces;
// }

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