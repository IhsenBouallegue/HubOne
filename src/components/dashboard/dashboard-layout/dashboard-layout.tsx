"use client";

import ResponsiveLogo from "@/components/common/responsive-logo";
import { API_URL } from "@/lib/useQueries";
import { AppShell, Burger, Button, Group, Stack, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFileInvoice,
  IconHome,
  IconLayoutDashboard,
  IconMap,
  IconUsers,
} from "@tabler/icons-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [opened, { toggle }] = useDisclosure();
  const segment = useSelectedLayoutSegment();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group h="100%" w="100%">
          <Group w={rem(300)} pl="xs">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <ResponsiveLogo />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack p="xs" mt="xl" gap="lg">
          <Button
            component="a"
            href="/dashboard"
            variant={segment === null ? "light" : "subtle"}
            size="md"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconHome />}
          >
            Home
          </Button>
          <Button
            component="a"
            href="/dashboard/hubspaces"
            variant={segment === "hubspaces" ? "light" : "subtle"}
            size="md"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconLayoutDashboard />}
          >
            HubSpaces
          </Button>
          <Button
            variant={segment === "members" ? "light" : "subtle"}
            size="md"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconUsers />}
          >
            Organization
          </Button>
          <Button
            component="a"
            href="/dashboard/plans"
            variant={segment === "plans" ? "light" : "subtle"}
            size="md"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconMap />}
          >
            Plans
          </Button>
          <Button
            variant={segment === "billing" ? "light" : "subtle"}
            size="md"
            styles={{ inner: { justifyContent: "left" } }}
            leftSection={<IconFileInvoice />}
            onClick={() =>
              fetch(`${API_URL}/billing-portal`, { method: "POST" })
                .then((res) => res.json())
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                .then((res) => (window.location.href = res.url))
            }
          >
            Billing
          </Button>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
