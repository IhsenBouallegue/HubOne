import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { Link } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Trash } from "tabler-icons-react";

import { useHubOneContext } from "../../lib/context/HubOneContext";
import { useDelete } from "../../lib/useQueries";

import EditLinkModal from "./LinkModals/EditLinkModal";

const useStyles = createStyles((theme) => ({
  card: {
    height: "100%",
    minWidth: "150px",
    margin: "auto",
  },
  title: {
    marginBottom: 5,
    marginTop: theme.spacing.sm,
  },
  image: {
    padding: 32,
    minHeight: 160,
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  icon: { top: "10%", left: "10%", position: "absolute" },
  trash: { top: "10%", right: "10%", position: "absolute" },
  description: { color: theme.colors.dark[1], lineHeight: 1.5 },
}));

function LinkCard({
  id,
  title,
  description,
  image = "./logo/hubone_logo.svg",
  link,
  isInternal = false,
}: Link) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { editMode } = useHubOneContext();
  const deleteItem = useDelete("links");

  const [opened, setOpened] = useState(false);
  return (
    <motion.div
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
        <Card.Section>
          <Group style={{ position: "relative", width: "100%" }}>
            {isInternal && (
              <Lock
                className={classes.icon}
                size={16}
                strokeWidth={2}
                color={theme.colors.brand[5]}
              />
            )}
            {editMode && (
              <ActionIcon
                className={classes.trash}
                size={16}
                variant="light"
                color={theme.colors.secondary[4]}
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteItem(id);
                }}
              >
                <Trash strokeWidth={2} />
              </ActionIcon>
            )}
            <Image
              className={classes.image}
              src={image || "./logo/hubone_logo.svg"}
              alt={title}
            />
          </Group>
        </Card.Section>

        <Text className={classes.title} weight={600} size="lg">
          {title}
        </Text>

        <Text className={classes.description} size="sm" color="dimmed">
          {description}
        </Text>
      </Card>
      <EditLinkModal
        opened={opened}
        setOpened={setOpened}
        id={id}
        title={title}
        description={description}
        image={image}
        link={link}
        isInternal={isInternal}
      />
    </motion.div>
  );
}

export default LinkCard;
