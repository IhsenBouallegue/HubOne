import { prisma } from "@lib/prisma";

export async function getHubSpaces() {
  const hubSpaces = await prisma.hubSpace.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return hubSpaces;
}

export async function getHubsByHubSpaceId(hubSpaceId: number) {
  const hubSpaces = await prisma.hub.findMany({
    where: { hubSpaceId },
    orderBy: {
      id: "asc",
    },
  });
  return hubSpaces;
}

export async function getHubSpacesPaths() {
  const hubs = await prisma.hub.findMany({ include: { HubSpace: true } });

  return hubs.map((hub) => ({
    params: {
      domain: hub.HubSpace.domain,
      hubPath: [hub.hubPath],
    },
  }));
}
