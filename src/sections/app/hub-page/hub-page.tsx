"use client";

import FooterBar from "@/components/app/footer-bar";
import Header from "@/components/app/header";
import { useHubOneStore } from "@/lib/Store";
import { FooterLink, Hub, Link, LinkGroup } from "@/lib/schema/app";
import { useFetchByHubId, useFetchItem } from "@/lib/useQueries";
import Image from "next/image";
import Hero from "../hero";
import HubMenu from "../hub-menu";
import LinkSection from "../link-section";

export default function HubPage({
  hub,
  links,
  linkGroups,
  footerLinks,
  hubs,
}: {
  hub: Hub;
  links: Link[];
  linkGroups: LinkGroup[];
  footerLinks: FooterLink[];
  hubs: Hub[];
}) {
  useFetchItem<Hub>("hubs", hub.id, { initialData: hub });
  useFetchByHubId<Link>("links", hub.id, { initialData: links });
  useFetchByHubId<LinkGroup>("linkgroups", hub.id, { initialData: linkGroups });
  useFetchByHubId<FooterLink>("footerlinks", hub.id, {
    initialData: footerLinks,
  });
  useHubOneStore.setState({ hubId: hub.id });
  useHubOneStore.setState({ hubSpaceId: hub.hubSpaceId });

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* https://app.haikei.app/ */}
      <Image
        src="/bg.svg"
        className="absolute h-screen blur-md -z-10 "
        alt="background"
        fill
      />
      <Header />
      <Hero />
      <LinkSection />
      <div className="mt-auto">
        <FooterBar />
      </div>
      {hubs && <HubMenu hubs={hubs} />}
    </div>
  );
}
