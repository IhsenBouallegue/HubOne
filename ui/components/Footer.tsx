import { createStyles, Anchor, Group, Image } from "@mantine/core";
import type { FooterLink } from "@prisma/client";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,

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

export function Footer({ footerLinks }: { footerLinks: FooterLink[] }) {
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
