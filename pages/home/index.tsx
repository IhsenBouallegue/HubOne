import Contact from "@sections/home/contact";
import Features from "@sections/home/features";
import FooterBar from "@sections/home/footer-bar";
import HeaderBar from "@sections/home/header-bar";
import Hero from "@sections/home/hero";
import Mission from "@sections/home/mission";
import Pricing from "@sections/home/pricing";

export default function HomePage() {
  return (
    <>
      <HeaderBar />
      <Hero />
      <Mission />
      <Features />
      <Pricing />
      <Contact />
      <FooterBar />
    </>
  );
}
