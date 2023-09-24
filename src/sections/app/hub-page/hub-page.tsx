"use client";

import { useHubOneStore } from "@lib/Store";
import { useFetchByHubId, useFetchItem } from "@lib/useQueries";
import { Box, Image, Stack } from "@mantine/core";

import FooterBar from "@components/common/footer-bar";
import HubCreateModal from "@modals/hub-modals/hub-create-modal";

import Header from "@components/app/header";
import { FooterLink, Hub, Link, LinkGroup } from "@lib/schema";
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
    <Stack mih="100vh" gap={0}>
      {/* https://app.haikei.app/ */}
      <Image
        src="/bg.svg"
        h="100vh"
        style={{ position: "absolute", filter: "blur(4px)", zIndex: -1 }}
      />
      <Header />
      <Hero />
      <LinkSection />
      <Box mt="auto">
        <FooterBar />
      </Box>
      {hubs && <HubMenu hubs={hubs} />}
      <HubCreateModal
        opened={createModalOpened}
        setOpened={setCreateModalOpened}
      />
    </Stack>
  );
}
