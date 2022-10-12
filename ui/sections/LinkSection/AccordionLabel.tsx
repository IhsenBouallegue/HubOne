import { Group, TextInput, Title } from "@mantine/core";
import type { LinkGroup } from "@prisma/client";

import { useUpdate } from "../../../lib/useQueries";

export default function AccordionLabel({
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
