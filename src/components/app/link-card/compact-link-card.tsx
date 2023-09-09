"use client";

import { useHubOneStore } from "@lib/Store";
import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit, IconLock } from "@tabler/icons-react";
import { motion, useAnimationControls } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";

export function CompactLinkCard({
  title,
  description,
  image,
  link,
  isInternal = false,
  setOpened,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  isInternal: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();
  const editMode = useHubOneStore((state) => state.editMode);
  const controls = useAnimationControls();
  useEffect(() => {
    if (editMode)
      controls.start({
        rotate: [2, -2],
        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.4 },
      });
    else {
      controls.set({ rotate: 0 });
      controls.stop();
    }
  }, [editMode, controls]);
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      animate={controls}
      style={{ height: "100%" }}
    >
      <Paper
        h="100%"
        pos="relative"
        shadow="md"
        p="sm"
        component="a"
        href={link}
        target="_blank"
        style={{ display: "flex", flexDirection: "row", gap: theme.spacing.sm }}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          if (editMode) {
            e.preventDefault();
            setOpened(true);
          }
        }}
      >
        {isInternal && (
          <Box top="10%" left="5%" pos="absolute">
            <IconLock size={rem(16)} strokeWidth={2} color="primary.5" />
          </Box>
        )}
        {editMode && (
          <Box top="10%" right="5%" pos="absolute">
            <ActionIcon size="sm" color="primary" variant="light">
              <IconEdit strokeWidth={2} />
            </ActionIcon>
          </Box>
        )}
        <Group style={{ flex: 1 }}>
          <Image src={image || "/logo/hubone_logo.svg"} alt={title} />
        </Group>
        <Stack style={{ flex: 3 }} gap={0}>
          <Text c="black" mb="sm" fw={600} size="md" lh="1.2">
            {title}
          </Text>

          <Text c="dimmed" size="xs">
            {description}
          </Text>
        </Stack>
      </Paper>
    </motion.div>
  );
}