import { useHubOneStore } from "@lib/Store";
import { Box, Image, Stack } from "@mantine/core";
import { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";
import { useFetchByHubId, useFetchItem } from "@lib/useQueries";

import FooterBar from "@components/footer-bar";
import HeaderBar from "@components/header-bar";
import HubCreateModal from "@modals/hub-modals/hub-create-modal";
import Hero from "@sections/app/hero";
import HubMenu from "@sections/app/hub-menu";
import LinkSection from "@sections/app/link-section";

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
  const createModalOpened = useHubOneStore((state) => state.createModalOpened);
  const setCreateModalOpened = useHubOneStore(
    (state) => state.setCreateModalOpened
  );

  return (
    <Stack mih="100vh" spacing={0}>
      {/* https://app.haikei.app/ */}
      <Image
        src="./bg.svg"
        height="100vh"
        sx={{ position: "absolute", filter: "blur(4px)", zIndex: -1 }}
      />
      <HeaderBar />
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
