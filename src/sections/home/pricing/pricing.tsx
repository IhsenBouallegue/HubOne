import { Group } from "@mantine/core";

import Heading from "@/components/home/heading";
import Section from "@/components/home/section";

import { getProducts } from "@/lib/stripe";
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
        {Object.keys(products).map((productId) => {
          const { name, color, description, prices } = products[productId];
          return (
            <PricingLevel
              key={name}
              color={color ?? "#000"}
              title={name}
              price={Number(prices[0].unit_amount) / 100}
              priceId={prices[0].id}
              currency={prices[0].currency}
              description={description ?? ""}
              frequency="month"
              features={[
                "1 HubSpace",
                "Up to 10 users",
                "Fully featured Edit Mode",
                "Lifetime updates",
              ]}
              button="Get Started"
              specialOffer={name === "Pro" ? "Most Popular" : ""}
            />
          );
        })}
      </Group>
    </Section>
  );
}
