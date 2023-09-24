"use client";

import HeaderBase from "@components/common/header-base";
import { Burger, Collapse, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { HeaderLogo } from "./header-logo";

export function HeaderBar() {
  const [opened, toggleOpened] = useToggle();

  return (
    <HeaderBase>
      <Group justify="space-between" w="100%">
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            hiddenFrom="sm"
          />
          <HeaderLogo />
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
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
        <HeaderActions />
      </Group>
      <Collapse in={opened}>
        <Group gap="md" mt="sm">
          <HeaderLinks toggleOpened={toggleOpened} />
        </Group>
      </Collapse>
    </HeaderBase>
  );
}
