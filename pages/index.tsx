import type { NextPage } from "next";

import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <LinkSection />
    </div>
  );
};

export default Home;
