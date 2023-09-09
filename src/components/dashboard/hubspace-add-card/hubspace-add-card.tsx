"use client";

import { Paper, Stack, Text, rem, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function HubSpaceAddCard() {
  const theme = useMantineTheme();
  return (
    <Paper w={rem(292)} h={rem(364)} radius="lg" shadow="medium">
      <Stack
        align="center"
        justify="center"
        style={() => ({ height: "inherit" })}
      >
        <IconPlus size={36} strokeWidth={2} color={theme.colors.primary[4]} />
        <Text ta="center">Add HubSpace</Text>
      </Stack>
    </Paper>
  );
}
