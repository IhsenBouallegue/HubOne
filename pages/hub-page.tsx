import { useHubOneStore } from "@lib/Store";
import { Box, Image, Stack } from "@mantine/core";

import FooterBar from "@components/footer-bar";
import HeaderBar from "@components/header-bar";
import HubCreateModal from "@modals/hub-modals/hub-create-modal";
import Hero from "@sections/app/hero";
import HubMenu from "@sections/app/hub-menu";
import LinkSection from "@sections/app/link-section";
import { useEffect } from "react";

export default function HubPage({
  hub,
  links,
  linkGroups,
  footerLinks,
  hubs,
}: any) {
  const setHub = useHubOneStore((state) => state.setHub);
  const setLinks = useHubOneStore((state) => state.setLinks);
  const setLinkGroups = useHubOneStore((state) => state.setLinkGroups);
  const setFooterLinks = useHubOneStore((state) => state.setFooterLinks);
  const createModalOpened = useHubOneStore((state) => state.createModalOpened);
  const setCreateModalOpened = useHubOneStore(
    (state) => state.setCreateModalOpened
  );

  useEffect(() => {
    setHub(hub);
    setLinks(links);
    setLinkGroups(linkGroups);
    setFooterLinks(footerLinks);
  }, []);

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
