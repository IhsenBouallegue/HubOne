import db from "@/lib/db";
import { linkGroups } from "@/lib/schema/app";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hubId = req.nextUrl.searchParams.get("hubId");
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await db.query.linkGroups.findMany({
        where: eq(linkGroups.hubId, Number(hubId)),
      });
    } else {
      items = await db.query.linkGroups.findMany();
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const linkGroup = await req.json();
  try {
    await db.insert(linkGroups).values(linkGroup);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
