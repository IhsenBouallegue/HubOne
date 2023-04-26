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
import type { Hub } from "@prisma/client";
import { IconAppsFilled, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import HubLogo from "../../components/HubLogo";

export default function HubMenu({ hubs }: { hubs: Hub[] }) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { setCreateModalOpened } = useHubOneContext();

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
            <Menu.Item
              key={`hub_menu_item_${hub.id}`}
              onClick={() => {
                router.push(hub.hubPath);
              }}
            >
              <Stack w={rem(64)} h={rem(148)} justify="flex-start">
                <Center w="100%" h="50%">
                  <HubLogo hub={hub} />
                </Center>
                <Text
                  sx={{ wordWrap: "break-word", hyphens: "auto" }}
                  align="center"
                  lineClamp={3}
                >
                  {hub.hubName}
                </Text>
              </Stack>
            </Menu.Item>
          ))}
        </SimpleGrid>
        <Menu.Divider />
        <Menu.Item
          onClick={() => setCreateModalOpened(true)}
          icon={<IconPlus size={14} />}
        >
          Create New Hub
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}