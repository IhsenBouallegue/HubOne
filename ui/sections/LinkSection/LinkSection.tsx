import { Accordion, Container, Text, Title } from "@mantine/core";

import type { LinkGroupType } from "../../types/LinkGroupType";
import LinkGroup from "../LinkGroup";

function AccordionLabel({ title }: { title: string }) {
  return (
    <Title order={2} id={title}>
      {title}
    </Title>
  );
}

function LinkSection({ linkGroups }: { linkGroups: LinkGroupType[] }) {
  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        {linkGroups ? (
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
                  <LinkGroup {...linkGroup} />
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
