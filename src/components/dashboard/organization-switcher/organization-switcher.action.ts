"use server";

import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { auth } from "../../../../auth";

export async function createOrganization(formData: FormData) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    const newOrganizationId = `org_${createId()}`;
    const organization = insertOrganizationSchema.parse({
      id: newOrganizationId,
      name: formData.get("name"),
      admin: session.user.id,
    });
    await db.insert(organizations).values(organization);
    await db.insert(usersToOrganizations).values({
      userId: session.user.id,
      organizationId: newOrganizationId,
    });

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { error: validationError.message };
    }
    return {
      error: "Your organization creation request failed. Please try again.",
    };
  }
}

export async function deleteOrganization(formData: FormData) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");
    const id = formData.get("id") as string;
    if (!id) throw new Error("No id provided");
    await db
      .delete(organizations)
      .where(
        and(eq(organizations.id, id), eq(organizations.admin, session.user.id))
      );

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        error: error.message,
      };

    return {
      error: "Your organization deletion request failed. Please try again.",
    };
  }
}
