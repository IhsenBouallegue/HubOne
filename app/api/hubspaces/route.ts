import { auth } from "@clerk/nextjs";
import db from "@lib/db";
import { hubSpaces, hubs } from "@lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const HUBSPACE_LIMIT = 3;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, orgId } = auth();
    if (!userId && !orgId) return NextResponse.error();
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(hubSpaces)
      .where(eq(hubSpaces.ownerId, orgId ?? userId))
      .limit(1);
    const ownedHubSpaces = result[0].count;
    if (ownedHubSpaces >= HUBSPACE_LIMIT)
      return NextResponse.json(
        { error: "You have reached the maximum number of Hub Spaces" },
        { status: 403 }
      );

    const { insertId } = await db
      .insert(hubSpaces)
      .values({ ...body, ownerId: orgId ?? userId });

    const insertertedHubSpace = await db.query.hubSpaces.findFirst({
      where: eq(hubSpaces.id, Number(insertId)),
    });

    if (insertertedHubSpace === undefined)
      return NextResponse.json(
        { error: "Hub Space not found" },
        { status: 404 }
      );

    await db.insert(hubs).values({
      hubSpaceId: insertertedHubSpace.id,
      hubName: insertertedHubSpace.domain,
      hubPath: "/",
      hubLogo: "",
    });

    return NextResponse.json(insertertedHubSpace);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
