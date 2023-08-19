import { getHubSpacesPaths } from "@lib/db";
import { prisma } from "@lib/prisma";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import HubLoading from "@sections/app/hub-loading";
import HubNotFound from "@sections/app/hub-not-found";
import HubPage from "@sections/app/hub-page/hub-page";
import HubSpaceNotFound from "@sections/app/hub-space-not-found";

export async function getStaticPaths() {
  return {
    paths: await getHubSpacesPaths(),
    fallback: true, // fallback true allows sites to be generated using ISR
  };
}

export async function getStaticProps({
  params: { domain, hubPath },
}: {
  params: { domain: string; hubPath: string };
}) {
  const hubSlug = hubPath?.[0];
  const hubSpace = await prisma.hubSpace.findUnique({
    where: { domain },
  });

  if (!hubSpace) return { props: { hubSpaceNotFound: true } };

  try {
    const hub = await prisma.hub.findFirstOrThrow({
      where: { hubSpaceId: hubSpace?.id, hubPath: hubSlug },
    });
    const hubId = Number(hub?.id);
    const links = await prisma.link.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const linkGroups = await prisma.linkGroup.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const footerLinks = await prisma.footerLink.findMany({
      where: { hubId },
      orderBy: {
        id: "asc",
      },
    });
    const hubs = await prisma.hub.findMany({
      where: { hubSpaceId: hubSpace?.id },
    });
    return {
      props: { hubData: { hub, links, linkGroups, footerLinks, hubs } },
      revalidate: 60 * 5,
    };
  } catch (e) {
    return { props: { HubNotFound: true } };
  }
}

export default function index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  if (props.hubSpaceNotFound) return <HubSpaceNotFound />;

  if (props.HubNotFound) return <HubNotFound />;

  if (router.isFallback) {
    return <HubLoading />;
  }

  return <HubPage {...props.hubData!} />;
}
