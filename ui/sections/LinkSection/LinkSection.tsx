import { Accordion, Container, Title } from "@mantine/core";

import { hubOneConfig } from "../../../HubOneConfig";
import LinkGroup from "../LinkGroup";

function AccordionLabel({ title }: { title: string }) {
  return (
    <Title order={2} id={title}>
      {title}
    </Title>
  );
}

function LinkSection() {
  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        <Accordion
          multiple
          defaultValue={[hubOneConfig.linkGroups[0].title]}
          styles={{ content: { padding: 0 } }}
        >
          {hubOneConfig.linkGroups.map((linkGroup) => (
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
      </Container>
    </div>
  );
}

export default LinkSection;
