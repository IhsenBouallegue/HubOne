import { Accordion, Title } from "@mantine/core";

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
      <Accordion multiple sx={{ width: "60%", margin: "auto" }} initialItem={0}>
        {hubOneConfig.linkGroups.map((linkGroup) => (
          <Accordion.Item label={<AccordionLabel title={linkGroup.title} />}>
            <LinkGroup key={`linkGroup_${linkGroup.title}`} {...linkGroup} />
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default LinkSection;
