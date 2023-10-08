import db from "@/lib/db";
import { linkGroups } from "@/lib/schema/app";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const item = await db.query.linkGroups.findFirst({
      where: eq(linkGroups.id, Number(context.params.id)),
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
      .update(linkGroups)
      .set(body)
      .where(eq(linkGroups.id, Number(context.params.id)));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const item = await db
      .delete(linkGroups)
      .where(eq(linkGroups.id, Number(context.params.id)));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
