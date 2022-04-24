import type { NextPage } from "next";

import { links } from "../HubOneConfig";
import Hero from "../ui/sections/Hero";
import LinkGroup from "../ui/sections/LinkGroup";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <LinkGroup links={links} />
    </div>
  );
};

export default Home;
