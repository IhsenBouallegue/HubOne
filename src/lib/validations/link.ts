import { createInsertSchema } from "drizzle-zod";
import { links } from "../schema/app";

export const insertLinksSchema = createInsertSchema(links, {
  title: (schema) =>
    schema.title
      .min(1, "Description must not be empty.")
      .max(30, "Title is too long."),
  description: (schema) =>
    schema.description.min(1, "Description must not be empty."),
  url: (schema) => schema.url.url("Please enter a valid URL."),
});

export const linksSchema = insertLinksSchema.omit({ id: true });
