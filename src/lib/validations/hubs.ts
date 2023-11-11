import { createInsertSchema } from "drizzle-zod";
import { hubs } from "../schema/app";

export const insertHubsSchema = createInsertSchema(hubs, {
  name: (schema) => schema.name.min(1, "Name must not be empty."),
  logo: (schema) => schema.logo.url("Please enter a valid URL."),
  slug: (schema) =>
    schema.slug
      .min(1, "Path must not be empty.")
      .max(30, "Path is too long.")
      .regex(
        /^[a-z0-9-]+$/,
        "Slugs can only contain alphanumeric characters and hyphens."
      ),
});

export const hubsSchema = insertHubsSchema.omit({ id: true, createdAt: true });
