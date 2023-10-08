import { createInsertSchema } from "drizzle-zod";
import { organizations } from "../schema/orgaizations";

export const insertOrganizationSchema = createInsertSchema(organizations);

export const organizationSchema = insertOrganizationSchema.omit({ id: true });
