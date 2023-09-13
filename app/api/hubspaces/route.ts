import { auth } from "@clerk/nextjs";
import db from "@lib/db";
import { hubSpaces } from "@lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, orgId } = auth();
    const item = await db
      .insert(hubSpaces)
      .values({ ...body, ownerId: orgId ?? userId });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
