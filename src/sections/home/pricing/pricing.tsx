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
          title="Local"
          price="Free"
          description="As HubOne is Open Source, you are free to host it yourself and share it with your team. We make it easy for you!"
          frequency="forever"
          features={[
            "Unlimited subhubs",
            "Unlimited users",
            "Fully featured Edit Mode",
            "Lifetime updates",
          ]}
          button="Get Started"
          onClick={() => {}}
        />
        <Text>Or</Text>
        <PricingLevel
          color={theme.colors.primary[4]}
          title="On The Cloud"
          price="0$"
          description="We take care of the hosting for you. You get a link and you are good to go. Nothing to worry about."
          frequency="/month"
          lastLevel="Local"
          specialOffer="Limited Time"
          features={[
            "No hosting required",
            "Accessible everywhere",
            "Direct support",
          ]}
          button="Contact Us"
          onClick={() => {}}
        />
      </Group>
    </Section>
  );
}
