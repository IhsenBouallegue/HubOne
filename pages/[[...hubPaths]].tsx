import type { FooterLink, Link, LinkGroup } from "@prisma/client";

import type { HubOneConfigType } from "../HubOneConfig";
import { prisma } from "../lib/prisma";
import { Footer } from "../ui/components/Footer";
import { HeaderBar } from "../ui/components/Header";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

export default function Home({
  hubOneConfig,
}: {
  hubOneConfig: HubOneConfigType;
}) {
  // eslint-disable-next-line no-console
  console.log(hubOneConfig.hub);
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
  const hubs = await prisma.hub.findMany();
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
  const hubs = await prisma.hub.findMany();

  const hub = hubs.find((_hub) => _hub.hubPath === hubPaths[0]);

  const linkGroups = await prisma.linkGroup
    .findMany()
    .then((_linkGroups: LinkGroup[]) => {
      return _linkGroups.filter((linkGroup) => linkGroup.hubId === hub?.id);
    });

  const links = await prisma.link.findMany().then((_links: Link[]) => {
    return _links.filter((link) => link.hubId === hub?.id);
  });

  const footerLinks = await prisma.footerLink
    .findMany()
    .then((_footerLinks: FooterLink[]) => {
      return _footerLinks.filter((footerLink) => footerLink.hubId === hub?.id);
    });
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
