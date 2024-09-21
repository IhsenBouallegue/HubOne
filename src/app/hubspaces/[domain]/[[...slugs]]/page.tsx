import db, { getHubSpacesPaths } from "@/lib/db";
import { hubSpaces, hubs } from "@/lib/schema/app";
import { usersToOrganizations } from "@/lib/schema/orgaizations";
import HubNotFound from "@/sections/app/hub-not-found";
import HubPage from "@/sections/app/hub-page/hub-page";
import HubSpaceNotFound from "@/sections/app/hubspace-not-found";
import HubSpaceNotPublic from "@/sections/app/hubspace-not-public";
import { and, eq } from "drizzle-orm";
import { auth } from "../../../../../auth";

export const revalidate = 0;

export async function generateStaticParams() {
  const hubSpacesParams = await getHubSpacesPaths();
  return hubSpacesParams;
}

export default async function Page({
  params,
}: {
  params: { domain: string; slugs: string[] };
}) {
  const slug = params.slugs?.[0] || "/";
  const { domain } = params;

  const hubSpace = await db.query.hubSpaces.findFirst({
    where: eq(hubSpaces.domain, domain),
  });

  if (!hubSpace) return <HubSpaceNotFound />;

  if (!hubSpace.isPublic) {
    const session = await auth();

    if (!session || !session.user.id) return <HubSpaceNotPublic />;
    const isMember = await db.query.usersToOrganizations.findFirst({
      where: and(
        eq(usersToOrganizations.organizationId, hubSpace.ownerId),
        eq(usersToOrganizations.userId, session.user.id)
      ),
    });
    if (!isMember) return <HubSpaceNotPublic />;
  }

  const hub = await db.query.hubs.findFirst({
    where: and(eq(hubs.hubSpaceId, hubSpace.id), eq(hubs.slug, slug)),
    with: { links: true, linkGroups: true, footerLinks: true },
  });

  const hubSpaceHubs = await db
    .select()
    .from(hubs)
    .where(eq(hubs.hubSpaceId, hubSpace.id))
    .orderBy(hubs.createdAt);

  if (!hub) return <HubNotFound />;

  return (
    <HubPage
      hub={hub}
      links={hub.links}
      linkGroups={hub.linkGroups}
      footerLinks={hub.footerLinks}
      hubs={hubSpaceHubs}
    />
  );
}
