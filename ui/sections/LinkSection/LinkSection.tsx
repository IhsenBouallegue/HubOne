import { Accordion, Container, Text, Title } from "@mantine/core";
import type { Link, LinkGroup } from "@prisma/client";

import LinkGroupUI from "../LinkGroup";

function AccordionLabel({ title }: { title: string }) {
  return (
    <Title order={2} id={title}>
      {title}
    </Title>
  );
}

function LinkSection({
  linkGroups,
  links,
}: {
  linkGroups: LinkGroup[];
  links: Link[];
}) {
  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        {linkGroups && linkGroups.length > 0 ? (
          <Accordion
            multiple
            defaultValue={[linkGroups[0].title]}
            styles={{ content: { padding: 0 } }}
          >
            {linkGroups.map((linkGroup) => (
              <Accordion.Item
                value={linkGroup.title}
                key={`linkGroup_${linkGroup.title}`}
              >
                <Accordion.Control>
                  <AccordionLabel title={linkGroup.title} />
                </Accordion.Control>
                <Accordion.Panel>
                  <LinkGroupUI
                    links={links.filter(
                      (link) => link.linkGroupId === linkGroup.id
                    )}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <Text align="center">No links to display.</Text>
        )}
      </Container>
    </div>
  );
}

export default LinkSection;
