import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const hubs = pgTable(
  "hubs",
  {
    id: serial("id").primaryKey().notNull(),
    hubName: text("hub_name").notNull(),
    hubLogo: text("hub_logo").notNull(),
    hubPath: text("hub_path").default("/").notNull(),
    primaryColor: text("primary_color").default("#ff008c").notNull(),
    secondaryColor: text("secondary_color").default("#0cd4f7").notNull(),
    description: text("description")
      .default(
        "Tired of keeping track of new websites? Tired of having to update your bookmarks every few weeks? Access all sites from this one page. Everything is up to date. No need to clutter your life anymore!"
      )
      .notNull(),
    hubSpaceId: integer("hubspace_id")
      .notNull()
      .references(() => hubSpaces.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    hubPathKey: uniqueIndex("hub_hub_path_key").on(table.hubPath),
  })
);

export const links = pgTable("links", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").default("").notNull(),
  link: text("link").notNull(),
  isInternal: boolean("is_internal").default(false).notNull(),
  linkGroupId: integer("link_group_id").references(() => linkGroups.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  hubId: integer("hub_id")
    .notNull()
    .references(() => hubs.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const footerLinks = pgTable("footer_links", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  hubId: integer("hub_id")
    .notNull()
    .references(() => hubs.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const linkGroups = pgTable("link_groups", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  hubId: integer("hub_id")
    .notNull()
    .references(() => hubs.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const hubSpaces = pgTable(
  "hubspaces",
  {
    id: serial("id").primaryKey().notNull(),
    domain: text("domain").notNull(),
    ownerId: text("owner_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    domainKey: uniqueIndex("hubspaces_domain_key").on(table.domain),
  })
);

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
