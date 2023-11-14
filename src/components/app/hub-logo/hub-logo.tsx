"use client";

import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";
import Image from "next/image";
import { DefaultHubLogo } from "./default-hub-logo";

export function HubLogo({ hub }: { hub?: Hub }) {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: currentHub } = useFetchItem<Hub>("hubs", hubId!);
  const hubToShow = hub || currentHub!;
  return hubToShow?.logo ? (
    <Image fill alt="hub logo" src={hubToShow.logo} />
  ) : (
    <DefaultHubLogo name={hubToShow?.name} />
  );
}
