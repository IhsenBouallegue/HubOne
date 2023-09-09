import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import { Group, Title } from "@mantine/core";

export default function Page() {
  return (
    <div>
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      <Group gap="xl">
        <HubSpaceCard />
        <HubSpaceAddCard />
      </Group>
    </div>
  );
}
