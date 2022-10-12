import type { AccordionControlProps } from "@mantine/core";
import { useMantineTheme, Accordion, ActionIcon, Box } from "@mantine/core";
import { Trash } from "tabler-icons-react";

import { useDelete } from "../../../lib/useQueries";

export default function AccordionControl({
  itemId,
  editMode,
  ...props
}: AccordionControlProps & { itemId: number; editMode: boolean }) {
  const deleteItem = useDelete("linkgroups");
  const theme = useMantineTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      {editMode && (
        <ActionIcon
          mx={12}
          color={theme.colors.secondary[4]}
          onClick={() => deleteItem(itemId)}
        >
          <Trash strokeWidth={2} />
        </ActionIcon>
      )}
    </Box>
  );
}
