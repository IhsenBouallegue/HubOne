import { Group } from "@mantine/core";

import Heading from "@components/home/heading";
import Section from "@components/home/section";

import { getProducts } from "@lib/stripe";
import { PricingLevel } from "./pricing-level";

export async function Pricing() {
  const products = await getProducts();

  return (
    <Section id="pricing">
      <Heading
        title="Start Using HubOne!"
        description=" For your personal use or for your business. We got you covered!"
      />

      <Group style={{ overflow: "visible" }}>
        {products.map((product) => (
          <PricingLevel
            color={"#000"}
            title={"test"}
            price="Free"
            priceId={product.id}
            description="More than enough to get you started. You can create your own Hubs and share them with your team."
            frequency="forever"
            features={[
              "1 HubSpace",
              "Up to 10 users",
              "Fully featured Edit Mode",
              "Lifetime updates",
            ]}
            button=""
          />
        ))}
      </Group>
    </Section>
  );
}
