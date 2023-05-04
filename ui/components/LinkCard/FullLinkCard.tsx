import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit, IconLock } from "@tabler/icons-react";
import { motion, useAnimationControls } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useHubOneStore } from "../../../lib/Store";

export default function FullLinkCard({
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
        shadow="sm"
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
        <Group w="100%" h="50%" pos="relative">
          {isInternal && (
            <Box top="10%" left="5%" pos="absolute">
              <IconLock
                size={rem(16)}
                strokeWidth={2}
                color={theme.colors.brand[5]}
              />
            </Box>
          )}
          {editMode && (
            <Box top="10%" right="5%" pos="absolute">
              <ActionIcon size="sm" color="brand" variant="light">
                <IconEdit strokeWidth={2} />
              </ActionIcon>
            </Box>
          )}
          <Image
            src={image || "./logo/hubone_logo.svg"}
            alt={title}
            withPlaceholder
            p="xl"
          />
        </Group>

        <Text my="sm" weight={600} size="lg">
          {title}
        </Text>

        <Text c={theme.colors.dark[1]} lh="1.5" size="sm" color="dimmed">
          {description}
        </Text>
      </Paper>
    </motion.div>
  );
}
