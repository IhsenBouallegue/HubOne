import { createInsertSchema } from "drizzle-zod";
import { hubs } from "../schema/app";

export const insertHubsSchema = createInsertSchema(hubs, {
  hubName: (schema) =>
    schema.hubName.min(2, "Title must be at least 2 characters long"),

  hubPath: (schema) =>
    schema.hubPath
      .min(2, "Title must be at least 2 characters long")
      .regex(
        /^[a-z0-9-]+$/,
        "Slugs can only contain alphanumeric characters and hyphens."
      ),
});

export const hubsSchema = insertHubsSchema.omit({ id: true });
