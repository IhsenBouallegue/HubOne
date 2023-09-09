"use client";

import { Burger, Collapse, Group, Paper } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { ComponentType, ReactNode, SetStateAction } from "react";

export function HeaderBar({
  left,
  middle: Middle,
  right,
}: {
  left: ReactNode;
  middle: ComponentType<{
    toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
  }>;
  right: ReactNode;
}) {
  const [opened, toggleOpened] = useToggle();

  return (
    <Paper
      px="xl"
      py="md"
      m="sm"
      shadow="md"
      radius="lg"
      mih="4rem"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Group justify="space-between" w="100%">
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            hiddenFrom="sm"
          />
          {left}
        </Group>
        <Group
          justify="lg"
          pos="absolute"
          left="50%"
          visibleFrom="sm"
          style={{
            transform: "translate(-50%, 0)",
          }}
        >
          <Middle toggleOpened={toggleOpened} />
        </Group>
        {right}
      </Group>
      <Collapse in={opened}>
        <Group gap="md" mt="sm">
          <Middle toggleOpened={toggleOpened} />
        </Group>
      </Collapse>
    </Paper>
  );
}
