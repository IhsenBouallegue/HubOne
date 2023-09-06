"use client";

import { Burger, Collapse, Group, Paper } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { HeaderActionButtons } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { HeaderLogo } from "./header-logo";

export function Header() {
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
      <Group justify="apart" w="100%">
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            hiddenFrom="md"
          />
          <HeaderLogo />
        </Group>
        <Group
          justify="lg"
          pos="absolute"
          left="50%"
          style={{
            transform: "translate(-50%, 0)",
          }}
        >
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
        <HeaderActionButtons />
      </Group>
      <Collapse in={opened}>
        <Group gap="md" mt="sm">
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
      </Collapse>
    </Paper>
  );
}

export default Header;
