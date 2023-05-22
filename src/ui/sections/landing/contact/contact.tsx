import Heading from "@components/heading";
import Section from "@components/section";
import { Box, Group } from "@mantine/core";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact">
      <Heading
        title="Contact Us"
        description="Please feel free to contact us. We are here to help you get started
          into your journey for organisation."
      />
      <Group>
        <Box w={400}>
          <ContactForm />
        </Box>
      </Group>
    </Section>
  );
}
