import {
  useMantineTheme,
  Container,
  Title,
  Group,
  createStyles,
  Text,
  Button,
} from "@mantine/core";
import { Link as ScrollLink } from "react-scroll";
import { useHubOneStore } from "../../../lib/Store";
import { BackgroundImg } from "../../components/BackgroundImg";

export default function FullHero() {
  const { hubName, primaryColor, secondaryColor } = useHubOneStore(
    (state) => state.hub
  );
  const editMode = useHubOneStore((state) => state.editMode);
  const setEditMode = useHubOneStore((state) => state.setEditMode);
  const { classes, cx } = useStyles();
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
              from: theme.colors.brand[4],
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
          Tired of keeping track of new websites? Tired of having to update your
          bookmarks every few weeks? Access all sites from this one page.
          Everything is up to date. No need to clutter your life anymore!
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
                from: theme.colors.brand[4],
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
            className={cx(classes.cta, classes.secondaryCta)}
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

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: 40,
  },

  inner: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 200,
    margin: "auto",
    [theme.fn.smallerThan("sm")]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.25,
    margin: 0,
    padding: 0,
    color: theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: `calc(2 * ${theme.spacing.xl})`,
    fontSize: 24,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: `calc(3 * ${theme.spacing.xl})`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  cta: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [theme.fn.smallerThan("sm")]: {
      paddingLeft: 18,
      paddingRight: 18,
      width: "100%",
      flex: 1,
    },
  },

  ctaContainer: {
    [theme.fn.smallerThan("sm")]: {
      flex: 1,
    },
  },

  secondaryCta: {
    borderWidth: 2,
    borderColor: theme.colors.dark[9],
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: `${theme.colors.gray[0]} !important`,
    },
  },

  background: {
    position: "absolute",
    width: "35vh",
    maxHeight: "35vh",
    left: "52%",
    bottom: "0",
    objectFit: "contain",
    [theme.fn.smallerThan("sm")]: {
      bottom: "-35%",
      left: "45%",
    },
  },
}));
