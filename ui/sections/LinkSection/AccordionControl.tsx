import type { AccordionControlProps } from "@mantine/core";
import { Accordion, ActionIcon, Box } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { useDelete } from "../../../lib/useQueries";
import { useHubOneStore } from "../../../lib/Store";

export default function AccordionControl({
  itemId,
  ...props
}: AccordionControlProps & { itemId: number }) {
  const editMode = useHubOneStore((state) => state.editMode);
  const deleteItem = useDelete("linkgroups");
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      {editMode && (
        <ActionIcon
          mx={12}
          variant="light"
          color="secondary"
          onClick={() => deleteItem(itemId)}
        >
          <IconTrash strokeWidth={2} />
        </ActionIcon>
      )}
    </Box>
  );
}
