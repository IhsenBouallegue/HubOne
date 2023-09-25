import db from "@/lib/db";
import { hubs } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const item = await db.query.hubs.findFirst({
      where: eq(hubs.id, Number(context.params.id)),
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const item = await db
      .update(hubs)
      .set(body)
      .where(eq(hubs.id, Number(context.params.id)));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
