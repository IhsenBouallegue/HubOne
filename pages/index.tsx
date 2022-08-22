import type { HubOneConfigType } from "../HubOneConfig";
import { footerLinks } from "../HubOneConfig";
import { Footer } from "../ui/components/Footer";
import { HeaderBar } from "../ui/components/Header";
import Hero from "../ui/sections/Hero";
import LinkSection from "../ui/sections/LinkSection";

export default function Home({
  hubOneConfig,
}: {
  hubOneConfig: HubOneConfigType;
}) {
  return (
    <div>
      <HeaderBar {...hubOneConfig} />
      <Hero companyName={hubOneConfig.companyName} />
      <LinkSection {...hubOneConfig} />
      <Footer {...footerLinks} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      hubOneConfig: {
        companyLogo: "/logo/hubone_logo.svg",
        companyName: "company",
        linkGroups: null,
      },
    },
  };
}
