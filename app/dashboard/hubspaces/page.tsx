import { auth } from "@clerk/nextjs";
import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import db from "@lib/db";
import { hubSpaces } from "@lib/schema";
import { Container, Group, Title } from "@mantine/core";
import { HUBSPACE_LIMIT } from "app/api/hubspaces/route";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { orgId, userId } = auth();
  if (!userId) return null;
  const ownHubspaces = await db.query.hubSpaces.findMany({
    where: eq(hubSpaces.ownerId, orgId ?? userId),
  });

  return (
    <Container size="lg" pt="2em">
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      <Group gap="xl">
        {ownHubspaces.map((hubspace) => (
          <HubSpaceCard {...hubspace} />
        ))}
        {[...Array(HUBSPACE_LIMIT - ownHubspaces.length)].map((_) => (
          <HubSpaceAddCard />
        ))}
      </Group>
    </Container>
  );
}
