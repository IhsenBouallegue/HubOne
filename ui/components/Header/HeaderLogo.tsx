import { Center, Group, Image, MediaQuery, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import HubLogo from "../HubLogo";
import { useHubOneStore } from "../../../lib/Store";

export default function HeaderLogo() {
  const hub = useHubOneStore((state) => state.hub);

  return (
    <Group spacing="xs">
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Image src="/logo/hubone_logo.svg" height={rem(28)} width={rem(28)} />
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Image src="/logo/hubone_logo_full.svg" width={126} />
      </MediaQuery>
      <IconX size={20} strokeWidth={1} color="black" />
      <Center h={rem(28)} w={rem(28)}>
        <HubLogo hub={hub} />
      </Center>
    </Group>
  );
}
