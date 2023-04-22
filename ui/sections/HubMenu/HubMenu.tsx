import { Affix, Menu, ThemeIcon, rem } from "@mantine/core";
import type { Hub } from "@prisma/client";
import { IconPhoto } from "@tabler/icons-react";
import { useState } from "react";

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
            <IconPhoto />
          </ThemeIcon>
        </Affix>
      </Menu.Target>
      <Menu.Dropdown>
        {hubs.map((hub) => (
          <Menu.Item>{hub.hubName}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
