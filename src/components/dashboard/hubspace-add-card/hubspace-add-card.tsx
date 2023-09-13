"use client";

import { Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HubSpaceCreateModal from "@modals/hubspace-modals/hubspace-create-modal";
import { IconPlus } from "@tabler/icons-react";

export function HubSpaceAddCard() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Paper w={292} h={364} radius="lg" shadow="medium" onClick={open}>
        <Stack align="center" justify="center" h="inherit">
          <IconPlus size={36} strokeWidth={2} />
          <Text ta="center">Add HubSpace</Text>
        </Stack>
      </Paper>
      <HubSpaceCreateModal opened={opened} setOpened={close} />
    </>
  );
}
