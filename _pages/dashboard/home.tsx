import DashboardLayout from "@components/dashboard/dashboard-layout";
import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import { Container, Group, Title } from "@mantine/core";
import { ReactElement } from "react";

export function Home() {
  return (
    <Container size="lg" pt="2em">
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      <Group spacing="xl">
        <HubSpaceCard />
        <HubSpaceAddCard />
      </Group>
    </Container>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
