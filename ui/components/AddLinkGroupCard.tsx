import { Center, Paper, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

import AddLinkGroupModal from "./LinkGroupModals";

function AddLinkGroupCard({ hubId }: { hubId: number }) {
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
        shadow="medium"
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
        onClick={() => setOpened(true)}
      >
        <Center>
          <IconPlus size={36} strokeWidth={2} color="black" />
          <Text align="center">Add Link Group</Text>
        </Center>
      </Paper>
      <AddLinkGroupModal opened={opened} setOpened={setOpened} hubId={hubId} />
    </motion.div>
  );
}

export default AddLinkGroupCard;
