import Background from "@/components/common/background";
import FooterBar from "@/components/home/footer-bar";
import HeaderBar from "@/components/home/header";
import Faq from "@/sections/home/faq";
import { Features } from "@/sections/home/features/features";
import Hero from "@/sections/home/hero";
import Mission from "@/sections/home/mission";

export default function page() {
  return (
    <>
      <Background />
      <HeaderBar />
      <Hero />
      <Features />
      <Mission />
      {/* <Pricing /> */}
      <Faq />
      {/* <Features /> */}
      {/* <Contact /> */}
      <FooterBar />
    </>
  );
}
