import db from "@lib/db";
import { hubs } from "@lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hubId = req.nextUrl.searchParams.get("hubId");
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await db.query.hubs.findFirst({
        where: eq(hubs.id, Number(hubId)),
      });
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const hub = await req.json();
  try {
    await db.insert(hubs).values(hub);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
