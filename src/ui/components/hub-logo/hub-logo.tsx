import type { Hub } from "@prisma/client";
import { Image } from "@mantine/core";
import { DefaultHubLogo } from "./default-hub-logo";

export function HubLogo({ hub }: { hub: Hub }) {
  return hub.hubLogo ? (
    <Image src={hub.hubLogo} />
  ) : (
    <DefaultHubLogo {...hub} />
  );
}
