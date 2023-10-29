import { createInsertSchema } from "drizzle-zod";
import { hubSpaces } from "../schema/app";

export const insertHubSpaceSchema = createInsertSchema(hubSpaces, {
  name: (schema) => schema.name.min(2),
  domain: (schema) => schema.domain.min(2),
});

export const hubSpaceSchema = insertHubSpaceSchema.omit({ id: true });
