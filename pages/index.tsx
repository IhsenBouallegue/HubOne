import type { HubOneConfigType } from "../HubOneConfig";
import { footerLinks } from "../HubOneConfig";
import getHubs from "../lib/requests/hub/getHubs";
import getLinks from "../lib/requests/link/getLinks";
import getLinkGroups from "../lib/requests/linkGroup/getLinkGroups";
import { Footer } from "../ui/components/Footer";
import { HeaderBar } from "../ui/components/Header";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

export default function Home({
  hubOneConfig,
}: {
  hubOneConfig: HubOneConfigType;
}) {
  return (
    <div>
      <HeaderBar {...hubOneConfig} />
      <Hero companyName={hubOneConfig.hub.hubName} />
      <LinkSection {...hubOneConfig} />
      <Footer {...footerLinks} />
    </div>
  );
}

export async function getStaticProps() {
  const hubs = await getHubs();
  const linkGroups = await getLinkGroups();
  const links = await getLinks();

  return {
    props: {
      hubOneConfig: {
        hub: hubs[0],
        linkGroups,
        links,
      },
    },
  };
}
