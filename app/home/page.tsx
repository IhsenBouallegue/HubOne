"use client";

import { HeaderActions } from "@components/home/header/header-actions";
import { HeaderLinks } from "@components/home/header/header-links";
import { HeaderLogo } from "@components/home/header/header-logo";

import HeaderBar from "@components/common/header-bar";
import Hero from "@sections/home/hero";
import Pricing from "@sections/home/pricing";

export default function page() {
  return (
    <>
      <HeaderBar
        left={<HeaderLogo />}
        middle={HeaderLinks}
        right={<HeaderActions />}
      />

      <Hero />
      <Pricing />
      {/* <Mission /> */}
      {/* <Features /> */}
      {/* <Contact /> */}
      {/* <FooterBar /> */}
    </>
  );
}
