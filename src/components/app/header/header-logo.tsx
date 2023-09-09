import { Center, Group, Image, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import HubLogo from "@components/app/hub-logo";

export function HeaderLogo() {
  return (
    <Group wrap="nowrap">
      <Image
        hiddenFrom="md"
        src="/logo/hubone_logo.svg"
        h={rem(28)}
        w={rem(28)}
      />
      <Image visibleFrom="md" src="/logo/hubone_logo_full.svg" w={rem(126)} />
      <IconX size={20} strokeWidth={1} color="black" />
      <Center h={rem(28)} w={rem(28)}>
        <HubLogo />
      </Center>
    </Group>
  );
}
