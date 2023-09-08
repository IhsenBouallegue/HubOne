import db from "@lib/db";
import { footerLinks } from "@lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hubId = req.nextUrl.searchParams.get("hubId");
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await db.query.footerLinks.findMany({
        where: eq(footerLinks.hubId, Number(hubId)),
      });
    } else {
      items = await db.query.footerLinks.findMany();
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
