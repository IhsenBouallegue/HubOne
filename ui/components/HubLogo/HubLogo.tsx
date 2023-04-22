import { Image } from "@mantine/core";
import type { Hub } from "@prisma/client";

import DefaultHubLogo from "./DefaultHubLogo";

export default function HubLogo({ hub }: { hub: Hub }) {
  return hub.hubLogo ? (
    <Image src={hub.hubLogo} height={28} width={28} />
  ) : (
    <DefaultHubLogo {...hub} />
  );
}
