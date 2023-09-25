import { useHubOneStore } from "@/lib/Store";
import { useFetchItem } from "@/lib/useQueries";
import { Container, Text, Title, useMantineTheme } from "@mantine/core";

import { Hub } from "@/lib/schema";
import classes from "./compact-hero.module.css";

export function CompactHero() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { hubName, description, primaryColor, secondaryColor } = hub!;
  const theme = useMantineTheme();

  return (
    <Container size={800} className={classes.container}>
      <Title fz={32}>
        The{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{
            from: theme.colors.primary[4],
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
      <Text mt="xl" c="dimmed" fz="lg">
        {description}
      </Text>
    </Container>
  );
}
