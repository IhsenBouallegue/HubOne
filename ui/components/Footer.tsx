import { createStyles, Anchor, Group, ActionIcon, Image } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";

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

export interface FooterProps {
  links: { link: string; label: string }[];
  socialLinks?: { instagram?: string; twitter?: string; youtube?: string };
}

export function Footer({ links, socialLinks }: FooterProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={`footer_link_${link.label}`}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
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

        {socialLinks && (
          <Group spacing={0} position="right" noWrap>
            {socialLinks.twitter && (
              <ActionIcon<"a">
                component="a"
                href={socialLinks.twitter}
                size="lg"
              >
                <BrandTwitter size={18} />
              </ActionIcon>
            )}
            {socialLinks.youtube && (
              <ActionIcon<"a">
                component="a"
                href={socialLinks.youtube}
                size="lg"
              >
                <BrandYoutube size={18} />
              </ActionIcon>
            )}
            {socialLinks.instagram && (
              <ActionIcon<"a">
                component="a"
                href={socialLinks.instagram}
                size="lg"
              >
                <BrandInstagram size={18} />
              </ActionIcon>
            )}
          </Group>
        )}
      </div>
    </div>
  );
}
