"use client";

import HubLogo from "@components/app/hub-logo";
import { useHubOneStore } from "@lib/Store";
import { Hub } from "@lib/schema";
import {
  Affix,
  Center,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { IconAppsFilled, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export function HubMenu({ hubs }: { hubs: Hub[] }) {
  const [opened, setOpened] = useState(false);
  const setCreateModalOpened = useHubOneStore(
    (state) => state.setCreateModalOpened
  );

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      trigger="hover"
      position="top-end"
      shadow="md"
      radius="md"
    >
      <Menu.Target>
        <Affix position={{ bottom: rem(32), right: rem(32) }}>
          <ThemeIcon radius="xl" size={rem(48)}>
            <IconAppsFilled />
          </ThemeIcon>
        </Affix>
      </Menu.Target>
      <Menu.Dropdown>
        <Title p="sm" order={3}>
          Hub Menu
        </Title>
        <SimpleGrid p="sm" cols={3} spacing="sm">
          {hubs.map((hub) => (
            <Menu.Item key={`hub_menu_item_${hub.id}`}>
              <Link href={hub.hubPath}>
                <Stack w={rem(64)} h={rem(148)} justify="flex-start">
                  <Center w="100%" h="50%">
                    <HubLogo />
                  </Center>
                  <Text
                    style={{ wordWrap: "break-word", hyphens: "auto" }}
                    ta="center"
                    lineClamp={3}
                  >
                    {hub.hubName}
                  </Text>
                </Stack>
              </Link>
            </Menu.Item>
          ))}
        </SimpleGrid>
        <Menu.Divider />
        <Menu.Item
          onClick={() => setCreateModalOpened(true)}
          leftSection={<IconPlus size={14} />}
        >
          Create New Hub
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
