import { useHubOneStore } from "@/lib/Store";
import { Link, LinkGroup as LinkGroupI } from "@/lib/schema/app";
import { useFetchByHubId } from "@/lib/useQueries";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import LinkGroupGrid from "../link-group-grid";
import AccordionControl from "./accordion-control";
import AccordionLabel from "./accordion-label";

export function LinkSectionAccordion() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: links } = useFetchByHubId<Link>("links", hubId!);
  const { data: linkGroups } = useFetchByHubId<LinkGroupI>(
    "linkgroups",
    hubId!
  );

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={linkGroups?.map((linkGroup) => linkGroup.title)}
    >
      {linkGroups?.map((linkGroup) => (
        <AccordionItem
          value={linkGroup.title}
          key={`linkGroup_${linkGroup.id}`}
          id={linkGroup.id.toString()}
        >
          <AccordionTrigger className="flex gap-4 mb-4">
            <div className="w-full h-12 text-left">
              <AccordionLabel {...linkGroup} />
            </div>
            <AccordionControl itemId={linkGroup.id} />
          </AccordionTrigger>
          <AccordionContent>
            <LinkGroupGrid
              links={
                links?.filter((link) => link.linkGroupId === linkGroup.id) || []
              }
              hubId={hubId!}
              linkGroupId={linkGroup.id}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
