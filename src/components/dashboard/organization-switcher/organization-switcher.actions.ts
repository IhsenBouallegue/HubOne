"use server";

import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
      slug: formData.get("slug"),
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

export async function deleteOrganization(selectedOrganizationSlug: string) {
  const session = await auth();
  if (!session) return;
  await db
    .delete(organizations)
    .where(
      and(
        eq(organizations.slug, selectedOrganizationSlug),
        eq(organizations.admin, session.user.id)
      )
    )
    .then(
      async () =>
        await db
          .delete(usersToOrganizations)
          .where(
            eq(usersToOrganizations.organizationId, selectedOrganizationSlug)
          )
    );
  redirect("/dashboard");
}
