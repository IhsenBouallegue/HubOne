"use client";

import { Center, Paper, Text } from "@mantine/core";
import AddLinkGroupModal from "@modals/link-group-modal";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function LinkGroupAddCard({ hubId }: { hubId: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
    >
      <Paper
        w="100%"
        h="6rem"
        radius="lg"
        shadow="md"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        onClick={() => setOpened(true)}
      >
        <Center>
          <IconPlus size={36} strokeWidth={2} color="black" />
          <Text ta="center">Add Link Group</Text>
        </Center>
      </Paper>
      <AddLinkGroupModal opened={opened} setOpened={setOpened} hubId={hubId} />
    </motion.div>
  );
}
