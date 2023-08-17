import Contact from "@sections/landing/contact";
import Features from "@sections/landing/features";
import FooterBar from "@sections/landing/footer-bar";
import HeaderBar from "@sections/landing/header-bar";
import Hero from "@sections/landing/hero";
import Mission from "@sections/landing/mission";
import Pricing from "@sections/landing/pricing";

export default function LandingPage() {
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
