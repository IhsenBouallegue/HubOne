import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import { Container, Group, Title } from "@mantine/core";

export default function Page() {
  return (
    <Container size="lg" pt="2em">
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      <Group gap="xl">
        <HubSpaceCard />
        <HubSpaceAddCard />
      </Group>
    </Container>
  );
}
