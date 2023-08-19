import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  MediaQuery,
  Paper,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Link as ScrollLink } from "react-scroll";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { headerLinks } from "./HeaderLinks";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },

  links: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export function HeaderBar() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useToggle();
  const items = headerLinks?.map((headerLink) => (
    <ScrollLink
      key={headerLink.link}
      to={headerLink.link}
      smooth="easeInOutQuint"
      duration={1000}
    >
      <Button
        variant="subtle"
        onClick={() => {
          toggleOpened(false);
        }}
      >
        {headerLink.label}
      </Button>
    </ScrollLink>
  ));

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0, position: "relative", zIndex: 1 }}
    >
      <Container px="xl" className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Image src="./logo/hubone_logo.svg" height={28} width={28} />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Image src="./logo/hubone_logo_full.svg" width={126} />
          </MediaQuery>
        </Group>

        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Transition transition="scale-y" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        <Group>
          <SignedIn>
            <Button
              variant="light"
              sx={{ height: 30 }}
              component="a"
              href="/dashboard"
            >
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <Button
                variant="gradient"
                gradient={{
                  from: theme.colors.primary[4],
                  to: theme.colors.secondary[4],
                }}
                sx={{ height: 30 }}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </Group>
      </Container>
    </Header>
  );
}

export default HeaderBar;
