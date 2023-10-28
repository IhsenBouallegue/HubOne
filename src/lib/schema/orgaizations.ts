import { createId } from "@paralleldrive/cuid2";
import { InferSelectModel, relations } from "drizzle-orm";
import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const usersRelations = relations(users, ({ many }) => ({
  usersToOrganizations: many(usersToOrganizations),
}));

export const organizations = mysqlTable("organization", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  admin: varchar("admin", { length: 128 }).notNull(),
  //   image: varchar("image", { length: 255 }),
});

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

export const usersToOrganizations = mysqlTable(
  "users_to_organizations",
  {
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    organizationId: varchar("organization_id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.organizationId),
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
