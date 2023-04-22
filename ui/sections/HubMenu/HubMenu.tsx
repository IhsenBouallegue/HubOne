import {
  Affix,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import type { Hub } from "@prisma/client";
import {
  IconAppsFilled,
  IconBoxMultiple,
  IconPhoto,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";

import HubLogo from "../../components/HubLogo";

export default function HubMenu({ hubs }: { hubs: Hub[] }) {
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      trigger="hover"
      position="top-end"
      offset={9}
      withArrow
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
        <SimpleGrid p="sm" cols={3}>
          {hubs.map((hub) => (
            <Menu.Item>
              <Stack>
                <HubLogo hub={hub} />
                <Text align="center">{hub.hubName}</Text>
              </Stack>
            </Menu.Item>
          ))}
        </SimpleGrid>
        <Menu.Divider />
        <Menu.Item icon={<IconPlus size={14} />}>Create New Hub</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
