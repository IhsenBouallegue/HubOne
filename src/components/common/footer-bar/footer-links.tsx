import { Anchor, Group } from "@mantine/core";
import { useHubOneStore } from "@lib/Store";
import { FooterLink } from "@prisma/client";
import { useFetchByHubId } from "@lib/useQueries";

import classes from "./footer-links.module.css";

export function FooterLinks() {
  const { data: footerLinks } = useFetchByHubId<FooterLink>(
    "footerlinks",
    useHubOneStore((state) => state.hubId)!
  );

  return (
    <Group className={classes.container}>
      {footerLinks?.map(({ title, link }) => (
        <Anchor<"a">
          color="dimmed"
          key={`footer_link_${title}`}
          href={link}
          style={{ lineHeight: 1 }}
          onClick={(event) => event.preventDefault()}
          size="sm"
        >
          {title}
        </Anchor>
      ))}
    </Group>
  );
}
