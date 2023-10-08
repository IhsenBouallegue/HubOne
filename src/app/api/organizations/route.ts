import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const organization = insertOrganizationSchema.parse(req.body);
    await db.insert(organizations).values(organization);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
