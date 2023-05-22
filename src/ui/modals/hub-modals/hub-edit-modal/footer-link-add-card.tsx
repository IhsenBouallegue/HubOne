import { usePost } from "@lib/useQueries";
import { Card, createStyles, Group, Text } from "@mantine/core";
import type { FooterLink } from "@prisma/client";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function FooterLinkAddCard({ hubId }: { hubId: number }) {
  const { classes } = useStyles();
  const mutate = usePost<FooterLink>("footerlinks");
  const handleSubmit = () => {
    mutate({ hubId, title: "change me", link: "/" } as FooterLink);
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={classes.card}
      onClick={handleSubmit}
    >
      <Card className={classes.card} shadow="sm" p="lg" onClick={() => {}}>
        <Group my="auto" position="center">
          <IconPlus size={24} strokeWidth={2} color="black" />
          <Text align="center">Add Footer Link</Text>
        </Group>
      </Card>
    </motion.div>
  );
}

const useStyles = createStyles(() => ({
  card: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100%",
    minHeight: "5rem",
  },
}));
