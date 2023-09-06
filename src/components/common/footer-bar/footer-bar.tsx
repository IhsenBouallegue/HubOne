import { Image, Paper } from "@mantine/core";
import { FooterLinks } from "./footer-links";

import classes from "./footer-bar.module.css";

export function FooterBar() {
  return (
    <Paper radius="lg" className={classes.container}>
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
