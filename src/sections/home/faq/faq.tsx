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
            <AccordionItem key={faq.id} value={faq.id} id={faq.id}>
              <AccordionTrigger className="text-xl">
                <h2 className="text-xl">{faq.question}</h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="m-4 text-md">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
