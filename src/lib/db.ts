import { prisma } from "@lib/prisma";

export async function getHubSpaces() {
  const hubSpaces = await prisma.hubSpace.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return hubSpaces;
}

export async function getHubSpacesPaths() {
  const hubSpaces = await getHubSpaces();
  const subdomains = hubSpaces.filter((hubSpace) => hubSpace.domain);
  return subdomains.map((hubSpace) => ({
    params: { domain: hubSpace.domain },
  }));
}
