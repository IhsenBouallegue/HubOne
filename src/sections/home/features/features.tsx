import Heading from "@/components/home/heading";
import Section from "@/components/home/section";
import FeatureCard from "./feature-card";
import { featuresData } from "./featuresData";

export function Features() {
  //   const features = featuresData.map((feature) => (
  //     <FeatureCard key={feature.title} {...feature} Icon={feature.icon} />
  //   ));

  return (
    <Section id="features">
      <Heading
        title="What is HubOne?"
        description="HubOne focuses on making your work easier. Here is how."
      />
      <div className="space-y-8 py-12">
        <FeatureCard {...featuresData[0]} />
        <FeatureCard invert {...featuresData[1]} />
        <FeatureCard {...featuresData[2]} />
      </div>
    </Section>
  );
}
