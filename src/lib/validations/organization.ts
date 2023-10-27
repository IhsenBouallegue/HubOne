import { createInsertSchema } from "drizzle-zod";
import { organizations } from "../schema/orgaizations";

export const insertOrganizationSchema = createInsertSchema(organizations, {
  name: (schema) => schema.name.min(2),
});

export const organizationSchema = insertOrganizationSchema.omit({ id: true });
export const organizationSchemaWithoutAdmin = insertOrganizationSchema.omit({
  id: true,
  admin: true,
});
