import { Accordion } from "@mantine/core";
import type { Link, LinkGroup } from "@prisma/client";

import LinkGroupUI from "../LinkGroup";

import AccordionControl from "./AccordionControl";
import AccordionLabel from "./AccordionLabel";

export default function LinkSectionAccordion({
  linkGroups,
  links,
  editMode,
  hubId,
}: {
  linkGroups: LinkGroup[];
  links: Link[];
  editMode: boolean;
  hubId: number;
}) {
  return (
    <Accordion
      multiple
      defaultValue={[linkGroups[0].title]}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      {linkGroups.map((linkGroup) => (
        <Accordion.Item
          value={linkGroup.title}
          key={`linkGroup_${linkGroup.id}`}
        >
          <AccordionControl editMode={editMode} itemId={linkGroup.id}>
            <AccordionLabel editMode={editMode} {...linkGroup} />
          </AccordionControl>
          <Accordion.Panel>
            <LinkGroupUI
              links={links.filter((link) => link.linkGroupId === linkGroup.id)}
              hubId={hubId}
              linkGroupId={linkGroup.id}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
