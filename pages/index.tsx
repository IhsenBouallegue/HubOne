import type { HubOneConfigType } from "../HubOneConfig";
import { footerLinks } from "../HubOneConfig";
import getHub from "../lib/requests/hub/getHub";
import getLinkGroups from "../lib/requests/linkGroups/getLinkGroups";
import getLinks from "../lib/requests/links/getLinks";
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
  const hub = await getHub();
  const linkGroups = await getLinkGroups();
  const links = await getLinks();

  return {
    props: {
      hubOneConfig: {
        hub: hub[0],
        linkGroups,
        links,
      },
    },
  };
}
