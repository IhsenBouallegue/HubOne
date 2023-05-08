import { Container, Text, Title, useMantineTheme } from "@mantine/core";
import { useHubOneStore } from "../../../lib/Store";

export default function CompactHero() {
  const { hubName, description, primaryColor, secondaryColor } = useHubOneStore(
    (state) => state.hub
  );
  const theme = useMantineTheme();

  return (
    <Container
      size={800}
      sx={{
        paddingTop: 100,
        paddingBottom: 80,
        [theme.fn.smallerThan("sm")]: {
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
        {description}
      </Text>
    </Container>
  );
}
