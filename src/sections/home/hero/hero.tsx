import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  useMantineTheme,
  Image,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    paddingTop: `calc(5 * ${theme.spacing.xl})`,
    paddingBottom: `calc(3 * ${theme.spacing.xl})`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  content: {
    paddingTop: `calc(2 * ${theme.spacing.xl})`,
    paddingBottom: `calc(2 * ${theme.spacing.xl})`,
    marginRight: `calc(3 * ${theme.spacing.xl})`,
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    fontWeight: 900,
    lineHeight: 1.2,
    maxWidth: 700,
    fontSize: "4em",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 22,

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

export function Hero() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
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
                central Hub
              </Text>{" "}
              for you and your team.
            </Title>

            <Text className={classes.description} mt={30}>
              Tired of keeping track of your most used websites? Tired of not
              finding that one super important link? Create you Hub and sync
              with your team.
            </Text>

            <Group>
              <Button
                variant="gradient"
                gradient={{
                  from: theme.colors.primary[4],
                  to: theme.colors.secondary[4],
                }}
                size="xl"
                mt={40}
                px={50}
                sx={{ fontSize: 22 }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://hubone.vercel.app/"
              >
                Get Started
              </Button>
              <Button
                size="xl"
                variant="light"
                color="primary.4"
                mt={40}
                px={50}
                sx={{ fontSize: 22 }}
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://hubone.vercel.app/"
              >
                Live Demo
              </Button>
            </Group>
          </div>
          <Image
            styles={{
              root: {
                position: "absolute",
                left: "60%",
                top: "20%",
                zIndex: -2,
              },
              image: {
                boxShadow: theme.shadows.lg,
              },
            }}
            src="showcase-1.png"
            width={500}
            radius="md"
          />
          <Image
            styles={{
              root: {
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: -1,
              },
              image: {
                boxShadow: theme.shadows.xl,
              },
            }}
            src="showcase-2.png"
            width={400}
            fit="contain"
            radius="md"
          />
        </div>
      </Container>
    </div>
  );
}
