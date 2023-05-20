import { Box, Center, Image, Loader, Stack, Text, Title } from "@mantine/core";
import type { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useHubOneStore } from "../lib/Store";
import { getHubWithPath } from "../lib/requests/hub/getHub";
import { getHubs } from "../lib/requests/hub/getHubs";
import { useFetchByHubId } from "../lib/useQueries";
import { Footer } from "../ui/components/Footer";
import AddHubModal from "../ui/components/HubModals/CreateHubModal/CreateHubModal";
import Hero from "../ui/sections/Hero";
import HubMenu from "../ui/sections/HubMenu";
import LinkSection from "../ui/sections/LinkSection";
import HeaderBar from "../ui/components/Header";

export default function Home() {
  const router = useRouter();
  const setHub = useHubOneStore((state) => state.setHub);
  const setLinks = useHubOneStore((state) => state.setLinks);
  const setLinkGroups = useHubOneStore((state) => state.setLinkGroups);
  const setFooterLinks = useHubOneStore((state) => state.setFooterLinks);
  const createModalOpened = useHubOneStore((state) => state.createModalOpened);
  const setCreateModalOpened = useHubOneStore(
    (state) => state.setCreateModalOpened
  );
  // use `|| [""]` for root hub that has no set path by the router
  const hubPaths = (router.query.hubPaths as string[]) || [""];
  const {
    data: hub,
    isLoading,
    isError,
  } = useQuery<Hub>(["hubs", hubPaths[0]], () => getHubWithPath(hubPaths[0]), {
    onSuccess: setHub,
  });

  const hubId = Number(hub?.id);
  const config = <T,>(onSuccess: (data: T) => void) => ({
    enabled: !!hubId,
    onSuccess,
  });
  useFetchByHubId<Link>("links", hubId, config(setLinks));
  useFetchByHubId<LinkGroup>("linkgroups", hubId, config(setLinkGroups));
  useFetchByHubId<FooterLink>("footerlinks", hubId, config(setFooterLinks));

  const { data: hubs } = useQuery(["hubs"], () => getHubs());

  if (isLoading) {
    return (
      <Center
        sx={{
          width: "inherit",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <Image src="/logo/hubone_logo.svg" width={126} />
          <Title align="center">Loading...</Title>
          <Loader size={64} variant="dots" color="brand.4" />
        </Stack>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center
        sx={{
          width: "inherit",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <Image src="/logo/hubone_logo.svg" width={126} />
          <Title align="center">Hub was not found</Title>
          <Text align="center">Please make sure you entered a valid Hub</Text>
        </Stack>
      </Center>
    );
  }

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
        <Footer />
      </Box>
      {hubs && <HubMenu hubs={hubs} />}
      <AddHubModal
        opened={createModalOpened}
        setOpened={setCreateModalOpened}
      />
    </Stack>
  );
}
