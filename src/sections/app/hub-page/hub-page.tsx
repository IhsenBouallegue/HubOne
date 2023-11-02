"use client";

import { useHubOneStore } from "@/lib/Store";
import { useFetchByHubId, useFetchItem } from "@/lib/useQueries";

import FooterBar from "@/components/app/footer-bar";
import HubCreateModal from "@/modals/hub-modals/hub-create-modal";

import Header from "@/components/app/header";
import { FooterLink, Hub, Link, LinkGroup } from "@/lib/schema/app";
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
  const createModalOpened = useHubOneStore((state) => state.createModalOpened);
  const setCreateModalOpened = useHubOneStore(
    (state) => state.setCreateModalOpened
  );

  return (
    <div className="min-h-screen">
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
      <HubCreateModal
        opened={createModalOpened}
        setOpened={setCreateModalOpened}
      />
    </div>
  );
}
