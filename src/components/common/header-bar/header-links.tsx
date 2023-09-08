"use client";

import { Button, Group } from "@mantine/core";
import { Link as ScrollLink } from "react-scroll";
import { SetStateAction } from "react";
import { useHubOneStore } from "@lib/Store";
import { useFetchByHubId } from "@lib/useQueries";
import { LinkGroup } from "@lib/schema";

export function HeaderLinks({
  toggleOpened,
}: {
  toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
}) {
  const { data: linkGroups } = useFetchByHubId<LinkGroup>(
    "linkgroups",
    useHubOneStore((state) => state.hubId)!
  );

  return (
    <Group>
      {linkGroups?.map((linkGroup) => (
        <ScrollLink
          key={linkGroup.title}
          to={linkGroup.title}
          smooth="easeInOutQuint"
          duration={1000}
        >
          <Button
            variant="subtle"
            onClick={() => {
              toggleOpened(false);
            }}
          >
            {linkGroup.title}
          </Button>
        </ScrollLink>
      ))}
    </Group>
  );
}
