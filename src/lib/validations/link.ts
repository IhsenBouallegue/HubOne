import { createInsertSchema } from "drizzle-zod";
import { links } from "../schema/app";

export const insertLinksSchema = createInsertSchema(links, {
  title: (schema) =>
    schema.title.min(2, "Title must be at least 2 characters long"),
  description: (schema) =>
    schema.description.min(2, "Description must be at least 2 characters long"),
});

export const linksSchema = insertLinksSchema.omit({ id: true });
