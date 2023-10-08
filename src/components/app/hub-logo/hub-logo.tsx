import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";
import { Image } from "@mantine/core";
import { DefaultHubLogo } from "./default-hub-logo";

export function HubLogo() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { hubName, hubLogo, primaryColor, secondaryColor } = hub!;

  return hubLogo ? (
    <Image src={hubLogo} />
  ) : (
    <DefaultHubLogo
      hubName={hubName}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
}
