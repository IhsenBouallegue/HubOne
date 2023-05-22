import { Button, Group } from "@mantine/core";
import { Link as ScrollLink } from "react-scroll";
import { SetStateAction } from "react";
import { useHubOneStore } from "@lib/Store";

export function HeaderLinks({
  toggleOpened,
}: {
  toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
}) {
  const linkGroups = useHubOneStore((state) => state.linkGroups);

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
