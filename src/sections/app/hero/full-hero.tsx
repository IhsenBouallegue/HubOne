import BackgroundImg from "@components/app/background-img";
import { useHubOneStore } from "@lib/Store";
import { useFetchItem } from "@lib/useQueries";
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Hub } from "@prisma/client";
import { Link as ScrollLink } from "react-scroll";

import classes from "./full-hero.module.css";

export function FullHero() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { hubName, description, primaryColor, secondaryColor } = hub!;

  const editMode = useHubOneStore((state) => state.editMode);
  const setEditMode = useHubOneStore((state) => state.setEditMode);
  const theme = useMantineTheme();
  const name = () => (
    <Text component="span" inherit>
      {" for "}
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
    </Text>
  );
  return (
    <div className={classes.wrapper}>
      <BackgroundImg
        className={classes.background}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <Container size={800} className={classes.inner}>
        <Title order={1} className={classes.title}>
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
          you will ever need
          {hubName ? name() : "."}
        </Title>

        <Text className={classes.description} color="dimmed">
          {description}
        </Text>

        <Group className={classes.controls}>
          <ScrollLink
            className={classes.ctaContainer}
            to="linkSection"
            smooth="easeInOutQuint"
            duration={1000}
          >
            <Button
              size="xl"
              className={classes.cta}
              variant="gradient"
              gradient={{
                from: theme.colors.primary[4],
                to: theme.colors.secondary[4],
              }}
            >
              Browse Links
            </Button>
          </ScrollLink>

          <Button
            component="a"
            size="xl"
            variant="outline"
            className={classes.cta}
            color="dark"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "View Mode" : "Edit Mode"}
          </Button>
        </Group>
      </Container>
    </div>
  );
}
