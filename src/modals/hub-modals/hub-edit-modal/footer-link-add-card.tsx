"use client";

import { FooterLink } from "@/lib/schema";
import { usePost } from "@/lib/useQueries";
import { Card, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import classes from "./footer-link-add-card.module.css";

export function FooterLinkAddCard({ hubId }: { hubId: number }) {
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
        <Group my="auto" align="center">
          <IconPlus size={24} strokeWidth={2} color="black" />
          <Text ta="center">Add Footer Link</Text>
        </Group>
      </Card>
    </motion.div>
  );
}
