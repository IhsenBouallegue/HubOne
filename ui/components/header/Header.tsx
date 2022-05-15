import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  MediaQuery,
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

  linkLabel: {
    marginRight: 5,
  },
}));

export function HeaderBar({ linkGroups, companyLogo }: HubOneConfigType) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = linkGroups?.map((linkGroup) => {
    return (
      <ScrollLink
        key={linkGroup.title}
        to={linkGroup.title}
        smooth="easeInOutQuint"
        duration={1000}
      >
        <Button variant="subtle">{linkGroup.title}</Button>
      </ScrollLink>
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
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Image src="/logo/hubone_logo.svg" fit="contain" height={28} />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Image src="/logo/hubone_logo_full.svg" fit="contain" height={40} />
          </MediaQuery>
          {companyLogo && (
            <>
              <X size={20} strokeWidth={1} color="black" />
              <Image src={companyLogo} fit="contain" height={28} />
            </>
          )}
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
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
    </Header>
  );
}

export default HeaderBar;
