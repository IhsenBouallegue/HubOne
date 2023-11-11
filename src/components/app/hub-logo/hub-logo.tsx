"use client";

import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";
import Image from "next/image";
import { DefaultHubLogo } from "./default-hub-logo";

export function HubLogo({ name }: { name?: string }) {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { name: currentname, logo } = hub!;

  return logo ? (
    <Image height={28} width={28} alt="hub logo" src={logo} />
  ) : (
    <DefaultHubLogo name={name || currentname} />
  );
}
