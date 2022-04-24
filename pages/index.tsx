import type { NextPage } from "next";

import { linkGroup } from "../HubOneConfig";
import Hero from "../ui/sections/Hero";
import LinkGroup from "../ui/sections/LinkGroup";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <LinkGroup {...linkGroup} />
    </div>
  );
};

export default Home;
