import { Card, createStyles, Group, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "tabler-icons-react";

import AddLinkGroupModal from "./LinkGroupModals";

const useStyles = createStyles(() => ({
  card: {
    height: "6em",
    marginTop: "1em",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function AddLinkGroupCard() {
  const { classes } = useStyles();
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
      className={classes.card}
    >
      <Card
        className={classes.card}
        shadow="sm"
        p="lg"
        onClick={() => setOpened(true)}
      >
        <Group
          my="auto"
          position="center"
          p="auto"
          sx={() => ({
            height: "100%",
          })}
        >
          <Plus size={36} strokeWidth={2} color="black" />
          <Text align="center">Add Link Group</Text>
        </Group>
      </Card>
      <AddLinkGroupModal opened={opened} setOpened={setOpened} />
    </motion.div>
  );
}

export default AddLinkGroupCard;
