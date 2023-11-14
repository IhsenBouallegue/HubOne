"use server";

import { HUBSPACE_KEY } from "@/lib/constants";
import db from "@/lib/db";
import { hubSpaces, hubs } from "@/lib/schema/app";
import { insertHubSpaceSchema } from "@/lib/validations/hubSpaces";
import { insertHubsSchema } from "@/lib/validations/hubs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { auth } from "../../../../auth";

export async function createHubSpace(formData: FormData) {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    const newHubSpaceId = HUBSPACE_KEY();
    const hubSpace = insertHubSpaceSchema.parse({
      id: newHubSpaceId,
      name: formData.get("name"),
      ownerId: formData.get("ownerId"),
      domain: formData.get("domain"),
      isPublic: formData.get("isPublic") === "on" ? true : false,
    });
    await db.insert(hubSpaces).values(hubSpace);

    const hub = insertHubsSchema.parse({
      name: formData.get("hubName"),
      hubSpaceId: newHubSpaceId,
    });
    await db.insert(hubs).values(hub);

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { error: validationError.message };
    }
    return {
      error: "Your HubSpace creation request failed. Please try again.",
    };
  }
}

export const deleteHubSpace = async (id: string, organizationId: string) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");
    if (!id || !organizationId) throw new Error("No id provided");
    await db
      .delete(hubSpaces)
      .where(and(eq(hubSpaces.id, id), eq(hubSpaces.ownerId, organizationId)));
    await db.delete(hubs).where(eq(hubs.hubSpaceId, id));

    revalidatePath("/dashboard");
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        error: error.message,
      };

    return {
      error: "Your HubSpace deletion request failed. Please try again.",
    };
  }
};
