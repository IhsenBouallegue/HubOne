import { Group, Text, useMantineTheme } from "@mantine/core";

import Heading from "@components/home/heading";
import Section from "@components/home/section";

import { PricingLevel } from "./pricing-level";

export function Pricing() {
  const theme = useMantineTheme();
  return (
    <Section id="pricing">
      <Heading
        title="Start Using HubOne!"
        description=" For your personal use or for your business. We got you covered!"
      />

      <Group style={{ overflow: "visible" }}>
        <PricingLevel
          color={theme.colors.secondary[3]}
          title="Starter"
          price="Free"
          description="More than enough to get you started. You can create your own Hubs and share them with your team."
          frequency="forever"
          features={[
            "1 HubSpace",
            "Up to 10 users",
            "Fully featured Edit Mode",
            "Lifetime updates",
          ]}
          button="Get Started"
          onClick={() => {}}
        />
        <Text>Or</Text>
        <PricingLevel
          color={theme.colors.primary[4]}
          title="Pro"
          price="0.00$"
          description="We take care of the hosting for you. You get a link and you are good to go. Nothing to worry about."
          frequency="/month"
          lastLevel="Local"
          specialOffer="Limited Time"
          features={["3 HubSpaces", "Unlimited users", "Direct support"]}
          button="Contact Us"
          onClick={() => {}}
        />
      </Group>
    </Section>
  );
}
