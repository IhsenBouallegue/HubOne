import DashboardLayout from "@components/dashboard/dashboard-layout";
import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import { Group, Title } from "@mantine/core";
import { ReactElement } from "react";

export function index() {
  return (
    <div>
      <Title size="2em" mb="1.2em" fw={600}>
        HubSpaces
      </Title>
      <Group spacing="xl">
        <HubSpaceCard />
        <HubSpaceAddCard />
      </Group>
    </div>
  );
}

index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
