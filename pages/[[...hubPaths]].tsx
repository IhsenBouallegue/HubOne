import { Text, Title } from "@mantine/core";
import type { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useHubOneContext } from "../lib/context/HubOneContext";
import { getFooterLinksByHubId } from "../lib/requests/footerLink/getFooterLinksByHubId";
import { getHub } from "../lib/requests/hub/getHub";
import { getLinksByHubId } from "../lib/requests/link/getLinksByHubId";
import { getLinkGroupsByHubId } from "../lib/requests/linkGroup/getLinkGroupsByHubId";
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
  const { data: hub, isSuccess } = useQuery<Hub>(["hubs", hubPaths[0]], () =>
    getHub(hubPaths[0])
  );

  const hubId = hub?.id;
  const config = {
    enabled: !!hubId,
  };
  const { data: links, isSuccess: isSuccess1 } = useQuery<Link[]>(
    ["links", hubId],
    () => getLinksByHubId(hubId as number),
    config
  );
  const { data: linkGroups, isSuccess: isSuccess2 } = useQuery<LinkGroup[]>(
    ["linkgroups", hubId],
    () => getLinkGroupsByHubId(hubId as number),
    config
  );
  const { data: footerLinks, isSuccess: isSuccess3 } = useQuery<FooterLink[]>(
    ["footerLinks", hubId],
    () => getFooterLinksByHubId(hubId as number),
    config
  );

  useEffect(() => {
    if (isSuccess && isSuccess1 && isSuccess2 && isSuccess3) {
      setHub(hub);
      setLinks(links);
      setLinkGroups(linkGroups);
      setFooterLinks(footerLinks);
    }
  }, [
    footerLinks,
    hub,
    isSuccess,
    isSuccess1,
    isSuccess2,
    isSuccess3,
    linkGroups,
    links,
    setFooterLinks,
    setHub,
    setLinkGroups,
    setLinks,
  ]);

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
          <Title align="center">Hub was found</Title>
          <Text align="center">Please make sure you entered a valid Hub</Text>
        </>
      )}
    </div>
  );
}
