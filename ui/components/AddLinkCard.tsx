import { Card, createStyles, Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { Plus } from "tabler-icons-react";

const useStyles = createStyles(() => ({
  card: {
    height: "100%",
    minWidth: "150px",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function EditLinkCard() {
  const { classes } = useStyles();

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
      <Card className={classes.card} shadow="sm" p="lg">
        <Stack
          align="center"
          justify="center"
          sx={() => ({ height: "inherit" })}
        >
          <Plus size={36} strokeWidth={2} color="black" />
          <Text align="center">Add Link</Text>
        </Stack>
      </Card>
    </motion.div>
  );
}

export default EditLinkCard;
