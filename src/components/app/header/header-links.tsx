import { useHubOneStore } from "@/lib/Store";
import { LinkGroup } from "@/lib/schema";
import { useFetchByHubId } from "@/lib/useQueries";
import { Button, Group } from "@mantine/core";
import { SetStateAction } from "react";

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
        <Button
          variant="subtle"
          onClick={() => {
            toggleOpened(false);
          }}
        >
          {linkGroup.title}
        </Button>
      ))}
    </Group>
  );
}
