import { HeaderActions } from "@components/home/header/header-actions";
import { HeaderLogo } from "@components/home/header/header-logo";

import HeaderBar from "@components/common/header-bar";
import Hero from "@sections/home/hero";
import Pricing from "@sections/home/pricing";

export default function page() {
  return (
    <>
      <HeaderBar
        left={<HeaderLogo />}
        // middle={<HeaderLinks toggleOpened={() => {}} />}
        right={<HeaderActions />}
      />

      <Hero />
      {/* <StripePricingTable
        pricingTableId="prctbl_1NqbQyLZDDYfVnf19VrFuHwh"
        publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""}
      /> */}
      <Pricing />
      {/* <Mission /> */}
      {/* <Features /> */}
      {/* <Contact /> */}
      {/* <FooterBar /> */}
    </>
  );
}
