import type { AccordionControlProps } from "@mantine/core";
import { Accordion, ActionIcon, Box } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { useDelete } from "../../../lib/useQueries";

export default function AccordionControl({
  itemId,
  editMode,
  ...props
}: AccordionControlProps & { itemId: number; editMode: boolean }) {
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
