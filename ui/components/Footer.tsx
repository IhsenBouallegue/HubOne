import { Anchor, createStyles, Group, Image } from "@mantine/core";

import { useHubOneStore } from "../../lib/Store";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.largerThan("sm")]: {
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, 0)",
    },

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export function Footer() {
  const footerLinks = useHubOneStore((state) => state.footerLinks);
  const { classes } = useStyles();
  const items = footerLinks.map(({ title, link }) => (
    <Anchor<"a">
      color="dimmed"
      key={`footer_link_${title}`}
      href={link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {title}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image
          src="logo/hubone_logo_full.svg"
          fit="contain"
          height={36}
          width={150}
        />
        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
}

export default Footer;
