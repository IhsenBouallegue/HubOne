import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { Link as ScrollLink } from "react-scroll";
import { X } from "tabler-icons-react";

import type { HubOneConfigType } from "../../../HubOneConfig";

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
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export function HeaderBar({ linkGroups }: HubOneConfigType) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = linkGroups?.map((linkGroup) => {
    return (
      <Button key={linkGroup.title} variant="subtle">
        <ScrollLink
          to={linkGroup.title}
          smooth="easeInOutQuint"
          duration={1000}
        >
          {linkGroup.title}
        </ScrollLink>
      </Button>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container px="xl" className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Image src="/logo/hubone_logo_full.svg" fit="contain" height={40} />
          <X size={20} strokeWidth={1} color="black" />
          <Image src="/logo/hubone_logo.svg" fit="contain" height={28} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Button
          variant="gradient"
          gradient={{
            from: theme.colors.brand[4],
            to: theme.colors.secondary[4],
          }}
          sx={{ height: 30 }}
        >
          <ScrollLink to="linkSection" smooth="easeInOutQuint" duration={1000}>
            Browse Links
          </ScrollLink>
        </Button>
      </Container>
    </Header>
  );
}
