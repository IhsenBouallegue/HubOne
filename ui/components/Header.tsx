import {
  ActionIcon,
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
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { X, Settings, Plus } from "tabler-icons-react";

import { useHubOneContext } from "../../lib/context/HubOneContext";

import EditHubModal from "./HubModals";
import AddHubModal from "./HubModals/AddHubModal";

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
  const { hub, linkGroups } = useHubOneContext();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useToggle();
  const { editMode } = useHubOneContext();
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [addModalOpened, setAddModalOpened] = useState(false);
  const items = linkGroups?.map((linkGroup) => {
    return (
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
    );
  });

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
          {hub.hubLogo && (
            <>
              <X size={20} strokeWidth={1} color="black" />
              <Image src={hub.hubLogo} height={28} width={28} />
            </>
          )}
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
        {editMode && (
          <Group ml="auto" mr="12px">
            <ActionIcon
              variant="light"
              color="secondary.6"
              onClick={() => setAddModalOpened(true)}
            >
              <Plus size={30} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="brand.6"
              onClick={() => setEditModalOpened(true)}
            >
              <Settings size={30} />
            </ActionIcon>
          </Group>
        )}
        <ScrollLink to="linkSection" smooth="easeInOutQuint" duration={1000}>
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
      </Container>
      <AddHubModal opened={addModalOpened} setOpened={setAddModalOpened} />
      <EditHubModal
        opened={editModalOpened}
        setOpened={setEditModalOpened}
        {...hub}
      />
    </Header>
  );
}

export default HeaderBar;
