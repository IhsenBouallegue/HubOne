import { useHubOneStore } from "@/lib/Store";
import { ActionIcon, Box, Paper, Stack, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

export function FullLinkCard({
  title,
  description,
  image,
  link,
  setOpened,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const editMode = useHubOneStore((state) => state.editMode);
  const controls = useAnimationControls();

  useEffect(() => {
    if (editMode)
      controls.start({
        rotate: [2, -2],
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.4,
          ease: "easeInOut",
        },
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
        shadow="md"
        radius="lg"
        p="lg"
        component="a"
        href={link}
        target="_blank"
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          if (editMode) {
            e.preventDefault();
            setOpened(true);
          }
        }}
      >
        {editMode && (
          <Box top="10%" right="5%" pos="absolute">
            <ActionIcon size="sm" color="primary" variant="light">
              <IconEdit strokeWidth={2} />
            </ActionIcon>
          </Box>
        )}
        <Stack p="sm" style={{ flex: 1, alignItems: "center" }}>
          <Image
            src={!image || image === "" ? "./logo/hubone_logo.svg" : image}
            width={64}
            height={64}
            alt={title}
          />
        </Stack>
        <Stack style={{ flex: 1 }}>
          <Text c="black" my="sm" fw={600} size="lg">
            {title}
          </Text>

          <Text c="dimmed" lh="1.5" size="sm">
            {description}
          </Text>
        </Stack>
      </Paper>
    </motion.div>
  );
}
