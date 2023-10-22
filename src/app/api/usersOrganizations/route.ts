import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    const memberOrganizations = await db.query.organizations.findMany({
      where: eq(organizations.admin, userId),
    });
    return NextResponse.json({ memberOrganizations });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
