import { Image, Paper } from "@mantine/core";

import FooterLinks from "./FooterLinks";

export function Footer() {
  return (
    <Paper
      radius="lg"
      sx={(theme) => ({
        marginTop: 120,
        borderTop: `2px solid ${theme.colors.gray[2]}`,
        height: "6rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,

        [theme.fn.smallerThan("sm")]: {
          flexDirection: "column",
        },
      })}
    >
      <Image
        src="logo/hubone_logo_full.svg"
        fit="contain"
        height={36}
        width={150}
      />
      <FooterLinks />
    </Paper>
  );
}

export default Footer;
