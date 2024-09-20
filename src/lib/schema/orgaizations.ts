import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { ORGANIZATION_KEY } from "../constants";
import { users } from "./auth";

export const usersRelations = relations(users, ({ many }) => ({
  usersToOrganizations: many(usersToOrganizations),
}));

export const organizations = pgTable(
  "organization",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(ORGANIZATION_KEY)
      .primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    admin: varchar("admin", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    isPersonalOrganization: boolean("is_personal_organization")
      .default(false)
      .notNull(),
  },
  (table) => ({
    domainKey: uniqueIndex("slug_key").on(table.slug),
  })
);

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    usersToOrganizations: many(usersToOrganizations),
    admin: one(users, {
      fields: [organizations.admin],
      references: [users.id],
    }),
  })
);

export const usersToOrganizations = pgTable(
  "users_to_organizations",
  {
    userId: varchar("user_id", { length: 128 }).notNull(),
    organizationId: varchar("organization_id", { length: 128 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.organizationId] }),
  })
);

export const usersToOrganizationsRelations = relations(
  usersToOrganizations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [usersToOrganizations.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [usersToOrganizations.userId],
      references: [users.id],
    }),
  })
);

export type Organization = InferSelectModel<typeof organizations>;
export type UsersToOrganization = InferSelectModel<typeof usersToOrganizations>;
