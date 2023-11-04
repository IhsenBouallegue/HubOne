"use server";

import db from "@/lib/db";
import { users } from "@/lib/schema/auth";
import { usersToOrganizations } from "@/lib/schema/orgaizations";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { auth } from "../../../../../../auth";

export async function inviteMember(organizationId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");
    const email = formData.get("email")?.toString();
    if (!email) throw new Error("No email provided");

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: { id: true },
    });
    if (!user) throw new Error("No user found with this email");
    await db
      .insert(usersToOrganizations)
      .values({
        userId: user.id,
        organizationId: organizationId,
      })
      .catch(() => {
        throw new Error("User is already a member of this organization");
      });

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { error: validationError.message };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong." };
  }
}

export async function removeMember(organizationId: string, userId: string) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    await db
      .delete(usersToOrganizations)
      .where(
        and(
          eq(usersToOrganizations.organizationId, organizationId),
          eq(usersToOrganizations.userId, userId)
        )
      )
      .catch(() => {
        throw new Error("User is not a member of this organization.");
      });

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { error: validationError.message };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong." };
  }
}
