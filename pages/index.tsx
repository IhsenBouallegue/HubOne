import type { HubOneConfigType } from "../HubOneConfig";
import { footerLinks } from "../HubOneConfig";
import getGeneralSettings from "../lib/requests/generalSettings/getGeneralSettings";
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
      <Hero companyName={hubOneConfig.generalSettings.hubName} />
      <LinkSection {...hubOneConfig} />
      <Footer {...footerLinks} />
    </div>
  );
}

export async function getStaticProps() {
  const generalSettings = await getGeneralSettings();
  const linkGroups = await getLinkGroups();
  const links = await getLinks();

  return {
    props: {
      hubOneConfig: {
        generalSettings: generalSettings[0],
        linkGroups,
        links,
      },
    },
  };
}
