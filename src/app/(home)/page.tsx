import FooterBar from "@/components/home/footer-bar";
import HeaderBar from "@/components/home/header";
import Faq from "@/sections/home/faq";
import { Features } from "@/sections/home/features/features";
import Hero from "@/sections/home/hero";
import Mission from "@/sections/home/mission";
import Pricing from "@/sections/home/pricing";

export default function page() {
  return (
    <>
      <HeaderBar />
      <Hero />
      <Features />
      <Mission />
      <Pricing />
      <Faq />
      {/* <Features /> */}
      {/* <Contact /> */}
      <FooterBar />
    </>
  );
}
