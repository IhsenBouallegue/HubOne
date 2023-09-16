"use client";

import { Burger, Collapse, Group, Paper } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { ReactNode } from "react";

export function HeaderBar({
  left,
  // middle,
  right,
}: {
  left: ReactNode;
  // middle: ReactNode;
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
          {/* {middle({ toggleOpened })} */}
        </Group>
        {right}
      </Group>
      <Collapse in={opened}>
        <Group gap="md" mt="sm">
          {/* {middle({ toggleOpened })} */}
        </Group>
      </Collapse>
    </Paper>
  );
}
