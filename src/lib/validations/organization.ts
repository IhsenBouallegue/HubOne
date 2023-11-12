import { createInsertSchema } from "drizzle-zod";
import { organizations } from "../schema/orgaizations";

export const insertOrganizationSchema = createInsertSchema(organizations, {
  name: (schema) =>
    schema.name.min(1, "Name must not be empty.").max(30, "Name is too long."),
  slug: (schema) =>
    schema.slug
      .min(1, "Slug must not be empty.")
      .max(30, "Slug is too long.")
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
