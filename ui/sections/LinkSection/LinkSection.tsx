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
import type { LinkGroup } from "@prisma/client";
import { Trash } from "tabler-icons-react";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import { useDelete, useUpdate } from "../../../lib/useQueries";
import AddLinkGroupCard from "../../components/AddLinkGroupCard";
import LinkGroupUI from "../LinkGroup";

function AccordionControl({
  itemId,
  editMode,
  ...props
}: AccordionControlProps & { itemId: number; editMode: boolean }) {
  const theme = useMantineTheme();
  const deleteItem = useDelete("linkgroups");

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      {editMode && (
        <ActionIcon mx={12}>
          <Trash
            strokeWidth={2}
            color={theme.colors.secondary[4]}
            onClick={() => deleteItem(itemId)}
          />
        </ActionIcon>
      )}
    </Box>
  );
}

function AccordionLabel({
  editMode,
  id,
  title,
  hubId,
}: { editMode: boolean } & LinkGroup) {
  const updateLinkGroup = useUpdate<LinkGroup>("linkgroups");
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
          onBlur={(event) =>
            updateLinkGroup({
              newItem: {
                id,
                title: event.currentTarget.value,
                hubId,
              } as LinkGroup,
              itemId: id,
            })
          }
        />
      ) : (
        <Title order={2} id={title}>
          {title}
        </Title>
      )}
    </Group>
  );
}

function LinkSection() {
  const { editMode, hub, linkGroups, links } = useHubOneContext();

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
                  key={`linkGroup_${linkGroup.id}`}
                >
                  <AccordionControl editMode={editMode} itemId={linkGroup.id}>
                    <AccordionLabel editMode={editMode} {...linkGroup} />
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
            {editMode && <AddLinkGroupCard hubId={hub.id} />}
          </>
        ) : (
          <Text align="center">No links to display.</Text>
        )}
      </Container>
    </div>
  );
}

export default LinkSection;
