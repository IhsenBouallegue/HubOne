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
        shadow="medium"
        p="sm"
        component="a"
        href={link}
        target="_blank"
        sx={{ display: "flex", flexDirection: "row", gap: theme.spacing.sm }}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          if (editMode) {
            e.preventDefault();
            setOpened(true);
          }
        }}
      >
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
        <Group sx={{ flex: 1 }}>
          <Image
            src={image || "./logo/hubone_logo.svg"}
            alt={title}
            withPlaceholder
          />
        </Group>
        <Stack sx={{ flex: 3 }} spacing={0}>
          <Text mb="sm" weight={600} size="md" lh="1.3">
            {title}
          </Text>

          <Text c={theme.colors.dark[1]} size="xs" color="dimmed">
            {description}
          </Text>
        </Stack>
      </Paper>
    </motion.div>
  );
}
