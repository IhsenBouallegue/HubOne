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
      <Title order={1} fz={42}>
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
        &apos;s{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{
            from: theme.colors.brand[4],
            to: theme.colors.secondary[4],
          }}
          inherit
        >
          Hub
        </Text>
        .
      </Title>
    </Container>
  );
}
