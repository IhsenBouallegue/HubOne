"use server";

import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { auth } from "../../../../auth";

export async function createOrganization(formData: FormData) {
  try {
    const session = await auth();
    const organization = insertOrganizationSchema.parse({
      name: formData.get("name"),
      admin: session?.user.id,
    });
    await db.insert(organizations).values(organization);
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
