import db from "@lib/db";
import { links } from "@lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const item = await db.query.links.findFirst({
      where: eq(links.id, Number(context.params.id)),
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
      .update(links)
      .set(body)
      .where(eq(links.id, Number(context.params.id)));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const item = await db
      .delete(links)
      .where(eq(links.id, Number(context.params.id)));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}