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
import { IconAppsFilled, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

import HubLogo from "../../components/HubLogo";
import AddHubModal from "../../components/HubModals/AddHubModal";

export default function HubMenu({ hubs }: { hubs: Hub[] }) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [addModalOpened, setAddModalOpened] = useState(false);

  return (
    <>
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
          <SimpleGrid p="sm" cols={3} spacing="sm">
            {hubs.map((hub) => (
              <Menu.Item
                onClick={() => {
                  router.push(hub.hubPath);
                }}
              >
                <Stack w={rem(64)} h={rem(148)} justify="flex-start">
                  <HubLogo hub={hub} />
                  <Text
                    sx={{ wordBreak: "break-all" }}
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
            onClick={() => setAddModalOpened(true)}
            icon={<IconPlus size={14} />}
          >
            Create New Hub
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <AddHubModal opened={addModalOpened} setOpened={setAddModalOpened} />
    </>
  );
}
