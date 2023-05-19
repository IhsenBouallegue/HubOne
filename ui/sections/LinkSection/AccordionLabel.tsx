import { Group, TextInput, Title } from "@mantine/core";
import type { LinkGroup } from "@prisma/client";

import { AnimatePresence, motion } from "framer-motion";
import { useUpdate } from "../../../lib/useQueries";
import { useHubOneStore } from "../../../lib/Store";

export default function AccordionLabel({ id, title, hubId }: LinkGroup) {
  const editMode = useHubOneStore((state) => state.editMode);
  const updateLinkGroup = useUpdate<LinkGroup>("linkgroups");
  return (
    <Group>
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ transition: { duration: 0.4 }, opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      {!editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ transition: { duration: 0.4, delay: 0.4 }, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Title order={2} id={title}>
            {title}
          </Title>
        </motion.div>
      )}
    </Group>
  );
}
