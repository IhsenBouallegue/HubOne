CREATE TABLE IF NOT EXISTS "FooterLink" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"hubId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Hub" (
	"id" serial PRIMARY KEY NOT NULL,
	"hubName" text NOT NULL,
	"hubLogo" text NOT NULL,
	"hubPath" text DEFAULT '/' NOT NULL,
	"primaryColor" text DEFAULT '#ff008c' NOT NULL,
	"secondaryColor" text DEFAULT '#0cd4f7' NOT NULL,
	"description" text DEFAULT 'Tired of keeping track of new websites? Tired of having to update your bookmarks every few weeks? Access all sites from this one page. Everything is up to date. No need to clutter your life anymore!' NOT NULL,
	"hubSpaceId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HubSpace" (
	"id" serial PRIMARY KEY NOT NULL,
	"domain" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Link" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"link" text NOT NULL,
	"isInternal" boolean DEFAULT false NOT NULL,
	"linkGroupId" integer,
	"hubId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LinkGroup" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"hubId" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Hub_hubPath_key" ON "Hub" ("hubPath");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "HubSpace_domain_key" ON "HubSpace" ("domain");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FooterLink" ADD CONSTRAINT "FooterLink_hubId_Hub_id_fk" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Hub" ADD CONSTRAINT "Hub_hubSpaceId_HubSpace_id_fk" FOREIGN KEY ("hubSpaceId") REFERENCES "HubSpace"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Link" ADD CONSTRAINT "Link_linkGroupId_LinkGroup_id_fk" FOREIGN KEY ("linkGroupId") REFERENCES "LinkGroup"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Link" ADD CONSTRAINT "Link_hubId_Hub_id_fk" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LinkGroup" ADD CONSTRAINT "LinkGroup_hubId_Hub_id_fk" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
