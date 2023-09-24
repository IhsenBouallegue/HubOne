"use client";

import { Anchor, Group } from "@mantine/core";

export function FooterLinks() {
  return (
    <Group>
      {footerLinks?.map(({ title, link }) => (
        <Anchor<"a">
          c="dimmed"
          key={`footer_link_${title}`}
          href={link}
          style={{ lineHeight: 1 }}
          size="sm"
        >
          {title}
        </Anchor>
      ))}
    </Group>
  );
}

const footerLinks = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms of Use", link: "/terms-of-use" },
];
