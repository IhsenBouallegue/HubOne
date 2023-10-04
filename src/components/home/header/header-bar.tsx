"use client";

import HeaderBase from "@/components/common/header-base";
import { Burger, Collapse } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { HeaderLogo } from "./header-logo";

export function HeaderBar() {
  const [opened, toggleOpened] = useToggle();

  return (
    <HeaderBase>
      <div>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          hiddenFrom="sm"
        />
        <HeaderLogo />
      </div>
      <div className="absolute right-1/2 translate-x-1/2 hidden sm:block">
        <HeaderLinks toggleOpened={toggleOpened} />
      </div>
      <HeaderActions />
      <Collapse in={opened}>
        <HeaderLinks toggleOpened={toggleOpened} />
      </Collapse>
    </HeaderBase>
  );
}
