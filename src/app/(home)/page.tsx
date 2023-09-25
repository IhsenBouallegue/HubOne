import FooterBar from "@/components/home/footer-bar";
import HeaderBar from "@/components/home/header";
import Faq from "@/sections/home/faq";
import Hero from "@/sections/home/hero";
import Mission from "@/sections/home/mission";
import Pricing from "@/sections/home/pricing";

export default function page() {
  return (
    <>
      <HeaderBar />
      <Hero />
      <Mission />
      <Pricing />
      <Faq />
      {/* <Features /> */}
      {/* <Contact /> */}
      <FooterBar />
    </>
  );
}
