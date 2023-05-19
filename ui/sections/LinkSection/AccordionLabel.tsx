import { Group, TextInput, Title } from "@mantine/core";
import type { LinkGroup } from "@prisma/client";

import { useUpdate } from "../../../lib/useQueries";
import { useHubOneStore } from "../../../lib/Store";

export default function AccordionLabel({ id, title, hubId }: LinkGroup) {
  const editMode = useHubOneStore((state) => state.editMode);
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
              id,
              title: event.currentTarget.value,
              hubId,
            })
          }
          styles={{
            input: { fontSize: "1.5em", width: "100%" },
            root: { width: "100%" },
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
