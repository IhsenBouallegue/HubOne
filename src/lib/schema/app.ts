import { createId } from "@paralleldrive/cuid2";
import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const hubSpaces = mysqlTable(
  "hubspaces",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => `hs_${createId()}`)
      .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    domain: varchar("domain", { length: 256 }).notNull(),
    ownerId: varchar("owner_id", { length: 256 }).notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    domainKey: uniqueIndex("hubspaces_domain_key").on(table.domain),
  })
);

export const hubs = mysqlTable(
  "hubs",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => `hub_${createId()}`)
      .primaryKey(),
    hubName: varchar("hub_name", { length: 256 }).notNull(),
    hubLogo: varchar("hub_logo", { length: 256 }).default(""),
    hubPath: varchar("hub_path", { length: 256 }).default("/").notNull(),
    primaryColor: varchar("primary_color", { length: 256 })
      .default("#ff008c")
      .notNull(),
    secondaryColor: varchar("secondary_color", { length: 256 })
      .default("#0cd4f7")
      .notNull(),
    description: text("description")
      .default(
        "Tired of keeping track of new websites? Tired of having to update your bookmarks every few weeks? Access all sites from this one page. Everything is up to date. No need to clutter your life anymore!"
      )
      .notNull(),
    hubSpaceId: varchar("hubspace_id", { length: 256 }).notNull(),
  },
  (table) => ({
    hubPathKey: uniqueIndex("hub_hub_path_key").on(
      table.hubPath,
      table.hubSpaceId
    ),
  })
);

export const links = mysqlTable("links", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 256 }).default("").notNull(),
  link: varchar("link", { length: 256 }).notNull(),
  isInternal: boolean("is_internal").default(false).notNull(),
  linkGroupId: int("link_group_id"),
  hubId: int("hub_id").notNull(),
});

export const footerLinks = mysqlTable("footer_links", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  link: varchar("link", { length: 256 }).notNull(),
  hubId: int("hub_id").notNull(),
});

export const linkGroups = mysqlTable("link_groups", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  hubId: int("hub_id").notNull(),
});

export const hubsRelations = relations(hubs, ({ one, many }) => ({
  hubSpace: one(hubSpaces, {
    fields: [hubs.hubSpaceId],
    references: [hubSpaces.id],
  }),
  links: many(links),
  linkGroups: many(linkGroups),
  footerLinks: many(footerLinks),
}));

export const linksRelations = relations(links, ({ one }) => ({
  hub: one(hubs, {
    fields: [links.hubId],
    references: [hubs.id],
  }),
}));

export const linkGroupsRelations = relations(linkGroups, ({ one }) => ({
  hub: one(hubs, {
    fields: [linkGroups.hubId],
    references: [hubs.id],
  }),
}));

export const footerLinksRelations = relations(footerLinks, ({ one }) => ({
  hub: one(hubs, {
    fields: [footerLinks.hubId],
    references: [hubs.id],
  }),
}));

export type HubSpace = InferSelectModel<typeof hubSpaces>;
export type Hub = InferSelectModel<typeof hubs>;
export type Link = InferSelectModel<typeof links>;
export type LinkGroup = InferSelectModel<typeof linkGroups>;
export type FooterLink = InferSelectModel<typeof footerLinks>;
