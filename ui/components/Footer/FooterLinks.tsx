import { Anchor, Group } from "@mantine/core";
import { useHubOneStore } from "../../../lib/Store";

export default function FooterLinks() {
  const footerLinks = useHubOneStore((state) => state.footerLinks);

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
