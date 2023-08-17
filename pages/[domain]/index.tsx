import { getHubSpacesPaths } from "@lib/db";
import { prisma } from "@lib/prisma";
import HubLoading from "@sections/app/hub-loading";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import HubPage from "pages/hub-page";

export async function getStaticPaths() {
  return {
    paths: await getHubSpacesPaths(),
    fallback: true, // fallback true allows sites to be generated using ISR
  };
}

export async function getStaticProps({
  params: { domain },
}: {
  params: { domain: string };
}) {
  const hubSpace = await prisma.hubSpace.findUnique({
    where: { domain },
  });

  const hub = await prisma.hub.findFirst({
    where: { hubSpaceId: hubSpace?.id },
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

  const hubs = await prisma.hub.findMany();

  return {
    props: { hubData: { hub, links, linkGroups, footerLinks, hubs } },
    revalidate: 3600, // set revalidate interval of 1 hour
  };
}

export default function index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  if (router.isFallback) {
    return <HubLoading />;
  }

  return <HubPage {...props.hubData} />;
}
