import db from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hubId = req.nextUrl.searchParams.get("hubId");
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await db.query.links.findMany({
        where: eq(links.hubId, Number(hubId)),
      });
    } else {
      items = await db.query.links.findMany();
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const link = await req.json();
  try {
    await db.insert(links).values(link);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
