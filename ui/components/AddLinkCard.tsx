import { Paper, Stack, Text, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

import AddLinkModal from "./LinkModals";

function AddLinkCard({
  hubId,
  linkGroupId,
}: {
  hubId: number;
  linkGroupId: number;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 }, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      style={{ height: "100%" }}
    >
      <Paper
        h="100%"
        mih={rem(250)}
        radius="lg"
        shadow="medium"
        onClick={() => setOpened(true)}
      >
        <Stack
          align="center"
          justify="center"
          sx={() => ({ height: "inherit" })}
        >
          <IconPlus size={36} strokeWidth={2} color="black" />
          <Text align="center">Add Link</Text>
        </Stack>
      </Paper>
      <AddLinkModal
        opened={opened}
        setOpened={setOpened}
        hubId={hubId}
        linkGroupId={linkGroupId}
      />
    </motion.div>
  );
}

export default AddLinkCard;
