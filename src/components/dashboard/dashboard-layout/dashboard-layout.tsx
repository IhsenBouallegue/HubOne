"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { AppShell, Burger, Button, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconLayoutDashboard, IconUsers } from "@tabler/icons-react";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group align="apart" h="100%">
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
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack>
          <Button
            component="a"
            href="/dashboard"
            variant="subtle"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconHome />}
          >
            Home
          </Button>
          <Button
            component="a"
            href="/dashboard/hubspaces"
            variant="subtle"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconLayoutDashboard />}
          >
            HubSpaces
          </Button>
          <Button
            component="a"
            href="/dashboard/members"
            variant="subtle"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconUsers />}
          >
            Members
          </Button>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
