"use client";

import { useHubOneStore } from "@/lib/Store";
import { FooterLink } from "@/lib/schema";
import { useFetchByHubId } from "@/lib/useQueries";
import { Anchor, Group } from "@mantine/core";

export function FooterLinks() {
  const { data: footerLinks } = useFetchByHubId<FooterLink>(
    "footerlinks",
    useHubOneStore((state) => state.hubId)!
  );

  return (
    <Group>
      {footerLinks?.map(({ title, link }) => (
        <Anchor<"a">
          c="dimmed"
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
