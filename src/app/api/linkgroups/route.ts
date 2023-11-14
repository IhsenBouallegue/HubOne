import db from "@/lib/db";
import { linkGroups } from "@/lib/schema/app";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function GET(req: NextRequest) {
  const hubId = req.nextUrl.searchParams.get("hubId");
  try {
    let items;
    if (hubId) {
      items = await db.query.linkGroups.findMany({
        where: eq(linkGroups.hubId, hubId),
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
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json(
        { error: validationError.message },
        { status: 500 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
