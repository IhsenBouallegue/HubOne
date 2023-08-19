import { Accordion } from "@mantine/core";
import type { Link, LinkGroup as LinkGroupI } from "@prisma/client";

import { useHubOneStore } from "@lib/Store";
import { useFetchByHubId } from "@lib/useQueries";

import LinkGroup from "@sections/app/link-group";

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
      multiple
      defaultValue={linkGroups?.map((linkGroup) => linkGroup.title)}
      variant="separated"
      radius="lg"
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      {linkGroups?.map((linkGroup) => (
        <Accordion.Item
          value={linkGroup.title}
          key={`linkGroup_${linkGroup.id}`}
        >
          <AccordionControl itemId={linkGroup.id}>
            <AccordionLabel {...linkGroup} />
          </AccordionControl>
          <Accordion.Panel>
            <LinkGroup
              links={
                links?.filter((link) => link.linkGroupId === linkGroup.id) || []
              }
              hubId={hubId!}
              linkGroupId={linkGroup.id}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
