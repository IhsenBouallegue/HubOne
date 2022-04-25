import type { NextPage } from "next";

import { Footer } from "../ui/components/footer/Footer";
import { footerLinks } from "../ui/components/footer/FooterLinks";
import { HeaderBar } from "../ui/components/header/Header";
import { headerLinks } from "../ui/components/header/headerLinks";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

const Home: NextPage = () => {
  return (
    <div>
      <HeaderBar {...headerLinks} />
      <Hero />
      <LinkSection />
      <Footer {...footerLinks} />
    </div>
  );
};

export default Home;
