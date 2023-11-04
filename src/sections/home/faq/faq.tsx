"use client";

import Heading from "@/components/home/heading";
import Section from "@/components/home/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import faqData from "./faqData";

export function Faq() {
  return (
    <Section id="faq">
      <Heading title="Frequently Asked Questions" description="" />
      <div className="w-9/12 p-8">
        <Accordion type="single" className="w-[100%] max-w-4xl" collapsible>
          {faqData.map((faq) => (
            <AccordionItem value={faq.id} id={faq.id}>
              <AccordionTrigger className="text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-md">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
