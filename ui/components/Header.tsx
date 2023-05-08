import {
  ActionIcon,
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  MediaQuery,
  Paper,
  rem,
  Switch,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconSettings, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

import { useHubOneStore } from "../../lib/Store";
import HubLogo from "./HubLogo";
import EditHubModal from "./HubModals/EditHubModal";

const HEADER_HEIGHT = 60;

export function HeaderBar() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useToggle();

  const hub = useHubOneStore((state) => state.hub);
  const linkGroups = useHubOneStore((state) => state.linkGroups);
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);
  const setCompactMode = useHubOneStore((state) => state.setCompactMode);

  const [editModalOpened, setEditModalOpened] = useState(false);

  const items = linkGroups?.map((linkGroup) => (
    <ScrollLink
      key={linkGroup.title}
      to={linkGroup.title}
      smooth="easeInOutQuint"
      duration={1000}
    >
      <Button
        variant="subtle"
        onClick={() => {
          toggleOpened(false);
        }}
      >
        {linkGroup.title}
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
            <Image src="/logo/hubone_logo.svg" height={28} width={28} />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Image src="/logo/hubone_logo_full.svg" width={126} />
          </MediaQuery>
          <IconX size={20} strokeWidth={1} color="black" />
          <Center h={rem(28)} w={rem(28)}>
            <HubLogo hub={hub} />
          </Center>
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
          <Switch
            checked={compactMode}
            onChange={(event) => setCompactMode(event.target.checked)}
            label="Compact Mode"
            labelPosition="left"
            onLabel="ON"
            offLabel="OFF"
            size="md"
          />
          {editMode ? (
            <Group ml="auto" mr="12px">
              <ActionIcon
                variant="light"
                color="brand"
                onClick={() => setEditModalOpened(true)}
              >
                <IconSettings />
              </ActionIcon>
            </Group>
          ) : (
            <ScrollLink
              to="linkSection"
              smooth="easeInOutQuint"
              duration={1000}
            >
              <Button
                variant="gradient"
                gradient={{
                  from: theme.colors.brand[4],
                  to: theme.colors.secondary[4],
                }}
                sx={{ height: 30 }}
              >
                Browse Links
              </Button>
            </ScrollLink>
          )}
        </Group>
      </Container>
      {hub.id && (
        <EditHubModal opened={editModalOpened} setOpened={setEditModalOpened} />
      )}
    </Header>
  );
}

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

export default HeaderBar;
