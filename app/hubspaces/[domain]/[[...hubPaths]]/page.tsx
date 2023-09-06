import { getHubSpacesPaths } from "@lib/db";
import HubNotFound from "@sections/app/hub-not-found";
import HubSpaceNotFound from "@sections/app/hub-space-not-found";

export async function generateStaticParams() {
  const hubs = await getHubSpacesPaths();
  return hubs;
}

export default async function index({
  params,
}: {
  params: { domain: string; hubPaths: string[] };
}) {
  const hubPath = params.hubPaths?.[0] || "/";
  const { domain } = params;

  const hubSpace = await prisma.hubSpace.findUnique({
    where: { domain },
  });

  if (!hubSpace) return <HubSpaceNotFound />;

  try {
    const hub = await prisma.hub.findFirstOrThrow({
      where: { hubSpaceId: hubSpace.id, hubPath },
    });
    const hubId = Number(hub?.id);
    const links = await prisma.link.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const linkGroups = await prisma.linkGroup.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const footerLinks = await prisma.footerLink.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const hubs = await prisma.hub.findMany({
      where: { hubSpaceId: hubSpace?.id },
    });
    return <div>{hubPath}</div>;
    // return {
    //   props: { hubData: { hub, links, linkGroups, footerLinks, hubs } },
    //   revalidate: 60 * 5,
    // };
  } catch (e) {
    return <HubNotFound />;
  }
}
