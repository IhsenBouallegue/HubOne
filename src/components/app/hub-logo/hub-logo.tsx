"use client";

import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";
import Image from "next/image";
import { DefaultHubLogo } from "./default-hub-logo";

export function HubLogo() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { hubName, hubLogo } = hub!;

  return hubLogo ? (
    <Image height={28} width={28} alt="hub logo" src={hubLogo} />
  ) : (
    <DefaultHubLogo hubName={hubName} />
  );
}
