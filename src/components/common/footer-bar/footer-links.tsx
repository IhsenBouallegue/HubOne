import { Anchor, Group } from "@mantine/core";
import { useHubOneStore } from "@lib/Store";
import { FooterLink } from "@prisma/client";
import { useFetchByHubId } from "@lib/useQueries";

export function FooterLinks() {
  const { data: footerLinks } = useFetchByHubId<FooterLink>(
    "footerlinks",
    useHubOneStore((state) => state.hubId)!
  );

  return (
    <Group
      sx={(theme) => ({
        [theme.fn.largerThan("sm")]: {
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0)",
        },
      })}
    >
      {footerLinks?.map(({ title, link }) => (
        <Anchor<"a">
          color="dimmed"
          key={`footer_link_${title}`}
          href={link}
          sx={{ lineHeight: 1 }}
          onClick={(event) => event.preventDefault()}
          size="sm"
        >
          {title}
        </Anchor>
      ))}
    </Group>
  );
}
