import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 200,
    margin: "auto",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.black,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: theme.spacing.xl,
    },
  },

  cta: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
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
}));

export function Hero() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
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
          you will need.
        </Title>

        <Text className={classes.description} color="dimmed">
          Tired of keeping track of new websites? Tired of having to update your
          bookmarks every few weeks? Access all sites from this one page.
          Everything is up to date. No need to clutter your life anymore!
        </Text>

        <Group className={classes.controls}>
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

          <Button
            component="a"
            size="xl"
            variant="outline"
            className={cx(classes.cta, classes.secondaryCta)}
            color="dark"
          >
            Add Yours
          </Button>
        </Group>
      </Container>
    </div>
  );
}

export default Hero;
