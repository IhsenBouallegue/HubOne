import type { NextPage } from "next";

import { Footer } from "../ui/components/footer/Footer";
import { footerLinks } from "../ui/components/footer/FooterLinks";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <LinkSection />
      <Footer {...footerLinks} />
    </div>
  );
};

export default Home;
