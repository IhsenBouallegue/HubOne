import { createInsertSchema } from "drizzle-zod";
import { linkGroups } from "../schema/app";

export const insertLinkGroupsSchema = createInsertSchema(linkGroups, {
  title: (schema) =>
    schema.title
      .min(1, "Title must not be empty.")
      .max(30, "Title is too long."),
});

export const linkGroupsSchema = insertLinkGroupsSchema.omit({ id: true });
