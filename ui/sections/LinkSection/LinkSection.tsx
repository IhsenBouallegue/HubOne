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
          initialItem={0}
          styles={{ content: { padding: 0 } }}
        >
          {hubOneConfig.linkGroups.map((linkGroup) => (
            <Accordion.Item
              key={`linkGroup_${linkGroup.title}`}
              label={<AccordionLabel title={linkGroup.title} />}
            >
              <LinkGroup {...linkGroup} />
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

export default LinkSection;
