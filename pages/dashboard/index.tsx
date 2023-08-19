import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import HubSpaceAddCard from "@components/dashboard/hubspace-add-card";
import HubSpaceCard from "@components/dashboard/hubspace-card";
import { AppShell, Container, Group, Header, Title } from "@mantine/core";

export default function index() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Group>
              <Title>Dashboard</Title>
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    rootBox: { display: "flex", justifyContent: "center" },
                  },
                }}
              />
            </Group>
            <UserButton />
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Container size="lg" pt="2em">
        <Title size="2em" mb="1.2em" fw={600}>
          HubSpaces
        </Title>
        <Group spacing="xl">
          <HubSpaceCard />
          <HubSpaceAddCard />
        </Group>
      </Container>
    </AppShell>
  );
}
