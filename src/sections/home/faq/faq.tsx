"use client";

import Heading from "@/components/home/heading";
import Section from "@/components/home/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

export function Faq() {
  return (
    <Section id="faq">
      <Heading title="Frequently Asked Questions" description="" />
      <div className="w-9/12 p-8">
        <Accordion type="single" className="w-[100%] max-w-4xl" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  );
}
