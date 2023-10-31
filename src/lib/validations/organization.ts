import { createInsertSchema } from "drizzle-zod";
import { organizations } from "../schema/orgaizations";

export const insertOrganizationSchema = createInsertSchema(organizations, {
  name: (schema) =>
    schema.name.min(2, "Name must be at least 2 characters long"),
  slug: (schema) =>
    schema.slug
      .min(2, "Slug must be at least 2 characters long")
      .regex(
        /^[a-z0-9-]+$/,
        "Slugs can only contain alphanumeric characters and hyphens."
      ),
});

export const organizationSchema = insertOrganizationSchema.omit({ id: true });
export const organizationSchemaWithoutAdmin = insertOrganizationSchema.omit({
  id: true,
  admin: true,
});
