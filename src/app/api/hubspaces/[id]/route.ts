import db from "@/lib/db";
import { hubSpaces } from "@/lib/schema/app";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const item = await db
      .update(hubSpaces)
      .set(body)
      .where(eq(hubSpaces.id, context.params.id));
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
      .delete(hubSpaces)
      .where(eq(hubSpaces.id, context.params.id));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
