import { Center, Group, Image, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import HubLogo from "@components/app/hub-logo";

export function HeaderLogo() {
  return (
    <Group gap="xs">
      <Group hiddenFrom="sm">
        <Image src="/logo/hubone_logo.svg" height={rem(28)} width={rem(28)} />
      </Group>
      <Group visibleFrom="sm">
        <Image src="/logo/hubone_logo_full.svg" width={126} />
      </Group>
      <IconX size={20} strokeWidth={1} color="black" />
      <Center h={rem(28)} w={rem(28)}>
        <HubLogo />
      </Center>
    </Group>
  );
}
