import { Center, Group, Image, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import HubLogo from "@components/app/hub-logo";
import ResponsiveLogo from "@components/common/responsive-logo";

export function HeaderLogo() {
  return (
    <Group wrap="nowrap">
      <ResponsiveLogo />
      <IconX size={20} strokeWidth={1} color="black" />
      <Center h={rem(28)} w={rem(28)}>
        <HubLogo />
      </Center>
    </Group>
  );
}
