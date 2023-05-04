import { Container, Text, Title, useMantineTheme } from "@mantine/core";
import { useHubOneStore } from "../../../lib/Store";

export default function CompactHero() {
  const { hubName, primaryColor, secondaryColor } = useHubOneStore(
    (state) => state.hub
  );
  const theme = useMantineTheme();

  return (
    <Container
      size={800}
      sx={{
        paddingTop: 100,
        paddingBottom: 100,
        [theme.fn.smallerThan("sm")]: {
          paddingBottom: 80,
          paddingTop: 80,
        },
      }}
    >
      <Title fz={32}>
        The{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{
            from: theme.colors.brand[4],
            to: theme.colors.secondary[4],
          }}
          inherit
        >
          one hub
        </Text>{" "}
        for
      </Title>
      <Title order={1} fz={48}>
        <Text
          component="span"
          variant="gradient"
          gradient={{
            from: primaryColor,
            to: secondaryColor,
          }}
          inherit
        >
          {hubName}
        </Text>
        .
      </Title>
      <Text mt="xl" color="dimmed" fz="lg">
        Tired of keeping track of new websites? Tired of having to update your
        bookmarks every few weeks? Access all sites from this one page.
        Everything is up to date. No need to clutter your life anymore!
      </Text>
    </Container>
  );
}
