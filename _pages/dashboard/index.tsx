import DashboardLayout from "@components/dashboard/dashboard-layout";
import { Container, Title } from "@mantine/core";
import { ReactElement } from "react";

export function index() {
  return (
    <Container size="lg" pt="2em">
      <Title size="2em" mb="1.2em" fw={600}>
        Home
      </Title>
    </Container>
  );
}

index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
