import type { FooterLink, Link, LinkGroup } from "@prisma/client";

import type { HubOneConfigType } from "../HubOneConfig";
import getFooterLinks from "../lib/requests/footerLink/getFooterLinks";
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
      <Hero hubName={hubOneConfig.hub.hubName} />
      <LinkSection {...hubOneConfig} />
      <Footer footerLinks={hubOneConfig.footerLinks} />
    </div>
  );
}

export async function getStaticPaths() {
  const hubs = await getHubs();
  const hubPaths = hubs.map((hub) => ({
    params: {
      hubPaths: [hub.hubPath],
    },
  }));

  return {
    paths: hubPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { hubPaths = [""] } }) {
  const hubs = await getHubs();
  const hub = hubs.find((_hub) => _hub.hubPath === hubPaths[0]);

  const linkGroups = await getLinkGroups().then((_linkGroups: LinkGroup[]) => {
    return _linkGroups.filter((linkGroup) => linkGroup.hubId === hub?.id);
  });

  const links = await getLinks().then((_links: Link[]) => {
    return _links.filter((link) => link.hubId === hub?.id);
  });

  const footerLinks = await getFooterLinks().then(
    (_footerLinks: FooterLink[]) => {
      return _footerLinks.filter((footerLink) => footerLink.hubId === hub?.id);
    }
  );
  return {
    props: {
      hubOneConfig: {
        hub,
        linkGroups,
        links,
        footerLinks,
      },
    },
  };
}
