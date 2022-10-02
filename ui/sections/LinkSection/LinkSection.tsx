import type { AccordionControlProps } from "@mantine/core";
import {
  Accordion,
  ActionIcon,
  Box,
  Container,
  Group,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import type { Hub, Link, LinkGroup } from "@prisma/client";
import { Trash } from "tabler-icons-react";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import AddLinkGroupCard from "../../components/AddLinkGroupCard";
import LinkGroupUI from "../LinkGroup";

function AccordionControl(props: AccordionControlProps) {
  const theme = useMantineTheme();
  const { editMode } = useHubOneContext();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      {editMode && (
        <ActionIcon
          mx={12}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
          }}
        >
          <Trash strokeWidth={2} color={theme.colors.secondary[4]} />
        </ActionIcon>
      )}
    </Box>
  );
}

function AccordionLabel({ title }: { title: string }) {
  const { editMode } = useHubOneContext();

  return (
    <Group>
      {editMode ? (
        <TextInput
          defaultValue={title}
          id={title}
          size="lg"
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            e.stopPropagation();
          }}
        />
      ) : (
        <Title order={2} id={title}>
          {title}
        </Title>
      )}
    </Group>
  );
}

function LinkSection({
  hub,
  linkGroups,
  links,
}: {
  hub: Hub;
  linkGroups: LinkGroup[];
  links: Link[];
}) {
  const { editMode } = useHubOneContext();

  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        {linkGroups && linkGroups.length > 0 ? (
          <>
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
                  <AccordionControl>
                    <AccordionLabel title={linkGroup.title} />
                  </AccordionControl>
                  <Accordion.Panel>
                    <LinkGroupUI
                      links={links.filter(
                        (link) => link.linkGroupId === linkGroup.id
                      )}
                      hubId={hub.id}
                      linkGroupId={linkGroup.id}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
            {editMode && <AddLinkGroupCard />}
          </>
        ) : (
          <Text align="center">No links to display.</Text>
        )}
      </Container>
    </div>
  );
}

export default LinkSection;
