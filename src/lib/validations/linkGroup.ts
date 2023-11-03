import { createInsertSchema } from "drizzle-zod";
import { linkGroups } from "../schema/app";

export const insertLinkGroupsSchema = createInsertSchema(linkGroups, {
  title: (schema) =>
    schema.title.min(2, "Name must be at least 2 characters long"),
});

export const linkGroupsSchema = insertLinkGroupsSchema.omit({ id: true });
