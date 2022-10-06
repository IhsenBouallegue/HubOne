import { Text, Title } from "@mantine/core";
import type { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useHubOneContext } from "../lib/context/HubOneContext";
import { getHubWithPath } from "../lib/requests/hub/getHub";
import { useFetchByHubId } from "../lib/useQueries";
import { Footer } from "../ui/components/Footer";
import { HeaderBar } from "../ui/components/Header";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

export default function Home() {
  const router = useRouter();
  const { setHub, setLinks, setLinkGroups, setFooterLinks } =
    useHubOneContext();
  // use `|| [""]` for root hub that has no set path by the router
  const hubPaths = (router.query.hubPaths as string[]) || [""];
  const { data: hub } = useQuery<Hub>(
    ["hubs", hubPaths[0]],
    () => getHubWithPath(hubPaths[0]),
    {
      onSuccess: setHub,
    }
  );
  const hubId = Number(hub?.id);

  const config = <T,>(onSuccess: (data: T) => void) => ({
    enabled: !!hubId,
    onSuccess,
  });
  useFetchByHubId<Link>("links", hubId, config(setLinks));
  useFetchByHubId<LinkGroup>("linkgroups", hubId, config(setLinkGroups));
  useFetchByHubId<FooterLink>("footerlinks", hubId, config(setFooterLinks));

  return (
    <div>
      {hub ? (
        <>
          <HeaderBar />
          <Hero />
          <LinkSection />
          <Footer />
        </>
      ) : (
        <>
          <Title align="center">Hub was not found</Title>
          <Text align="center">Please make sure you entered a valid Hub</Text>
        </>
      )}
    </div>
  );
}
