import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { auth } from "auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    const searchParams = req.nextUrl.searchParams;
    const organizationId = searchParams.get("organizationId");
    if (!organizationId)
      return NextResponse.json(
        { error: "organizationId is required" },
        { status: 400 }
      );

    const organization = await await db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId),
    });
    if (organization?.admin !== session.user.id)
      return NextResponse.json(
        { error: "You are not authorized to view this organization." },
        { status: 403 }
      );

    const organizationMembers = await db.query.usersToOrganizations.findMany({
      where: eq(usersToOrganizations.organizationId, organizationId),
      with: { user: true },
    });

    return NextResponse.json({ organizationMembers });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
