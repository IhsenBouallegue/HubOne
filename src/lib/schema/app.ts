import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import {
  FOOTERLINK_KEY,
  HUBSPACE_KEY,
  HUB_KEY,
  LINKGROUP_KEY,
  LINK_KEY,
} from "../constants";

export const hubSpaces = pgTable(
  "hubspaces",
  {
    id: varchar("id", { length: 256 }).primaryKey().$defaultFn(HUBSPACE_KEY),
    name: varchar("name", { length: 256 }).notNull(),
    domain: varchar("domain", { length: 256 }).notNull(),
    ownerId: varchar("owner_id", { length: 256 }).notNull(),
    isPublic: boolean("is_public").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    domainKey: uniqueIndex("hubspaces_domain_key").on(table.domain),
  })
);

export const hubs = pgTable(
  "hubs",
  {
    id: varchar("id", { length: 256 }).primaryKey().$defaultFn(HUB_KEY),
    name: varchar("name", { length: 256 }).notNull(),
    logo: varchar("logo", { length: 1024 }).default("").notNull(),
    slug: varchar("slug", { length: 256 }).default("/").notNull(),
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
    createdAt: timestamp("created_at").defaultNow(),
    hubSpaceId: varchar("hubspace_id", { length: 256 }).notNull(),
  },
  (table) => ({
    slugKey: uniqueIndex("hub_slug_key").on(table.slug, table.hubSpaceId),
  })
);

export const links = pgTable("links", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(LINK_KEY)
    .notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 1024 }).default("").notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  linkGroupId: varchar("link_group_id", { length: 256 }).notNull(),
  hubId: varchar("hub_id", { length: 256 }).notNull(),
});

export const footerLinks = pgTable("footer_links", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(FOOTERLINK_KEY)
    .notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  hubId: varchar("hub_id", { length: 256 }).notNull(),
});

export const linkGroups = pgTable("link_groups", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(LINKGROUP_KEY)
    .notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  hubId: varchar("hub_id", { length: 256 }).notNull(),
});

// Define the relationships based on the foreign key constraints
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
  linkGroup: one(linkGroups, {
    fields: [links.linkGroupId],
    references: [linkGroups.id],
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
