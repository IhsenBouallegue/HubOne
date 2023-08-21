import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { AppShell, Navbar, Stack, Header, Group, Button } from "@mantine/core";
import { IconHome, IconLayoutDashboard, IconUsers } from "@tabler/icons-react";
import { ReactElement } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xl" withBorder={false}>
          <Navbar.Section>
            <Stack>
              <Button
                component="a"
                href="/dashboard"
                variant="subtle"
                styles={{ inner: { justifyContent: "left" } }}
                leftIcon={<IconHome />}
              >
                Home
              </Button>
              <Button
                component="a"
                href="/dashboard/hubspaces"
                variant="subtle"
                styles={{ inner: { justifyContent: "left" } }}
                leftIcon={<IconLayoutDashboard />}
              >
                HubSpaces
              </Button>
              <Button
                component="a"
                href="/dashboard/members"
                variant="subtle"
                styles={{ inner: { justifyContent: "left" } }}
                leftIcon={<IconUsers />}
              >
                Members
              </Button>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart" h="100%">
            <Group ml={300} pl="xs">
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
    >
      {children}
    </AppShell>
  );
}
