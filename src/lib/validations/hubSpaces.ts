import { createInsertSchema } from "drizzle-zod";
import { hubSpaces } from "../schema/app";

export const insertHubSpaceSchema = createInsertSchema(hubSpaces, {
  name: (schema) =>
    schema.name.min(2, "Name must be at least 2 characters long"),
  domain: (schema) =>
    schema.domain
      .min(2, "Domain must be at least 2 characters long")
      .regex(
        /^[a-z0-9-]+$/,
        "Dlomains can only contain alphanumeric characters and hyphens."
      ),
});

export const hubSpaceSchema = insertHubSpaceSchema.omit({ id: true });
