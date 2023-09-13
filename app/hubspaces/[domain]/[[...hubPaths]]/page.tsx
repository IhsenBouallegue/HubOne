import { RedirectToSignIn, auth } from "@clerk/nextjs";
import { isOwnerAnOrganisation } from "@lib/auth";
import db, { getHubSpacesPaths } from "@lib/db";
import { hubSpaces, hubs } from "@lib/schema";
import HubNotFound from "@sections/app/hub-not-found";
import HubPage from "@sections/app/hub-page/hub-page";
import HubSpaceNotFound from "@sections/app/hubspace-not-found";
import HubSpaceNotPublic from "@sections/app/hubspace-not-public";
import { and, eq } from "drizzle-orm";

export const revalidate = 0;

export async function generateStaticParams() {
  const hubSpacesParams = await getHubSpacesPaths();
  return hubSpacesParams;
}

export default async function Page({
  params,
}: {
  params: { domain: string; hubPaths: string[] };
}) {
  const hubPath = params.hubPaths?.[0] || "/";
  const { domain } = params;

  const hubSpace = await db.query.hubSpaces.findFirst({
    where: eq(hubSpaces.domain, domain),
  });

  if (!hubSpace) return <HubSpaceNotFound />;

  if (!hubSpace.isPublic) {
    const { userId, sessionClaims } = await auth();

    if (!userId) return <RedirectToSignIn />;

    let isMember = false;
    if (isOwnerAnOrganisation(hubSpace.ownerId)) {
      const orgIds = Object.keys(sessionClaims?.organizations ?? {});
      isMember = orgIds.some((orgId) => orgId === hubSpace.ownerId);
    }

    const isOwner = hubSpace.ownerId === userId;
    if (!(isMember || isOwner)) return <HubSpaceNotPublic />;
  }

  const hub = await db.query.hubs.findFirst({
    where: and(eq(hubs.hubSpaceId, hubSpace.id), eq(hubs.hubPath, hubPath)),
    with: { links: true, linkGroups: true, footerLinks: true },
  });

  const hubSpaceHubs = await db.query.hubs.findMany({
    where: eq(hubs.hubSpaceId, hubSpace.id),
  });

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
