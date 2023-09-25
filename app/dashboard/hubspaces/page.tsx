import { Container, Title } from "@mantine/core";

export default async function Page() {
  // const { orgId, userId } = auth();
  // if (!userId) return null;
  // const ownHubspaces = await db.query.hubSpaces.findMany({
  //   where: eq(hubSpaces.ownerId, orgId ?? userId),
  // });

  return (
    <Container size="lg" pt="2em">
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      {/* <Group gap="xl">
        {ownHubspaces.map((hubspace) => (
          <HubSpaceCard key={`hubspace_card_${hubspace.id}`} {...hubspace} />
        ))}
        {[...Array(HUBSPACE_LIMIT - ownHubspaces.length)].map((index) => (
          <HubSpaceAddCard key={`hubspace_add_card_${index}`} />
        ))}
      </Group> */}
    </Container>
  );
}
