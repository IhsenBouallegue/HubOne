"use client";

import { useHubOneStore } from "@/lib/Store";
import { useDelete } from "@/lib/useQueries";
import type { AccordionControlProps } from "@mantine/core";
import { Accordion, ActionIcon, Box } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AccordionControl({
  itemId,
  ...props
}: AccordionControlProps & { itemId: number }) {
  const editMode = useHubOneStore((state) => state.editMode);
  const deleteItem = useDelete("linkgroups");
  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, transition: { duration: 0.4 }, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{ scale: 0.94 }}
          >
            <ActionIcon
              mx={12}
              variant="light"
              color="secondary"
              onClick={() => deleteItem(itemId)}
            >
              <IconTrash strokeWidth={2} />
            </ActionIcon>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
