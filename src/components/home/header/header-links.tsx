import { Button, Group } from "@mantine/core";
import { SetStateAction } from "react";
import { Link as ScrollLink } from "react-scroll";

export function HeaderLinks({
  toggleOpened,
}: {
  toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
}) {
  return (
    <Group>
      {headerLinks.map((linkGroup) => (
        <ScrollLink
          key={linkGroup.link}
          to={linkGroup.link}
          smooth="easeInOutQuint"
          duration={1000}
        >
          <Button
            variant="subtle"
            onClick={() => {
              toggleOpened(false);
            }}
          >
            {linkGroup.label}
          </Button>
        </ScrollLink>
      ))}
    </Group>
  );
}

export const headerLinks = [
  {
    link: "features",
    label: "Features",
  },
  {
    link: "pricing",
    label: "Pricing",
  },
  {
    link: "contact",
    label: "Contact",
  },
];
