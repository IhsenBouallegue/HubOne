"use client";

import { Paper, Stack, Text, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

import LinkCreateModal from "@/modals/link-modals/link-create-modal";

export function LinkAddCard({
  hubId,
  linkGroupId,
}: {
  hubId: string;
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
        shadow="md"
        onClick={() => setOpened(true)}
      >
        <Stack
          align="center"
          justify="center"
          style={() => ({ height: "inherit" })}
        >
          <IconPlus size={36} strokeWidth={2} color="black" />
          <Text ta="center">Add Link</Text>
        </Stack>
      </Paper>
      <LinkCreateModal
        opened={opened}
        setOpened={setOpened}
        hubId={hubId}
        linkGroupId={linkGroupId}
      />
    </motion.div>
  );
}
