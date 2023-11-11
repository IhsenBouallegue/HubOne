import { createInsertSchema } from "drizzle-zod";
import { hubSpaces } from "../schema/app";

export const insertHubSpaceSchema = createInsertSchema(hubSpaces, {
  name: (schema) =>
    schema.name.min(1, "Name must not be empty.").max(30, "Name is too long."),
  domain: (schema) =>
    schema.domain
      .min(1, "Domain must not be empty.")
      .max(30, "Domain is too long.")

      .regex(
        /^[a-z0-9-]+$/,
        "Dlomains can only contain alphanumeric characters and hyphens."
      ),
});

export const hubSpaceSchema = insertHubSpaceSchema.omit({ id: true });
