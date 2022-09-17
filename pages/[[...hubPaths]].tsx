import { Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { HubOneConfigType } from "../HubOneConfig";
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
  const [hubOneConfig, setHubOneConfig] = useState<HubOneConfigType>(
    {} as HubOneConfigType
  );
  // use `|| [""]` for root hub that has no set path by the router
  const hubPaths = (router.query.hubPaths as string[]) || [""];
  useEffect(() => {
    if (!router.isReady) return;
    const getData = async () => {
      const hub = await getHub(hubPaths[0]);
      if (hub) {
        setHubOneConfig({
          hub,
          linkGroups: await getLinkGroupsByHubId(hub.id),
          links: await getLinksByHubId(hub.id),
          footerLinks: await getFooterLinksByHubId(hub.id),
        } as HubOneConfigType);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div>
      {hubOneConfig.hub ? (
        <>
          <HeaderBar {...hubOneConfig} />
          <Hero hubName={hubOneConfig.hub.hubName} />
          <LinkSection {...hubOneConfig} />
          <Footer footerLinks={hubOneConfig.footerLinks} />
        </>
      ) : (
        <>
          <Title> No Hub was found</Title>
          <Text> Please make sure you entered a valid Hub</Text>
        </>
      )}
    </div>
  );
}
