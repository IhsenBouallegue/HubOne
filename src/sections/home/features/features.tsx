import Section from "@components/home/section";
import Heading from "@components/home/heading";
import { SimpleGrid } from "@mantine/core";
import { FeatureCard } from "./feature-card";
import { featuresData } from "./featuresData";

export function Features() {
  const features = featuresData.map((feature) => (
    <FeatureCard key={feature.title} {...feature} Icon={feature.icon} />
  ));

  return (
    <Section id="features">
      <Heading
        title="What is Important to Us?"
        description="HubOne focuses on making your life easier. This is why we made sure to
          follow these principles."
      />

      <SimpleGrid
        cols={3}
        spacing={48}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Section>
  );
}
